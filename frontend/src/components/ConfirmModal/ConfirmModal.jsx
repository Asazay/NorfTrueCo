import './Confirm.css'
import { useModal } from "../../context/modal.js";
import { useDispatch } from 'react-redux';

function ConfirmModal({title, question, bodyTxt, confirmTxt, cancelTxt, modalFunction,}){
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleConfirm = (e = null) => {
        e.preventDefault();
        modalFunction(true)
        closeModal()
    }

    return (
        <div id='confirmModal'>
            <div><h1>{title}</h1></div>
            <div><h3>{question}</h3></div>
            {bodyTxt && <div><p style={{fontSize: 'small'}}>{bodyTxt}</p></div>}
            <div class='choiceDiv'>
                <div id='choiceBtn'><button id="confirmBtn" onClick={e => handleConfirm(e)}>{confirmTxt}</button></div>
                <div id='choiceBtn'><button id="cancelBtn" onClick={closeModal}>{cancelTxt}</button></div>
            </div>
        </div>
    )
}

export default ConfirmModal;