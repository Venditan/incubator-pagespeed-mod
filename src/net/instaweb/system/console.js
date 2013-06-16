/*
 * Copyright 2013 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Code for running PSOL Console.
 *
 * Fetches JSON statistics data from server to draw graphs over time of
 * various "notable issues".
 *
 * @author sligocki@google.com (Shawn Ligocki)
 * @author sarahdw@google.com (Sarah Dapul-Weberman)
 * @author bvb@google.com (Ben VanBerkum)
 */

'use strict';

goog.require('goog.structs.Set');

goog.provide('pagespeed.Console');

// Google Charts API.
// Requires <script src='https://www.google.com/jsapi'></script> loaded in HTML.
google.load('visualization', '1.0', {'packages': ['corechart']});


/**
 * Report error.
 * @param {string} error_message
 */
pagespeed.error = function(error_message) {
  if (window.console) {
    console.error(error_message);
  }
  // TODO(sligocki): Show error message in DOM somewhere as well.
};

/**
 * @constructor
 */
pagespeed.Console = function() {
  /**
   * Specifications for graphs. Add a new graph with addGraph().
   * @type {Array.<Object>}
   * @private
   */
  this.graphs_ = [];

  /**
   * Names of variables needed for loading all graphs. Set by addGraph(),
   * used in request to mod_pagespeed server.
   * @type {goog.structs.Set.<string>}
   * @private
   */
  this.varsNeeded_ = new goog.structs.Set();

  /**
   * Mapping of variable names -> array of values over time.
   * Each value is a snapshot of that variable at the timestamp in the
   * parallel data structure this.timestamps_.
   * @type {Object.<string, Array.<number> >}
   * @private
   */
  this.variables_ = null;

  /**
   * Array of timestamps, one for every set of variables.
   * @type {Array.<number>}
   * @private
   */
  this.timestamps_ = null;

  /**
   * The options used for drawing google.visualization.LineChart graphs.
   * @type {Object}
   * @private
   * @const
   */
  this.lineChartOptions_ = {
    'width': 900,
    'height': 255,
    'colors': ['#4ECDC4', '#556270', '#C7F464'],
    'legend': {
      'position': 'bottom'
    },
    'hAxis': {
      // This looks awkward when all timestamps are in the last day.
      // TODO(sligocki): Use a different format which looks better for range.
      'format': 'MMM d, y hh:mma',
      'gridlines': {
        'color': '#F2F2F2'
      },
      'baselineColor': '#E5E5E5'
    },
    'vAxis': {
      'minValue': 0,
      'viewWindowMode': 'explicit',
      'viewWindow': {
        'min': 0
      },
      'gridlines': {
        'color': '#F2F2F2'
      },
      'baselineColor': '#E5E5E5'
    },
    'chartArea': {
      'left': 60,
      'top': 20,
      'width': 800
    },
    'pointSize': 2
  };
};

/**
 * Namespace for statistics calculators.
 */
pagespeed.statistics = {};

/**
 * Trivial statistic that just has the value of one variable.
 * For example: Cache hits.
 *
 * TODO(sligocki): Type check the return value against a predefined type,
 * pagespeed.Statistic, so that we can guarantee that the returned object
 * has the appropriate members and type (s/Object/pagespeed.Statistic/).
 *
 * @param {string} name  Variable name to attach to.
 * @return {Object}  Just this variable.
 */
pagespeed.statistics.variable = function(name) {
  var stat = {};
  stat.varsNeeded = new goog.structs.Set([name]);
  /**
   * @param {function(string): number} variableGetter
   * @return {number}
   */
  stat.evaluate = function(variableGetter) {
    return variableGetter(name);
  };
  return stat;
};

/**
 * Statistic which has the value of a sum of sub-statistics.
 * For example: Total cache requests = cache hits + cache misses.
 *
 * @param {Array.<Object>} statArray  Statistics to add up.
 * @return {Object}  Statistic representing summed result.
 */
