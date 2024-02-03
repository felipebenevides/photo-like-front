import React, { useEffect, useState } from 'react';
import PhotoList from '../components/PhotoList';
import { Box, Center, ChakraProvider, Container } from '@chakra-ui/react';



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
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalLikes, setTotalLikes] = useState<Count[]>([]);

  useEffect(() => {
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

    const fetchTotalLikes = async () => {
      try {
        const response = await fetch('http://localhost:3000/photo-likes/like/countAll');
        if (!response.ok) {
          throw new Error('Failed to fetch total likes');
        }
        const data = await response.json();
        setTotalLikes(data.count);
      } catch (error) {
        console.error('Error fetching total likes:', error);
      }
    };

    fetchPhotos();
    fetchTotalLikes();
  }, []);

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
    <ChakraProvider>
      <Container >
        <Box >
          
             <PhotoList photos={photos} handleClickFollow={handleClickFollow} handleClickUnfollow={handleClickUnfollow} totalLikes={totalLikes} />

              <Box>
                <p>Total de curtidas:</p>
                <ul>
                  {totalLikes.map((like) => (
                    <li key={like.photoId}>{`Foto ID ${like.photoId}: ${like.count} curtidas`}</li>
                  ))}
                </ul>

              </Box>

        </Box>
      </Container>
    </ChakraProvider>

  );
};

export default PhotosPage;
