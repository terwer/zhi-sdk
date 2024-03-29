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

import StrUtil from "~/src/common/strUtil"
import BrowserUtil from "~/src/common/browserUtil"
import DateUtil from "~/src/common/dateUtil"
import VersionUtil from "~/src/common/versionUtil"
import DeviceUtil from "~/src/common/deviceUtil"
import ElectronUtil from "~/src/common/electronUtil"
import MarkdownUtil from "~/src/common/markdownUtil"
import HtmlUtil from "~/src/common/htmlUtil"

/**
 * 通用工具类
 *
 * @public
 * @author terwer
 * @since 1.0.2
 */
class Common {
  /**
   * 字符串操作工具类
   */
  public readonly strUtil

  /**
   * 日期处理工具类
   */
  public readonly dateUtil

  /**
   * electron内部工具类
   */
  public readonly electronUtil

  /**
   * 浏览器工具类
   */
  public readonly browserUtil

  /**
   * 版本号操作工具类
   */
  public readonly versionUtil

  /**
   * 设备工具类
   */
  public readonly deviceUtil

  /**
   * Markdown工具类
   */
  public readonly markdownUtil

  /**
   * HTML 工具类
   */
  public readonly htmlUtil

  constructor() {
    this.strUtil = new StrUtil()
    this.dateUtil = new DateUtil()
    this.electronUtil = new ElectronUtil()
    this.browserUtil = BrowserUtil
    this.versionUtil = new VersionUtil()
    this.deviceUtil = DeviceUtil
    this.markdownUtil = new MarkdownUtil()
    this.htmlUtil = new HtmlUtil()
  }
}

export default Common
