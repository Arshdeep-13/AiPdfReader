import { Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute top-[40%] left-[45%]">
      <Vortex
        visible={true}
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
};

export default Loader;
