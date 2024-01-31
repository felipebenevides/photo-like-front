import React from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

interface Photo {
  id: number;
  url: string;
  name: string;
  data: string;
  likes: number;
}
interface Count {
    id: number;
    photoId: number;
    count: number;
    }
  

interface PhotoListProps {
  photos: Photo[];
  handleClickFollow: (photoId: number) => Promise<void>;
  handleClickUnfollow: (photoId: number) => Promise<void>;
  totalLikes: Count; // Adicione a propriedade de total de curtidas
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, handleClickFollow, handleClickUnfollow, totalLikes }) => {
    console.log('como chegou total',totalLikes)
  return (
    <div>
      <h2>Lista de Fotos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <h2>{photo.name}</h2>
            <img src={`data:image/jpeg;base64,${photo.data}`} alt={photo.name} />
            <FaHeart onClick={() => handleClickFollow(photo.id)} />
            <FaHeartBroken onClick={() => handleClickUnfollow(photo.id)} />

         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