pagespeed.statistics.sum = function(statArray) {
  var stat = {};
  stat.varsNeeded = new goog.structs.Set();
  for (var i = 0; i < statArray.length; i++) {
    stat.varsNeeded.addAll(statArray[i].varsNeeded);
  }
  /**
   * @param {function(string): number} variableGetter
   * @return {number}
   */
  stat.evaluate = function(variableGetter) {
    var value = 0;
    for (var i = 0; i < statArray.length; i++) {
      value += statArray[i].evaluate(variableGetter);
    }
    return value;
  };
  return stat;
};

/**
 * Statistic which has the value of a percent of sub-statistics.
 * For example: Cache hit percent = 100 * (cache hits) / (total cache requests).
 *
 * @param {Object} numStat    Numerator statistic.
 * @param {Object} denomStat  Denominator statistic.
 * @return {Object}  Statistic representing percent result.
 */
pagespeed.statistics.percent = function(numStat, denomStat) {
  var stat = {};
  stat.varsNeeded = new goog.structs.Set();
  stat.varsNeeded.addAll(numStat.varsNeeded);
  stat.varsNeeded.addAll(denomStat.varsNeeded);
  /**
   * @param {function(string): number} variableGetter
   * @return {number}
   */
  stat.evaluate = function(variableGetter) {
    var denom = denomStat.evaluate(variableGetter);
    if (denom == 0) {
      return 0.0;
    } else {
      return 100 * numStat.evaluate(variableGetter) / denom;
    }
  };
  return stat;
};

/**
 * Statistic for common pattern: bad / (bad + good)
 * For example: Cache miss % = 100 * cache misses / (cache misses + cache hits)
 *
 * @param {Object} badStat   Numerator statistic.
 * @param {Object} goodStat  Added to badStat to get denominator.
 * @return {Object}  Statistic representing percent result.
 */
pagespeed.statistics.percent_total = function(badStat, goodStat) {
  return pagespeed.statistics.percent(
      badStat,
      pagespeed.statistics.sum([badStat, goodStat]));
};

/**
 * Initialize and start the console for "notable issues" version, which
 * displays a fixed set of graphs ordered by level of importance.
 *
 * @return {pagespeed.Console}  The initialized console object.
 */
pagespeed.startConsole = function() {
  var mpsConsole = new pagespeed.Console();
  mpsConsole.initGraphs();
  mpsConsole.startConsole();
  return mpsConsole;
};

/**
 * Initialize pre-determined set of "notable issues" graphs.
 */
pagespeed.Console.prototype.initGraphs = function() {
  var v = pagespeed.statistics.variable;
  var sum = pagespeed.statistics.sum;
  var percent = pagespeed.statistics.percent;
  var percent_total = pagespeed.statistics.percent_total;

  this.addGraph('Resources not loaded because of fetch failures',
                percent(v('serf_fetch_failure_count'),
                        v('serf_fetch_request_count')));
  this.addGraph("Resources not rewritten because domain wasn't authorized",
                percent_total(v('resource_url_domain_rejections'),
                              v('resource_url_domain_acceptances')));
  this.addGraph('Resources not rewritten because of restrictive ' +
                'Cache-Control headers',
                percent_total(v('num_cache_control_not_rewritable_resources'),
                              v('num_cache_control_rewritable_resources')));
  var totalCacheCalls = sum([v('cache_backend_misses'),
                             v('cache_backend_hits')]);
  this.addGraph('Cache misses',
                percent(v('cache_backend_misses'), totalCacheCalls));
  this.addGraph('Cache lookups that were expired',
                percent(v('cache_expirations'), totalCacheCalls));
  this.addGraph('CSS files not rewritten because of parse errors',
                percent_total(v('css_filter_parse_failures'),
                              v('css_filter_blocks_rewritten')));
  this.addGraph('JavaScript minification failures',
                percent_total(v('javascript_minification_failures'),
                              v('javascript_blocks_minified')));
  var goodImageResults =
      sum([v('image_rewrites'),
           v('image_rewrites_dropped_nosaving_resize'),
           v('image_rewrites_dropped_nosaving_noresize')]);
  var badImageResults =
      sum([v('image_norewrites_high_resolution'),
           v('image_rewrites_dropped_decode_failure'),
           v('image_rewrites_dropped_server_write_fail'),
           v('image_rewrites_dropped_mime_type_unknown'),
           v('image_norewrites_high_resolution')]);
  this.addGraph('Image rewrite failures',
                percent_total(badImageResults, goodImageResults));
  /* TODO(sligocki): Get CSS combine stat working.
     Note: This stat is also generally much higher than the rest and also
     less important, we should de-prioritize it as well.
  this.addGraph('CSS combine opportunities missed', percent(
      v('css_combine_opportunities') - v('css_file_count_reduction'),
      v('css_combine_opportunities')));
  */
};

