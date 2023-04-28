import { Link } from "react-router-dom";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";
const HomeProduct = ({ category }) => {
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
    page: "",
  });
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    data?.products?.length > 0 && (
      <>
        <div className="flex justify-between">
          {/* <div class="mb-6 flex items-end justify-between gap-4">
            <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">
              Selected
            </h2>

            <a
              href="#"
              class="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
            >
              Show more
            </a>
          </div> */}

          <span className="text-2xl font-bold text-gray-800 lg:text-3xl">
            {category.name}
          </span>
          <span className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">
            <Link to={`/cat-products/${category.name}`}>see all</Link>
          </span>
        </div>

        <div className="flex flex-wrap -mx-5 bg-mylblue2">
          {data?.products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </>
    )
  );
};

export default HomeProduct;
