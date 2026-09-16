/* global hexo */

'use strict';

/**
 * 隐藏文章开关（front-matter）
 *
 * 用法：在文章开头的 front-matter 里加一行 `hidden: true`
 *   ---
 *   date: 2026-06-12 12:00:00
 *   title: xxx
 *   tags: [Agent]
 *   hidden: true
 *   ---
 *
 * 效果：该文章不会生成任何页面（首页 / 文章列表 / 归档 / 标签 / 分类 / 直链全部不可见），
 *       默认（不写或写 false）仍然正常显示。
 *
 * 原理：Hexo 所有“文章列表”都来自 `hexo.locals` 的 `posts` getter
 *       （dist/hexo/index.js 中 = db.model('Post').find({ date, published })）。
 *       这里在 before_generate 阶段把该 getter 包一层过滤，从源头摘掉隐藏文章，
 *       因此文章页生成器、index/archive/tag/category 生成器、主题自带生成器、
 *       模板里的 `site.posts` 以及 Tag/Category 的 `.posts` 虚字段会同时生效。
 */

const FLAG = 'hidden';

const isHidden = post => post[FLAG] === true;

// 模块加载时抓一份 Hexo 原始 getter，之后每次生成都基于它重新包一层（幂等，不会有嵌套叠加）
const basePosts = hexo.locals.getters && hexo.locals.getters.posts;
const baseTags = hexo.locals.getters && hexo.locals.getters.tags;
const baseCategories = hexo.locals.getters && hexo.locals.getters.categories;

function visiblePosts() {
  if (typeof basePosts === 'function') {
    // 直接复用 Hexo 的查询，自动继承 future / render_drafts / --drafts 的既有语义
    return basePosts().filter(post => !isHidden(post));
  }

  // 兜底：万一 Hexo 内部结构变化取不到原始 getter，则显式重建同样的查询条件
  hexo.log.warn('[hidden-posts] 未能取得 hexo.locals 的原始 posts getter，使用兜底查询。');
  const query = { [FLAG]: { $ne: true } };
  if (!hexo.config.future) query.date = { $lte: Date.now() };
  if (!hexo._showDrafts()) query.published = true;
  return hexo.database.model('Post').find(query);
}

hexo.extend.filter.register('before_generate', () => {
  hexo.locals.set('posts', visiblePosts);

  // Tag.length / Category.length 统计的是关联表条数，不看隐藏状态：
  // 若某个标签/分类只被隐藏文章使用，会残留一个没有内容的空页面，这里一并过滤掉。
  if (typeof baseTags === 'function') {
    hexo.locals.set('tags', () => baseTags().filter(tag => tag.posts.length > 0));
  }
  if (typeof baseCategories === 'function') {
    hexo.locals.set('categories', () => baseCategories().filter(category => category.posts.length > 0));
  }
});
