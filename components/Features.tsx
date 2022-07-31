import { ReactElement } from 'react';
import { SimpleGrid, Icon, Text, Stack, Flex, Link } from '@chakra-ui/react';
import { FcVoicePresentation, FcPhone, FcApprove } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: React.ReactNode;
  icon: ReactElement;
}

export const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align="center" textAlign="center">
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 16 }}>
      <Feature
        icon={<Icon as={FcPhone} w={10} h={10} />}
        title={'Make An Appointment'}
        text={
          <>
            Making an appointment is easy. Book us through our website, or reach
            out to us on{' '}
            <Link
              color="blue.500"
              target="_blank"
              rel="noopener noreferrer"
              href={'https://www.instagram.com/sculptedbyadam/'}
            >
              Instagram
            </Link>
            .
          </>
        }
      />
      <Feature
        icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
        title={'Free Consultation'}
        text="We'll help you understand the benefits and implications that apply to our products and services."
      />
      <Feature
        icon={<Icon as={FcApprove} w={10} h={10} />}
        title={'See Instant Results'}
        text="You'll see amazing results, fast!"
      />
    </SimpleGrid>
  );
}
