
const Button = ({ handleOnClick, disabled=false, children }) => {

  const onClickme= ()=> {
    // this way for future
    handleOnClick()
  }

  const disabledStyle= disabled ? 
    ` text-gray-400 bg-gradient-to-br from-neutral-200 to-neutral-300 ` :
    ` text-white bg-gradient-to-r from-gray-600 to-orange-400 `;

  return (
    <>
      <button 
        role="button" 
        disabled={disabled}
        onClick={onClickme}
        className={`inline-flex items-center justify-center
          w-full px-4 py-2 text-md font-bold ${disabledStyle}
          border-t-orange-400 border-l-orange-400 border-2
          border-gray-400 rounded-xl hover:bg-purple-600
          sm:w-auto jumpMe`}
          >
        {children}
      </button>
    </>
  );
}

export default Button;
