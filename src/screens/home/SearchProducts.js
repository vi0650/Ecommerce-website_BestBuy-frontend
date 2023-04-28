import { useParams } from "react-router-dom";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { useSearchProductsQuery } from "../../store/services/homeProducts";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";
import Footer from "../../components/home/footer/Footer";

const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });
  return (
    <>
      <Nav />
      <div className="py-20 sm:py-56 lg:py-12">
        <Header />
      </div>
      <div className=" my-container py-40 lg:py-28 sm:py-28 ">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className=" mb-5 max-w-md text-xl font-bold text-gray-400 md:text-lg lg:text-xl text-base font-medium text-gray-700">
              {data.count} products found for #{keyword} keyword
            </p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${keyword}`}
              theme="light"
            />
          </>
        ) : (
          <p className="alert-danger">
            No products found for #{keyword} keyword
          </p>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default SearchProducts;
