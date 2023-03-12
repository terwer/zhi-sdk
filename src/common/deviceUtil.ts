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

import SiyuanUtil from "~/src/siyuan-api/siyuanUtil"
import BrowserUtil from "~/src/common/browserUtil"

/**
 * 设备类型枚举
 *
 * @public
 * @author terwer
 * @since 1.0.8
 */
export enum DeviceType {
  /**
   * 思源笔记新窗口（Sofill主题新窗口共用）
   */
  DeviceType_Siyuan_NewWin = "Siyuan_NewWin",
  /**
   * 思源笔记挂件
   */
  DeviceType_Siyuan_Widget = "Siyuan_Widget",
  /**
   * Google Chrome浏览器插件
   */
  DeviceType_Chrome_Extension = "Chrome_Extension",
  /**
   * Google Chrome浏览器（Docker浏览器共用）
   */
  DeviceType_Chrome_Browser = "Chrome_Browser",
}

/**
 * 设备相关
 *
 * @public
 * @author terwer
 * @since 1.0.7
 */
class DeviceUtil {
  /**
   * 获取当前设备
   */
  public static getDevice() {
    const siyuanUtil = new SiyuanUtil()

    // 思源笔记挂件
    if (siyuanUtil.isInSiyuanWidget()) {
      return DeviceType.DeviceType_Siyuan_Widget
    }

    // 思源新窗口
    if (siyuanUtil.isInSiyuanOrSiyuanNewWin()) {
      return DeviceType.DeviceType_Siyuan_NewWin
    }

    // Chrome浏览器插件
    if (BrowserUtil.isInChromeExtension()) {
      return DeviceType.DeviceType_Chrome_Extension
    }

    return DeviceType.DeviceType_Chrome_Browser
  }
}

export default DeviceUtil
