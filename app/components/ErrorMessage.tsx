import React, { PropsWithChildren, ReactNode } from "react";
import { Text } from "@radix-ui/themes";
const errorMessage = ({ children }: PropsWithChildren) => {
  if (!children) {
    return null;
  }
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default errorMessage;
