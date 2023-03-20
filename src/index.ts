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

/**
 * @packageDocumentation
 * 提供思源笔记API、博客API等统一实现
 */

import Env from "zhi-env"
import LogFactory from "zhi-log"
import SdkConfig from "~/src/SdkConfig"
import SiyuanApi from "~/src/siyuan-api/siyuanApi"
import IBlogApi from "~/src/blog-api/IBlogApi"
import BlogApi from "~/src/blog-api/blogApi"
import SiyuanServerApi from "~/src/siyuan-api/serverApi"
import SiyuanClientApi from "~/src/siyuan-api/clientApi"
import Common from "~/src/common"
import StrUtil from "~/src/common/strUtil"
import BrowserUtil from "~/src/common/browserUtil"
import ElectronUtil from "~/src/common/electronUtil"
import DateUtil from "~/src/common/dateUtil"
import VersionUtil from "~/src/common/versionUtil"
import SiyuanUtil from "~/src/siyuan-api/siyuanUtil"
import DeviceUtil, { DeviceType } from "~/src/common/deviceUtil"
import BLOG_API_TYPE_CONSTANTS from "~/src/blog-api/constants/blogApiTypeConstants"
import MarkdownUtil from "~/src/common/markdownUtil"
import HtmlUtil from "~/src/common/htmlUtil"
import NodeUtil from "~/src/common/nodeUtil"
import Post from "~/src/blog-api/models/post"
import UserBlog from "~/src/blog-api/models/userBlog"
import { MarkdownRenderTypeEnum } from "~/src/common/markdownUtil"
import SiyuanConfig from "~/src/siyuan-api/siyuanConfig"

/**
 * SDK操作统一入口，建议大部分操作使用此工具类实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiSdk {
  /**
   * 环境变量
   *
   * @private
   */
  private readonly env
  /**
   * 日志记录器
   *
   * @private
   */
  private readonly logger

  /**
   * 思源API统一入口
   */
  public readonly siyuanApi

  /**
   * 博客API统一入口
   */
  public readonly blogApi

  /**
   * 通用工具类
   */

  public readonly common

  /**
   * 构造 zhi-sdk 对象
   * @param env - 可选，环境变量对象
   * @param cfg - cfg，优先级高
   */
  constructor(env?: Env, cfg?: any) {
    this.env = env ?? new Env({})
    this.logger = LogFactory.defaultLogger(this.env, SdkConfig.LOG_STACK_SIZE)
    this.common = new Common()

    this.siyuanApi = new SiyuanApi()

    const type = this.env.getEnv("VITE_DEFAULT_TYPE") ?? BLOG_API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    this.blogApi = new BlogApi(type, this.env, cfg)
  }

  /**
   * 获取配置环境变量
   */
  public getEnv() {
    if (!this.env) {
      throw new Error("env is not initiated, please use new ZhiSdk(env) create ZhiSdk object!")
    }
    return this.env
  }

  /**
   * 获取日志操作对象
   */
  public getLogger() {
    return this.logger
  }
}

export default ZhiSdk
export { SiyuanApi, SiyuanServerApi, SiyuanClientApi, SiyuanUtil, type SiyuanConfig }
export { type IBlogApi, BlogApi, Post, UserBlog }
export {
  Common,
  BrowserUtil,
  DateUtil,
  type NodeUtil,
  ElectronUtil,
  StrUtil,
  VersionUtil,
  DeviceUtil,
  DeviceType,
  MarkdownUtil,
  MarkdownRenderTypeEnum,
  HtmlUtil,
}
