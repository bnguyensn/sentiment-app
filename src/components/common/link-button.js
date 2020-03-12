import React from 'react';
import { Link } from 'gatsby';
import './link-button.css';

const LinkButton = ({ children, to, ...rest }) => {
  return (
    <Link to={to}>
      <div className="button-ctn" role="button" tabIndex={0} {...rest}>
        {children}
      </div>
    </Link>
  );
};

export default LinkButton;
