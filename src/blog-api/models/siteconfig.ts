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

import UserBlog from "~/src/blog-api/models/userBlog"

/**
 * 站点信息定义
 */
class SiteConfig {
  userBlog: UserBlog

  domain: string
  weburl: string
  webtheme: string
  webname: string
  webslogen: string
  keywords: string
  description: string
  beianinfo: string

  constructor() {
    this.userBlog = new UserBlog()
    this.domain = ""
    this.weburl = ""
    this.webtheme = "default"
    this.webname = "浅海拾贝"
    this.webslogen = "寻找未知的技术拼图"
    this.keywords = "软件架构、服务端开发、Java、Spring、Dubbo、Zookeeper、微服务"
    this.description =
      "浅海拾贝是关注与分享互联网及服务端开发技术的个人博客，致力于Java后端开发及服务端技术、软件架构、微服务技术分享。同时也记录个人的一路点滴，所蕴含的包括前端、后端、数据库等知识，欢迎您关注我。"
    this.beianinfo = "粤ICP备18023717号-1"
  }
}

export default SiteConfig
