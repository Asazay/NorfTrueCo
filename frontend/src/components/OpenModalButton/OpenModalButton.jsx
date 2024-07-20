import React from 'react';
import { useModal } from '../../context/modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  openFunction, // optional: function to be used with onClick() to determine whether to continue or not
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if(openFunction){
      if(openFunction() === true) return
    }
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <button onClick={onClick}>{itemText}</button>
  );
}

export default OpenModalButton;