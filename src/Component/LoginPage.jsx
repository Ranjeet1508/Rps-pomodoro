
import React, { useContext, useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Stack,
    FormControl,
    FormLabel,
    useColorModeValue,
    Link,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {userName, setUserName} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://signp-login-backend.vercel.app/simple-user/login', {
                email,
                password,
            });

            // Handle successful login
            setSuccess('Login successful!');
            setUserName(response?.data?.isUser?.name);
            // Redirect or further processing can be done here
            setTimeout(() => {
                navigate('/');
            },2000)
        } catch (err) {
            // Handle errors
            setError('Login failed. Please check your credentials.');
            console.error('Error:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.100', 'gray.900')}
        >
            <Stack
                spacing={8}
                mx={'auto'}
                maxW={'lg'}
                py={12}
                px={6}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                borderRadius={'md'}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.200')}>
                        Sign in to your account
                    </Heading>
                </Stack>
                <Box>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'teal.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'teal.600',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                            <Link href='/signup' color={'teal.500'} textAlign="center">
                                don't have an account? signup here
                            </Link>
                        </Stack>
                        {error && (
                            <Alert status="error">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert status="success">
                                <AlertIcon />
                                {success}
                            </Alert>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginPage;
