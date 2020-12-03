import React from 'react';
import './modal.sass'
export default function Modal({action}) {
    return(
        <div className="modal_wrapper">
            <div className="modal_container">
                <h2 className="modal_container_item">Congratualations</h2>
                <p className="modal_container_item">You have successfully passed registration</p>
                <div className="modal_container_item button_wrapper">
                    <button onClick={() => action()} className="close_modal">Great</button>
                </div>
                <div onClick={() => action()} className="close_cross close_modal">X</div>
            </div>
        </div>
    )
}