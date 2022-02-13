# http_proxy > test

[![CI](https://github.com/DPeshkoff/http_proxy/actions/workflows/CI.yml/badge.svg?branch=master)](https://github.com/DPeshkoff/http_proxy/actions/workflows/CI.yml)

Test cases overview:

### [http-proxy.ts](./http-proxy.ts):

|Test name|Test query|
|---|---|
|HTTP-GET|GET http://mail.ru|
|HTTP-POST|POST http://httpbin.org/post|
|HTTP-DELETE|DELETE http://httpbin.org/delete|
|HTTP-PATCH|PATCH http://httpbin.org/patch|
|HTTP-PUT|PUT http://httpbin.org/patch|
|HTTP-OPTIONS|OPTIONS http://mail.ru|
|HTTP-HEAD|HEAD http://mail.ru|
|GET-404|GET http://httpbin.org/status/404|
|GET-200|GET http://httpbin.org/status/200|
|GET-302|GET http://httpbin.org/status/302|
|POST-HEADERS|POST http://httpbin.org/post|
