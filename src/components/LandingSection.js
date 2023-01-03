import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <Avatar size='xl' name='Pete Florence' src='https://i.pravatar.cc/150?img=7' />{' '}
    <VStack spacing={6} align="center">
      <Heading as='h5' size='sm'>
          {greeting}
      </Heading>
      <Heading as='h2' size='xl' textAlign="center">
        {bio1} <br />
        {bio2}
      </Heading>
    </VStack>
   
  </FullScreenSection>
);

export default LandingSection;