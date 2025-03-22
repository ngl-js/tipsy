import { useState } from "react";
import { baseURL } from "../services/http";
// otros
import noImage from "../assets/img/no-image.jpg";
// icons
import { FaRegCheckCircle } from "react-icons/fa";
// Components
import Button from "./Button";

const Frames = ({ assets, onSelect, selectedImg, selectedAudio }) => {
  const [url, setUrl]= useState(noImage)
  const [focus, setFocus]= useState();

  const handleUrl= (selected) => {
    const _url= `${baseURL}/img/frames/${selected}`
    setUrl(_url)
    setFocus(selected)
  }

  const selectFrame= () => {
    onSelect(focus);
  }

  let titulo;
  selectedAudio ? 
    titulo= 'Tomar una fotografía' :
    titulo= 'Seleccionar un marco';

  return (
    <div className="grid gap-4 h-auto my-2">
      {!selectedImg &&
      ( <>
        <h1 className="text-center text-2xl text-orange-500">
          {titulo}
        </h1>
        <div className="flex justify-center">
          <img 
            className="pb-4 rounded-lg object-cover 
              object-center h-[50vh] fadeMe"
            src={url}
            alt="" />
        </div>
      </>)}
      {!selectedAudio && 
      ( <>
          <section 
            className="flex overflow-x-auto space-x-8 w-1/1">
            { assets.frames.map( frame=> (
              <div
                className="flex-shrink-0 rounded-lg border-2 border-orange-300" 
                key={frame.name}>
                <img
                  onClick={()=> { handleUrl(frame.name) }}
                  src={`${baseURL}/img/frames/${frame.name}`}
                  className={`object-cover object-center h-20 max-w-full rounded-lg cursor-pointer fadeMe
                  ${ focus==frame.name ? 'focus: border-orange-300 border-5 border-dashed' : '' } `} 
                  alt="frame-image" />
              </div>
            ))}
          </section>

          <Button
            disabled={!focus}
            handleOnClick={selectFrame}>
              <FaRegCheckCircle className='mr-2' size={"1.3rem"} />
              Seleccionar
          </Button>
        </>
      )}
    </div>
  );
}

export default Frames;
