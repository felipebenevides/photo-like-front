import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

interface LoginFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl isInvalid={!!errors.username} mb={4}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
