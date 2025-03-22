
const Button = ({ handleOnClick, disabled=false, styl='', children }) => {

  const disStyle= disabled ? 
    ` text-gray-400 bg-gradient-to-br from-neutral-200 to-neutral-300 ` :
    ` text-white bg-gradient-to-r from-gray-600 to-orange-400 `;

  return (
    <>
      <button 
        role="button" 
        disabled={disabled}
        onClick={handleOnClick}
        className={`inline-flex items-center justify-center
          w-full px-4 py-2 text-md font-bold ` + disStyle +
          `border-t-orange-400 border-l-orange-400 border-2 border-gray-400
          sm:w-auto rounded-xl font-pj hover:bg-purple-600 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-gray-900
          transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-120 fadeMe ${styl}`}
          >
        {children}
      </button>
    </>
  );
}

export default Button;
