import Navbar from "../components/Navbar";
import UserInput from "../components/UserInput";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <Navbar />
      <UserInput />
    </div>
  );
};

export default LandingPage;
