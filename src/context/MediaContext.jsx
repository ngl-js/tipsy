import { createContext, useState } from "react";


export const MediaContext = createContext({
  // States
  assets:[],
  setAssets:()=>{},
  selectedImg:'',
  setSelectedImg:()=>{},
  selectedFrame:'',
  setSelectedFrame:()=>{},
  selectedAudio:undefined,
  setSelectedAudio:()=>{},
  modalIsOpen:false,
  setModalIsOpen:()=>{},
  loading:false,
  isvideo:false,
  setIsVideo:()=>{},
  photoType:false,
  setPhotoType:()=>{},
  error:undefined,
  setError:()=>{},
  // Custom funcs
  closeModal:()=>{},
  openModal:()=>{},
  startLoader:()=>{},
  stopLoader:()=>{},
});

const MediaCtxProvider = ({ children }) => {
  const [assets, setAssets]= useState([]);
  const [selectedImg, setSelectedImg]= useState('');
  const [selectedFrame, setSelectedFrame]= useState();
  const [selectedAudio, setSelectedAudio]= useState();
  const [error, setError]= useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading]= useState(false);
  const [isvideo, setIsVideo]= useState(false);
  const [photoType, setPhotoType]= useState(false);


  const closeModal= () => {
    setSelectedImg(undefined)
    setSelectedFrame(undefined)
    setModalIsOpen(false)
    setError(undefined)
    setPhotoType(false)
    setSelectedAudio(undefined)
    setIsVideo(false);
  }

  const openModal= () => {
    setModalIsOpen(true)
  }

  const startLoader= () => {
    setLoading(true)
  }

  const stopLoader= () => {
    setLoading(false)
  }

  const Media= {
    assets,
    setAssets,
    selectedImg,
    setSelectedImg,
    selectedFrame,
    setSelectedFrame,
    selectedAudio,
    setSelectedAudio,
    modalIsOpen,
    setModalIsOpen,
    loading,
    setLoading,
    isvideo,
    setIsVideo,
    photoType,
    setPhotoType,
    error,
    setError,
    closeModal,
    openModal,
    startLoader,
    stopLoader
  }

  return (
    <MediaContext.Provider value={Media}>
      {children}
    </MediaContext.Provider>
  );
}

export default MediaCtxProvider;
