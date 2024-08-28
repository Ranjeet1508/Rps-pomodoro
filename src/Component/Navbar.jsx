import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useDisclosure,
    Stack,
    Heading,
    Spacer,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {userName, setUserName} = useContext(UserContext);
    const navigate = useNavigate();

    // Call useColorModeValue at the top level
    const bgColor = useColorModeValue('teal.500', 'teal.700');
    const hoverColor = useColorModeValue('teal.600', 'teal.800');
    const textColor = 'white';

    const handleLogout = () => {
        setUserName('');
        localStorage.removeItem('playerScore');
        localStorage.removeItem('computerScore');
        navigate('/login')
    };

    return (
        <>
            <Box bg={bgColor} px={4} boxShadow="md">
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        color={textColor}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Heading size="md" color={textColor}>Schoolnet</Heading>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <Link
                                href="/"
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: hoverColor }}
                                color={textColor}
                            >
                                RPS Game
                            </Link>
                            <Link
                                href="/pomodoro"
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: hoverColor }}
                                color={textColor}
                            >
                                Pomodoro App
                            </Link>
                        </HStack>
                    </HStack>
                    <Spacer />
                    <HStack>
                        {userName ? (
                            <Button
                                onClick={handleLogout}
                                colorScheme='white'
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link
                                href="/login"
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: hoverColor }}
                                color={textColor}
                            >
                                Login
                            </Link>
                        )}
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Link href="/" color={textColor}>RPS Game</Link>
                            <Link href="/pomodoro" color={textColor}>Pomodoro App</Link>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
};

export default Navbar;


