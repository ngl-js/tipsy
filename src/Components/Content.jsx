import React, { useCallback, useState } from 'react';
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
// import imageResize from 'image-resize';
import FileResizer from 'react-image-file-resizer';
import Modal from './Modal';
// Services
import { useAxios } from '../hooks/useAxios';
import { getImageMerged } from '../services/http';

const Content = () => {
  // const selectedFile = useRef();

  // const [selectedImg, setSelectedImg]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    getData: selectedImg,
    setGetData: setSelectedImg,
    isLoading,
    error 
  } = useAxios( sendToMerge, undefined );
  // const [selectedFrame, setSelectedFrame]= useState([]);
  const sendToMerge=  useCallback( async function sendToMerge(e) {
    const files = e.target.files;

    let data= new FormData();
    data.append('photo', files[0])
    data.append('frame', 'hb4')

    const req= await getImageMerged(data);
    const blob= await fetch(req.b64).then((res)=> {
      return res.blob()
    })
    let file = new File([blob], "mimomento.jpg", {type: 'image/jpeg'});
    let filesArray = [file];

    setSelectedImg(
      (filesArray.length !== 0) ? 
      {files:filesArray, blob:URL.createObjectURL(file)} :
      undefined
    )

    setModalIsOpen(true);
  }, [selectedImg, setSelectedImg])

  
  const shareBtn= ()=> {
    if ("share" in navigator) {
      navigator
        .share({
          files: selectedImg.files,
          title: "Images",
          text: "Mi foto en Tipsy"
        })
        .then(() => {
          console.log("Callback after sharing");
        })
        .catch((err)=> {
          console.error(err)
          canvas.textContent = `Error: ${err.message}`;
        });
    } else {
      let random= Math.floor(Math.random()*10)
      const linkElement = document.createElement('a')
      linkElement.download = `image-${random}.jpg`
      linkElement.href = selectedImg.blob
      linkElement.click()
    }

    setModalIsOpen(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-auto p-10 justify-center mt-[35%]">
        {/* capturar imagen */}
        <div className='py-10 p-2 m-0 flex justify-center'>
          <button 
            className="text-white rounded-full border-0 text-center
              bg-gradient-to-r from-purple-600 to-amber-600
              font-medium text-sm py-3 px-10 w-[70%]
              dark:hover:bg-purple-300 focus:outline-none
              dark:focus:ring-purple-500 uppercase
              hover:cursor-pointer hover:opacity-80 max-w-sm
              flex self-center">
            <FaStar className='mx-2' size={"1.3rem"} />
            Calidficanos
          </button>
        </div>
        
        <div className='py-10 p-2 m-0 flex justify-center'>
          <label 
            htmlFor="takeimg"
            className="text-sm text-grey-500 text-center
              py-3 px-10 text-wrap w-[70%]
              rounded-full border-0 uppercase
              font-semibold  text-white
              bg-gradient-to-r from-purple-600 to-amber-600
              hover:cursor-pointer hover:opacity-80 max-w-sm
              flex self-center
            ">
            <MdAddAPhoto className='mx-2' size={"1.1rem"} />
            tomar foto
          </label>
          <input 
            id='takeimg'
            type="file" 
            accept='image/*'
            className='hidden'
            capture="environment" 
            onChange={(event)=> {sendToMerge(event)}}
          />
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        shareBtn={shareBtn}
        onClose={()=>{ setModalIsOpen(false) }}>
        <div className="flex justify-center">
          {selectedImg 
          && (
            <img 
              id='foto'
              src={selectedImg.blob}
              width={400}
              height={400}
              className='max-h-[70vh] object-contain mb-5'
              alt="Imagen seleccionada" 
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default Content;
