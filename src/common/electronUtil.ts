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

import BrowserUtil from "~/src/common/browserUtil"
import SiyuanUtil from "~/src/siyuan-api/siyuanUtil"
import NodeUtil from "~/src/common/nodeUtil"

/**
 * 警告⚠️：请勿在非Electron环境调用此文件中的任何方法
 *
 * Node通用工具类
 *
 * @public
 * @node

 */
class ElectronUtil implements NodeUtil {
  private siyuanUtil

  constructor() {
    this.siyuanUtil = new SiyuanUtil()
  }

  /**
   * 引入依赖
   *
   * @param libpath - 依赖全路径
   */
  public requireLib = (libpath: string) => {
    const syWin = this.siyuanUtil.siyuanWindow()
    if (!syWin) {
      return require(libpath)
    }
    return syWin.require(libpath)
  }

  /**
   *
   * 可以使用Node.js内置的fs模块中的`copyFileSync`或者`copyFile`方法来复制文件夹。不过需要注意，这两个方法只能复制单个文件，如果想要复制整个文件夹，需要自己编写递归函数实现。
   * 本方法用于复制一个文件夹以及其中所有子文件和子文件夹
   *
   * @param source - 源文件
   * @param target - 目标文件
   * @author terwer
   * @since 1.0.0
   */
  copyFolderSync(source: string, target: string): void {
    const that = this
    const fs = this.requireLib("fs")
    const path = this.requireLib("path")

    if (!fs.existsSync(target)) {
      fs.mkdirSync(target)
    }

    if (fs.lstatSync(source).isDirectory()) {
      const files: any[] = fs.readdirSync(source)

      files.forEach(function (file: any) {
        const curSource = path.join(source, file)
        if (fs.lstatSync(curSource).isDirectory()) {
          that.copyFolderSync(curSource, path.join(target, file))
        } else {
          fs.copyFileSync(curSource, path.join(target, file))
        }
      })
    }
  }

  /**
   * 删除文件夹
   *
   * @param folder - 文件夹
   */
  public rmFolder(folder: string) {
    const fs = this.requireLib("fs")
    if (fs.existsSync(folder)) {
      // fs.rm(folder, { recursive: true, force: true })
      fs.rmdirSync(folder, { recursive: true })
    }
  }

  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  public joinPath(...paths: string[]): string {
    const path = this.requireLib("path")
    return path.join(...paths)
  }

  /**
   * 获取相对路径
   *
   * @param pathname - 路径名称
   */
  public dirname(pathname: string): string {
    const path = this.requireLib("path")
    return path.dirname(pathname)
  }

  /**
   * 获取绝对路径
   *
   * @param pathname - 路径名称
   */
  public absPath(pathname: string): string {
    const path = this.requireLib("path")
    const cwdDir = this.dirname(pathname)
    return path.resolve(path.dirname(cwdDir), pathname)
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
    const syWin = this.siyuanUtil.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin?.siyuan.config.system.confDir
  }

  /**
   * 思源笔记 data 目录
   */
  public SIYUAN_DATA_PATH() {
    const syWin = this.siyuanUtil.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.dataDir
  }

  /**
   * 思源笔记 appearance 目录
   */
  public SIYUAN_APPEARANCE_PATH() {
    const path = this.requireLib("path")
    return path.join(this.SIYUAN_CONF_PATH(), "appearance")
  }

  /**
   * 思源笔记 themes 目录
   */
  public SIYUAN_THEME_PATH() {
    const path = this.requireLib("path")
    return path.join(this.SIYUAN_APPEARANCE_PATH(), "themes")
  }

  /**
   * zhi 主题目录
   */
  public ZHI_THEME_PATH() {
    const path = this.requireLib("path")
    return path.join(this.SIYUAN_THEME_PATH(), "zhi")
  }

  /**
   * zhi 主题构建目录
   */
  public ZHI_THEME_DIST_PATH() {
    const path = this.requireLib("path")
    return path.join(this.ZHI_THEME_PATH(), "apps", "theme", "dist")
  }

  /**
   * zhi 博客构建目录
   */
  public ZHI_BLOG_DIST_PATH() {
    const path = this.requireLib("path")
    return path.join(this.SIYUAN_THEME_PATH(), "apps", "blog", "dist")
  }

  /**
   * 获取跨平台的用户配置文件夹
   */
  getCrossPlatformAppDataFolder = () => {
    const path = this.requireLib("path")

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

export default ElectronUtil
