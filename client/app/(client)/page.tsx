import { Separator } from "@/components/ui/separator";
import Banner from "./_components/banner";
import NewArrivals from "./_components/new-arrivals";
import OurCustomers from "./_components/our-customers";
import TopSelling from "./_components/top-selling";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="container">
        <NewArrivals />
        <Separator />
        <TopSelling />
        <Separator />
        <OurCustomers />
      </div>
    </div>
  );
};

export default HomePage;
