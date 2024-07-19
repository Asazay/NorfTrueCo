import React from 'react';
import { useModal } from '../../context/modal';

function OpenModalNavItem({
  modalComponent, // component to render inside the modal
  iconEl, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <button disabled={window.location.href === '/checkout'} onClick={onClick}>{iconEl}</button>
  );
}

export default OpenModalNavItem;