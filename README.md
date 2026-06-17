# Think.Code.Live.

这是我的个人博客源码仓库，基于 Hexo 构建，并通过 GitHub Pages 自动部署。

访问地址：[https://buaa-yang-wb.github.io/hexo-blog/](https://buaa-yang-wb.github.io/hexo-blog/)

## 内容方向

当前博客以学习记录和工程实践笔记为主，已整理 34 篇文章，主要标签分布如下：

| 模块 | 内容概览 |
| --- | --- |
| 深度学习 | 系统学习神经网络、优化算法、向量化、卷积网络、循环网络、Transformer 等基础与模型结构。 |
| RAG | 围绕检索增强生成的学习笔记、实现思路和相关工程模块记录。 |
| Agent | 记录 Agent 基础模块、系统提示词、交互流程和工具调用相关内容。 |
| CNN | 卷积神经网络、深度卷积模型、目标检测、人脸识别和风格迁移等专题。 |
| RNN | 循环神经网络、序列模型和注意力机制相关学习记录。 |
| Codex | Codex 安装、桌面端使用和工具链体验记录。 |
| Claude Code | Claude Code 命令行版安装与使用记录。 |
| 学习杂谈 | 建站记录、阶段性随笔和学习过程中的零散思考。 |

## 项目结构

- `source/_posts/`：博客文章 Markdown 源文件。
- `source/images/`：文章配图资源。
- `themes/hexo-theme-sea/`：当前使用的 Hexo 主题。
- `.github/workflows/pages.yml`：GitHub Pages 自动构建与部署流程。
- `_config.yml`：Hexo 站点配置。

## 技术栈与部署

- 静态站点生成器：Hexo 7
- 包管理器：pnpm
- 主题：hexo-theme-sea
- 部署平台：GitHub Pages
- 部署方式：推送到 `main` 后由 GitHub Actions 构建并发布 `public/`

站点配置为 GitHub Pages 项目站点路径：

```yaml
url: https://buaa-yang-wb.github.io/hexo-blog
root: /hexo-blog/
```

## 本地开发

```bash
pnpm install --frozen-lockfile
pnpm run server
```

生成静态文件：

```bash
pnpm run clean
pnpm run build
```
