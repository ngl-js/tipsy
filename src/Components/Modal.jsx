import React from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ isOpen, children, shareBtn, onClose }) {
  if (!isOpen) return null;
  return createPortal(
    <div className='modal'>
      <div className='modal-container'>
        <div className='grid grid-cols-1'>
          <div  className='modal-body'>
            {isOpen ? children : null}
          </div>
          <div className='grid grid-cols-2 justify-center'>
            <div>
              <button 
                role="button" 
                onClick={shareBtn}
                className="border rounded-full w-[90%]
                bg-gradient-to-r from-purple-600 to-blue-600
                dark:hover:bg-blue-300 focus:outline-none
                text-white text-sm px-3 py-2">
                <b>Compartir</b>
              </button>
            </div>

            <div>
              <button 
                onClick={onClose}
                className='border rounded-full w-[90%]
                bg-gradient-to-r from-purple-400 to-blue-300
                dark:hover:bg-blue-300 focus:outline-none
                text-white text-sm px-3 py-2'>
                  Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    , document.getElementById('modal')
  )
}
