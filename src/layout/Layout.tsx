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

import { AllWalletsProvider } from "@/services/wallets/AllWalletsProvider";

import EIP3643 from "@/views/eip3643/EIP3643";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Focus />
      <Fonts />
      <AllWalletsProvider>
        <Box>
          <Topbar />
          <Flex>
            <Sidebar />
            <Box p={10}>
              {/* {children} TODO: we can't use next.js routing due to build error of 'crypto' module */}
              <EIP3643 />
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
