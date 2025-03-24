import { useContext } from "react";
// Context
import { MediaContext } from "../context/MediaContext";

const MediaCanvas = () => {

   const { 
      selectedImg,
      isvideo,
    }= useContext(MediaContext);

  const outputh_class= 'object-contain rounded-lg border-4 border-orange-200 mt-2';
  
  return (<>
    {!isvideo
    && (
      <img 
        id='foto'
        src={selectedImg.blob}
        className={outputh_class}
        alt="Imagen seleccionada" 
      />
    )}
    {!!isvideo
    && (
      <video 
        className={outputh_class}
        controls
        src={selectedImg.blob}>
      </video>
    )}
  </>);
}

export default MediaCanvas;
