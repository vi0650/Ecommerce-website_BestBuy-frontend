import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { toggleSearchBar } from "../../store/reducers/globalReducer";

const Search = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const { searchBar } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const closeSearch = (e) => {
    const id = e.target.getAttribute("id");
    id === "search" && dispatch(toggleSearchBar());
  };
  const searchProducts = () => {

    if (state === "") {
      return;
    }
    navigate(`/search-products/${state}/1`);
    dispatch(toggleSearchBar());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  return (
    searchBar && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 w-full h-full bg-black/50 z-[300]"
        id="search"
        onClick={closeSearch}
      >
        <div className="flex -mx-8 justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-8 mt-28 relative">
            <input
              type="text"
              name=""
              id=""
              className="placeholder:italic h-fit placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-14 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              value={state}
              onChange={(e) => setState(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SearchOutlined
              className="absolute top-[0px] right-12 text-2xl text-gray-500 cursor-pointer"
              onClick={searchProducts}
            />
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Search;
