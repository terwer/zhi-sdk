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
 * HTML 工具类
 *
 * @public
 * @author terwer
 * @since .1.0
 */
class HtmlUtil {
  /**
   * 移除标题数字
   *
   * @param str - 标题
   */
  public removeTitleNumber(str: string): string {
    let newstr = str

    // 移除序号
    const publisherRegex = /([0-9]*)\./
    newstr = newstr.replace(publisherRegex, "")

    return newstr
  }

  /**
   * 删除挂件的HTML
   * @param str - 原字符
   */
  public removeWidgetTag(str: string): string {
    let newstr = str.toString()

    // 旧版发布挂件
    const publisherRegex = /<iframe.*src="\/widgets\/publisher.*<\/iframe>/g
    newstr = newstr.replace(publisherRegex, "")

    // 新版发布挂件
    const syPublisherRegex = /<iframe.*src="\/widgets\/sy-post-publisher.*<\/iframe>/g
    newstr = newstr.replace(syPublisherRegex, "")

    // 文章属性挂件
    const noteAttrRegex = /<iframe.*\/widgets\/Note*\sAttrs.*\/iframe>/g
    newstr = newstr.replace(noteAttrRegex, "")

    return newstr
  }
}

export default HtmlUtil
