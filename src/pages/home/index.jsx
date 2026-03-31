import Adventure from "./Adventure";
import HeroSection from "./HeroSection";
import Summary from "./Summary";
import Timeline from "./Timeline";

const Home = () => {
  return (
    <>
      <div className="container relative">
        <HeroSection />
        <Timeline />
        <Adventure />
        <Summary />
      </div>
    </>
  );
};

export default Home;
