/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


#ifndef NET_INSTAWEB_HTTP_PUBLIC_HTTP_DUMP_URL_FETCHER_H_
#define NET_INSTAWEB_HTTP_PUBLIC_HTTP_DUMP_URL_FETCHER_H_

#include "net/instaweb/http/public/url_async_fetcher.h"
#include "pagespeed/kernel/base/basictypes.h"
#include "pagespeed/kernel/base/file_system.h"
#include "pagespeed/kernel/base/scoped_ptr.h"
#include "pagespeed/kernel/base/string.h"
#include "pagespeed/kernel/base/string_util.h"

namespace net_instaweb {

class AsyncFetch;
class GoogleUrl;
class MessageHandler;
class ResponseHeaders;
class Timer;
class Writer;

// TODO(sligocki): Can we forward declare these somehow?
// class FileSystem;
// class FileSystem::InputFile;

// HttpDumpFetcher fetches raw HTTP dumps from the filesystem.
// These dumps could be compressed or chunked, the fetcher does not
// decompress or de-chunk them.
class HttpDumpUrlFetcher : public UrlAsyncFetcher {
 public:
  // When the slurped data is gzipped, but request headers are made
  // that don't include 'gzip' in an Accept-Encodings header, then
  // this fetcher inflates the gzipped output as it streams.  It
  // also captures the original gzipped size in this attribute in
  // the response headers.
  static const char kGzipContentLengthAttribute[];

  HttpDumpUrlFetcher(const StringPiece& root_dir, FileSystem* file_system,
                     Timer* timer);
  virtual ~HttpDumpUrlFetcher();

  // Converts URL into filename the way that Latency Lab does.
  // Note: root_dir_ must be standardized to have a / at end already.
  static bool GetFilenameFromUrl(const StringPiece& root_dir,
                                 const GoogleUrl& url,
                                 GoogleString* filename,
                                 MessageHandler* message_handler);

  // Non-static version that uses the fetcher's root dir.
  bool GetFilename(const GoogleUrl& url,
                   GoogleString* filename,
                   MessageHandler* message_handler) {
    return GetFilenameFromUrl(root_dir_, url, filename, message_handler);
  }

  // This is a synchronous/blocking implementation.
  virtual void Fetch(const GoogleString& url,
                     MessageHandler* message_handler,
                     AsyncFetch* fetch);

  // Parse file into response_headers and response_writer as if it were bytes
  // off the wire.
  bool ParseFile(FileSystem::InputFile* file,
                 ResponseHeaders* response_headers,
                 Writer* response_writer,
                 MessageHandler* handler);

  // Helper function to return a generic error response.
  void RespondError(ResponseHeaders* response_headers, Writer* response_writer,
                    MessageHandler* handler);

  // Print URLs each time they are fetched.
  void set_print_urls(bool on);

 private:
  GoogleString root_dir_;  // Root directory of the HTTP dumps.
  FileSystem* file_system_;
  Timer* timer_;

  // Response to use if something goes wrong.
  GoogleString error_body_;

  scoped_ptr<StringSet> urls_;

  DISALLOW_COPY_AND_ASSIGN(HttpDumpUrlFetcher);
};

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_HTTP_PUBLIC_HTTP_DUMP_URL_FETCHER_H_
