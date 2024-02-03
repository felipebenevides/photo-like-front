import React, { useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { Box, Center, ChakraProvider, Container, Heading } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';



interface Photo {
    id: number;
    url: string;
    name: string;
    data: string;
    likes: number;
}

interface PhotoListProps {
    photos: Photo[];
    handleClickFollow: (photoId: number) => Promise<void>;
    handleClickUnfollow: (photoId: number) => Promise<void>;
    totalLikes: { [photoId: number]: number }; // Deve ser um objeto com chaves numéricas e valores numéricos
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, handleClickFollow, handleClickUnfollow, totalLikes }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    // Verificar se há fotos disponíveis
    if (!photos || photos.length === 0) {
        return <div>Nenhuma foto disponível</div>;
    }

    // Verificar se o índice atual está dentro do intervalo de fotos
    if (currentPhotoIndex < 0 || currentPhotoIndex >= photos.length) {
        return <div>Índice de foto inválido</div>;
    }

    const currentPhoto = photos[currentPhotoIndex];
    const likesCount = totalLikes[currentPhoto.id];

    return (
        <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg">

            <div style={{ textAlign: 'center' }}>
                <h2>Carousel de Fotos</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={`data:image/jpeg;base64,${currentPhoto.data}`}
                        alt={currentPhoto.name}
                        style={{ width: '1000px', height: '600px' }} // Defina o tamanho desejado aqui
                    />
                    <div>
                        <FaHeartBroken onClick={() => handleClickUnfollow(currentPhoto.id)} />
                        <FaHeart onClick={() => handleClickFollow(currentPhoto.id)} />
                        {/* <span>{likesCount} curtidas</span> */}
                    </div>
                    <div>

                        <button colorScheme='blue' onClick={prevPhoto}>Anterior</button>
                        <button onClick={nextPhoto}>Próxima</button>
                    </div>
                </div>
            </div>

        </Box>

    );
};

export default PhotoList;
