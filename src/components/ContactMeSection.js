import '../App.css'
import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();
 
/*for some reason, the state for response is delayed on being set to response type.  setResponse in useSubmit doesn't happen unless you click the submit button the second time.  The first click, setisLoadig(true). It takes a second click, in order to setResponse to a type.  This might a bug with formik or react on rendering?*/
  
  useEffect(() => {
    console.log('response', response)
  }, [response])
  
  const formik = useFormik({
    initialValues: {
      firstName:"",
      email:"",
      type:"",
      comment:"",
    },
    onSubmit: (values, onSubmitProps) => {
      submit("", values)
      onOpen(response.type, response.message)
      if (response.type === "success") {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
      }
      console.log("form submitted")
},
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, 'Too Short').max(50,'Too long').required("name required"),
      email: Yup.string().email('invalid email').required(" required"),
      type: Yup.string().required("Selection is required"),
      comment: Yup.string().min(25,'too short').required("comment required"),
    }),
  });
/*************functions above***************** */
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>{formik.errors.firstName }</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.email }</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  {...formik.getFieldProps('type')}
                >
                   <option className ="selop" value="hireMe">Freelance project proposal</option>
                  <option className ="selop" value="hireMe">Freelance project proposal</option>
                  <option className ="selop" value="openSource">
                    Open source consultancy session
                  </option>
                  <option className ="selop" value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment && formik.touched.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  type="text"
                  {...formik.getFieldProps('comment')}
                  height={250}
                />
                <FormErrorMessage>{formik.errors.comment }</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" disabled={isLoading}>
                {!isLoading?"Submit":"Loading"}
              </Button>
              <p>Please click Submit button again for response alert</p>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
