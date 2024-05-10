import { ButtonProps } from "../../interface";

const Button: React.FC<ButtonProps> = ({ text, backgroundColor, handleClick }) => {
  return (
    <>
      <button className={`${backgroundColor} p-2 font-semibold rounded-md hover:opacity-70`} onClick={handleClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
