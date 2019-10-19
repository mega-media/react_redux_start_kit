import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import styleMd from './styles.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 套用自訂樣式檔</h5>
      <h5>☆ 使用外部檔案</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{styleMd}</MarkdownToHtml>
};
