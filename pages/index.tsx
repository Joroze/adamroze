import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Highlight,
  Icon,
  Link,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { useRef } from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import Flickity from 'react-flickity-component';
import { BsLink45Deg } from 'react-icons/bs';
import { FcPortraitMode, FcSearch } from 'react-icons/fc';
import ContactFormButton from '../components/ContactFormButton';
import Features from '../components/Features';
import { getInstagramPosts } from '../lib/api';
import { FlexMotion } from './results';

import actionShot from '../public/assets/images/actionshot.jpg';
import hero2 from '../public/assets/images/hero2.jpg';

function AnimatedSection({
  children,
  transition = false,
  keepUnmounted = false,
}: {
  children: React.ReactNode;
  transition?: boolean;
  keepUnmounted?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <Box
        style={
          transition
            ? {
                transform: isInView ? 'none' : 'translateY(-150px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
              }
            : {
                opacity: isInView ? 1 : 0,
              }
        }
      >
        {!keepUnmounted ? children : isInView && children}
      </Box>
    </section>
  );
}

export function Index({
  instagramPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box bgColor="white" as="section">
      <Flex gap={12} flexDir="column">
        <Flex
          flexDir="column"
          gap={{ base: '150px', md: 12 }}
          color="black"
          bgColor="white"
        >
          <Box p={{ base: 0, sm: 5, md: 8 }}>
            <Box p={6} borderRadius={{ base: 0, sm: '30px' }} bgColor="#f8f6ef">
              <SimpleGrid
                spacing={10}
                gridTemplateRows={{ base: '50%', md: '100%' }}
                columns={{ base: 1, md: 2 }}
              >
                <Box
                  mt={{ base: '150px', sm: undefined }}
                  alignItems="center"
                  display="flex"
                >
                  <VStack
                    zIndex="1"
                    paddingLeft={{ base: undefined, xl: 16 }}
                    spacing={6}
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
                      color="#d3801a"
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
                    <Box paddingTop={'10px'} width="100%">
                      <ContactFormButton colorScheme="orange" variant="outline">
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
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                    boxShadow="2xl"
                  >
                    <Box
                      width="100%"
                      height="100%"
                      position="relative"
                      pointerEvents="none"
                      userSelect="none"
                    >
                      <Image
                        placeholder="blur"
                        src={actionShot}
                        style={{ objectFit: 'cover' }}
                        fill
                        priority
                        draggable={false}
                        alt="action shot"
                      />
                    </Box>
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
            <AnimatedSection transition>
              <Box maxWidth={{ base: '295px', sm: '400px', md: '500px' }}>
                <Text
                  fontFamily="Raleway"
                  fontWeight="extrabold"
                  textAlign="center"
                  fontSize={{ base: '3xl', sm: '5xl', md: '6xl' }}
                  color="blue.800"
                  bgGradient="linear(to-l, blue.900, #6a583e)"
                  bgClip="text"
                >
                  <Highlight
                    query="face"
                    styles={{
                      px: '4',
                      rounded: 'full',
                      bg: 'orange.100',
                    }}
                  >
                    Changing The Face Of Medical Aesthetics
                  </Highlight>
                </Text>
              </Box>
            </AnimatedSection>
          </Flex>
        </Flex>

        <Divider id="info" />

        <VStack spacing={6}>
          <Link href="#info">
            <Heading
              role="group"
              color="blue.800"
              bgGradient="linear(to-l, blue.900, #6a583e)"
              bgClip="text"
              as="h2"
              fontSize="2xl"
            >
              Info
              <Icon
                ml={1}
                color="black"
                visibility="hidden"
                _groupHover={{ visibility: 'visible' }}
                as={BsLink45Deg}
              />
            </Heading>
          </Link>
          <Container maxWidth="6xl">
            <Flex
              gap={{ base: 10, md: 0 }}
              direction={{ base: 'column', md: 'row' }}
              width="100%"
            >
              <Flex
                justifyContent="center"
                width={{ base: undefined, md: '70%' }}
              >
                <Box maxWidth={{ base: undefined, md: '500px' }} gap={6}>
                  <List px={8} spacing={3}>
                    <ListItem>
                      <b>Adam Rosenberg</b> is a Board Certified Physician
                      Assistant based in NYC.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FcSearch} color="green.500" />
                      Originally surgically and procedurally trained, Adam aims
                      for precise and detailed results cosmetically.{' '}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FcPortraitMode} color="green.500" />
                      Adam is experienced with Botox injections for aesthetic
                      results/facial balancing as well as medical indications
                      including chronic migraines, jaw pain and excessive
                      sweating.{' '}
                    </ListItem>
                  </List>
                </Box>
              </Flex>
              <VStack>
                <Text fontStyle="italic" fontSize="sm">
                  Before & After results
                </Text>
                <Box>
                  <ReactCompareSlider
                    changePositionOnHover
                    itemOne={
                      <ReactCompareSliderImage
                        src="/assets/images/after.jpg"
                        alt="Before"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="/assets/images/before.jpg"
                        alt="After"
                      />
                    }
                  />
                </Box>
              </VStack>
            </Flex>
          </Container>
        </VStack>

        <Box
          pointerEvents="none"
          userSelect="none"
          width="100%"
          position="relative"
          height="300px"
        >
          <Flex
            padding={6}
            width="100%"
            justifyContent="flex-end"
            zIndex={1}
            position="absolute"
            bottom="0"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
            >
              Botox is easy as 1-2-3
            </Text>
          </Flex>
          <Image
            placeholder="blur"
            style={{ objectFit: 'cover' }}
            fill
            draggable={false}
            alt="hero shot"
            src={hero2}
          />
        </Box>
        <VStack spacing={10} px={8}>
          <Features />
          <Box>
            <ContactFormButton colorScheme="orange">
              Book an appointment
            </ContactFormButton>
          </Box>
        </VStack>
        <Divider id="location" />

        <AnimatedSection keepUnmounted>
          <VStack px={8}>
            <Link href="#location">
              <Heading
                role="group"
                color="blue.800"
                bgGradient="linear(to-l, blue.900, #6a583e)"
                bgClip="text"
                as="h2"
                fontSize="2xl"
                mb={8}
              >
                Location
                <Icon
                  ml={1}
                  color="black"
                  visibility="hidden"
                  _groupHover={{ visibility: 'visible' }}
                  as={BsLink45Deg}
                />
              </Heading>
            </Link>

            <Flex flexDir="column" width="100%" gap={2}>
              <VStack>
                <Box
                  overflow="hidden"
                  borderRadius="4px"
                  height="250px"
                  width="100%"
                >
                  <iframe
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.327702052811!2d-73.995445!3d40.7328142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259975b41ef93%3A0xfa8234229ba42709!2s25%205th%20Ave%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1657632297080!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                </Box>
              </VStack>
            </Flex>
          </VStack>
        </AnimatedSection>

        <Divider id="results" />

        <VStack px={8}>
          <Link href="#results">
            <Heading
              role="group"
              color="blue.800"
              bgGradient="linear(to-l, blue.900, #6a583e)"
              bgClip="text"
              textTransform="uppercase"
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              textAlign="center"
            >
              Follow our results
              <Icon
                ml={1}
                color="black"
                visibility="hidden"
                _groupHover={{ visibility: 'visible' }}
                as={BsLink45Deg}
              />
            </Heading>
          </Link>
          <VStack width="100%">
            <Box width="100%">
              {/* @ts-ignore */}
              <Flickity
                options={{
                  groupCells: 1,
                  draggable: true,
                  autoPlay: 5000,
                  cellAlign: 'left',
                  contain: true,
                  prevNextButtons: false,
                  pageDots: false,
                  pauseAutoPlayOnHover: true,
                }}
              >
                {instagramPosts.map((post, index) => {
                  return (
                    <Box key={post.id}>
                      <FlexMotion whileTap={{ scale: 0.95 }}>
                        <Flex
                          as="a"
                          m={3}
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          pos="relative"
                          width={{ base: '175px', md: '200px' }}
                          height={{ base: '175px', md: '200px' }}
                        >
                          <Image
                            placeholder={post.blurDataURL ? 'blur' : 'empty'}
                            blurDataURL={post.blurDataURL}
                            draggable={false}
                            style={{ objectFit: 'contain' }}
                            fill
                            alt="picture"
                            src={
                              post.mediaType === 'VIDEO'
                                ? post.thumbnailUrl
                                : post.mediaUrl
                            }
                          />
                        </Flex>
                      </FlexMotion>
                    </Box>
                  );
                })}
              </Flickity>
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
}

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const instagramPosts = await getInstagramPosts();

  return {
    props: {
      instagramPosts,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Index;
