import Showdown from "showdown"

/**
 * Markdown渲染引擎枚举
 *
 * @author terwer
 * @since 1.1.0
 */
enum MarkdownRenderTypeEnum {
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
   * @param md
   */
  public renderHTML(md: string) {
    return this.converter.makeHtml(md)
  }
}

export default MarkdownUtil
