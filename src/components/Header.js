import '../App.css'
import ProjectsSection from './ProjectsSection';
import ContactMeSection from './ContactMeSection'
import { Routes, Route, Link } from 'react-router-dom';
import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

//BarAnimate component to control the navbar. Using useRef to store previous yPosition worked but transform not smooth for navBar
const BarAnimate=()=>{
  
  const [scrollPosition, setScrollPosition] = useState(null);
    useEffect(() => {
      let lastYPosition = window.scrollY;
      const handleScroll = () => {
        const yPosition = window.scrollY;
        console.log(yPosition)//ensure scrollY works

        const direction = yPosition > lastYPosition ? "down" : "up";
        if (direction !== scrollPosition && (yPosition - lastYPosition > 10 || yPosition - lastYPosition < -10)) {
          setScrollPosition(direction)
        }
        lastYPosition = yPosition > 0 ? yPosition : 0;
      }

      window.addEventListener('scroll', handleScroll);

      return()=>window.removeEventListener('scroll',handleScroll)
    }, [scrollPosition])
  
    return scrollPosition;
};

const Header = () => {
  const handleClick = (anchor) => () => {
    
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    /*
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }*/
    //The above is code provided by meta.  Scrolling is smooth, but it get pass the heading of the section.  Need to subtract navbar pixels from the top of each heading. scrollIntoView does not allow location adjustment.  The code below solve this problem.
    const location = element.offsetTop;
    
    window.scrollTo({
      left: 0,
      top: location - 80,
      behavior: 'smooth'
    })
  };

  //display icons
  const icons = socials.map((i) => {
    return <a href={i.url}>
      <FontAwesomeIcon icon={i.icon} className="icon"/>
      </a>
  })

  //call BarAnimate
  const scrollDirection = BarAnimate();
/*********************************Functions above******************************************************************/
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1}//<--added to ensure navbar is the top most layer
      //animate navbar by adding a class
      className={scrollDirection === "down"?"navBar":null}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            {icons}
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <Link to="/#projects" onClick ={handleClick("projects")} className ="smooth">Projects</Link>
              <Link to="/#contact-me" onClick ={handleClick("contactme")} className="smooth" >Contact Me</Link>
            </HStack>
          </nav>
          <Routes>
            <Route path="/#projects" element={<ProjectsSection />}></Route>
            <Route path ="/#contact-me" element={<ContactMeSection />}></Route>
          </Routes>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;