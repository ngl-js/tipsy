import { useContext, useState } from "react";
import { baseURL } from "../services/http";
// Components
import Button from "./Button";
// icons
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
// Context
import { MediaContext } from "../context/MediaContext";

const Music = () => {
  const { 
    assets, 
    setSelectedAudio,
    setPhotoType 
  }= useContext(MediaContext)
  
  const [focus, setFocus]= useState(true);

  const handleMusic= (audio) => {
    setFocus(audio)
  }

  const handleSelectedMusic= (skip=true) => {
    setSelectedAudio(focus);
    setPhotoType(!skip);
  }

  if (!(!!assets?.audios)) 
    return (
      <h1 className="absolute justify-center top-1/2 left-1/3">
        No audios data!
      </h1>
    );

  return (<>
    {/* Audios */}
    <div className="flex flex-col gap-4 w-[85vw] h-[70vh] overflow-x-hidden overflow-y-auto">
      <h1 className="text-center text-2xl py-3 text-orange-500">Añadir musica</h1>
      { assets.audios.map( audio=> (
        <div  key={audio.name}  
          className={`inline-flex items-center p-3 border-1 border-solid border-orange-300 rounded-lg` +
          `${ focus==audio.name ? ' focus: border-2 border-solid rounded-lg' : '' } fadeMe`}>
          <label className="relative flex items-center cursor-pointer" htmlFor={audio.name}>
            <input 
              id={audio.name}
              onClick={()=> { handleMusic(audio.name) }} 
              name="audio" type="radio" 
              className="peer h-5 w-5 cursor-pointer appearance-none 
                rounded-full border border-slate-400 checked:border-slate-400 
                transition-all checked:bg-orange-400" />
            <span className="absolute bg-gray-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </label>
          <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor={audio.name}>
            <div className="px-5 w-[80vw]">
              <p className="font-medium uppercase p-2">
                {`${audio.name}`.replace('.mp3', '')}
              </p>
              <audio className="w-[60vw]" controls src={`${baseURL}/audio/${audio.name}`}></audio>
            </div>
          </label>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 my-10 gap-4">
      {/* Select audio button */}
      <Button 
        disabled={focus===true}
        handleOnClick={()=>{handleSelectedMusic(false)}}>
          <FaRegCheckCircle className='mr-2' size={"1.3rem"} />
          Seleccionar
      </Button>
      {/* Omit audio button */}
      <Button
        handleOnClick={handleSelectedMusic}>
          <MdOutlineCancel className='mr-2' size={"1.3rem"} />
          Omitir
      </Button>
    </div>
  </>);
}

export default Music;
