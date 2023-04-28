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
import toast from 'react-hot-toast';

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
    toast.success('Registration successful!');
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
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-5xl">
                  Sign up
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
                      <label className="mb-5 inline-block text-sm text-gray-800 sm:text-base">
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

                  </div>

                  <div className="flex items-center justify-center bg-gray-100 p-4">
                    <p className="text-center text-sm text-gray-500">
                      Already have an account ?{" "}
                      <Link
                        className="text-myblue transition duration-100 hover:text-gray-500 active:text-gray-500"
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
