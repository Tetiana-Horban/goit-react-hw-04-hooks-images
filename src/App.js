import { React, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import fetchHits from './services/api';
import { BackgroundImg } from './components/ImageGallery/ImageGallery.styled';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { AppWrapper } from './GlobalStyle';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [images, setImages] = useState([]);
  const [seachImage, setSeachImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  const handleFormSubmit = seachImage => {
    setSeachImage(seachImage);
    setImages([]);
    setPage(1);
  };
  const clickOnGalleryImg = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!seachImage) {
      return;
    }
    if (page === 1) {
      setStatus(Status.PENDING);
    }
    const getImages = () => {
      fetchHits(seachImage, page)
        .then(hits => {
          if (hits.hits.length === 0) {
            toast.info('Nothing found for your request');
          }
          setImages(prevImage => [...prevImage, ...hits.hits]);
          setStatus(Status.RESOLVED);
          scrollToButton();
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };
    getImages();
  }, [page, seachImage]);

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const scrollToButton = () => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && <BackgroundImg />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'resolved' && (
        <ImageGallery images={images} openModal={clickOnGalleryImg} />
      )}
      {images.length > 0 && <Button onClick={changePage} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={seachImage} />
        </Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppWrapper>
  );
};

export default App;
