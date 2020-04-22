import React from 'react';
import PropTypes from 'prop-types';

const ImgWithFallback = ({
  src,
  fallback,
  type = 'image/webp',
  ...rest
}) => {
  return (
    <picture className='drawing'>
      <source srcSet={src} type={type} />
      {/* eslint-disable-next-line */}
      <img src={fallback} {...rest} />
    </picture>
  );
};

ImgWithFallback.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.string,
  type: PropTypes.string
}

export default ImgWithFallback;