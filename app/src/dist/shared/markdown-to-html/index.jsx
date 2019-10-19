import React from 'react';

export default ({ children }) => {
  return (
    <div
      style={{ lineHeight: '2.5rem' }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
