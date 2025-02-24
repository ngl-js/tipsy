import React, { useState } from 'react';
import mergeImages from 'merge-images';
import hb3 from '../assets/img/hb4.png'
// import { readAndCompressImage } from 'browser-image-resizer';
// import imageResize from 'image-resize';
import FileResizer from 'react-image-file-resizer';



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
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 ml-3 mt-[-30px]">
        <div className="col-span-2 text-center h-[calc(100dvh-25dvh)]">
          {selectedImg 
          && (
            <>
              <img 
                id='foto'
                src={selectedImg.blob}
                width={400}
                height={400}
                className='max-h-[70vh] object-contain mb-5'
                alt="Imagen seleccionada" 
              />

              <a 
                role="button" 
                onClick={shareBtn}
                className="border rounded-full absolute top-[70vh] right-[35%]
                bg-gradient-to-r from-blue-600 to-purple-600
                dark:hover:bg-blue-300 focus:outline-none
                dark:focus:ring-blue-500
                text-white text-sm px-3 py-2
              ">
                <b>Compartir</b>
              </a>

              {/* <div className='grid grid-cols-3 mt-5 ml-3'>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img id="hb1" className="rounded-t-lg" src={hb1} alt="hb1" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Happy Birthday
                      </h5>
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Seleccionar
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div> */}
            </>
          )}
        </div>
        {/* capturar imagen */}
        <div className='py-10 p-4 m-0'>
          <a 
            href='#'
            className="text-white rounded-full border-0
              bg-gradient-to-r from-purple-600 to-amber-600
              font-medium text-sm py-3 px-10
              dark:hover:bg-purple-300 focus:outline-none
              dark:focus:ring-purple-500
              hover:cursor-pointer hover:opacity-80 max-w-sm">
            Calidficanos
          </a>
        </div>
        
        <div className='py-10 p-2 m-0'>
          <label 
            htmlFor="takeimg"
            className="text-sm text-grey-500
              py-3 px-10 text-wrap
              rounded-full border-0
              font-semibold  text-white
              bg-gradient-to-r from-purple-600 to-amber-600
              hover:cursor-pointer hover:opacity-80 max-w-sm
            ">
            Capturar Foto
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
    </>
  );
}

export default Content;
