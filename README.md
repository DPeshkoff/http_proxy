[![CI](https://github.com/DPeshkoff/http_proxy/actions/workflows/CI.yml/badge.svg?branch=master)](https://github.com/DPeshkoff/http_proxy/actions/workflows/CI.yml) ![GitHub repo size](https://img.shields.io/github/repo-size/DPeshkoff/http_proxy) ![GitHub](https://img.shields.io/github/license/DPeshkoff/http_proxy)

# http_proxy
HW task for Internet Application Security course of Technopark (third semester, spring 2022).

### Usage

> Starting the server: `npm start`

> Build: `npm run build`

> Starting server with current dist folder: `npm run server`

> Running linter: `npm run lint`

> Running linter in fixing mode: `npm run lint:fix`

> Remove local dist folder: `npm run clean`

> Run tests: `npm test`

### Docker

> Running docker container: `docker build -t http_proxy . && docker run --name proxy -p 8000:8000 -p 8080:8080 http_proxy`

### Status

HW1:
- proxy all query types (GET, POST, HEAD, OPTIONS)
- proxy all headers
- return all status codes (200, 302, 404)
