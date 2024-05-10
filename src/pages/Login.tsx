import { UserDataContext } from "../App";
import { logInUser } from "../firebase/api/auth";
// import Button from "../components/core/ButtonComponent";
import { User } from "../interface";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { useToast } from "../../contexts/ToastContext";
import { NavLink, useNavigate } from "react-router-dom";
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader";

const Login = () => {
  // const { toastSuccess } = useToast();
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });
  const { setUserDetails } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const formSubmit = () => {
  //   // toastSuccess("Te-ai inregistrat cu succes!");
  //   console.log("You're loggend In!");
  // };
  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const { name, value } = e.target;

  //   setUser({ ...user, [name]: value });
  // };
  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);
      const userCredentials = await logInUser(data);
      setUserDetails(userCredentials as User);
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value) || "Insert a valid email address.";
  };
  const onError = () => {
    console.log("Entered data does not match.");
  };

  return (
    <>
      {isLoading ? <SpinnerLoader /> : null}
      <div className="w-full h-max mx-auto flex flex-col justify-center items-center">
        <div className="w-full h-[80%] mx-auto flex flex-col items-center  sm:w-[640px] md:w-[540px] pt-20">
          <div className="w-full flex flex-col justify-center gap-[10px] items-center ">
            <h3 className="text-[19px] text-gray-800 font-bold">Sign in to your account</h3>
          </div>

          <div className="w-full h-max flex justify-center items-center sm:px-4">
            <form
              className="w-full h-full flex flex-col justify-center gap-5 px-3 py-5"
              onSubmit={handleSubmit(handleLogin, onError)}
            >
              <label htmlFor="email" className="w-full flex flex-col text-[14px] gap-1">
                Email:
                <input
                  type="email"
                  placeholder="Insert your email..."
                  id="email"
                  className={`h-10 border border-gray-500 rounded-md pl-2 text-sm  ${
                    errors.email && "border-red-600 border-2"
                  }`}
                  {...register("email", { validate: validateEmail })}
                />
                {errors.email && <p className="text-red-600 text-[12px]">{errors.email.message}</p>}
              </label>
              <label htmlFor="password" className="wfull flex flex-col text-[14px] gap-1">
                Password:
                <input
                  type="password"
                  id="password"
                  placeholder="Insert password..."
                  className={`h-10 border border-gray-500 rounded-md pl-2 text-sm ${
                    errors.password && "border-red-600 border-2"
                  }`}
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="text-[12px] text-red-600">Insert your password</p>}
              </label>
              <button
                type="submit"
                className="w-full h-[45px] text-white bg-blue-500 rounded-[5px] shadow-md font-bold md:hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>

          <div className="w-full mx-auto px-5 flex flex-col justify-center gap-3 sm:px-7 md:flex-row md:gap-10">
            <button className="text-[14px] text-black font-semibold underline">
              <NavLink to="/register">Create an account!</NavLink>
            </button>
            <button className="text-[14px] text-black font-semibold underline">
              <NavLink to="/forgot-password">Forgot password?</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
