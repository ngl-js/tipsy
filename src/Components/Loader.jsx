import { useContext } from "react";
// Icons
import { ImSpinner9 } from "react-icons/im";
// Context
import { MediaContext } from "../context/MediaContext";

const Loader = () => {

  const { loading }= useContext(MediaContext)

  return (<>
    {loading 
    && ( 
      <div 
        className="z-30 absolute h-100 flex justify-center items-center
        grid-cols-1 lg:grid-cols-2 m-auto mt-[25%] my-10 p-10">
        <ImSpinner9 className='animate-spin w-[80vw] text-purple-500' size={"5rem"} />
      </div>
    )}
  </>);
}

export default Loader;
