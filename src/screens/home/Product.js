import { Link, useParams } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useGetProductQuery } from "../../store/services/productService";
import Nav from "../../components/home/Nav";
import DetailsCard from "../../components/home/DetailsCard";
import ProductLoader from "../../components/home/ProductLoader";
import Footer from "../../components/home/footer/Footer";

const Product = () => {
  const { name } = useParams();
  const { data, isFetching } = useGetProductQuery(name);
  console.log(data, isFetching);
  return (
    <>
      <Nav />
      <div className="my-container mt-24">
        {isFetching ? (
          <ProductLoader />
        ) : (
          <>
            <ul className="flex items-center">
              <li className="capitalize text-gray-600">
                <Link to="/">home</Link>
              </li>
              <RightOutlined className="block mx-2" />
              <li className="capitalize text-gray-600">
                <Link to={`/cat-products/${data.category}`}>
                  {data.category}
                </Link>
              </li>
              <RightOutlined className="block mx-2" />
              <li className="capitalize text-gray-600">
                <Link to={`/product/${data._id}`}>{data.title}</Link>
              </li>
            </ul>
            <DetailsCard product={data} />
          </>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Product;
