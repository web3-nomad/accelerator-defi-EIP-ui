"use client";

import { Box, Divider, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import Footer from "./footer/Footer";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/Theme";
import { Fonts } from "@/components/Fonts";
import { Focus } from "@/components/Focus";
import { ScrollBar } from "@/components/Scrollbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AllWalletsProvider } from "@/services/wallets/AllWalletsProvider";

import EIP3643 from "@/views/eip3643/EIP3643";
import { Eip3643ContextProvider } from "@/contexts/Eip3643Context";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Layout = ({ children }: LayoutProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Focus />
        <Fonts />
        <AllWalletsProvider>
          <Box>
            <Topbar />
            <Flex>
              <Sidebar />
              <Box p={10} width={"100%"}>
                {/* {children} TODO: we can't use next.js routing due to build error of 'crypto' module */}
                <Eip3643ContextProvider>
                  <EIP3643 />
                </Eip3643ContextProvider>
              </Box>
            </Flex>
            <Footer />
          </Box>
        </AllWalletsProvider>
        <ScrollBar />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Layout;
