import { useContext, useRef } from "react";
// icons
import { MdShare } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
// Components
import Button from './Button';
// Services
import { getImageMerged } from '../services/http';
// Otros
import { setMergedFile } from '../utils/utils';
// Context
import { MediaContext } from "../context/MediaContext";

const MediaActions = () => {

  const {
    selectedImg,
    selectedFrame,
    selectedAudio,
    setSelectedImg,
    setIsVideo,
    photoType,
    setError,
    startLoader,
    stopLoader,
    rating
  } = useContext(MediaContext)

  if (!(!!selectedAudio)) return null;

  const inputFileRef = useRef(null);

  const sendToMerge = async (e) => {
    const files = e.target.files;

    if (!!files?.length) {
      try {
        startLoader()
        let data = new FormData()
        data.append('photo', files[0])
        data.append('frame', selectedFrame)
        data.append('type', photoType)
        data.append('audio', selectedAudio)
        data.append('star', `star${rating}`)

        const resp = await getImageMerged(data);
        if (resp.type === 'video')
          setIsVideo(true);
        else
          setIsVideo(false);
        const mergedFile = await setMergedFile(resp);
        setSelectedImg(mergedFile);
        stopLoader();

      } catch (error) {
        stopLoader();
        setError(error.message ? error.message : 'Error al cargar archivo');
      }
    }
    else setError('No fue posible obtener media');
  }

  const shareBtn = () => {
    if ("share" in navigator) {
      navigator
        .share({
          files: selectedImg.files,
          title: "Images",
          text: "Mi momento con Tipsy"
        })
        .then(() => {
          console.log("Media shared!");
        })
        .catch((error) => {
          setError(error.message ? error.message : 'Error al compartir archivo');
        });
    } else {
      let random = Math.floor(Math.random() * 10)
      const linkElement = document.createElement('a')
      linkElement.download = `image-${random}.jpg`
      linkElement.href = selectedImg.blob
      linkElement.click()
    }
  }

  const onPhotoBtnClick = () => {
    inputFileRef.current.click();
  }

  let colSize = (selectedImg && selectedAudio);

  return (<>
    <div className={`grid grid-cols-${colSize ? '2' : '1'} gap-4 mt-2`}>
      {/* Camera/File button */}
      <div className='flex justify-center'>
        <Button
          handleOnClick={onPhotoBtnClick}>
          <MdAddAPhoto className='mr-2' size={"1.3rem"} />
          Tomar foto
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          accept='image/*'
          className='hidden'
          capture="environment"
          onChange={sendToMerge}
          disabled={!selectedFrame}
        />
      </div>
      {/* Share button */}
      {selectedImg
        && (
          <div className='flex justify-center'>
            <Button
              role="button"
              handleOnClick={shareBtn}>
              <MdShare className='mr-2' size={"1.3rem"} />
              Compartir
            </Button>
          </div>
        )}
    </div>
  </>)
}

export default MediaActions;
