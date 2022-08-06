import { Box, Flex, Heading } from '@chakra-ui/react';
import { getLastSegmentInPath } from '../../lib/routes';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getInstagramPosts } from '../../lib/api';

export const FlexMotion = motion(Flex);

export function Results({
  instagramPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Box padding="8" display="flex" width="100%" minHeight="inherit">
          <Flex gap={3} flexGrow={1} flexDir="column">
            <Heading textTransform="capitalize">
              {getLastSegmentInPath(router.pathname)}
            </Heading>

            <Flex justifyContent="center" gap={2} flexWrap="wrap" flexGrow={1}>
              {instagramPosts.map((post, index) => {
                return (
                  <FlexMotion
                    as="a"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    href={post.permalink}
                    key={post.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box pointerEvents="none" userSelect="none">
                      <Image
                        placeholder={post.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={post.blurDataURL}
                        priority={index <= 2 ? true : false}
                        objectFit="contain"
                        width="300px"
                        height="300px"
                        draggable={false}
                        alt="picture"
                        src={
                          post.mediaType === 'VIDEO'
                            ? post.thumbnailUrl
                            : post.mediaUrl
                        }
                      />
                    </Box>
                  </FlexMotion>
                );
              })}
            </Flex>
          </Flex>
        </Box>
      </Box>
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

export default Results;
