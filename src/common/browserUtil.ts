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
 * 浏览器工具类
 *
 * @public
 * @author terwer
 * @since 1.0.2
 */
class BrowserUtil {
  /**
   * 是否在浏览器环境
   */
  public static isInBrowser = typeof window !== "undefined"

  /**
   * 是否是Electron环境
   */
  public static isElectron = () => {
    if (!BrowserUtil.isInBrowser || !window.navigator || !window.navigator.userAgent) {
      return false
    }

    return /Electron/.test(window.navigator.userAgent)
  }

  /**
   * 检测是否运行在Chrome插件中
   */
  public static isInChromeExtension() {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return window.location.href.indexOf("chrome-extension://") > -1
  }

  /**
   * 获取url参数
   *
   * @param sParam - 参数
   */
  public getQueryString = (sParam: string): string => {
    if (!BrowserUtil.isInBrowser) {
      return ""
    }
    const sPageURL = window.location.search.substring(1)
    const sURLVariables = sPageURL.split("&")

    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i].split("=")
      if (sParameterName[0] === sParam) {
        return sParameterName[1]
      }
    }

    return ""
  }

  /**
   * 替换 URL 的参数
   * @param url - 链接地址
   * @param paramName - 参数名
   * @param paramValue - 参数值
   */
  public static replaceUrlParam = (url: string, paramName: string, paramValue: string): string => {
    if (paramValue == null) {
      paramValue = ""
    }
    const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)")
    if (url.search(pattern) >= 0) {
      return url.replace(pattern, "$1" + paramValue + "$2")
    }
    url = url.replace(/[?#]$/, "")
    return url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
  }

  /**
   * 设置url参数
   * @param urlstring - url
   * @param key - key
   * @param value - value
   */
  public static setUrlParameter = (urlstring: string, key: string, value: string): string => {
    if (!BrowserUtil.isInBrowser) {
      return ""
    }
    // 已经有参数了，不重复添加
    if (urlstring.includes(key)) {
      return BrowserUtil.replaceUrlParam(urlstring, key, value)
    }
    urlstring += (urlstring.match(/[?]/g) != null ? "&" : "?") + key + "=" + value
    return urlstring
  }

  /**
   * 重新加载指定tab
   *
   * @param tabname - tabname
   */
  public static reloadTabPage = (tabname: string): void => {
    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        const url = window.location.href
        window.location.href = BrowserUtil.setUrlParameter(url, "tab", tabname)
      }
    }, 200)
  }

  /**
   * 刷新当前tab页面
   */
  public static reloadPage = (): void => {
    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        window.location.reload()
      }
    }, 200)
  }

  /**
   * 刷新当前tab页面
   *
   * @param msg - 消息提示
   * @param cb - 回调
   */
  public static reloadPageWithMessageCallback = (msg: string, cb: any): void => {
    if (cb) {
      cb()
    }

    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        window.location.reload()
      }
    }, 200)
  }
}

export default BrowserUtil
