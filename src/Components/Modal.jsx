import { useContext } from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';
// icons
import { IoMdClose } from "react-icons/io";
// Context
import { MediaContext } from '../context/MediaContext';

export default function Modal({ children }) {

  const { 
    modalIsOpen,
    closeModal
  }= useContext(MediaContext)

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
          <div className='modal-body h-[72vh]'>
            {modalIsOpen ? children : null}
          </div>
        </div>
      </div>
    </div>, 
    document.getElementById('modal')
  );
}
