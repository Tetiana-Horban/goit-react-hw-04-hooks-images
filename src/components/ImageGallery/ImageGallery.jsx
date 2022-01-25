import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImage={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ImageGalleryList>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
