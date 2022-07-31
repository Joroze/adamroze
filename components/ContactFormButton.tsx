import {
  Box,
  Button,
  ButtonProps,
  CloseButton,
  Flex,
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
  Tooltip,
  useDisclosure,
  useMergeRefs,
  VStack,
} from '@chakra-ui/react';
import { FcApproval } from 'react-icons/fc';
import { useReward } from 'react-rewards';
import React, { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { Controller, useForm } from 'react-hook-form';
import Dropzone from './Dropzone';
import { FaTelegramPlane } from 'react-icons/fa';

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
  insuranceFile: File;
};

export function manageErrors(response: any) {
  if (!response.ok) {
    const responseError = {
      statusText: response.statusText,
      status: response.status,
    };
    throw responseError;
  }

  return response;
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

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('message', values.message);
      formData.append('insuranceFile', values.insuranceFile);

      await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      }).then(manageErrors);

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

                <FormControl isRequired isInvalid={!!errors.insuranceFile}>
                  <FormLabel htmlFor="insuranceFile">Insurance Card</FormLabel>
                  <Controller
                    name="insuranceFile"
                    control={form.control}
                    rules={{ required: 'Your insurance card is required' }}
                    render={({ field }) =>
                      field.value ? (
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Flex alignItems="center">
                            <FcApproval />
                            <Text ml={2} fontWeight="semibold" fontSize="sm">
                              {field.value.name}
                            </Text>
                          </Flex>
                          {!isSubmitting && !isSubmitSuccessfulWithoutApiError && (
                            <Tooltip placement="top" label="Remove">
                              <CloseButton
                                onClick={() => {
                                  field.onChange(null);
                                }}
                              />
                            </Tooltip>
                          )}
                        </Flex>
                      ) : (
                        <Flex flexDir="column" gap={3}>
                          <Dropzone
                            multiple={false}
                            maxFiles={1}
                            onDrop={(acceptedFiles: File[]) => {
                              field.onChange(acceptedFiles[0]);
                            }}
                            accept={{ 'image/*': [], 'application/pdf': [] }}
                          />
                          <Text fontStyle="italic" fontSize="xs">
                            * File type must be image or PDF
                          </Text>
                        </Flex>
                      )
                    }
                  />
                  <FormErrorMessage>
                    {errors.insuranceFile && errors.insuranceFile.message}
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
              rightIcon={<FaTelegramPlane />}
              disabled={
                isAnimating || isSubmitting || isSubmitSuccessfulWithoutApiError
              }
              isLoading={isSubmitting}
              loadingText="Submitting"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              colorScheme="green"
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
