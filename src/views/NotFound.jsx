import { Box, Button, Text, Heading } from "@chakra-ui/react";
import Lottie from 'react-lottie';

import notFoundLottie from '../assets/lotties/notFoundLottie.json';
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
        opacity: 0.1;
    }
`;

const NotFound = ({ onFinish }) => {
    const defaultOptionsLottie = {
        loop: true,
        autoplay: true,
        animationData: notFoundLottie,
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
                height={"80vh"}
                width={"80vw"}
            />
        </Box >
    </>
    );
};

export default NotFound;
