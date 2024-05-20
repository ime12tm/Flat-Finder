import { useState } from "react";
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader";
import { registerUser } from "../firebase/api/auth";
import { useNavigate } from "react-router";
import { useToast } from "../contexts/ToastContext";
import { useForm } from "react-hook-form";

const Register = () => {
  // state for loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // we will navigate to login page after registering
  const navigate = useNavigate();
  // toast notifications hook
  const { toastSuccess, toastError, toastWarning } = useToast();
  // useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      toastWarning("Creating your account. Please wait...");
      await registerUser(data);
      toastSuccess("User registered successfully");
      navigate("/login");
    } catch (error: string | any) {
      if (error.message.includes("auth/email-already-in-use")) toastError("This email address is already in use");
      else console.log("An error has occured while registering user");
      toastError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const onError = () => {
    console.log("Entered data does not match the required format.");
  };

  return (
    <>
      {/* spinner loader */}
      {isLoading ? <SpinnerLoader /> : null}

      {/* register form */}
      <form
        className="flex flex-col w-full py-0 px-4 sm:justify-center sm:w-full mx-auto max-w-[900px]"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          {/* page heading */}
          <div className="w-full flex flex-col justify-center gap-[10px] items-center pt-20">
            <h3 className="text-[19px] text-gray-800 font-bold font-poppins">Create an account!</h3>
          </div>

          <div className="flex flex-col w-full pt-5 sm:flex sm:flex-row items-start px-2 sm:px-20 lg:px-32">
            {/* first name */}
            <div className="w-full sm:flex flex-col sm:w-[50%] mr-[2%]">
              <div>
                <label htmlFor="firstName" className="cursor-pointer mb-1">
                  First name
                </label>
              </div>
              <div>
                <input
                  className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This field is mandatory",
                    },
                    minLength: {
                      value: 3,
                      message: "First name should be at least 3 characters",
                    },
                  })}
                />
                <p className="text-sm h-6 text-red-600">{errors.firstName && (errors.firstName.message) as string}</p>
              </div>
            </div>

            {/* last name */}
            <div className="w-full sm:flex flex-col sm:w-[50%]">
              <div>
                <label htmlFor="lastName" className="cursor-pointer mb-1">
                  Last name
                </label>
              </div>
              <div>
                <input
                  className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm "
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "This field is mandatory",
                    },
                    minLength: {
                      value: 3,
                      message: "First name should be at least 3 characters",
                    },
                  })}
                />
                <p className="text-sm h-6 text-red-600">{errors.lastName && (errors.lastName.message) as string}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full px-2 sm:px-20 lg:px-32">
            {/* email address */}
            <label htmlFor="emailAddress" className="cursor-pointer mb-1">
              Email address
            </label>
            <input
              className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm "
              id="email"
              type="text"
              placeholder="Email address"
              {...register("email", {
                required: { value: true, message: "This field is mandatory" },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please insert a valid email address",
                },
              })}
            />
            <p className="text-sm h-6 text-red-600">{errors.email && (errors.email.message) as string}</p>

            {/* password */}
            <label htmlFor="password" className="cursor-pointer mb-1">
              Password
            </label>
            <input
              className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "This field is mandatory" },
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters",
                },
              })}
            />
            <p className="text-sm h-6 text-red-600">{errors.password && (errors.password.message) as string}</p>

            {/* confirm password */}
            <label htmlFor="confirmPassword" className="cursor-pointer mb-1">
              Confirm password
            </label>
            <input
              className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm "
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "This field is mandatory",
                validate: (value) => value === password || "The passwords do not match",
              })}
            />
            <p className="text-sm h-6 text-red-600">{errors.confirmPassword && (errors.confirmPassword.message) as string}</p>

            <label htmlFor="phoneNumber" className="cursor-pointer mb-1">
              Date of Birth
            </label>
            <input
              className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
              id="birthDate"
              type="date"
              placeholder="Date of Birth"
              {...register("birthDate", {
                required: "This field is mandatory",
              })}
            />
            <p className="text-sm h-6 text-red-600">{errors.birthDate && (errors.birthDate.message) as string}</p>

            <button
              className="w-full h-[45px] text-white bg-blue-500 rounded-[5px] shadow-md font-bold md:hover:bg-blue-700"
              type="submit"
            >
              Create account
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
