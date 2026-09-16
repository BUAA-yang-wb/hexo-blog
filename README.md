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

## 隐藏文章（线上不发布）

在文章开头的 front matter 里加一行 `hidden: true`，这篇文章就不会出现在线上站点：

```yaml
---
date: 2026-06-12 12:00:00
title: 文章标题
tags: [Agent]
hidden: true
---
```

- 默认（不写，或写 `hidden: false`）正常显示，行为不变。
- 打了标记的文章**不生成任何页面**：首页、`/posts/`、归档、标签、分类、搜索索引里都不存在，直接访问原链接也会 404。
- 只被隐藏文章使用的标签/分类会一并从标签页、分类页移除，不会留下空页面。
- 实现见 `scripts/hidden-posts.js`（Hexo 站点级脚本，未改动主题与任何文章正文），删除该文件即可整体回退。
- 本地新增或取消标记后请重新完整构建：`pnpm run clean && pnpm run build`。`hexo generate` 不会自动清理 `public/` 中的旧文件；GitHub Actions 每次都是干净构建，不受影响。
- 注意：该开关只控制“线上是否发布”，文章源码本身仍在公开仓库的 `source/_posts/` 目录中。
