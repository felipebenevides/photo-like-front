import React, { useEffect, useState } from 'react';
import PhotoList from '../components/PhotoList';

const PhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5083/api/images')
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Fotos</h1>
      <PhotoList photos={photos} />
    </div>
  );
};

export default PhotosPage;
