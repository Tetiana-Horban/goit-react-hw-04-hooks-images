import ButtonLoader from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <ButtonLoader type="button" onClick={onClick}>
      Load more
    </ButtonLoader>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
