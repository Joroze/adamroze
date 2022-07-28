import {
  Box,
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useMergeRefs,
  VStack,
} from '@chakra-ui/react';
import { useReward } from 'react-rewards';
import React, { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function manageErrors(response: any) {
  if (!response.ok) {
    const responseError = {
      statusText: response.statusText,
      status: response.status,
    };
    throw responseError;
  }

  return response;
}

export async function postData(url: string, data: Record<string, any>) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(manageErrors);
}

export default function ContactFormButton(props: ButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  const [apiError, setApiError] = useState(false);
  const form = useForm<ContactFormValues>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = form;

  const isSubmitSuccessfulWithoutApiError = isSubmitSuccessful && !apiError;

  useEffect(
    function resetFormOnUnmount() {
      if (!isOpen) {
        form.reset();
      }
    },
    [form, isOpen]
  );

  const initialRef = React.useRef(null);

  async function onSubmit(values: ContactFormValues) {
    try {
      setApiError(false);

      await postData('/api/contact', values);

      reward();
    } catch (error) {
      setApiError(true);
      console.error(error);
    }
  }

  const { ref: nameFieldFormRef, ...nameFieldFormProps } = {
    ...register('name', {
      required: 'This is required',
      minLength: {
        value: 4,
        message: 'Minimum length should be 4',
      },
      maxLength: 50,
    }),
  };

  return (
    <>
      <Button {...props} onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.200"
          backdropFilter="blur(2px) hue-rotate(-10deg)"
        />
        <ModalContent>
          <ModalHeader>Book your appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={5}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>

                  <InputGroup>
                    <InputLeftElement>
                      <BsPerson />
                    </InputLeftElement>
                    <Input
                      readOnly={
                        isSubmitting || isSubmitSuccessfulWithoutApiError
                      }
                      type="text"
                      placeholder="Your Name"
                      {...nameFieldFormProps}
                      ref={useMergeRefs(initialRef, nameFieldFormRef)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.phone}>
                  <FormLabel htmlFor="name">Phone Number</FormLabel>

                  <InputGroup>
                    <InputLeftElement>
                      <BsPerson />
                    </InputLeftElement>
                    <Input
                      readOnly={
                        isSubmitting || isSubmitSuccessfulWithoutApiError
                      }
                      type="number"
                      placeholder="Your Phone Number"
                      {...register('phone', {
                        required: 'Phone number is required',
                        maxLength: 50,
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <InputGroup>
                    <InputLeftElement>
                      <MdOutlineEmail />
                    </InputLeftElement>
                    <Input
                      readOnly={
                        isSubmitting || isSubmitSuccessfulWithoutApiError
                      }
                      type="email"
                      placeholder="Your Email"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                        maxLength: 50,
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.message}>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    readOnly={isSubmitting || isSubmitSuccessfulWithoutApiError}
                    resize="none"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                      maxLength: 500,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.message && errors.message.message}
                  </FormErrorMessage>
                </FormControl>

                {isSubmitSuccessfulWithoutApiError && !isSubmitting && (
                  <Text fontWeight="bold" color="green.500">
                    Done! You&apos;ll hear from us shortly.
                  </Text>
                )}

                {apiError && !isSubmitting && (
                  <Text fontWeight="bold" color="red.500">
                    Oops. Something went wrong.
                  </Text>
                )}
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <span id="rewardId" />
            <Button
              disabled={
                isAnimating || isSubmitting || isSubmitSuccessfulWithoutApiError
              }
              isLoading={isSubmitting}
              loadingText="Submitting"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              colorScheme="blue"
              mr={3}
            >
              {isSubmitSuccessfulWithoutApiError ? 'Submitted!' : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
