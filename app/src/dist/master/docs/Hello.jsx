import React from 'react';
import MarkdownToHtml from '../../shared/markdown-to-html';
import helloMd from './hello.md';

module.exports = {
  target: (
    <div>
      <h5>☆ 建構簡易React Element</h5>
    </div>
  ),
  desc: <MarkdownToHtml>{helloMd}</MarkdownToHtml>
};
