import { useContext, useEffect, useRef } from 'react';
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
// Services
import { getAssets, getImageMerged } from '../services/http';
// Otros
import { setMergedFile } from '../utils/utils';
// Components
import Modal from './Modal';
import Button from './Button';
import Frames from './Frames';
import Music from './Music';
// Context
import { MediaContext } from '../context/MediaContext';

// Component
const Content = () => {
  const inputFileRef = useRef( null );
  const { 
    assets, setAssets,
    selectedImg, setSelectedImg,
    selectedFrame,
    selectedAudio,
    openModal, closeModal,
    loading, startLoader, stopLoader,
    isvideo, setIsVideo,
    photoType,
    error, setError
  }= useContext(MediaContext);

  const outputh_class= 'object-contain rounded-lg border-4 border-orange-400 mt-2';

  useEffect( ()=> {
    startLoader()
    async function fecthAssets() {
      try {
        const resp= await getAssets()
        setAssets(resp);
        stopLoader();
      } catch (error) {
        stopLoader();
        setError(error.message ? error.message : 'Error al cargar assets');
      }
    }
    fecthAssets();
  }, [])

  const sendToMerge= async (e) => {
    const files = e.target.files;

    if (!!files?.length) {
      try {
        startLoader()
        let data= new FormData()
        data.append('photo', files[0])
        data.append('frame', selectedFrame)
        data.append('type', photoType)
        data.append('audio', selectedAudio)

        const resp= await getImageMerged(data);
        if (resp.type==='video')
          setIsVideo(true);
        else 
          setIsVideo(false);

        const mergedFile= await setMergedFile(resp);
        
        setSelectedImg(mergedFile);
        stopLoader();

      } catch (error) {
        stopLoader();
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
          text: "Mi momento con Tipsy"
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

  const onPhotoBtnClick = () => {
    inputFileRef.current.click();
  }

  const showSurvey= () => {
    alert('link to survey...')
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-auto p-10 justify-center mt-[35%] my-10">

        {loading && ( 
          <div className="z-30 absolute h-100 flex justify-cente items-center">
            <ImSpinner9 className='animate-spin self-cente w-[80vw] text-purple-500' size={"5rem"}  />
          </div>
        )}
        {(!loading && error) && (
          <div 
            onClick={closeModal}
            className='absolute z-50 top-1/2 bg-white w-[80vw]'>
            <div 
              className="grid grid-cols-1 justify-center items-center 
              border-2 border-rose-500 rounded-lg p-2">
              <h2 
                className='text-center font-medium text-transparent 
                bg-clip-text bg-gradient-to-br to-pink-600 from-purple-400'>
                {error}
              </h2>
            </div>
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
            handleOnClick={openModal}>
              <MdAddAPhoto className='mr-2' size={"1.1rem"} />
              Mi momento
          </Button>
        </div>
      </div>

      <Modal
        inputFileRef={inputFileRef}
        onPhotoBtnClick={onPhotoBtnClick}
        sendToMerge={sendToMerge}
        shareBtn={shareBtn}
      >
        <div className="h-[75vh]">
          {(selectedImg && !isvideo)
          && (
            <img 
              id='foto'
              src={selectedImg.blob}
              className={outputh_class}
              alt="Imagen seleccionada" 
            />
          )}
          {(selectedImg && !!isvideo)
          && (
            <video 
              className={outputh_class}
              controls
              src={selectedImg.blob}>
            </video>
          )}

          {((!selectedFrame || (selectedAudio && selectedFrame) ) 
            && assets?.frames)
            && (<Frames />)
          }

          {selectedFrame && !selectedAudio && assets?.audios 
           && (<Music />)
          }
        </div>
      </Modal>
    </>
  );
}

export default Content;
