import { getSideBar } from "vitepress-plugin-autobar"
export default {
  title: "zhi-sdk", // 设置网站标题
  description: "a simple sdk for siyuan-note, blog, and more",
  base: "/", // 设置站点根路径
  outDir: "./.vitepress/dist", // 设置输出目录
  repo: "https://github.com/terwer/zhi-sdk", // 添加 git 链接
  markdown: {
    toc: { includeLevel: [2, 3] },
  },
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: "Home",
        link: "/",
        target: "_self",
      },
    ],
    sidebar: getSideBar("./docs", {
      ignoreMDFiles: ["index"],
    }),
  },
}