/**
 * Add a graph specification to our list. Also note which variables we will
 * need to fetch.
 *
 * @param {string} title  Name of the graph.
 * @param {Object} stat   Statistic to graph.
 * @return {Object}  The graph spec (used in tests).
 */
pagespeed.Console.prototype.addGraph = function(title, stat) {
  var graph = {};
  graph.title = title;
  graph.value = stat;
  graph.lineChart = new google.visualization.LineChart(
      pagespeed.createGraphDiv(title, this.graphs_.length));

  this.graphs_.push(graph);
  this.varsNeeded_.addAll(stat.varsNeeded);

  return graph;
};

/**
 * Load all graphs over default time period (last day).
 */
pagespeed.Console.prototype.startConsole = function() {
  var endTime = new Date();
  var durationMs = 24 * 60 * 60 * 1000;  // 1 Day
  var startTime = new Date(endTime - durationMs);
  var granularityMs = 60 * 1000;  // 1 Minute

  this.loadJsonData(startTime, endTime, granularityMs);
};

/**
 * Generate a URL which will request specific variables values snapshotted
 * over a given timeframe with a specified granularity.
 *
 * @param {Array.<string>} varNames  Array of variable names to request.
 * @param {Date} startTime  Begining of timeframe.
 * @param {Date} endTime    End of timeframe.
 * @param {number} granularityMs  Time between data points requested.
 * @return {string}  URL incorporating all these values.
 */
pagespeed.Console.prototype.createQueryUrl = function(
    varNames, startTime, endTime, granularityMs) {
  var queryString = '/mod_pagespeed_statistics?json';
  queryString += '&start_time=' + startTime.getTime();
  queryString += '&end_time=' + endTime.getTime();
  queryString += '&granularity=' + granularityMs;

  queryString += '&var_titles=';
  for (var i = 0; i < varNames.length; i++) {
    queryString += varNames[i] + ',';
  }
  return queryString;
};

/**
 * Request variable data from server. Parse the returned result and call
 * updateGraphsFromJsonData() with resulting data.
 *
 * @param {Date} startTime  Begining of timeframe.
 * @param {Date} endTime    End of timeframe.
 * @param {number} granularityMs  Time between data points requested.
 */
pagespeed.Console.prototype.loadJsonData = function(
    startTime, endTime, granularityMs) {
  var xhr = new XMLHttpRequest();
  var mpsConsole = this;
  // TODO(sligocki): varsNeeded list is getting long, change protocol so that
  // JSON requests just return all vars tracked. That would (a) keep the URLs
  // shorter and (b) remove our need to keep track of varsNeeded.
  var queryString = this.createQueryUrl(
      this.varsNeeded_.getValues(), startTime, endTime, granularityMs);

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return;
    }
    if (this.status != 200 || this.responseText.length < 1 ||
        this.responseText[0] != '{') {
      pagespeed.error('XHR request failed.');
      return;
    }
    var json_data = JSON.parse(this.responseText);
    mpsConsole.updateGraphsFromJsonData(json_data);
  };

  xhr.open('GET', queryString);
  xhr.send();
};

/**
 * Use JSON data to update all graphs.
 *
 * @param {*} data  Parsed JSON data from backend.
 */
pagespeed.Console.prototype.updateGraphsFromJsonData = function(data) {
  this.variables_ = data['variables'];
  // TODO(sligocki): Convert to {Array.<Date>}.
  this.timestamps_ = data['timestamps'];

  this.checkDataValidity(this.timestamps_, this.variables_);

  for (var i = 0; i < this.graphs_.length; i++) {
    // Each graph is a collection of (x, y) points where x is a timestamp
    // and y is the stat at that time. statTimeSeries stores those y values.
    // TODO(sligocki): Perhaps we should instead show the stat computed from
    // diffs from the last timestamp. That way changes should be notable.
    // Or maybe both.
    var statTimeSeries = [];
    for (var j = 0; j < this.timestamps_.length; j++) {
      statTimeSeries.push(this.graphs_[i].value.evaluate(
          function(variables) {
            /**
             * @param {string} name  variable name.
             * @return {number}  Variable value at timestamp j.
             */
            return function(name) {
              if (name in variables) {
                return variables[name][j];
              } else {
                pagespeed.error('JSON data missing required variable.');
              }
            }
          }(this.variables_)));
    }
    this.updateGraph(this.graphs_[i], this.timestamps_, statTimeSeries);
  }
};

