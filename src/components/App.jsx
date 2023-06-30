import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import * as API from './api/api';
import { useState, useEffect } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const addImages = async () => {
      try {
        setIsLoading(true);

        const data = await API.fetchImages(search, currentPage);

        console.log(data, 'data name');
        console.log(data.hits, 'data hits');

        if (data.hits.length === 0) {
          return 'Sorry image not found';
        }

        const sortedImages = API.sortedImages(data.hits);
        console.log(sortedImages, 'sortedImages show');

        setImages(prevImages => [...prevImages, ...sortedImages]);
        setIsLoading(false);
        setError('');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError('Something went wrong!');
        console.log('error adding', error);
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
    console.log('addin images');
  }, [search, currentPage]);

  const handleSubmit = query => {
    setSearch(query);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {images.length > 0 && search !== '' ? (
        <ImageGallery images={images} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '25px' }}>
          Image gallery is empty
        </p>
      )}
      {isLoading && search !== '' && <Loader />}
      {images.length > 0 &&
        search !== '' &&
        totalPages !== currentPage &&
        !isLoading && <Button onClick={loadMore} />}
    </div>
  );
};

export default App;
