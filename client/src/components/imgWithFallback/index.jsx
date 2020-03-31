import React from 'react';

const ImgWithFallback = ({
  src,
  fallback,
  type = 'image/webp',
  ...rest
}) => {
  return (
    <picture className='foo'>
      <source srcSet={src} type={type} />
      {/* eslint-disable-next-line */}
      <img src={fallback} {...rest} />
    </picture>
  );
};

export default ImgWithFallback;