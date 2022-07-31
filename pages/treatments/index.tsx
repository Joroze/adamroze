import { getLastSegmentInPath } from '../../lib/routes';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Flex,
  Tag,
} from '@chakra-ui/react';
import { FcCheckmark } from 'react-icons/fc';

export const Treatments = () => {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Box padding="8" width="100%" minHeight="inherit">
          <Heading textTransform="capitalize">
            {getLastSegmentInPath(router.pathname)}
          </Heading>
          <TreatmentGridListWithHeading />
        </Box>
      </Box>
    </Box>
  );
};

type Treatment = {
  id?: string;
  title: string;
  text: string;
  price?: number;
  coveredByInsurance: boolean;
};

const cosmeticTreatments: Treatment[] = [
  {
    title: 'Botox',
    text: 'Patients will often require ~50 units total for treating the forehead, “11 lines”, “crows feet” and “bunny lines”.',
    price: 10,
    coveredByInsurance: false,
  },
].map(function (treatment, i) {
  return {
    ...treatment,
    id: String(i),
  };
});

const medicalTreatments: Treatment[] = [
  {
    title: 'Botox: Hyperhydrosis (excess sweating)',
    text: 'Botox can be used to block the nerve signals responsible for sweating, stopping the sweat glands from producing too much sweat. Commonly injected in scalp, axilla, hands/feet.',
    coveredByInsurance: true,
  },
  {
    title: 'Botox: Jaw pain - TMJ/orofacial dystonia',
    text: 'Botox can be used to relax overactive jaw muscles that cause pain/clenching.',
    coveredByInsurance: true,
  },
  {
    title: 'Botox: Chronic Migraines',
    text: 'Botox can be used to significantly reduce migraine intensity/duration. You may qualify for this treatment if you have frequent migraines lasting 4+ hours/day and have failed previous treatments.',
    coveredByInsurance: true,
  },
].map(function (treatment, i) {
  return {
    ...treatment,
    id: String(i),
  };
});

function Treatment({ title, text, price, coveredByInsurance }: Treatment) {
  return (
    <HStack align={'top'}>
      <Box color={'green.400'} px={2}>
        <Icon width="27px" height="27px" as={FcCheckmark} />
      </Box>
      <VStack align={'start'}>
        <Text fontWeight={600}>
          {title}
          {price && (
            <Text as="span">
              :{' '}
              <Tag
                color="green.200"
                colorScheme="green"
                variant="outline"
                p={1}
                size="md"
              >
                ${price}/unit
              </Tag>
            </Text>
          )}
        </Text>
        <Text color="white">{text}</Text>
        {coveredByInsurance && (
          <Text color="green.200" fontStyle="italic" fontSize="md">
            Covered by Health insurance
          </Text>
        )}
      </VStack>
    </HStack>
  );
}

function TreatmentGridListWithHeading() {
  return (
    <Box p={4}>
      <Stack as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Cosmetic / Medical</Heading>
        <Text color="white" fontSize={'xl'}>
          The following treatments are available below.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1 }} spacing={10}>
          <Flex flexDir="column" gap={2}>
            <Heading as="h2" size="md">
              Cosmetic
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {cosmeticTreatments.map(
                ({ id, title, text, price, coveredByInsurance }) => (
                  <Treatment
                    key={id}
                    coveredByInsurance={coveredByInsurance}
                    title={title}
                    text={text}
                    price={price}
                  />
                )
              )}
            </SimpleGrid>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Heading as="h2" size="md">
              Medical
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {medicalTreatments.map(
                ({ id, title, text, price, coveredByInsurance }) => (
                  <Treatment
                    key={id}
                    coveredByInsurance={coveredByInsurance}
                    title={title}
                    text={text}
                    price={price}
                  />
                )
              )}
            </SimpleGrid>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Treatments;
