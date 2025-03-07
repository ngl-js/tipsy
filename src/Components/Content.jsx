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
  const [type, setType]= useState(false);
  // const [isSelectedFrame, setSelectedFrame]= useState();

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
        data.append('type', type)

        const resp= await getImageMerged(data);
        if (resp.type==='video')
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
    setType( prev=> (!prev))
  }

  const closeModal= () => {
    setSelectedImg(undefined)
    setSelectedFrame(undefined)
    setModalIsOpen(false)
    setType(false)
    setIsVideo(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-auto p-10 justify-center mt-[35%] my-60">

        {loading && ( 
          <div className="z-30 absolute h-100 flex justify-cente items-center left-1/3">
            <ImSpinner9 className='animate-spin self-cente left-1/3 text-purple-500' size={"5rem"}  />
          </div>
        )}
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
        setType={typePhoto}
        >
        <div className="flex justify-cente">
          {(selectedImg && !isvideo)
          && (
            <img 
              id='foto'
              src={selectedImg.blob}
              className='object-contain rounded-lg border-4 mt-6 mb-30'
              alt="Imagen seleccionada" 
            />
          )}
          {(selectedImg && !!isvideo)
          && (
            <video 
              className='object-contain rounded-lg border-4 mt-6 mb-30'
              controls
              src={selectedImg.blob}>
            </video>
          )}

          {(!selectedFrame || !selectedImg) &&
          ( <Frames 
              assets={assets}
              onSelect={setSelectedFrame}
              selectedFrame={selectedFrame}
            /> 
          )}
        </div>
      </Modal>
    </>
  );
}

export default Content;
