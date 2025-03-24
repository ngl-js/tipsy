import { useContext } from "react";
// Context
import { MediaContext } from "../context/MediaContext";

const Error = () => {

  const { loading, error, closeModal }= useContext(MediaContext)

  return (
    <>
      {(!loading && error) 
      && (
        <div className="modal flex justify-center">
          <div 
            onClick={closeModal}
            className='absolute z-50 top-1/5 bg-white w-[80vw] rounded-lg'>
            <div 
              className="grid grid-cols-1 justify-center items-center 
              border-2 border-gray-500 rounded-lg p-2">
              <h2 
                className='text-center font-medium text-transparent 
                bg-clip-text bg-gradient-to-br to-pink-600 from-orange-700'>
                {error}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Error;
