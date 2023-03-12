# zhi-sdk

a simple sdk for siyuan-note, blog, and more

![version](https://img.shields.io/github/release/terwer/zhi-sdk.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

## Usage

```bash
pnpm add zhi-sdk
```

```ts
import ZhiSdk from "zhi-sdk"

// init zhiSdk
const zhiSdk = new ZhiSdk()

// siyuanAPI
const siyuanApi = zhiSdk.siyuanApi
console.log(siyuanApi.serverApi.VERSION)
console.log(siyuanApi.clientApi.VERSION)

// blogApi
const blogApi = zhiSdk.blogApi
console.log(blogApi.VERSION)

// common
const msg = "message"
const fmsg = zhiSdk.common.strUtil.f("This a {0}", msg)
console.log(fmsg)
```

## Architecture

`zhi-sdk` consist a set of component apis, each component will have their own dependency trees

- zhi-sdk
  - zhi-env
  - zhi-log
  - zhi-common
    - strUtil
    - dateUtil
    - cjsUtil
    - nodeUtil
    - browserUtil
    - versionUtil
  - zhi-core
  - zhi-ui
  - zhi-middleware
  - zhi-siyuan-api
    - zhi-siyuan-server-api
    - zhi-siyuan-client-api
    - zhi-siyuan-util
  - zhi-blog-api
    - zhi-metaweblog-api
      - zhi-wordpress
      - zhi-cnblogs
    - zhi-blog-rest-api
      - zhi-yuque
    - zhi-http-custom-api
      - zhi-blog-zhihu
      - zhi-blog-csdn

## Useful scripts

### Build

```bash
pnpm ci
```

### Publish to npm

```bash
pnpm package
```

### Docs

```bash
pnpm vitepress:dev
```
