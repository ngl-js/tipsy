
const Button = ({ handleOnClick, styl, children }) => {

  return (
    <>
      <button 
        role="button" 
        onClick={handleOnClick}
        className={`inline-flex items-center justify-center 
          w-full px-5 py-3 text-md font-bold text-white
          bg-gradient-to-br from-purple-800 to-orange-400
          border-t-orange-400 border-l-orange-400 border-2 border-purple-500
          sm:w-auto rounded-xl font-pj hover:bg-purple-600 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-gray-900
          transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-120 ${styl}`}
          >
        {children}
      </button>
    </>
  );
}

export default Button;
