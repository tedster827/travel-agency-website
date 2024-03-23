"use client";

import React from "react";
import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const VideoGameDiscoveryPage: React.FunctionComponent = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <div>
      <Link href={"/"} color={"blue.400"} _hover={{ color: "blue.500" }}>
        {"Back to Home Page"}
      </Link>
      <Heading>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Heading>
      <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Flex
          direction={"column"}
          background={formBackground}
          p={12}
          rounded={6}
        >
          <Heading mb={6}>Log In</Heading>
          <Input
            placeholder={"Teddy@TedeByte.com"}
            variant={"filled"}
            mb={3}
            type={"email"}
          />
          <Input
            placeholder={"************"}
            variant={"filled"}
            mb={6}
            type={"password"}
          />
          <Button colorScheme={"teal"}>Login</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default VideoGameDiscoveryPage;
