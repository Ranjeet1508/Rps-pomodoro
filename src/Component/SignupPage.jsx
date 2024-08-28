// import React from 'react';
// import {
//     Box,
//     Flex,
//     Heading,
//     Input,
//     Button,
//     Stack,
//     FormControl,
//     FormLabel,
//     useColorModeValue,
//     Link,
// } from '@chakra-ui/react';

// const SignupPage = () => {
//     return (
//         <Flex
//             minH={'100vh'}
//             align={'center'}
//             justify={'center'}
//             bg={useColorModeValue('gray.100', 'gray.900')}
//         >
//             <Stack
//                 spacing={8}
//                 mx={'auto'}
//                 maxW={'lg'}
//                 py={12}
//                 px={6}
//                 bg={useColorModeValue('white', 'gray.800')}
//                 boxShadow={'lg'}
//                 borderRadius={'md'}
//             >
//                 <Stack align={'center'}>
//                     <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.200')}>
//                         Create your account
//                     </Heading>
//                 </Stack>
//                 <Box>
//                     <Stack spacing={4}>
//                         <FormControl id="name">
//                             <FormLabel>Name</FormLabel>
//                             <Input type="text" focusBorderColor="teal.500" />
//                         </FormControl>
//                         <FormControl id="email">
//                             <FormLabel>Email address</FormLabel>
//                             <Input type="email" focusBorderColor="teal.500" />
//                         </FormControl>
//                         <FormControl id="password">
//                             <FormLabel>Password</FormLabel>
//                             <Input type="password" focusBorderColor="teal.500" />
//                         </FormControl>
//                         <Stack spacing={10} pt={2}>
//                             <Button
//                                 bg={'teal.500'}
//                                 color={'white'}
//                                 _hover={{
//                                     bg: 'teal.600',
//                                 }}
//                             >
//                                 Sign up
//                             </Button>
//                         </Stack>
//                         <Stack pt={6}>
//                             <Link href="/login" color={'teal.500'} textAlign="center">
//                                 Already have an account? Sign in
//                             </Link>
//                         </Stack>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// };

// export default SignupPage;



import React, { useState } from 'react';
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

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://signp-login-backend.vercel.app/simple-user/signup', {
                name,
                email,
                password,
            });

            // Handle successful signup
            setSuccess('Signup successful! Please log in.');
            console.log('Response:', response.data);
            // Redirect or further processing can be done here
            setTimeout(() => {
                navigate('/login');
            },1000)
        } catch (err) {
            // Handle errors
            setError('Signup failed. Please try again.');
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
                        Create your account
                    </Heading>
                </Stack>
                <Box>
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>
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
                        <Stack spacing={10} pt={2}>
                            <Button
                                bg={'teal.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'teal.600',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Link href="/login" color={'teal.500'} textAlign="center">
                                Already have an account? Sign in
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

export default SignupPage;
