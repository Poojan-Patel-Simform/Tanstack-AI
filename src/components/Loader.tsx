import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <Triangle
      visible={true}
      height="120"
      width="120"
      color="#007595"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
