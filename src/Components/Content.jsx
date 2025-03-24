import { useContext, useEffect } from 'react';
// icons
import { FaStar } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
// Services
import { getAssets } from '../services/http';
// Components
import Modal from './Modal';
import Button from './Button';
import Frames from './Frames';
import Music from './Music';
import Error from './Error';
import MediaActions from './MediaActions';
import MediaCanvas from './MediaCanvas';
// Context
import { MediaContext } from '../context/MediaContext';

const Content = () => {

  const { 
    setAssets,
    selectedImg,
    selectedFrame,
    selectedAudio,
    openModal,
    startLoader, stopLoader,
    setError
  }= useContext(MediaContext);

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

  const showSurvey= () => {
    alert('link to survey...')
  }

  return (<>
    {/* Content wrapper */}
    <div 
      className="grid grid-cols-1 lg:grid-cols-2 
      justify-center mt-[35%] my-10 p-10 m-auto">

      {/* Errors */}
      <Error />

      {/* Survey button */}
      <div className='py-10 p-2 m-0 flex justify-center'>
        <Button 
          handleOnClick={showSurvey}>
            <FaStar className='mr-2' size={"1.3rem"} />
            Calificanos
        </Button>
      </div>
      {/* Open modal button */}
      <div className='py-10 p-2 m-0 flex justify-center'>
        <Button
          handleOnClick={openModal}>
            <MdAddAPhoto className='mr-2' size={"1.1rem"} />
            Mi momento
        </Button>
      </div>
    </div>

    {/* Modal and dyn content */}
    <Modal>
      <div className="h-[75vh]">
        {/* Frames selection */}
        {(!selectedFrame 
        || (selectedAudio && selectedFrame))
        && (  <Frames /> )}

        {/* Audio selection */}
        {selectedFrame && !selectedAudio
        && ( <Music /> )}

        {/* Merged media result */}
        {selectedImg
        && ( <MediaCanvas /> )}

        {/* Media buttons */}
        {selectedAudio 
        && ( <MediaActions /> )}
      </div>
    </Modal>
  </>);
}

export default Content;
