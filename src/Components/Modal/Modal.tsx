import { createPortal } from 'react-dom';
import { useEffect, SetStateAction, Dispatch, ReactNode, FC } from 'react';

interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const modalContainer: HTMLElement | null =
  document.getElementById('modal-root');

const PopupWindow: FC<IProps> = ({ modalOpen, setModalOpen, children }) => {
  if (!modalContainer) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('body-no-scroll');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('body-no-scroll');
    };
  }, []);

  const handleClick = (e: any) => {
    if (e.currentTarget === e.target) {
      setModalOpen(false);
    }
  };

  return createPortal(
    <div
      className="absolute w-screen h-full fixed top-0 left-0 flex justify-center align-center bg-black/[0.8] z-10000 overflow-hidden overflow-y-visible pb-[200px]"
      onClick={handleClick}
    >
      <div className="w-[500px] bg-white absolute top-[10%] z-100000 p-[20px] rounded-[20px]">
        {children}
        <div>
          <ul className="w-full flex justify-around items-center text-white">
            <li>
              <button
                type="button"
                className="w-[100px] py-[10px] bg-green-600 hover:bg-green-800 rounded-[20px] transition-colors duration-300"
                onClick={() => setModalOpen(false)}
              >
                Back
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-[100px] py-[10px] bg-blue-600 hover:bg-blue-800 rounded-[20px] transition-colors duration-300"
              >
                Aply
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    modalContainer
  );
};

export default PopupWindow;
