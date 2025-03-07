import { useEffect, useRef, useState } from 'react';
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { ImSpinner } from "react-icons/im";
// Services
import { getAssets, getImageMerged } from '../services/http';
// Otros
import { setMergedFile } from '../utils/utils';
// Components
import Modal from './Modal';
import Button from './Button';
import Frames from './Frames';

// Component
const Content = () => {
  const inputFileRef = useRef( null );
  const [assets, setAssets]= useState([]);
  const [selectedImg, setSelectedImg]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading]= useState();
  const [error, setError]= useState();
  const [isvideo, setIsVideo]= useState(false);
  // const [selectedFrame, setSelectedFrame]= useState([]);

  useEffect( ()=> {
    const getMyAssets= async ()=> {await getAssets();}
    try {
      const resp= getMyAssets()
      setAssets(resp);
    } catch (error) {
      setError(error.message ? error.message : 'Error al cargar assets');
    }
  }, [])

  const sendToMerge= async (e) => {
    const files = e.target.files;

    if (!!files?.length) {
      setLoading(true);
      try {
        let data= new FormData()
        data.append('photo', files[0])
        data.append('frame', 'hb4')
    
        const resp= await getImageMerged(data);
        if (resp.type)
          setIsVideo(true);

        const mergedFile= await setMergedFile(resp);
        
        setSelectedImg(mergedFile);
        setModalIsOpen(true);
        setLoading(false);

      } catch (error) {
        setLoading(false)
        setError(error.message ? error.message : 'Error al cargar archivo');
      }
      
    }
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

  const onBtnClick = () => {
    inputFileRef.current.click();
  }

  const showSurvey= () => {
    console.log('encuesta');
    setModalIsOpen(true)
  }

  const closeModal= () => {
    setSelectedImg(undefined)
    setModalIsOpen(false)
  }

  return (
    <>
      {/* <Frames /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 m-auto p-10 justify-center mt-[35%]">
        {loading && ( <ImSpinner size={"5rem"}  /> )}
        {(!loading && error) && (
          <div className="grid grid-cols-1 justify-center items-center border-2 border-rose-500 rounded-lg p-2">
            <h2 
              className='text-center font-medium text-transparent bg-clip-text bg-gradient-to-br to-pink-600 from-purple-400'>
              {error}
            </h2>
          </div>
        )}
        {/* capturar imagen */}
        <div className='py-10 p-2 m-0 flex justify-center'>
          <Button 
            handleOnClick={showSurvey}>
              <FaStar className='mr-2' size={"1.3rem"} />
              Calificanos
          </Button>
        </div>
        
        <div className='py-10 p-2 m-0 flex justify-center'>
          <Button
            handleOnClick={onBtnClick}>
              <MdAddAPhoto className='mr-2' size={"1.1rem"} />
              Tomar foto
          </Button>
          <input 
            ref={inputFileRef}
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
        onClose={closeModal}>
        <div className="flex justify-center">
          {(selectedImg && !error && !isvideo)
          && (
            <img 
              id='foto'
              src={selectedImg.blob}
              className='max-h-[70vh] object-contain mb-5 rounded-lg'
              alt="Imagen seleccionada" 
            />
          )}
          {(selectedImg && !!isvideo)
          && (
            <video 
              className='max-h-[70vh] object-contain mb-5 rounded-lg'
              src={selectedImg.blob}>
            </video>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Content;
