import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();
  const isHomePageRoute = router.pathname === '/';
  const buttonColor = isHomePageRoute ? 'black' : 'orange.100';

  return (
    <Flex
      justifyContent="flex-end"
      as="footer"
      bgGradient={
        isHomePageRoute
          ? undefined
          : 'linear(to-r, #20293e, #4a637feb, #20293e)'
      }
      bgColor={isHomePageRoute ? 'white' : undefined}
    >
      <Flex padding={6}>
        <ButtonGroup variant="link" size="lg" colorScheme="white">
          <Flex
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/adamrosepa/"
          >
            <Button color={buttonColor} aria-label="linked-in">
              <FaLinkedin />
            </Button>
          </Flex>
          <Flex
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/sculptedbyadam/"
          >
            <Button variant="link" color={buttonColor} aria-label="instagram">
              <FaInstagram />
            </Button>
          </Flex>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default Footer;
