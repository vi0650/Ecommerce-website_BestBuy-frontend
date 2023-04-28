import { useParams } from "react-router-dom";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";
import Footer from "../../components/home/footer/Footer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

const CatProducts = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });
  return (
    <>
      <Nav />
      <div className="py-20 sm:py-56 lg:py-12">
        <Header />
      </div>

      <div className="my-container my-40 sm:mt-52 lg:mt-36">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} products found in #{name} category
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
              path={`cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
                No products found in  <strong>#{name}</strong>  category —
                <strong> Check out Other Product Pleases!</strong>
              </Alert>
            </Stack>
            {/* <p className="alert-danger">No products found in #{name} category</p> */}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CatProducts;
