import React from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';
// icons
import { MdShare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
// Components
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  shareBtn, 
  onPhotoBtnClick,
  inputFileRef,
  selectedImg,
  selectedFrame,
  selectedAudio,
  sendToMerge,
  children 
}) {

  let animation='jumpMe';
  if (!isOpen) return null;
  return createPortal(
    <div className={`modal`}>
      <div className={`modal-container rounded-lg ${animation}`}>
        <div className='grid grid-cols-1'>
          <div  className='modal-body'>
            {isOpen ? children : null}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {selectedAudio &&
            (<div className='flex justify-center'>
              <Button
                handleOnClick={onPhotoBtnClick}>
                  <MdAddAPhoto className='mr-2' size={"1.3rem"} />
                  Tomar foto
              </Button>
              <input 
                ref={inputFileRef}
                type="file" 
                accept='image/*'
                className='hidden'
                capture="environment" 
                onChange={sendToMerge}
                disabled={!selectedFrame}
              />
            </div>)}

            {(selectedImg && selectedAudio) &&
            (<div className='flex justify-center'>
              <Button 
                role="button" 
                styl="animate-pulse ease-out duration-300"
                handleOnClick={shareBtn}>
                  <MdShare className='mr-2' size={"1.3rem"} />
                  Compartir
              </Button>
            </div>)}

            {selectedAudio && 
            (<div className='flex justify-center'>
              <Button 
                handleOnClick={onClose}>
                  <IoMdClose className='mr-2' size={"1.3rem"} />
                  Cerrar
              </Button>
            </div>)}
          </div>
          
        </div>
      </div>
    
    </div>
    , document.getElementById('modal')
  )
}
