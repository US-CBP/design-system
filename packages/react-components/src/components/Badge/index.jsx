import PropTypes from 'prop-types';

const Badge = ({ label }) => <div class="cbp-badge">{label}</div>;

Badge.propTypes = {
  label: PropTypes.string,
};

export default Badge;
