import {StyleSheet, useColorScheme} from 'react-native';
import React from "react";
import {
  Box, Button,
  Center,
  extendTheme,
  FormControl,
  Heading, HStack,
  Input,
  Link,
  NativeBaseProvider,
  Text,
  VStack
} from "native-base";
import {BackgroundColor} from "@bacons/expo-background-color";

// Define the config
const config = {
  useSystemColorMode: true,
};

// extend the theme
const customTheme = extendTheme({ config });
export default function App() {
  //const colorScheme = useColorScheme();
  return (
      <NativeBaseProvider theme={customTheme}>
        {/*useColorScheme() && <BackgroundColor color="#000" />*/}
        <Example />
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Example = () => {
  return <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Welcome
      </Heading>
      <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" />
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo">
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            I'm a new user.{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>;
};
