import Banner from "./Banner";
import ArrivalProducts from "./NewArrivalProducts/ArrivalProducts";
import TopCategory from "./TopCategory";

const Home = () => {
  return (
    <div>
      <Banner />
     <TopCategory/>
     {/* <TopProducts/> */}
     <ArrivalProducts/>
    </div>
  );
};

export default Home;
