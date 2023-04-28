import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setUserToken } from "../../../store/reducers/authReducer";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { useUserLoginMutation } from "../../../store/services/authService";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";
import Footer from "../../../components/home/footer/Footer";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const { state, onChange } = useForm({
    email: "",
    password: "",
  });
  const [loginUser, response] = useUserLoginMutation();
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(state);
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
      navigate("/user");
    }
  }, [response.isSuccess]);
  return (
    <>
      <Nav />
      <div className="flex flex-wrap justify-center">
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6"
        >
          <div className="mt-[100px] mb-[100px]">
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-5xl">
                  Login
                </h2>

                <form
                  onSubmit={onSubmit}
                  className="mx-auto max-w-lg rounded-lg border shadow-lg shadow-black2"
                >
                  <div className="flex flex-col gap-4 p-4 md:p-8">
                    <div>
                      <label className="mb-5 inline-block text-lg text-gray-800 sm:text-base">
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

                    <div>
                      <label className="mb-5 inline-block text-lg text-gray-800 sm:text-base">
                        Password
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
                            response.isLoading ? "Loading..." : "sign in"
                          }`}
                          disabled={response.isLoading ? true : false}
                        />
                      </button>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                      <span className="relative bg-white px-4 text-sm text-gray-400">
                        Are you admin ??
                      </span>
                    </div>

                    {/* <button class="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
          <svg class="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z" fill="white" />
          </svg>

          Continue with Facebook
        </button> */}

                    <Link to={"/auth/admin-login"}>
                      <button className="flex items-center w-full justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                        Admin
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center bg-gray-100 p-4">
                    <p className="text-center text-sm text-gray-500">
                      Don't have an account?{" "}
                      <Link
                        className="text-myblue transition duration-100 hover:text-gray-500 active:text-gray-500"
                        to="/register"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            {/* <Header>sign in</Header> */}
          </div>
        </motion.div>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
};
export default Login;
