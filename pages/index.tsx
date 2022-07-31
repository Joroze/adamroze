import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import ContactFormButton from '../components/ContactFormButton';
import Features from '../components/Features';
import { FlexMotion } from './results';

export function Index({
  actionShotBlur,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box color="white" as="section">
      <Flex gap={12} flexDir="column">
        <Flex
          flexDir="column"
          gap={{ base: '100px', md: 12 }}
          color="black"
          bgColor="white"
        >
          <Box p={8}>
            <Box p={6} borderRadius="30px" bgColor="#f0f1ed">
              <SimpleGrid
                spacing={10}
                gridTemplateRows={{ base: '55%', md: '100%' }}
                columns={{ base: 1, md: 2 }}
                height={{ base: '700px', md: '600px' }}
              >
                <Box alignItems="center" display="flex">
                  <VStack
                    padding={[4, 4, null, null]}
                    paddingLeft={{ base: undefined, xl: 16 }}
                    gap={4}
                  >
                    <Heading
                      display={[
                        null,
                        'table-caption',
                        'table-caption',
                        'table-caption',
                      ]}
                      sx={{
                        wordSpacing: [null, '9999rem', '9999rem', '9999rem'],
                      }}
                      color="#ce964c"
                      as="h1"
                      size={['2xl', '3xl', '2xl', '3xl']}
                    >
                      MEDICAL AESTHETICS MADE MODERN.
                    </Heading>
                    <Text>
                      Specializing in medical-grade treatments for people who
                      want to look their best, and who prioritize prevention,
                      proper maintenance and a lot of self love.
                    </Text>
                    <Box width="100%">
                      <ContactFormButton
                        // backgroundColor="#96978a2e"
                        colorScheme="yellow"
                        variant="outline"
                      >
                        Book an appointment
                      </ContactFormButton>
                    </Box>
                  </VStack>
                </Box>
                <Box display="flex" justifyContent="center" position="relative">
                  <FlexMotion
                    borderRadius="30px"
                    width="100%"
                    height="100%"
                    position="absolute"
                    bottom={{ base: '-50%', md: '0' }}
                    isolation="isolate"
                    overflow="hidden"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Image
                      placeholder="blur"
                      blurDataURL={actionShotBlur}
                      objectFit="cover"
                      layout="fill"
                      alt="action shot"
                      src="/assets/images/actionshot.jpg"
                    />
                  </FlexMotion>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
          <Flex
            justifyContent="center"
            alignItems="center"
            p={{ base: 4, sm: undefined }}
            minHeight={{ base: undefined, sm: '300px', md: '400px' }}
            bgColor="white"
          >
            <Box maxWidth={{ base: '265px', sm: '400px', md: '500px' }}>
              <Text
                fontFamily="Raleway"
                fontWeight="extrabold"
                textAlign="center"
                fontSize={['3xl', '5xl', '6xl', '6xl', '6xl']}
                color="blue.800"
                bgGradient="linear(to-l, blue.900, #6a583e)"
                bgClip="text"
              >
                Changing The Face Of Medical Aesthetics
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex px={8} gap={2} flexDir="column">
          <Text>
            Adam Rosenberg is a Board Certified Physician Assistant based in
            NYC.
          </Text>
          <Text>
            Originally surgically and procedurally trained, he aims for precise
            and detailed results cosmetically.
          </Text>
          <Text>
            Adam is experienced with Botox injections for aesthetic
            results/facial balancing as well as medical indications including
            chronic migraines, jaw pain and excessive sweating.
          </Text>
        </Flex>
        <Divider />
        <VStack spacing={10} px={8}>
          <Features />
          <Box>
            <ContactFormButton
              backgroundColor="#96978a2e"
              colorScheme="gray"
              variant="outline"
            >
              Book an appointment
            </ContactFormButton>
          </Box>
        </VStack>
        <div />
      </Flex>
    </Box>
  );
}

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const { base64 } = await getPlaiceholder('/assets/images/actionshot.jpg', {
    size: 10,
  });

  return {
    props: {
      actionShotBlur: base64,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Index;
