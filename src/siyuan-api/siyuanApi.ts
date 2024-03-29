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

import SiyuanServerApi from "~/src/siyuan-api/serverApi"
import SiyuanClientApi from "~/src/siyuan-api/clientApi"
import SiyuanUtil from "~/src/siyuan-api/siyuanUtil"
import Env from "zhi-env"
import SiyuanConfig from "~/src/siyuan-api/siyuanConfig"

/**
 * 思源笔记API
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanApi {
  /**
   * 思源笔记内核API
   */
  public readonly serverApi
  /**
   * 思源笔记客户端API
   */
  public readonly clientApi

  /**
   * 思源笔记工具类
   */
  public readonly siyuanUtil

  /**
   * 构造思源 API对象
   *
   * @param env - 可选，注意：serverApi必须传递env才能使用
   * @param cfg - 可选，注意：y优先级比环境变量高
   */
  constructor(env?: Env, cfg?: SiyuanConfig) {
    this.serverApi = new SiyuanServerApi(env, cfg)
    this.clientApi = new SiyuanClientApi()
    this.siyuanUtil = new SiyuanUtil()
  }
}

export default SiyuanApi
