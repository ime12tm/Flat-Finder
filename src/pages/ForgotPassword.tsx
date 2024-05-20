import { useForm } from "react-hook-form";
import { useToast } from "../contexts/ToastContext";

const ForgotPassword = () => {
  const { toastSuccess } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    toastSuccess("Your request has been sent. Please check your email!");
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value) || "Insert a valid email.";
  };
  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center font-poppins ">
      <div className="w-full h-[80%] mx-auto flex flex-col items-center  sm:w-[640px] md:w-[540px] pt-20">
        <div className="w-full flex flex-col justify-center items-center ">
          <h3 className="text-[19px] text-gray-800 font-bold">Please enter your email to generate a new password.</h3>
        </div>
        <div className="w-full h-60  flex justify-center items-center sm:px-4">
          <form className="w-full h-full flex flex-col justify-center gap-5 px-3" onSubmit={handleSubmit(formSubmit)}>
            <label htmlFor="email" className="w-full flex flex-col text-[14px] gap-1">
              Email:
              <input
                type="email"
                placeholder="Insert your email address..."
                id="email"
                className={`h-[55px] border-[1px] border-gray-500 rounded-[5px] pl-2  ${
                  errors.email && "border-red-600 border-[2px]"
                }`}
                {...register("email", { validate: validateEmail })}
              />
              {errors.email && <p className="text-red-600 text-[12px]">{errors.email.message as string}</p>}
            </label>

            <button
              type="submit"
              className="w-full h-[45px] text-white bg-[#48B866] rounded-[5px] shadow-md font-bold md:hover:bg-[#48b866ce]"
            >
              Send request!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
