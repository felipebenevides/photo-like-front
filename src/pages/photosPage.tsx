import React, { useEffect, useState } from 'react';
import PhotoList from '../components/PhotoList';

// Definindo o tipo para uma foto
interface Photo {
  id: number;
  name: string;
  data: string;
}

interface Count {
  id: number;
  photoId: number;
  count: number;
}

// Função para curtir uma foto
const likePhoto = (photoId: number) => {
  fetch(`http://localhost:3000/photo-likes/${photoId}/like`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log('Photo liked:', data))
  .catch(error => console.error('Error liking photo:', error));
};

// Função para descurtir uma foto
const unlikePhoto = (photoId: number) => {
  fetch(`http://localhost:3000/photo-likes/${photoId}/like`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log('Photo unliked:', data))
  .catch(error => console.error('Error unliking photo:', error));
};

const PhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]); // Definindo o tipo explícito para photos como um array de Photo
  const [totalLikes, setTotalLikes] = useState<Count[]>([]);

  useEffect(() => {
    // Função para buscar as fotos da API
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:5083/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    // Função para buscar o total de curtidas
    const fetchTotalLikes = async () => {
      try {
        const response = await fetch('http://localhost:3000/photo-likes/like/countAll');


        if (!response.ok) {
          throw new Error('Failed to fetch total likes');
        }
        const data = await response.json();
        console.log('total list',data.count)

        setTotalLikes(data.count); // Supondo que a resposta do servidor inclua um objeto com a contagem de curtidas
      } catch (error) {
        console.error('Error fetching total likes:', error);
      }
    };

    // Chamando a função de busca das fotos ao montar a página
    fetchPhotos();
    fetchTotalLikes();

    console.log('totalLikes',totalLikes);
  }, []);

  useEffect(() => {
    console.log('totalLikes', totalLikes);
  }, [totalLikes]);

  // Função para curtir uma foto
  const handleClickFollow = async (photoId: number) => {
    try {
      await likePhoto(photoId); // Chamando a função para curtir a foto
      // Atualizando a lista de fotos após curtir
      const updatedPhotos = photos.map((photo) =>
        photo.id === photoId ? { ...photo, liked: true } : photo
      );
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  // Função para descurtir uma foto
  const handleClickUnfollow = async (photoId: number) => {
    try {
      await unlikePhoto(photoId); // Chamando a função para descurtir a foto
      // Atualizando a lista de fotos após descurtir
      const updatedPhotos = photos.map((photo) =>
        photo.id === photoId ? { ...photo, liked: false } : photo
      );
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error('Error unliking photo:', error);
    }
  };

  return (
    <div>
    <h1>Lista de Fotos</h1>
    <PhotoList photos={photos} handleClickFollow={handleClickFollow} handleClickUnfollow={handleClickUnfollow} totalLikes={totalLikes}/>
    <p>Total de curtidas:</p>
    <ul>
      {totalLikes.map((like) => (
        <li key={like.photoId}>{`Foto ID ${like.photoId}: ${like.count} curtidas`}</li>
      ))}
    </ul>
  </div>
  );
};

export default PhotosPage;
