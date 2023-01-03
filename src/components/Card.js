import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ProjectsSection from "./ProjectsSection";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.

  return (
    <HStack className="cardBox">
       <VStack>
       <Image
          objectFit='cover'
          src={imageSrc}
          alt='images'
          borderRadius="10px"
        />
        <VStack p={5} align="left">
          <Heading as='h4' size='md'>{title}</Heading>
        <Text>{description}</Text>
          <Text as='b'>
            <HStack spacing ={2}>
              <p>See More</p>
              <FontAwesomeIcon icon={faArrowRight} size="1x" />
            </HStack>
        </Text>
        </VStack>
        
      </VStack>
    </HStack>
   
    
  );
};

export default Card;