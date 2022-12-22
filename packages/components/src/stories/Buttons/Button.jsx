import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Button is a common interactive component used to submit forms and display an action
 * 
 * - *Ghost* states are available
 * - **Call-to-Action** button is used to sway users to an immediate action
 */
export const Button = ({ label, type, ...props }) => {
  return (
    <button
      type="button"
      className={`cbp-btn ${type}`}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Button type
   */
  type: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'cbp-btn__primary',
  onClick: undefined,
};
