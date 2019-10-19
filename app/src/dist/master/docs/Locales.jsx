import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import localeMd from './locales.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 語系轉換函式</h5>
      <h5>☆ 語系切換操作</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{localeMd}</MarkdownToHtml>
};
