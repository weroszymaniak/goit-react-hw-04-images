import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const onChangeModal = () => {
    setShowModal(showModal => !showModal);
  };
  return (
    <>
      <li className={css.item}>
        <img
          className={css.image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={onChangeModal}
        />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={onChangeModal}
          />
        )}
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
