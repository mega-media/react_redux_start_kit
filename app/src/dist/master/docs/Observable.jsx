import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import observableMd from './observable.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 redux-observable</h5>
      <h5>☆ 核心思想 - Epic</h5>
      <h5>☆ 如何在專案中使用</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{observableMd}</MarkdownToHtml>
};
