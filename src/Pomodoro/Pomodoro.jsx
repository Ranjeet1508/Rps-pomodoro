import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Heading,
    VStack,
    Input,
    useToast,
} from '@chakra-ui/react';

const Pomodoro = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(1500); // Default 25 minutes
    const [workTime, setWorkTime] = useState(25); // Work session duration in minutes
    const [breakTime, setBreakTime] = useState(5); // Break session duration in minutes
    const [mode, setMode] = useState('work'); // 'work' or 'break'
    const [key, setKey] = useState(0); // Used to reset the timer
    const toast = useToast();

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        handleModeSwitch();
                        return prevTime;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, mode]);

    const handleModeSwitch = () => {
        toast({
            title: mode === 'work' ? 'Time for a break!' : 'Back to work!',
            status: mode === 'work' ? 'info' : 'success',
            duration: 3000,
            isClosable: true,
        });
        setMode((prevMode) => (prevMode === 'work' ? 'break' : 'work'));
        setTime(mode === 'work' ? breakTime * 60 : workTime * 60); // Adjust time based on mode
        setKey((prevKey) => prevKey + 1); // Reset progress bar
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(workTime * 60); // Reset to work time
        setMode('work');
        setKey((prevKey) => prevKey + 1);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    const handleWorkTimeChange = (e) => {
        const value = parseInt(e.target.value);
        setWorkTime(value);
        if (mode === 'work') {
            setTime(value * 60);
            setKey((prevKey) => prevKey + 1); // Reset progress bar
        }
    };

    const handleBreakTimeChange = (e) => {
        const value = parseInt(e.target.value);
        setBreakTime(value);
        if (mode === 'break') {
            setTime(value * 60);
            setKey((prevKey) => prevKey + 1); // Reset progress bar
        }
    };

    return (
        <Box p="2rem" bg="gray.100" minH="100vh">
            <VStack spacing={8}>
                <Heading>{mode === 'work' ? 'Work Time' : 'Break Time'}</Heading>
                <CircularProgress
                    value={(time / (mode === 'work' ? workTime * 60 : breakTime * 60)) * 100}
                    size="200px"
                    color={mode === 'work' ? 'green.400' : 'blue.400'}
                    key={key}
                >
                    <CircularProgressLabel fontSize="3xl">
                        {formatTime(time)}
                    </CircularProgressLabel>
                </CircularProgress>

                <Flex gap={4}>
                    <Button onClick={handleStartPause} colorScheme={isRunning ? 'red' : 'green'}>
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleReset} colorScheme="blue">
                        Reset
                    </Button>
                </Flex>

                <Flex gap={4}>
                    <Box>
                        <Heading size="md" mb="1rem">Work Time (minutes)</Heading>
                        <Input
                            type="number"
                            value={workTime}
                            onChange={handleWorkTimeChange}
                            width="120px"
                            padding="1rem"
                            fontSize="lg"
                            bg="white"
                            borderColor="gray.400"
                            borderRadius="md"
                        />
                    </Box>
                    <Box>
                        <Heading size="md" mb="1rem">Break Time (minutes)</Heading>
                        <Input
                            type="number"
                            value={breakTime}
                            onChange={handleBreakTimeChange}
                            width="120px"
                            padding="1rem"
                            fontSize="lg"
                            bg="white"
                            borderColor="gray.400"
                            borderRadius="md"
                        />
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );
};

export default Pomodoro;
