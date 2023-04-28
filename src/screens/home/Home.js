import Categories from "../../components/home/Categories";
import HomeProduct from "../../components/home/HomeProduct";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";
import Footer from "../../components/home/footer/Footer";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Nav />
      <div className="mt-[90px]">
        <Slider />
      </div>
      <div className="my-container mt-9">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            #Trending Products
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Trending products are those that are currently in high demand and
            are popular among consumers. These products can vary widely in type
            and category, from fashion and beauty items to technology and home
            goods.
          </p>
        </div>
        <Categories />

        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
      <Footer />
    </>
  );
};
export default Home;
