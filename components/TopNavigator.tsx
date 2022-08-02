import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NAV_ROUTES } from '../lib/routes';
import ContactFormButton from './ContactFormButton';
import DrawerButton from './DrawerButton';

const TopNavigator = () => {
  const router = useRouter();
  const isHomePageRoute = router.pathname === '/';
  const buttonColor = isHomePageRoute ? 'black' : 'orange.100';

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const isXS = useBreakpointValue({ base: false, sm: true });

  return (
    <>
      {isHomePageRoute && (
        <Flex padding={1.5} justifyContent="center">
          <Text fontSize="xs" color="white" textAlign="center">
            Latest News: Website is launched! 🎉
          </Text>
        </Flex>
      )}
      <Flex
        justifyContent="space-between"
        px="8"
        py="6"
        as="nav"
        boxShadow="xl"
        height="75px"
        width="100%"
        color={isHomePageRoute ? undefined : 'white'}
        alignItems="center"
        bgColor={isHomePageRoute ? 'white' : undefined}
      >
        <Link passHref href="/">
          <a>
            <Text fontWeight="bold" fontSize="large">
              Adam Rosenberg PA-C
            </Text>
          </a>
        </Link>

        <HStack spacing={{ base: 5, md: 8 }}>
          {isXS && (
            <ContactFormButton
              colorScheme="orange"
              size={{ base: 'xs', sm: 'xs', md: 'sm' }}
            >
              Book an appointment
            </ContactFormButton>
          )}
          {isDesktop ? (
            <HStack height="100%" spacing={6}>
              <ButtonGroup
                variant="link"
                size="lg"
                colorScheme="black"
                spacing="8"
              >
                {Object.entries(NAV_ROUTES).map(([label, url]) => (
                  <Link key={label} href={url}>
                    <Button textTransform="capitalize">{label}</Button>
                  </Link>
                ))}
              </ButtonGroup>

              <Flex
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/adamrosepa/"
              >
                <Button
                  variant="link"
                  color={buttonColor}
                  aria-label="linked-in"
                >
                  <FaLinkedin />
                </Button>
              </Flex>
              <Flex
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/sculptedbyadam/"
              >
                <Button
                  variant="link"
                  color={buttonColor}
                  aria-label="instagram"
                >
                  <FaInstagram />
                </Button>
              </Flex>
            </HStack>
          ) : (
            <DrawerButton />
          )}
        </HStack>
      </Flex>
    </>
  );
};

export default TopNavigator;
