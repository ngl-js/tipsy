import { useContext, useEffect, useState } from "react";
// icons
import { RiSurveyFill } from "react-icons/ri";
import { MdAddAPhoto } from "react-icons/md";
// Services
import { appid, getAssets, getSurveys } from "../services/http";
// Components
import Modal from "./Modal";
import Button from "./Button";
import Frames from "./Frames";
import Music from "./Music";
import Error from "./Error";
import MediaActions from "./MediaActions";
import MediaCanvas from "./MediaCanvas";
import Survey from "./Survey";
// Context
import { MediaContext } from "../context/MediaContext";

const Content = () => {
  const {
    setAssets,
    selectedImg,
    selectedFrame,
    selectedAudio,
    openModal,
    startLoader,
    stopLoader,
    openSurvey,
    setOpensurvey,
    setError,
  } = useContext(MediaContext);

  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    startLoader();
    async function initAssets() {
      try {
        // api
        const resp = await getAssets();
        const resp_surveys = await getSurveys();
        // set state
        setAssets(resp);
        setSurveys(resp_surveys);
        stopLoader();
      } catch (error) {
        stopLoader();
        setError(error.message ? error.message : "Error al cargar assets");
      }
    }
    initAssets();
  }, []);

  const url_Survey = () => {
    return surveys.find((s) => s.appid == appid)?.survey;
  };

  const showSurvey = () => {
    openModal();
    setOpensurvey(true);
    setTimeout(() => {
      window.open(url_Survey(), "surveyiFrame");
    }, 600);
  };

  return (
    <>
      {/* Content wrapper */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 
      justify-center mt-[35%] my-10 p-8 m-auto"
      >
        {/* Errors */}
        <Error />

        {/* Survey button */}
        {!!url_Survey() && (
          <div className="py-10 p-2 m-0 flex justify-center">
            <Button handleOnClick={showSurvey}>
              <RiSurveyFill className="mr-2" size={"1.3rem"} />
              Contestar encuesta
            </Button>
          </div>
        )}
        {/* Open modal button */}
        <div className="py-10 p-2 m-0 flex justify-center">
          <Button handleOnClick={openModal}>
            <MdAddAPhoto className="mr-2" size={"1.1rem"} />
            Mi momento
          </Button>
        </div>
      </div>

      {/* Modal Media and dyn content */}
      {!openSurvey && (
        <Modal>
          {/* Frames selection */}
          {(!selectedFrame || (selectedAudio?.name && selectedFrame)) && (
            <Frames />
          )}

          {/* Audio selection */}
          {selectedFrame && !selectedAudio?.name && <Music />}

          {/* Merged media result */}
          {selectedImg && <MediaCanvas />}

          {/* Media buttons */}
          {selectedAudio?.name && <MediaActions />}
        </Modal>
      )}

      {/* Modal survey */}
      {openSurvey && (
        <Modal>
          <Survey />
        </Modal>
      )}
    </>
  );
};

export default Content;
