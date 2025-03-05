import { useRef, useState } from 'react';
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { ImSpinner } from "react-icons/im";
// Services
import { getImageMerged } from '../services/http';
// Otros
import { setMergedFile } from '../utils/utils';
// Components
import Modal from './Modal';
import Button from './Button';

// Component
const Content = () => {
  const inputFileRef = useRef( null );
  const btnStyle= '';
  const [selectedImg, setSelectedImg]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading]= useState();
  const [error, setError]= useState();
  // const [selectedFrame, setSelectedFrame]= useState([]);

  const sendToMerge= async (e) => {
    const files = e.target.files;

    if (!!files?.length) {
      setLoading(true);
      try {
        let data= new FormData();
        data.append('photo', files[0])
        data.append('frame', 'hb4')
    
        const resp= await getImageMerged(data);
        const mergedFile= await setMergedFile(resp.b64);
        
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
  }

  const closeModal= () => {
    setSelectedImg(undefined)
    setModalIsOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-auto p-10 justify-center mt-[35%]">
        {loading && ( <ImSpinner size={"5rem"}  /> )}
        {(!loading && error) && (
          <h2 
            className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            {error}
        </h2>)}
        {/* capturar imagen */}
        <div className='py-10 p-2 m-0 flex justify-center'>
          <Button 
            handleOnClick={showSurvey} 
            xtraStyles={btnStyle}>
              <FaStar className='mr-2' size={"1.3rem"} />
              Calificanos
          </Button>
        </div>
        
        <div className='py-10 p-2 m-0 flex justify-center'>
          <Button
            handleOnClick={onBtnClick}
            xtraStyles={btnStyle}>
              <MdAddAPhoto className='mr-2' size={"1.1rem"} />
              tomar foto
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
          {(selectedImg && !error)
          && (
            <img 
              id='foto'
              src={selectedImg.blob}
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
