import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Lottie from 'react-lottie';
import welcomeLottie from "../assets/lotties/welcomeLottie.json";
import eventListLottie from '../assets/lotties/eventList.json';
import notificationLottie from '../assets/lotties/notificationLottie.json';
import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap"');

  .textLottie {
    font-family: "Chewy", system-ui;
    margin: 0;
    padding: 0;
  }

  .imageBackground{
        width: 100vw;
        height: 100vh;
        position: absolute;
        background-image: url(https://s0.smartresize.com/wallpaper/1003/997/HD-wallpaper-artistic-mountain-minimalist-blue.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0.2;
    }
`;

const Onboarding = ({ onFinish }) => {
    const [step, setStep] = useState(0);
    const textSteps = [
        "Bienvenido a nuestra aplicación de gestión de eventos y recordatorios",
        "Crea, edita, elimina y organiza tus eventos fácilmente",
        "Recibe notificaciones para que no se te pase nada",
    ];

    const imageSteps = [
        welcomeLottie,
        eventListLottie,
        notificationLottie
    ];
    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };
    const nextStep = () => {
        if (step < textSteps.length - 1) {
            setStep(step + 1);
        } else {
            onFinish();
        }
    };

    const defaultOptionsLottie = {
        loop: true,
        autoplay: true,
        animationData: imageSteps[step],
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (<>
        <Global styles={globalStyles} />
        <Box h="100vh" w="100vw" display="flex" justifyContent="center" alignItems="center" flexDirection="column" bg="#081526" color="#fff" padding="10">
            <div className="imageBackground">

            </div>
            <Lottie
                options={defaultOptionsLottie}
                height={400}
                width={400}
            />
            <div style={{ width: "30%", marginTop: 15 }}>
                <Text fontSize="2xl" textAlign="center" className="textLottie">
                    {textSteps[step]}
                </Text>
            </div>
            <div>
                {step > 0 && < Button onClick={prevStep} margin="15" bg="#0e3061" color="#fff" w={200}>Anterior</Button>}
                <Button onClick={nextStep} margin="15" bg="#0e3061" color="#fff" w={200}>
                    {step === textSteps.length - 1 ? "¡Empezar!" : "Siguiente"}
                </Button>
            </div>
        </Box >
    </>
    );
};

export default Onboarding;
