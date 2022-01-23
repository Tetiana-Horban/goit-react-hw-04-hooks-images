import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWrapper>{children}</ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  onClick: PropTypes.func,
};
export default Modal;
