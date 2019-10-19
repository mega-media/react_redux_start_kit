import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import hocMd from './hoc.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 高階組件(Higher-Order Components)</h5>
      <h5>☆ 組合系統中的高階組件</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{hocMd}</MarkdownToHtml>
};
