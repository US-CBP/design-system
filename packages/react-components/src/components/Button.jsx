import PropTypes from 'prop-types';

export const Button = ({ attributes, children, 'aria-label': ariaLabel, disabled, }) => {
  return (
    <button
      className="cbp-btn cbp-btn__primary"
      aria-label={ariaLabel}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  attributes: PropTypes.object,
  'aria-label': PropTypes.string,
  disabled: PropTypes.bool,
};