import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import buttonsMd from './buttons.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 套用系統樣式檔</h5>
      <h5>☆ Action 其他格式</h5>
      <h5>☆ 認識 Store 支援的存取格式 </h5>
    </div>
  ),
  desc: <MarkdownToHtml>{buttonsMd}</MarkdownToHtml>
};
