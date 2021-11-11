import React from 'react';

import './Avatar.css';

const Avatar = props => {
  // console.log(`${process.env.REACT_APP_BACKEND_URL_PUBLIC}/${props.image}`);
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}/${props.image}`}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
