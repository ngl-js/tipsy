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
  sendToMerge,
  setType,
  children 
}) {
  if (!isOpen) return null;
  return createPortal(
    <div className='modal'>
      <div className='modal-container'>
        <div className='grid grid-cols-1'>
          <div  className='modal-body'>
            {isOpen ? children : null}
          </div>

          {!selectedImg && (
          <div className="flex items-center mb-4 ml-2">
            <input onClick={setType}
              id="default-checkbox" type="checkbox" defaultValue 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm
              focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
              focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label 
                htmlFor="default-checkbox" 
                className="ms-2 text-sm font-medium
              text-gray-900 dark:text-dark-300">
                Incluir musica
              </label>
          </div>)}

          <div className='grid grid-cols-2'>
            {(!selectedFrame || !selectedImg) &&
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

            {selectedImg &&
            (<div className='flex justify-center'>
              <Button 
                role="button" 
                styl="animate-pulse ease-out duration-300"
                handleOnClick={shareBtn}>
                  <MdShare className='mr-2' size={"1.3rem"} />
                  Compartir
              </Button>
            </div>)}

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
