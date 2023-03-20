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

import IBlogApi from "~/src/blog-api/IBlogApi"
import Env from "zhi-env"
import BLOG_API_TYPE_CONSTANTS from "~/src/blog-api/constants/blogApiTypeConstants"
import SiYuanApiAdaptor from "~/src/blog-api/adaptor/siyuan/siYuanApiAdaptor"
import Post from "~/src/blog-api/models/post"
import UserBlog from "~/src/blog-api/models/userBlog"

/**
 * 博客API
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class BlogApi implements IBlogApi {
  private readonly type: string
  private readonly apiAdaptor: IBlogApi

  /**
   * 博客API版本号
   */
  public readonly VERSION

  /**
   * 初始化博客 API
   *
   * @param type 博客类型
   * @param env 环境变量，注意：环境变量会在配置对象失效时候生效
   * @param cfg 对应博客的配置，例如：SiyuanConfig
   */
  constructor(type: string, env: Env, cfg: any) {
    this.VERSION = "1.0.0"

    this.type = type
    switch (this.type) {
      case BLOG_API_TYPE_CONSTANTS.API_TYPE_SIYUAN:
        this.apiAdaptor = new SiYuanApiAdaptor(env, cfg)
        break
      default:
        this.apiAdaptor = new SiYuanApiAdaptor(env, cfg)
        break
    }
  }

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    return this.apiAdaptor.getRecentPosts(numOfPosts, page, keyword)
  }

  /**
   * 博客配置列表
   */
  async getUsersBlogs(): Promise<Array<UserBlog>> {
    return this.apiAdaptor.getUsersBlogs()
  }

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   */
  getPost(postid: string, useSlug?: boolean): Promise<Post> {
    return this.apiAdaptor.getPost(postid, useSlug)
  }
}

export default BlogApi
