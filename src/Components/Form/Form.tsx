import { ChangeEvent, Dispatch, SetStateAction, FC } from 'react';
import { useForm } from 'react-hook-form';
import { IChoosenPokemons } from '../../App';

interface IProps {
  setChoosenPokemons: Dispatch<SetStateAction<IChoosenPokemons>>;
}

const Form: FC<IProps> = ({ setChoosenPokemons }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IChoosenPokemons>({ mode: 'onBlur' });

  const onSubit = () => {
    return;
  };

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errors) {
      setChoosenPokemons((prevData) => ({
        ...prevData,
        [name]: '',
      }));
    }
    setChoosenPokemons((prevData) => ({
      ...prevData,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubit)}
      className="w-[400px] flex gap-y-[15px] flex-wrap m-auto"
    >
      <label className="w-[400px] flex m-auto block flex-wrap text-stone-800 text-base relative pb-[25px]">
        First Name:
        <input
          {...register('firstName', {
            required: 'field is required',
            minLength: { value: 2, message: '2 characters minimum,' },
            maxLength: { value: 12, message: '12 characters maximum' },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Please enter only letters',
            },
            validate: (value) =>
              capitalizeFirstLetter(value) === value ||
              'The first letter must be capitalized',
            onChange: (e) => handleInputChange(e),
          })}
          type="text"
          name="firstName"
          placeholder="first name"
          className={`block w-full mt-[8px] bg-white px-[10px]  py-[3px] outline-none border border-gray-400 hover:border-gray-600 hover:bg-stone-100 ficus:border-gray-600
        rounded-[12px] flex justify-center items-center ${
          errors.firstName && 'border-red-600'
        } `}
        />
        {errors?.firstName && (
          <p className="text-red-600 pl-[10px] pt-[4px] absolute bottom-0">
            {errors?.firstName?.message}
          </p>
        )}
      </label>
      <label className="w-[400px] flex m-auto block flex-wrap text-stone-800 text-base relative pb-[25px]">
        Last Name:
        <input
          {...register('lastName', {
            required: 'field is required',
            minLength: { value: 2, message: '2 characters minimum,' },
            maxLength: { value: 12, message: '12 characters maximum' },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Please enter only letters',
            },
            validate: (value) =>
              capitalizeFirstLetter(value) === value ||
              'The first letter must be capitalized',
            onChange: (e) => handleInputChange(e),
          })}
          type="text"
          name="lastName"
          placeholder="last name"
          className={`block w-full mt-[8px] bg-white px-[10px]  py-[3px] outline-none border border-gray-400 hover:border-gray-600 hover:bg-stone-100 ficus:border-gray-600
        rounded-[12px] flex justify-center items-center ${
          errors.lastName && 'border-red-600'
        } `}
        />
        {errors?.lastName && (
          <p className="text-red-600 pl-[10px] pt-[4px] absolute bottom-0">
            {errors?.lastName?.message}
          </p>
        )}
      </label>
    </form>
  );
};

export default Form;
