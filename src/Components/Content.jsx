import { useEffect, useRef, useState } from 'react';
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

// Component
const Content = () => {
  const inputFileRef = useRef( null );

  const [assets, setAssets]= useState([]);
  const [selectedImg, setSelectedImg]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading]= useState();
  const [error, setError]= useState();
  const [isvideo, setIsVideo]= useState(false);
  const [selectedFrame, setSelectedFrame]= useState();
  const [photoType, setPhotoType]= useState(false);
  const [selectedAudio, setSelectedAudio]= useState();

  const outputh_class= 'object-contain rounded-lg border-4 border-purple-500 mt-6 mb-18';

  useEffect( ()=> {
    setLoading(true);
    async function fecthAssets() {
      try {
        const resp= await getAssets()
        setAssets(resp);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message ? error.message : 'Error al cargar assets');
      }
    }
    fecthAssets();
  }, [])

  const sendToMerge= async (e) => {
    const files = e.target.files;

    if (!!files?.length) {
      try {
        setLoading(true);
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
  }

  const onPhotoBtnClick = () => {
    inputFileRef.current.click();
  }

  const onFrameBtnClick = () => {
    setModalIsOpen(true)
  }

  const showSurvey= () => {
    console.log('encuesta');
    setModalIsOpen(true)
  }

  const typePhoto= () => {
    setPhotoType( prev=> (!prev))
  }

  const closeModal= () => {
    setSelectedImg(undefined)
    setSelectedFrame(undefined)
    setModalIsOpen(false)
    setError(undefined)
    setPhotoType(false)
    setSelectedAudio(undefined)
    setIsVideo(false);
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
            onClick={()=>{setModalIsOpen(false)}}
            className='absolute z-50 top-1/2 bg-white w-[80vw]'>
            <div className="grid grid-cols-1 justify-center items-center border-2 border-rose-500 rounded-lg p-2">
              <h2 
                className='text-center font-medium text-transparent bg-clip-text bg-gradient-to-br to-pink-600 from-purple-400'>
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
            handleOnClick={onFrameBtnClick}>
              <MdAddAPhoto className='mr-2' size={"1.1rem"} />
              Mi momento
          </Button>
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        shareBtn={shareBtn}
        onClose={closeModal}
        onPhotoBtnClick={onPhotoBtnClick}
        inputFileRef={inputFileRef}
        selectedImg={selectedImg}
        selectedFrame={selectedFrame}
        sendToMerge={sendToMerge}
        setLoading={setLoading}
        setPhotoType={typePhoto}
        assets={assets}
        selectedAudio={selectedAudio}
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

          {((!selectedFrame || (selectedAudio && selectedFrame) )  && assets?.frames) &&
          ( <Frames 
              assets={assets}
              onSelect={setSelectedFrame}
              selectedImg={selectedImg}
              selectedAudio={selectedAudio}
            /> 
          )}

          {selectedFrame && !selectedAudio && assets?.audios && (
            <Music
              assets={assets}
              setPhotoType={setPhotoType}
              setSelectedAudio={setSelectedAudio}
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default Content;
