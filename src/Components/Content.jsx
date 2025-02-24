import React, { useState } from 'react';
import mergeImages from 'merge-images';
import hb3 from '../assets/img/hb4.png'
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
// import imageResize from 'image-resize';
import FileResizer from 'react-image-file-resizer';
import Modal from './Modal';

const resizeFile = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1000,
      1600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob',
      1000
    );
  });

const Content = () => {
  const [selectedImg, setSelectedImg]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedFrame, setSelectedFrame]= useState([]);

  const getImg= async (e)=> {
    const files= e.target.files;

    // const options = {
    //   format: 'png',
    //   width: 1000,
    //   height: 1800,
    //   outputType: 'blob'
    // };
    // let resizedImg = await imageResize(files[0], options)
    
    const resizedImg = await resizeFile(files[0]);
    console.log(`Rezice: ${resizedImg}`);
        
    const b64= await mergeImages([
      { src: URL.createObjectURL(resizedImg), x: 70, y: 200 },
      { src: hb3, x: 0, y: 0 }
    ])
    const blob= await fetch(b64).then((res)=> {
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
  }

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
            onChange={(event)=> {getImg(event)}}
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
