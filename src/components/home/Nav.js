import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  console.log(total);
  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      vertical: "top",
      horizontal: "right",
      padding: "0 4px",
    },
  }));

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <header className="mb-10 drop-shadow-2xl fixed fixed top-0 right-0 left-0 bottom-[4] z-50 nav">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8 h-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="logo"
            >
              <img
                height={"170px"}
                width={"170px"}
                className="h-auto flex image-shadow"
                src="/4.png"
              ></img>
            </Link>

            

            <div className="flex divide-x space-x-4">
              <Link
                onClick={() => dispatch(toggleSearchBar())}
                className="flex image-shadow rounded-full h-12 w-12 flex-col cursor-pointer items-center justify-center gap-1.5 transition duration-100 hover:image-shadow active:image-shadow sm:flex sm:h-16 sm:w-16 md:h-20 md:w-20 my-2"
              >
                <IconButton
                  aria-label="search"
                  className="flex flex-col gap-1.5 h-20 w-20"
                >
                  <SearchOutlined
                    size={50}
                    color="action"
                    className="h-6 w-6 text-white"
                  />
                  <span className="hidden text-xs font-semibold text-white sm:block">
                    Search
                  </span>
                </IconButton>
              </Link>

              {userToken ? (
                <Link
                  to="/user"
                  className="flex image-shadow rounded-full h-12 w-12 flex-col cursor-pointer items-center justify-center gap-1.5 transition duration-100 hover:image-shadow active:image-shadow sm:flex sm:h-16 sm:w-16 md:h-20 md:w-20 my-2"
                >
                  <IconButton
                    aria-label="login"
                    className="flex flex-col gap-1.5 h-20 w-20"
                  >
                    <SettingOutlined
                      size={50}
                      color="action"
                      className="h-6 w-6 text-white"
                    />
                    <span className="hidden text-xs font-semibold text-white sm:block">
                      {user?.name}
                    </span>
                  </IconButton>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex  rounded-full image-shadow h-12 w-12 flex-col cursor-pointer items-center justify-center gap-1.5 transition duration-100 hover:image-shadow active:image-shadow sm:flex sm:h-16 sm:w-16 md:h-20 md:w-20 my-2"
                >
                  <IconButton
                    aria-label="login"
                    className="flex flex-col gap-1.5 h-20 w-20"
                  >
                    <UserOutlined
                      size={50}
                      color="action"
                      className="h-6 w-6 text-white"
                    />
                    <span className="hidden text-xs font-semibold text-white sm:block">
                      Sign in
                    </span>
                  </IconButton>
                </Link>
              )}
              <Link
                to="/cart"
                className="flex image-shadow rounded-full h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:image-shadow active:image-shadow sm:h-16 sm:w-16 md:h-20 md:w-20 my-2"
              >
                {/* <Badge badgeContent={items} color="primary">
                  <ShoppingCartOutlined size={50} color="action" />
                </Badge> */}
                <IconButton
                  aria-label="cart"
                  className="flex flex-col gap-1.5 h-20 w-20"
                >
                  <StyledBadge badgeContent={items} color="primary">
                    <ShoppingCartOutlined size={50} color="action" className="h-6 w-6 text-white"/>
                  </StyledBadge>
                  <span className="hidden text-xs font-semibold text-white sm:block">
                    Cart
                  </span>
                </IconButton>
              </Link>

              {/* <button
                type="button"
                className="flex image-shadow rounded-full h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:image-shadow active:image-shadow sm:h-16 sm:w-16 md:h-20 md:w-20 my-2 lg:hidden"
              >
                <Link>
                  <IconButton
                    aria-label="Menu"
                    className="flex flex-col gap-1.5 h-20 w-20"
                  >
                    <BarsOutlined size={50} color="action" />
                    <span className="hidden text-xs font-semibold text-black sm:block">
                      Menu
                    </span>
                  </IconButton>
                </Link>
              </button> */}
            </div>
          </div>
        </header>
      </div>
      <Search />
    </>
  );
};

export default Nav;
