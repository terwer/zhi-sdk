/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { describe, it } from "vitest"
import ZhiSdk from "~/src"
import Env from "zhi-env"

describe("test zhi-sdk", () => {
  it("test sdk with default env", function () {
    const zhiSdk = new ZhiSdk()
    const logger = zhiSdk.getLogger()
    logger.info("This is info log from zhi-log with default env")
  })

  it("test logger", function () {
    const env = new Env(import.meta.env)

    const zhiSdk = new ZhiSdk(env)
    const logger = zhiSdk.getLogger()
    logger.info("This is info log from zhi-log")
  })

  it("test siyuanApi", function () {
    const env = new Env(import.meta.env)

    const zhiSdk = new ZhiSdk(env)
    const siyuanApi = zhiSdk.siyuanApi
    console.log("siyuanApi.serverApi=>", siyuanApi.serverApi.VERSION)
    console.log("siyuanApi.clientApi=>", siyuanApi.clientApi.VERSION)
    console.log(
      "siyuanApi.siyuanUtil.getCrossPlatformAppDataFolder=>",
      siyuanApi.siyuanUtil.getCrossPlatformAppDataFolder()
    )
  })

  it("test blogApi", function () {
    const env = new Env(import.meta.env)

    const zhiSdk = new ZhiSdk(env)
    const blogApi = zhiSdk.blogApi
    console.log("siyuanApi.blogApi=>", blogApi.VERSION)
  })

  it("test common", function () {
    const env = new Env(import.meta.env)

    const zhiSdk = new ZhiSdk(env)
    const isInBrowser = zhiSdk.common.browserUtil.isInBrowser
    console.log("isInBrowser=>", isInBrowser)
  })
})
