
const Button = ({ handleOnClick, children, xtraStyles }) => {

  return (
    <>
    <div className="absolute">
      <div className="absolute -inset-5">
        <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 
          blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
        </div>
      </div>

      <button 
        role="button" 
        onClick={handleOnClick}
        className="relative z-10 inline-flex items-center justify-center 
          w-full px-8 py-3 text-md font-bold
          text-white transition-all duration-200 bg-purple-800 border-2 border-transparent 
          sm:w-auto rounded-xl font-pj hover:bg-purple-600 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-gray-900">
        {children}
      </button>
    </div>
    </>
  );
}

export default Button;
