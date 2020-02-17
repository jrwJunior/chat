import React from 'react';

export default props => {
  return (
    <button
      className='ant-btn button-emoji'
      { ...props }
    >
      <svg height="24px" width="24px" viewBox="0 0 26 26">
        <g fill="none" fillRule="evenodd">
          <polygon points="0,26 26,26 26,0 0,0 "/>
          <path d="m19.1311,16.73095c-0.4325,-0.3545 -1.0775,-0.302 -1.441,0.122c-1.171,1.3615 -2.883,2.142 -4.697,2.142c-1.8135,0 -3.526,-0.7805 -4.697,-2.142c-0.363,-0.4225 -1.008,-0.4765 -1.441,-0.122c-0.432,0.355 -0.488,0.986 -0.1245,1.408c1.5605,1.8145 3.8435,2.855 6.2625,2.855c2.4195,0 4.702,-1.0405 6.2625,-2.855c0.3635,-0.422 0.3075,-1.053 -0.1245,-1.408m-2.1355,-7.731c-0.9375,0 -1.5,0.75 -1.5,2c0,1.25 0.5625,2 1.5,2c0.9375,0 1.5,-0.75 1.5,-2c0,-1.25 -0.5625,-2 -1.5,-2m-8,0c-0.9375,0 -1.5,0.75 -1.5,2c0,1.25 0.5625,2 1.5,2c0.9375,0 1.5,-0.75 1.5,-2c0,-1.25 -0.5625,-2 -1.5,-2m4.0045,16c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.6275,0 12,5.3725 12,12c0,6.6275 -5.3725,12 -12,12" fill="#0099ff"/>
        </g>
      </svg>
    </button>
  )
}