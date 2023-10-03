import PropTypes from 'prop-types';

export const Badge = ({ label }) => <div className="cbp-badge">{label}</div>;

Badge.propTypes = {
  label: PropTypes.string,
};