import React from 'react';
import introMd from './intro.md';

export default () => (
  <div
    style={{ lineHeight: '2.5rem' }}
    dangerouslySetInnerHTML={{ __html: introMd }}
  />
);
