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

import { version } from "~/package.json"
import LogFactory, { DefaultLogger } from "zhi-log"
import Env from "zhi-env"
import SdkConfig from "~/src/SdkConfig"

/**
 * 思源笔记服务端API v2.0.27
 * https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanServerApi {
  /**
   * 思源笔记服务端API版本号
   */
  public readonly VERSION
  private readonly env: Env
  private readonly logger: DefaultLogger

  constructor(env?: Env) {
    this.env = env ?? new Env({})
    this.VERSION = version
    this.logger = LogFactory.defaultLogger(this.env, SdkConfig.LOG_STACK_SIZE)
  }

  /**
   * 分页获取根文档
   *
   * @param page - 页码
   * @param pagesize - 数目
   * @param keyword - 关键字
   */
  public async getRootBlocks(page: number, pagesize: number, keyword: string) {
    const stmt = `SELECT b.content, tmp.root_id
                FROM (SELECT DISTINCT root_id
                      FROM blocks
                      WHERE 1 = 1
                        AND content LIKE '%${keyword}%'
                      ORDER BY created DESC LIMIT ${page}, ${pagesize}) tmp,
                     blocks b
                WHERE tmp.root_id = b.root_id
                  AND b.parent_id = ''
                ORDER BY b.created DESC`
    return await this.sql(stmt)
  }

  /**
   * 获取块属性
   *
   * @param blockId - blockId
   */
  public async getBlockAttrs(blockId: string) {
    const data = {
      id: blockId,
    }
    const url = "/api/attr/getBlockAttrs"
    return this.siyuanRequest(url, data)
  }

  /**
   * 设置块属性
   *
   * @param blockId - blockId
   * @param attrs - 属性
   */
  public async setBlockAttrs(blockId: string, attrs: any) {
    const url = "/api/attr/setBlockAttrs"
    return this.siyuanRequest(url, {
      id: blockId,
      attrs: attrs,
    })
  }

  /**
   * 以id获取思源块信息
   *
   * @param blockId - 内容块ID
   */
  public async getBlockByID(blockId: string) {
    const stmt = `select *
                from blocks
                where id = '${blockId}'`
    const data = await this.sql(stmt)
    return data[0]
  }

  /**
   * 以slug获取思源块信息
   *
   * @param slug - 内容块别名
   */
  public async getBlockBySlug(slug: string) {
    const stmt = `select root_id from attributes 
               where name='custom-slug' and value='${slug}' 
               limit 1`
    const data = await this.sql(stmt)
    return data[0]
  }

  /**
   * 导出markdown文本
   *
   * @param docId - 文档id
   */
  public async exportMdContent(docId: string) {
    const data = {
      id: docId,
    }
    const url = "/api/export/exportMdContent"
    return this.siyuanRequest(url, data)
  }

  /**
   * 向思源请求数据
   *
   * @param url - url
   * @param data - 数据
   * @param method - 请求方法 GET | POST
   * @param useToken - 权限TOKEN
   */
  private async siyuanRequest(url: string, data: any, method?: string, useToken?: boolean) {
    if (this.env.getStringEnv("VITE_SIYUAN_API_URL") != "") {
      url = this.env.getStringEnv("VITE_SIYUAN_API_URL") + url
    }

    let m = "POST"
    if (method) {
      m = method
    }

    const fetchOps = {
      body: JSON.stringify(data),
      method: m,
    }
    if (useToken != false) {
      Object.assign(fetchOps, {
        headers: {
          Authorization: `Token ${this.env.getStringEnv("VITE_SIYUAN_AUTH_TOKEN")}`,
        },
      })
    }

    this.logger.debug("向思源请求数据，url=>", url)
    this.logger.debug("向思源请求数据，fetchOps=>", fetchOps)
    const response = await fetch(url, fetchOps)
    const result = await response.json()
    this.logger.debug("向思源请求数据，result=>", result)
    return result.code === 0 ? result.data : null
  }

  /**
   * 以sql发送请求
   *
   * @param sql - sql
   */
  private async sql(sql: string) {
    const sqldata = {
      stmt: sql,
    }
    const url = "/api/query/sql"
    return this.siyuanRequest(url, sqldata)
  }
}

export default SiyuanServerApi
