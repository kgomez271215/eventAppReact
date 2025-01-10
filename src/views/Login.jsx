import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text, Divider, AbsoluteCenter } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Button, Stack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import loginLottie from '../assets/lotties/loginLottie.json';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";

export const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const defaultOptionsLottie = {
        loop: true,
        autoplay: true,
        animationData: loginLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const handleNavigateHome = () => {
        navigate('/');
    };
    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" minWidth="100vw" bg="#06162e">
            <Box display='flex' bg="#0e3061" width="60vw" height="auto" borderRadius={15}>
                <Box width="50%">
                    <Lottie
                        options={defaultOptionsLottie}
                    />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" width="50%" padding={10}>
                    <Card width="100%" height="100%" bg="#1a3f73">
                        <CardBody>
                            <Text textAlign="center" className='textLottie' fontSize="30px" color="white" fontWeight="bold" marginBottom={10}>Bienvenido</Text>
                            <Stack spacing={3} color={"white"} marginBottom={5}>
                                <Input variant='outline' placeholder='Usuario' />
                                <InputGroup>
                                    <Input variant='outline' placeholder='Contrasña' type={show ? 'text' : 'password'} />
                                    <InputRightElement onClick={handleClick}>
                                        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
                                    </InputRightElement>
                                </InputGroup>
                                <Text textAlign="end" fontSize={"11px"} fontWeight={"bold"} marginTop={2}>¿Olvidaste tu contraseña?</Text>
                            </Stack>
                            <Button width="100%" colorScheme='whiteAlpha' color="white">Iniciar Sesión</Button>
                            <Button color="white" width="100%" colorScheme='blackAlpha' marginTop={3} onClick={handleNavigateHome}>Ingresar Sin Conexion</Button>
                            <Box display="flex" alignItems="center" justifyContent="center" width="100%" marginTop={10}>
                                <Divider marginEnd={5} />
                                <Text fontWeight={"bold"} color={"white"}> O </Text>
                                <Divider marginStart={5} />
                            </Box>
                            <Box width="100%" marginTop={10} display="flex" alignItems="center" justifyContent="center">
                                <Box display="flex" alignItems="center" justifyContent="space-around" width="80%">
                                    <Box as='button' borderRadius='md' bg='#6D84A5' color='white' px={4} h={10}>
                                        <FaFacebook />
                                    </Box>
                                    <Box as='button' borderRadius='md' bg='#6D84A5' color='white' px={4} h={10}>
                                        <FaGoogle />
                                    </Box>
                                    <Box as='button' borderRadius='md' bg='#6D84A5' color='white' px={4} h={10}>
                                        <FaMicrosoft />
                                    </Box>
                                </Box>
                            </Box>
                        </CardBody>
                    </Card>
                </Box>
            </Box>
        </Flex >
    )
}
