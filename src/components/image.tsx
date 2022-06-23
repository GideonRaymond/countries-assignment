import { useState } from "react";

interface ImageProps {
  url: string;
}

const Image: React.FunctionComponent<ImageProps> = (props) => {
  const [imgSrc, setImgSrc] = useState(props.url);

  const handleError = () => {
    console.log("HERE");
    setImgSrc("");
  };

  return (
    <img
      src={imgSrc}
      onError={handleError}
      alt=""
      width={40}
      className="mr-3"
    />
  );
};

export default Image;