/**
 * Error if any variables has an inconsistent number of data points.
 * All variables should have the same number of values as there are timestamps.
 *
 * @param {Array} timestamps
 * @param {Object.<Array>} variables
 */
pagespeed.Console.prototype.checkDataValidity = function(
    timestamps, variables) {
  for (var name in variables) {
    if (timestamps.length != variables[name].length) {
      pagespeed.error('JSON response is malformed. (' + timestamps.length +
                      ' != ' + variables[name].length + ')');
    }
  }
};

/**
 * Update a specific graph with the computed statistic time series.
 *
 * @param {Object} graph  The graph to update.
 * @param {Array.<number>} timestamps  x-coords of the new graph.
 * @param {Array.<number>} statTimeSeries  y-coords of the new graph.
 */
pagespeed.Console.prototype.updateGraph = function(
    graph, timestamps, statTimeSeries) {
  // Build data table.
  var dataTable = this.createDataTable(graph.title);
  for (var i = 0; i < timestamps.length; i++) {
    dataTable.addRow([new Date(timestamps[i]), statTimeSeries[i]]);
  }
  if (dataTable.getNumberOfRows() == 0) {
    pagespeed.error('Data failed to load for graph ' + graph.title);
  }

  // Draw graph.
  graph.lineChart.draw(dataTable, this.lineChartOptions_);

  /* TODO(sligocki): Add auto-update functionality.
  if (this.updatePaused_) {
    this.updatePaused_ = false;
    this.startAutoUpdate();
  }
  */
};

/**
 * createDataTable creates a new google.visualization.DataTable
 * and returns it. Each DataTable has two columns: a timestamp
 * (represented as a number, time elapsed in s) and the value at that time,
 * also a number. This DataTable is meant for a line graph DataView.
 * @param {string} title  The name of the statistic being measured.
 * @return {Object}  The data table.
 */
pagespeed.Console.prototype.createDataTable = function(title) {
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn('datetime', 'Time');
  dataTable.addColumn('number', title);
  return dataTable;
};

// Methods for creating HTML content

/**
 * createGraphDiv creates the necessary DOM elements for a graph, and returns
 * the div in which the graph will be drawn.
 *
 * @param {string} title     The title of the graph.
 * @param {number} graphNum  Unique number for this graph.
 * @return {Element}  The div in which to draw the graph.
 */
pagespeed.createGraphDiv = function(title, graphNum) {
  var wholeDiv = document.createElement('div');
  wholeDiv.setAttribute('class', 'pagespeed-widgets');

  wholeDiv.appendChild(pagespeed.createGraphTitleBar(title, graphNum));

  var graph = document.createElement('div');
  graph.setAttribute('class', 'pagespeed-graph');
  wholeDiv.appendChild(graph);

  var container = document.getElementById('pagespeed-graphs-container');
  container.appendChild(wholeDiv);

  return graph;
};

/**
 * Creates the title and dropdown menu of each graph.
 *
 * @param {string} title     The title of the graph.
 * @param {number} graphNum  Unique number for this graph.
 * @return {Element}  The full title bar div.
 */
pagespeed.createGraphTitleBar = function(
    title, graphNum) {
  var topBar = document.createElement('div');
  topBar.setAttribute('class', 'pagespeed-widgets-topbar');

  var titleSpan = document.createElement('span');
  titleSpan.setAttribute('class', 'pagespeed-title');
  titleSpan.setAttribute('id', 'pagespeed-title' + graphNum);
  titleSpan.innerHTML = title;
  topBar.appendChild(titleSpan);

  // TODO(sligocki): Add other things here, like drop-down option menu.

  return topBar;
};