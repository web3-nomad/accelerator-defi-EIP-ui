"use client";

import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import Footer from "./footer/Footer";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/Theme";
import { Fonts } from "../components/Fonts";
import { Focus } from "../components/Focus";
import { ScrollBar } from "../components/Scrollbar";

import { AllWalletsProvider } from "../services/wallets/AllWalletsProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Focus />
      <Fonts />
      <AllWalletsProvider>
        <Box h="100vh" w="100%" overflowX="hidden">
          <Topbar />

          <Flex transition="transform 0.3s, width 0.3s" h="calc(100vh - 64px)">
            <Sidebar />
            <Box w="100%" py={9} px={10} minH="100%" bgColor="brand.gray5">
              {children}
            </Box>
          </Flex>
          <Footer />
        </Box>
      </AllWalletsProvider>
      <ScrollBar />
    </ChakraProvider>
  );
};

export default Layout;
