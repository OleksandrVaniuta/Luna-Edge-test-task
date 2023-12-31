import { SetStateAction, Dispatch, FC } from 'react';

interface IProps {
  disabled: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Button: FC<IProps> = ({ disabled, setModalOpen }) => {
  return (
    <div className="w-[400px] m-auto flex justify-center mt-[40px]">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={!disabled}
        className="w-full block px-[5px] py-[5px] text-center text-base text-white bg-blue-600 hover:bg-blue-700 disabled:bg-stone-300 rounded-[25px] transition-colors duration-300"
      >
        Submit
      </button>
    </div>
  );
};

export default Button;
