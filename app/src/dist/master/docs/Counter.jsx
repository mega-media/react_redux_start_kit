import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import counterMd from './counter.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 Redux</h5>
      <h5>☆ 使用 Container HOC</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{counterMd}</MarkdownToHtml>
};
