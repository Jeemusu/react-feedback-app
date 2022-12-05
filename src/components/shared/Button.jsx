import PropTypes from 'prop-types';

function Button({ children, version, isDisabled }) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`btn btn-${version}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: 'primary',
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
