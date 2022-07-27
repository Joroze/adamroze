import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import GridBlurredBackdrop from '../components/Reviews';
import { getLastSegmentInPath } from '../lib/routes';

export function Index({
  actionShotBlur,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Flex gap={6} padding="8" flexDir="column">
        <Flex gap={2} flexDir="column">
          <Heading textTransform="capitalize">
            {getLastSegmentInPath(router.pathname)}
          </Heading>
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
        <SimpleGrid
          spacing={2}
          gridTemplateRows={['45%', '30%', '100%']}
          columns={[1, 1, 2]}
          height="550px"
        >
          <Box>
            <Heading color="#d5b488" as="h1" size="3xl">
              MEDICAL AESTHETICS MADE MODERN.
            </Heading>
          </Box>
          <Box
            position="relative"
            isolation="isolate"
            display="flex"
            overflow="hidden"
            borderRadius="4px"
            boxShadow="2xl"
          >
            <Image
              placeholder="blur"
              blurDataURL={actionShotBlur}
              objectFit="cover"
              layout="fill"
              alt="action shot"
              src="/assets/images/actionshot.jpg"
            />
          </Box>
        </SimpleGrid>
        <GridBlurredBackdrop />
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
