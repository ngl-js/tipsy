
const Button = ({ handleOnClick, children, xtraStyles }) => {

  const styles= 
    `text-white rounded-full text-center
    text-sm py-3 px-7 uppercase
    flex self-center ${xtraStyles}`;

  return (
    <button 
      role="button" 
      onClick={handleOnClick}
      className={styles}>
      {children}
    </button>
  );
}

export default Button;
