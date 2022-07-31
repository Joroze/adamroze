import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { NAV_ROUTES } from '../lib/routes';
import ContactFormButton from './ContactFormButton';

const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>
            <VStack spacing={4} alignItems="flex-start">
              <ContactFormButton
                colorScheme="orange"
                variant="outline"
                size={{ base: 'xs', sm: 'xs', md: 'sm' }}
              >
                Book an appointment
              </ContactFormButton>
              {Object.entries(NAV_ROUTES).map(([label, url]) => (
                <Link key={label} href={url}>
                  <Button
                    textTransform="capitalize"
                    onClick={onClose}
                    minWidth="unset"
                    variant="link"
                    size="lg"
                    colorScheme="black"
                  >
                    {label}
                  </Button>
                </Link>
              ))}
              <Divider />
              <HStack spacing={4}>
                <Flex
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/adamrosepa/"
                >
                  <Button
                    variant="link"
                    aria-label="linked-in"
                    size="lg"
                    minWidth="unset"
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
                    aria-label="instagram"
                    size="lg"
                    minWidth="unset"
                  >
                    <FaInstagram />
                  </Button>
                </Flex>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerButton;
