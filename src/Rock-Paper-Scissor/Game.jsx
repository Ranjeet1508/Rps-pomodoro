import React, { useState, useEffect, useContext } from 'react';
import {
    Heading,
    Button,
    Select,
    Flex,
    Box,
    Center,
    Text,
    VStack,
} from '@chakra-ui/react';

const Game = () => {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [winner, setWinner] = useState('');

    // Load scores from localStorage when the component mounts
    useEffect(() => {
        const savedPlayerScore = localStorage.getItem('playerScore');
        const savedComputerScore = localStorage.getItem('computerScore');

        if (savedPlayerScore !== null) setPlayerScore(parseInt(savedPlayerScore));
        if (savedComputerScore !== null) setComputerScore(parseInt(savedComputerScore));
    }, []);

    // Save scores to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('playerScore', playerScore);
        localStorage.setItem('computerScore', computerScore);
    }, [playerScore, computerScore]);

    const playGame = (e) => {
        const playerSelection = e.target.value;
        setPlayerChoice(playerSelection);
        const number = Math.floor(Math.random() * 3) + 1;

        const computer_output =
            number === 1 ? 'Rock' : number === 2 ? 'Paper' : 'Scissors';
        setComputerChoice(computer_output);

        if (playerSelection === computer_output) {
            setWinner("It's a tie!");
        } else if (
            (playerSelection === 'Rock' && computer_output === 'Scissors') ||
            (playerSelection === 'Paper' && computer_output === 'Rock') ||
            (playerSelection === 'Scissors' && computer_output === 'Paper')
        ) {
            setWinner('You Win!');
            setPlayerScore((prev) => prev + 1);
        } else {
            setWinner('You Lose!');
            setComputerScore((prev) => prev + 1);
        }
    };

    const restartGame = () => {
        setComputerChoice('');
        setPlayerChoice('');
        setWinner('');
        setPlayerScore(0);
        setComputerScore(0);
        localStorage.removeItem('playerScore');
        localStorage.removeItem('computerScore');
    };

    const getResultMessage = () => {
        if (winner === "It's a tie!") return "It's a tie! Both chose the same.";
        if (winner === 'You Win!') {
            if (playerChoice === "Rock" && computerChoice === "Scissors") return "Rock crushes Scissors";
            if (playerChoice === "Paper" && computerChoice === "Rock") return "Paper covers Rock";
            if (playerChoice === "Scissors" && computerChoice === "Paper") return "Scissors cuts Paper";
        }
        if (winner === 'You Lose!') {
            if (playerChoice === "Rock" && computerChoice === "Paper") return "Paper covers Rock";
            if (playerChoice === "Paper" && computerChoice === "Scissors") return "Scissors cuts Paper";
            if (playerChoice === "Scissors" && computerChoice === "Rock") return "Rock crushes Scissors";
        }
        return "";
    };

    return (
        <Box p="2rem" bg="gray.100" minH="100vh">
            <Center mb="2rem">
                <Heading>Rock Paper Scissors</Heading>
            </Center>

            <Center>
                <Flex
                    mt="3rem"
                    w={{ base: '80vw', md: '50vw' }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap="4"
                    bg="white"
                    p="2rem"
                    borderRadius="md"
                    boxShadow="md"
                    h="15rem"
                >
                    <VStack>
                        <Heading size="lg">Player</Heading>
                        <Text color="blue.500">Score: {playerScore}</Text>
                        <Text fontSize="2xl" color="blue.500">
                            {playerChoice}
                        </Text>
                    </VStack>

                    <VStack>
                        <Heading size="lg">Computer</Heading>
                        <Text color="blue.500">Score: {computerScore}</Text>
                        <Text fontSize="2xl" color="red.500">
                            {computerChoice}
                        </Text>
                    </VStack>
                </Flex>
            </Center>

            <Center mt="2rem">
                <Box>
                    <Select
                        w="20vw"
                        placeholder="Select to Play"
                        onChange={playGame}
                        bg="white"
                        borderColor="gray.300"
                    >
                        <option value="Rock">Rock</option>
                        <option value="Paper">Paper</option>
                        <option value="Scissors">Scissors</option>
                    </Select>
                </Box>
                <Button
                    ms={2}
                    disabled={playerChoice === ''}
                    onClick={restartGame}
                    colorScheme="green"
                >
                    Restart
                </Button>
            </Center>

            <Center mt="4rem">
                <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color={winner === 'You Win!' ? 'green.500' : 'red.500'}
                >
                    {winner}
                </Text>
            </Center>

            <Center mt="2rem">
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={winner === 'You Win!' ? 'green.500' : 'red.500'}
                >
                    {getResultMessage()}
                </Text>
            </Center>
        </Box>
    );
};

export default Game;
