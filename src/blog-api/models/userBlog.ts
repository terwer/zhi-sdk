/**
 * 博客信息定义
 */
class UserBlog {
  blogid: string
  url: string
  blogName: string
  isAdmin?: boolean
  xmlrpc?: string

  constructor() {
    this.blogid = ""
    this.url = ""
    this.blogName = ""
  }
}

export default UserBlog
