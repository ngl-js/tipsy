import { useState } from "react";
import { baseURL } from "../services/http";
import noImage from "../assets/img/no-image.jpg";

const Frames = ({ assets, onSelect }) => {
  const [url, setUrl]= useState(noImage)
  const [focus, setFocus]= useState();

  const handleUrl= (selected) => {
    const _url= `${baseURL}/img/frames/${selected}`
    setUrl(_url)
    onSelect(selected)
    setFocus(selected)
  }

  return (
    <div className="grid gap-4 h-auto my-3">
      <div>
        <img 
          className="pb-4 rounded-lg object-cover 
            object-center h-[60vh]"
          src={url}
          alt="" />
      </div>
      <section 
        className="flex overflow-x-auto space-x-8 w-1/1">
        { assets.frames.map( frame=> (
          <div
            className="flex-shrink-0 rounded-lg border-2" 
            key={frame.name}>
            <img
              onClick={()=> { handleUrl(frame.name) }}
              src={`${baseURL}/img/frames/${frame.name}`}
              className={`object-cover object-center h-20 max-w-full rounded-lg cursor-pointer
              ${ focus==frame.name ? 'focus:border-purple-300 border-5 border-dashed' : '' } `} 
              alt="frame-image" />
          </div>
        ))}
        
      </section>
    </div>
  );
}

export default Frames;
