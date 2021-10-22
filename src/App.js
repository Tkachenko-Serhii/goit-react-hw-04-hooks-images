import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages, popularImages } from "./Api/Api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

import "./App.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [fullImg, setFullImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!searchValue) {
      popularImages(page)
        .then((images) => {
          if (!images.length) {
            return toast.error(
              "No images for you request, please enter more specific query"
            );
          }
          setImages((prevState) => [...prevState, ...images]);
          setStatus(Status.RESOLVED);
        })
        .catch((error) => {
          setStatus(Status.REJECTED);
        })
        .finally(() => {
          if (page > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        });
      return;
    }

    setStatus(Status.PENDING);

    fetchImages(searchValue, page)
      .then((images) => {
        if (!images.length) {
          return toast.error(
            "No images for you request, please enter more specific query"
          );
        }
        setImages((prevState) => [...prevState, ...images]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      });
  }, [searchValue, page]);

  const handleFormSubmit = (newSearchValue) => {
    if (searchValue !== newSearchValue) {
      setSearchValue(newSearchValue);
      setImages([]);
      setPage(1);
    }
  };

  const toggleModal = (largeImageURL) => {
    if (!showModal) {
      setShowModal(!showModal);
      setFullImg(largeImageURL);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (status === Status.PENDING) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loader />;
      </>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <div className='App'>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} onClick={toggleModal} />
        <Button loadMore={loadMore} images={images} />
        {showModal && (
          <Modal
            src={fullImg}
            onClose={() => {
              setFullImg(null);
              setShowModal(false);
            }}
          />
        )}
      </div>
    );
  }
  if (status === Status.REJECTED) {
    return toast.error(
      "No images for you request, please enter more specific query"
    );
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
    </>
  );
}
