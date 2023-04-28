import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
import Footer from "../../components/home/footer/Footer";


const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [params] = useSearchParams();
  const id = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      toast.success(data.msg);
      dispatch(emptyCart());
      navigate("/user");
    }
  }, [isSuccess]);
  return (
    <>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-[70px]">
        
      <div class="bg-white py-6 sm:py-8 lg:py-12">
          <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div class="rounded-lg bg-gray-100 px-4 py-6 md:py-8 lg:py-12">
              <p class="mb-2 text-center font-semibold text-indigo-500 md:mb-3 lg:text-lg">
                Introducing
              </p>

              <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
               Account Setting
              </h2>

              
            </div>
          </div>
        </div>


        <div className="my-container mt-[40px] sm:mt-52 lg:mt-12">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading">name</h1>
              <span className="block mt-3 capitalize font-medium text-sm">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
