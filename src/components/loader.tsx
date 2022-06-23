import React from "react";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  if (!props.isLoading) return <></>;
  return (
    <div className="flex justify-content-center align-items-center absolute top-0 left-0 h-screen w-screen bg-black-alpha-40 z-5">
      <i className="pi pi-spin pi-spinner text-4xl text-white"></i>
    </div>
  );
};

export default Loader;
