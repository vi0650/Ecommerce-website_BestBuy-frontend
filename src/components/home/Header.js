import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = ({ children }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="header"
    >
      <div className="py-12 sm:py-36 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col overflow-hidden rounded-lg bg-black sm:flex-row md:h-80">
            <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
              <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">
                Summer Sale
                <br />
                Up to 70% off.
              </h2>

              <p className="mb-8 max-w-md text-gray-400">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>

              <div className="mt-auto">
              <Link
                to="/"
                className="image-shadow  inline-block rounded-lg bg-dodgerblue px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-mypastelblue focus-visible:ring active:bg-mypastelblue md:text-base"
              >
                About
              </Link>
              </div>
            </div>

            <div className="order-first h-48 w-full  sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
              <img
                src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500"
                loading="lazy"
                alt="Photo by Dom Hill"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
export default Header;
