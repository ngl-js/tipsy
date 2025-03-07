import React from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';
// icons
import { MdShare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
// Components
import Button from './Button';

export default function Modal({ isOpen, children, shareBtn, onClose }) {
  if (!isOpen) return null;
  return createPortal(
    <div className='modal'>
      <div className='modal-container'>
        <div className='grid grid-cols-1'>
          <div  className='modal-body'>
            {isOpen ? children : null}
          </div>
          <div className='grid grid-cols-2'>
            <div className='flex justify-center'>
              <Button 
                role="button" 
                handleOnClick={shareBtn}>
                  <MdShare className='mr-2' size={"1.3rem"} />
                  Compartir
              </Button>
            </div>

            <div className='flex justify-center'>
              <Button 
                handleOnClick={onClose}>
                  <IoMdClose className='mr-2' size={"1.3rem"} />
                  Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    , document.getElementById('modal')
  )
}
