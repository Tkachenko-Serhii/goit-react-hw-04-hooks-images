import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.gallery}>
      {images.map((image) => {
        return (
          <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onItemClick: PropTypes.func,
};
