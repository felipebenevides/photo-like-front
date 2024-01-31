import React from 'react';

interface Photo {
  id: number;
  url: string;
  name: string;
  data: string;
}

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  return (
    <div>
      <h2>Lista de Fotos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <h2>{photo.name}</h2>
          <img src={`data:image/jpeg;base64,${photo.data}`} alt={photo.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
