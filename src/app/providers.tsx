// app/providers.tsx
// Created from https://chakra-ui.com/getting-started/nextjs-app-guide
"use client";

import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
