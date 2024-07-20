import { DOMAIN } from "../../Api/config";

const ImageEncode = ({ imageUrl, className }  ) => {

    const encodeUrl =  encodeURIComponent(imageUrl);

  return (
    <img src={`${DOMAIN}/main/getImage?path=${encodeUrl}`} alt="Image" loading="lazy" className={className} />
  )
}

export default ImageEncode