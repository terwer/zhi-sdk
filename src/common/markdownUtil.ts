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

import Showdown from "showdown"

/**
 * Markdown渲染引擎枚举
 *
 * @public
 * @author terwer
 * @since 1.1.0
 */
export enum MarkdownRenderTypeEnum {
  /**
   * 使用 lute 渲染引擎
   */
  RenderType_Lute = "lute",
  /**
   * 使用 showdown 渲染引擎
   */
  RenderType_Showdown = "showdown",
}

/**
 * Markdown渲染公共方法
 *
 * @public
 */
class MarkdownUtil {
  private readonly converter

  constructor(renderType?: MarkdownRenderTypeEnum) {
    const type = renderType ?? MarkdownRenderTypeEnum.RenderType_Showdown

    if (type == MarkdownRenderTypeEnum.RenderType_Showdown) {
      this.converter = new Showdown.Converter()
    } else {
      // TODO lute
      this.converter = new Showdown.Converter()
    }
  }

  /**
   * 渲染Markdown
   * @param md - markdown
   */
  public renderHTML(md: string) {
    return this.converter.makeHtml(md)
  }
}

export default MarkdownUtil
