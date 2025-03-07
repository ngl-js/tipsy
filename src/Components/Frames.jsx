import { useRef, useState } from "react";
import { baseURL } from "../services/http";
import noImage from "../assets/img/no-image.jpg";

const Frames = ({ assets, selectedFrame, onSelect }) => {
  const [url, setUrl]= useState(noImage)
  const [focus, setFocus]= useState();

  let cols= assets?.frames.length ?? 0;
  let gridStyles= `grid grid-cols-${cols} gap-${cols} inline-flex justify-center`

  const handleUrl= (selected) => {
    const _url= `${baseURL}/img/frames/${selected}`
    setUrl(_url)
    onSelect(selected)
    setFocus(selected)
  }

  return (
    <div className="grid gap-4 h-[75vh] pb-4 my-3">
      <div>
        <img 
          className="h-auto w-full max-w-full rounded-lg object-cover 
            object-center xs:h-[30vh] sm:h-[50vh] md:h-[70vh]"
          src={url}
          alt="" />
      </div>
      <div className={gridStyles}>
        { assets.frames.map( frame=> (
          <div key={frame.name}>
            <img
              onClick={()=> { handleUrl(frame.name) }}
              src={`${baseURL}/img/frames/${frame.name}`}
              className={`object-cover object-center h-20 max-w-full rounded-lg cursor-pointer
              ${ focus==frame.name ? 'focus:border-purple-300 border-5 border-dashed' : '' } `} 
              alt="frame-image" />
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Frames;
