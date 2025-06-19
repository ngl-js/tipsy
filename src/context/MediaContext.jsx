import { createContext, useCallback, useState } from "react";

let audioObj = { name: undefined, start: 0 };

export const MediaContext = createContext({
  // States
  assets: [],
  setAssets: () => {},
  selectedImg: "",
  setSelectedImg: () => {},
  selectedFrame: "",
  setSelectedFrame: () => {},
  selectedAudio: audioObj,
  setSelectedAudio: () => {},
  modalIsOpen: false,
  setModalIsOpen: () => {},
  loading: false,
  isvideo: false,
  setIsVideo: () => {},
  photoType: false,
  setPhotoType: () => {},
  openSurvey: false,
  setOpensurvey: () => {},
  error: undefined,
  setError: () => {},
  rating: 0,
  setmyRating: () => {},
  // Custom funcs
  closeModal: () => {},
  openModal: () => {},
  startLoader: () => {},
  stopLoader: () => {},
});

const MediaCtxProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedFrame, setSelectedFrame] = useState();
  const [selectedAudio, setSelectedAudio] = useState(audioObj);
  const [error, setError] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isvideo, setIsVideo] = useState(false);
  const [photoType, setPhotoType] = useState(false);
  const [openSurvey, setOpensurvey] = useState(false);
  const [rating, setmyRating] = useState(0);
  // const [check, setCheck] = useState(false)

  const closeModal = () => {
    setSelectedImg(undefined);
    setSelectedFrame(undefined);
    setModalIsOpen(false);
    setError(undefined);
    setPhotoType(false);
    setSelectedAudio(audioObj);
    setIsVideo(false);
    setOpensurvey(false);
    setmyRating(0);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const startLoader = () => {
    setLoading(true);
  };

  const stopLoader = () => {
    setLoading(false);
  };

  const Media = {
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
    openSurvey,
    setOpensurvey,
    error,
    setError,
    rating,
    setmyRating,
    closeModal,
    openModal,
    startLoader,
    stopLoader,
  };

  return (
    <MediaContext.Provider value={Media}>{children}</MediaContext.Provider>
  );
};

export default MediaCtxProvider;
