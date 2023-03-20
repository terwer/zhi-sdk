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

import Env from "zhi-env"
import SiyuanApi from "~/src/siyuan-api/siyuanApi"
import IBlogApi from "~/src/blog-api/IBlogApi"
import UserBlog from "~/src/blog-api/models/userBlog"
import LogFactory, { DefaultLogger } from "zhi-log"
import SdkConfig from "~/src/SdkConfig"
import BLOG_API_TYPE_CONSTANTS from "~/src/blog-api/constants/blogApiTypeConstants"
import Post from "~/src/blog-api/models/post"
import MarkdownUtil from "~/src/common/markdownUtil"
import HtmlUtil from "~/src/common/htmlUtil"

/**
 * 思源笔记 API 适配器
 *
 * @author terwer
 * @since 1.1.0
 */
class SiYuanApiAdaptor implements IBlogApi {
  private readonly env: Env
  private readonly logger: DefaultLogger
  private readonly siyuanServerApi
  private readonly markdownUtil
  private readonly htmlUtil

  constructor(env: Env) {
    this.env = env
    this.logger = LogFactory.defaultLogger(this.env, SdkConfig.LOG_STACK_SIZE)

    const siyuanApi = new SiyuanApi(env)
    this.siyuanServerApi = siyuanApi.serverApi
    this.markdownUtil = new MarkdownUtil()
    this.htmlUtil = new HtmlUtil()
  }

  public async getUsersBlogs(): Promise<Array<UserBlog>> {
    const result: Array<UserBlog> = []
    // const data = await this.metaWeblog.getUsersBlogs(this.appkey, this.username, this.password);
    const userBlog = new UserBlog()
    userBlog.blogid = BLOG_API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    userBlog.blogName = BLOG_API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    userBlog.url = this.env.getStringEnv("VITE_SIYUAN_API_URL")
    result.push(userBlog)

    return result
  }

  public async getRecentPosts(numOfPosts: number, page: number, keyword?: string): Promise<Array<any>> {
    const result: any[] = []

    let pg = 0
    if (page) {
      pg = page
    }
    const k = keyword || ""
    const siyuanPosts: any = await this.siyuanServerApi.getRootBlocks(pg, numOfPosts, k)
    // log.logInfo(siyuanPosts)

    for (let i = 0; i < siyuanPosts.length; i++) {
      const siyuanPost = siyuanPosts[i]

      // 某些属性详情页控制即可
      const attrs: any = await this.siyuanServerApi.getBlockAttrs(siyuanPost.root_id)

      // // 发布状态
      // let isPublished = true
      // const publishStatus = attrs["custom-publish-status"] || "draft"
      // if (publishStatus == "secret") {
      //     isPublished = false;
      // }
      //
      // // 访问密码
      // const postPassword = attrs["custom-publish-password"] || ""

      // 文章别名
      const customSlug = attrs["custom-slug"] || ""

      let title = siyuanPost.content || ""
      title = this.htmlUtil.removeTitleNumber(title)

      // 适配公共属性
      const commonPost = new Post()
      commonPost.postid = siyuanPost.root_id
      commonPost.title = title
      commonPost.permalink = customSlug == "" ? "/post/" + siyuanPost.root_id : "/post/" + customSlug + ".html"
      // commonPost.isPublished = isPublished
      // commonPost.mt_keywords = attrs.tags || ""
      result.push(commonPost)
    }

    return Promise.resolve(result)
  }

  public async getPost(postid: string, useSlug?: boolean): Promise<any> {
    let pid = postid
    if (useSlug) {
      const pidObj: any = await this.siyuanServerApi.getBlockBySlug(postid)
      if (pidObj) {
        pid = pidObj.root_id
      }
    }
    const siyuanPost: any = await this.siyuanServerApi.getBlockByID(pid)
    if (!siyuanPost) {
      throw new Error("文章不存存在，postid=>" + pid)
    }

    const attrs: any = await this.siyuanServerApi.getBlockAttrs(pid)
    const md: any = await this.siyuanServerApi.exportMdContent(pid)

    // 发布状态
    let isPublished = true
    const publishStatus = attrs["custom-publish-status"] || "draft"
    if (publishStatus == "secret") {
      isPublished = false
    }

    // 访问密码
    const postPassword = attrs["custom-post-password"] || ""

    // 访问密码
    const shortDesc = attrs["custom-desc"] || ""

    // 渲染Markdown
    let html = this.markdownUtil.renderHTML(md.content)
    // 移除挂件html
    html = this.htmlUtil.removeWidgetTag(html)

    let title = siyuanPost.content || ""
    title = this.htmlUtil.removeTitleNumber(title)

    // 适配公共属性
    const commonPost = new Post()
    commonPost.postid = siyuanPost.root_id || ""
    commonPost.title = title
    commonPost.description = html || ""
    commonPost.shortDesc = shortDesc || ""
    commonPost.mt_keywords = attrs.tags || ""
    commonPost.isPublished = isPublished
    commonPost.wp_password = postPassword
    // commonPost.dateCreated

    return commonPost
  }
}

export default SiYuanApiAdaptor
