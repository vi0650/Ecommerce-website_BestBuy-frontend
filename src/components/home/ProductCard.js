import currency from "currency-formatter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StarFilled } from "@ant-design/icons";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const discount = product.discount;
  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  let result = 0;
  let one = 0,
    two = 0,
    three = 0,
    four = 0,
    five = 0,
    total = 0;
  if (product?.reviews?.length > 0) {
    product?.reviews?.forEach((item) => {
      if (item.rating === 1) {
        one += 1;
      }
      if (item.rating === 2) {
        two += 1;
      }
      if (item.rating === 3) {
        three += 1;
      }
      if (item.rating === 4) {
        four += 1;
      }
      if (item.rating === 5) {
        five += 1;
      }
    });
    total = one + two + three + four + five;
    result = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / total;
  } else {
    total = 0;
    result = 0;
  }
  const finalResult = parseFloat(result).toFixed(1);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-2 py-10"
      key={product._id}
    >
      <Link to={`/product/${product._id}`}>
        <div className="w-full">
          <div>
            <div className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100">
              <img
                src={`/images/${product.image1}`}
                alt="product image"
                className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <span className="absolute left-0 top-3 rounded-r-lg bg-myred px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                -{discount}%
              </span>
            </div>

            <div className="flex items-start justify-between gap-2 rounded-b-lg bg-mywhite p-4">
              <div className="flex flex-col">
                <p className="capitalize font-bold text-lg mt-2 text-gray-800 text-wrap transition duration-100 hover:text-gray-500 sm:text-md lg:text-lg">
                  {product.title}
                </p>
                <span className="text-sm text-gray-500 lg:text-base">
                  by Best_Buy
                </span>
                <div className="flex items-center">
                  <div className="flex items-center space-x-2 mb-1 mt-3">
                    <span>{finalResult}</span>
                    {/* <StarFilled color="orange" /> */}
                    <Box
                      className="mt-2 "
                      sx={{
                        "& > legend": { mt: 5, mr: 3 },
                      }}
                    >
                      <Rating name="read-only" value={finalResult} readOnly />
                    </Box>

                    <span className="flex mb-2 mt-3">({total})</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ml-3 mt-2 items-end">
                <span className="font-bold text-lg text-gray-600 lg:text-lg">
                  {currency.format(discountPrice, { code: "IND" })}
                </span>
                <span className="text-myred text-md mt-2 line-through">
                  {currency.format(product.price, { code: "USD" })}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="w-full">
          <img
            src={`/images/${product.image1}`}
            alt="product image"
            className="w-full h-[310px] object-cover"
          />
        </div> */}

          {/* <p className="capitalize text-base font-medium text-black my-2.5">
          {product.title}
        </p>

        <div className="flex items-center">
          <div className="flex items-center space-x-2 mb-1">
            <span>{finalResult}</span>
            <StarFilled color="orange" />
            <span>({total})</span>
          </div>
        </div> */}

          {/* <div className="flex justify-between">
          <span className="text-lg font-medium text-black">
            {currency.format(discountPrice, { code: "IND" })}
          </span>
          <span className="text-lg font-medium text-gray-600 line-through">
            {currency.format(product.price, { code: "USD" })}
          </span>
        </div> */}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
