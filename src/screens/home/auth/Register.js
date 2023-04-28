import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { useUserRegisterMutation } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";
import { setSuccess } from "../../../store/reducers/globalReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";
import Footer from "../../../components/home/footer/Footer";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const { state, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [registerUser, response] = useUserRegisterMutation();
  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(state);
  };
  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      dispatch(setSuccess(response?.data?.msg));
      navigate("/user");
    }
  }, [response.isSuccess]);
  return (
    <>
      <Nav />
      
          <div className="mt-[100px] mb-[100px]">
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                  sign up
                </h2>

                <form
                  onSubmit={onSubmit}
                  className="mx-auto max-w-lg rounded-lg border shadow-lg shadow-black2"
                >
                  <div className="flex flex-col gap-4 p-4 md:p-8">
                    <div>
                      <label className="mb-5 inline-block text-sm text-gray-800 sm:text-base">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className={` w-full mb-7 flex-1 rounded border border-white shadow-md shadow-black2 bg-mybeige2 px-3 py-2 text-black placeholder-black2 outline-none ring-indigo-300 transition duration-100 focus:ring form-input ${
                          showError(errors, "name")
                            ? "border-rose-600 bg-rose-50"
                            : "border-gray-300 bg-white"
                        }`}
                        placeholder="Name..."
                        value={state.name}
                        onChange={onChange}
                      />
                      {showError(errors, "name") && (
                        <span className="error">
                          {showError(errors, "name")}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="mb-5 inline-block text-sm text-gray-800 sm:text-base">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`w-full mb-7 flex-1 rounded border border-white shadow-md shadow-black2 bg-mybeige2 px-3 py-2 text-black placeholder-black2 outline-none ring-indigo-300 transition duration-100 focus:ring form-input ${
                          showError(errors, "email")
                            ? "border-rose-600 bg-rose-50"
                            : "border-gray-300 bg-white"
                        }`}
                        placeholder="Email..."
                        value={state.email}
                        onChange={onChange}
                      />
                      {showError(errors, "email") && (
                        <span className="error">
                          {showError(errors, "email")}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={`w-full mb-7 flex-1 rounded border border-white shadow-md shadow-black2 bg-mybeige2 px-3 py-2 text-black placeholder-black2 outline-none ring-indigo-300 transition duration-100 focus:ring form-input ${
                          showError(errors, "password")
                            ? "border-rose-600 bg-rose-50"
                            : "border-gray-300 bg-white"
                        }`}
                        placeholder="Password..."
                        value={state.password}
                        onChange={onChange}
                      />
                      {showError(errors, "password") && (
                        <span className="error">
                          {showError(errors, "password")}
                        </span>
                      )}
                    </div>

                    <div className="mb-5">
                      <button className="inline-block w-full text-center cursor-pointer rounded bg-myblue shadow-md shadow-black2 px-8 py-2 text-center font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-cyan focus-visible:ring active:text-black lg:text-base">
                        <input
                          type="submit"
                          value={`${
                            response.isLoading ? "Loading..." : "Sign up"
                          }`}
                          disabled={response.isLoading ? true : false}
                        />
                      </button>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                      <span className="relative bg-white px-4 text-sm text-gray-400">
                        Log in with Google
                      </span>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                      <svg
                        className="h-5 w-5 shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </div>

                  <div className="flex items-center justify-center bg-gray-100 p-4">
                    <p className="text-center text-sm text-gray-500">
                      Already have an account ?{" "}
                      <Link
                        className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                        to="/login"
                      >
                        sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            {/* <Header>sign in</Header> */}
          </div>
        
      <Footer />
    </>
  );
};
export default Register;
