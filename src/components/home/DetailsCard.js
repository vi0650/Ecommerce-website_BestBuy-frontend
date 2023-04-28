import { useState } from "react";
import currency from "currency-formatter";
import { motion } from "framer-motion";
import h2p from "html2plaintext";
import htmlParser from "html-react-parser";
import toast, { Toaster } from "react-hot-toast";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import DetailsImage from "./DetailsImage";
import Quantity from "./Quantity";
import { addCart } from "../../store/reducers/cartReducer";
import { discount } from "../../utils/discount";
const DetailsCard = ({ product }) => {
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );
  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 && product.colors[0].color
  );
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    setQuantity(quantity + 1);
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPrice = discount(product.price, product.discount);
  let desc = h2p(product.description);
  desc = htmlParser(desc);
  const dispatch = useDispatch();
  const addToCart = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;
    newProduct["size"] = sizeState;
    newProduct["color"] = colorState;
    newProduct["quantity"] = quantity;
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const checkItem = cartItems.find((item) => item._id === newProduct._id);
    if (!checkItem) {
      dispatch(addCart(newProduct));
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      toast.error(`${newProduct.title} is already in cart`);
      return;
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
      <Toaster />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <DetailsImage image={product.image1} />

                <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                  sale
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100">
                  <DetailsImage image={product.image2} />
                </div>

                <div className="rounded-lg bg-gray-100">
                  <DetailsImage image={product.image3} />
                </div>
              </div>
            </div>
            <div className="md:py-8 ml-10">
              <div className="mb-2 md:mb-3">
                <span className="mb-0.5 inline-block text-gray-500">
                  Fancy Brand
                </span>
                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                  {product.title}
                </h2>
              </div>

              

              {product.colors.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                    Color
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <>
                        <button
                          key={color.color}
                          onClick={() => setColorState(color.color)}
                          type="button"
                          style={{ backgroundColor: color.color }}
                          className="h-10 w-10 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                        >
                          {colorState === color.color && (
                            <CheckOutlined className="text-white" size={25} />
                          )}
                        </button>
                      </>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="mb-8 md:mb-10">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                    Size
                  </span>

                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSizeState(size.name)}
                        type="button"
                        className="flex h-8 w-12 items-center justify-center rounded-md border bg-gray text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-indigo-200"
                      >
                        <span
                          className={`text-sm font-semibold uppercase  ${
                            sizeState === size.name
                              ? "text-myrose"
                              : "text-gray-900"
                          }`}
                        >
                          {size.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-800 md:text-2xl">
                    {" "}
                    {currency.format(discountPrice, { code: "USD" })}
                  </span>
                  <span className="mb-0.5 text-red-500 line-through">
                    {" "}
                    {currency.format(product.price, { code: "USD" })}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  incl. VAT plus shipping
                </span>
              </div>

              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>

                <span className="text-sm">2-4 day shipping</span>
              </div>

              <div className="flex gap-9">
                <Quantity quantity={quantity} inc={inc} dec={dec} />

                <button
                  onClick={addToCart}
                  className="image-shadow inline-block rounded-lg bg-mynavy px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-mypastelblue focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-10 md:mt-16 lg:mt-20">
                <div className="mb-3 text-lg font-semibold text-gray-800">
                  Description
                </div>

                <p className="text-gray-500">{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </motion.div>
  );
};

export default DetailsCard;
