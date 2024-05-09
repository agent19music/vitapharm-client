import React from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

function CustomerForm() {
  return (
    <Box p={5}>
      <VStack spacing={5}>
        <FormControl id="name">
          <FormLabel>Customer Name</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Phone</FormLabel>
          <Input type="tel" />
        </FormControl>

        <FormControl id="address">
          <FormLabel>Address</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl id="town">
          <FormLabel>Town</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl id="other">
          <FormLabel>Other Items</FormLabel>
          <Input type="text" />
        </FormControl>

        <Button colorScheme="blue" type="submit">Submit</Button>
      </VStack>
    </Box>
  );
}

export default CustomerForm;
