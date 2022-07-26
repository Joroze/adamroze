import { Box, Flex, Heading } from '@chakra-ui/react';
import { getLastSegmentInPath } from '../../lib/routes';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getPlaiceholder } from 'plaiceholder';
import { faker } from '@faker-js/faker';

const FlexMotion = motion(Flex);

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
          <Flex flexGrow={1} flexDir="column">
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
                    <Image
                      placeholder="blur"
                      blurDataURL={post.blurDataURL}
                      priority={index <= 2 ? true : false}
                      objectFit="contain"
                      width="300px"
                      height="300px"
                      alt="picture"
                      src={
                        post.mediaType === 'VIDEO'
                          ? post.thumbnailUrl
                          : post.mediaUrl
                      }
                    />
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

type MediaType = 'IMAGE' | 'VIDEO';

type CarouselAlbumEntity = {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
};

type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  mediaType: MediaType;
  thumbnailUrl: string;
  timestamp: string;
  children: CarouselAlbumEntity[];
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  const data: InstagramPost[] = isDevelopmentMode
    ? [...new Array(10)].map(() => ({
        caption: '',
        id: faker.datatype.uuid(),
        mediaType: 'IMAGE',
        mediaUrl: faker.image.cats(undefined, undefined, true),
      }))
    : await fetch(
        `https://feeds.behold.so/${process.env.BEHOLD_INSTAGRAM_API_ENDPOINT}`
      ).then((data) => data.json());

  const instagramPostsFlattened = data.reduce<InstagramPost[]>((acc, val) => {
    if (val.children) {
      acc.push(
        ...val.children
          .filter((child) => child.mediaType === 'IMAGE')
          .map((child) => ({
            ...val,
            ...child,
          }))
      );
    } else {
      acc.push(val);
    }

    return acc;
  }, []);

  const instagramPosts = await Promise.all(
    instagramPostsFlattened.map(async (post) => {
      const { base64 } = await getPlaiceholder(post.mediaUrl, { size: 10 });

      return {
        ...post,
        blurDataURL: base64,
      };
    })
  );

  return {
    props: {
      instagramPosts,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Results;
