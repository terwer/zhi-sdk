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

import cjsUtil from "~/src/common/cjsUtil"
import BrowserUtil from "~/src/common/browserUtil"

const path = cjsUtil.safeRequire("path")

/**
 * 思源笔记工具类
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanUtil {
  /**
   * 思源笔记 window 对象
   */
  public syWin() {
    return (BrowserUtil.isInBrowser ? window : {}) as any
  }

  /**
   * 思源笔记 process 对象
   */
  public syProcess() {
    return (BrowserUtil.isInBrowser ? window.process : process) as any
  }

  /**
   * 思源笔记 conf 目录
   */
  public SIYUAN_CONF_PATH() {
    return this.syWin()?.siyuan.config.system.confDir
  }

  /**
   * 思源笔记 data 目录
   */
  public SIYUAN_DATA_PATH() {
    return this.syWin()?.siyuan.config.system.dataDir
  }

  /**
   * 思源笔记 appearance 目录
   */
  public SIYUAN_APPEARANCE_PATH() {
    return path.join(this.SIYUAN_CONF_PATH(), "appearance")
  }

  /**
   * 思源笔记 themes 目录
   */
  public SIYUAN_THEME_PATH() {
    return path.join(this.SIYUAN_APPEARANCE_PATH(), "themes")
  }

  /**
   * zhi 主题目录
   */
  public ZHI_THEME_PATH() {
    return path.join(this.SIYUAN_THEME_PATH(), "zhi")
  }

  /**
   * 获取跨平台的用户配置文件夹
   */
  getCrossPlatformAppDataFolder = () => {
    let configFilePath
    if (this.syProcess()?.platform === "darwin") {
      configFilePath = path.join(this.syProcess()?.env.HOME, "/Library/Application Support")
    } else if (this.syProcess()?.platform === "win32") {
      // Roaming包含在APPDATA中了
      configFilePath = this.syProcess()?.env.APPDATA
    } else if (this.syProcess()?.platform === "linux") {
      configFilePath = this.syProcess()?.env.HOME
    }
    return configFilePath
  }
}

export default SiyuanUtil
