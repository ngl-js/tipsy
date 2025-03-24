import React, { useContext } from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';
// icons
import { MdShare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
// Components
import Button from './Button';
// Context
import { MediaContext } from '../context/MediaContext';

export default function Modal({ 
  shareBtn, 
  onPhotoBtnClick,
  inputFileRef,
  sendToMerge,
  children 
}) {

  const { 
      selectedImg, 
      selectedFrame,
      selectedAudio,
      modalIsOpen,
      closeModal
  }= useContext(MediaContext)

  let gapping= (selectedImg && selectedAudio);
  let animation='jumpMe';

  if (!modalIsOpen) return null;

  return createPortal(
    <div className={`modal`}>
      <div className={`modal-container rounded-lg ${animation}`}>
        <div className='grid grid-cols-1'>
          <div className=' row-end-1 flex justify-end'>
            <button
              className='inline-flex items-center border-2
               border-orange-300 rounded-lg text-gray-500
               text-sm px-1 fadeMe'
              onClick={closeModal}>
              <IoMdClose className='mr-0' size={"1.3rem"} />
            </button>
          </div>
          <div  className='modal-body'>
            {modalIsOpen ? children : null}
          </div>

          <div 
            className={`grid grid-cols-${gapping ? '2':'1'} gap-4`}>
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
                handleOnClick={shareBtn}>
                  <MdShare className='mr-2' size={"1.3rem"} />
                  Compartir
              </Button>
            </div>)}

          </div>
          
        </div>
      </div>
    
    </div>
    , document.getElementById('modal')
  )
}
