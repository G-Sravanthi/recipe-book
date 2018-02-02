import React from 'react'
import classes from './Modal.css'

const Modal = (props) => {
  return (
    <div className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.header}</h5>
            <button type="button" onClick={props.close} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
