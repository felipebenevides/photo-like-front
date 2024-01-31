import { Box, Center, ChakraProvider, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (data: any) => {
    // Aqui você pode enviar os dados do formulário para a sua API de backend para autenticação
    console.log('Login data:', data);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.sm">
        <Box mt={20}>
          <Center>
            <Heading as="h1" size="xl" mb={8}>
             Login
            </Heading>
          </Center>
          <LoginForm onSubmit={handleLogin} />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default LoginPage;
