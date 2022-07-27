import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcVoicePresentation, FcPhone, FcApprove } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

export const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align="center">
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
      <Text color={'gray.50'}>{text}</Text>
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
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
        }
      />
      <Feature
        icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
        title={'Free Consultation'}
        text={
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
        }
      />
      <Feature
        icon={<Icon as={FcApprove} w={10} h={10} />}
        title={'See Instant Results'}
        text={
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
        }
      />
    </SimpleGrid>
  );
}
