"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
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
import EIP4626 from "@/views/eip4626/EIP4626";
import AboutEIP4626 from "@/views/about/EIP4626";
import { Eip4626ContextProvider } from "@/contexts/Eip4626Context";
import AboutEIP3643 from "@/views/about/EIP3643";
import { ManageIdentities } from "@/views/manage-identities/ManageIdentities";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Focus />
        <Fonts />
        <AllWalletsProvider>
          <Router>
            <Box>
              <Topbar />
              <Flex>
                <Sidebar />
                <Box p={10} width={"100%"}>
                  <Routes>
                    <Route path="eip3643" element={<AboutEIP3643 />} />
                    <Route
                      path="eip3643/start-operating"
                      element={
                        <Eip3643ContextProvider>
                          <EIP3643 />
                        </Eip3643ContextProvider>
                      }
                    />
                    <Route path="eip4626" element={<AboutEIP4626 />} />
                    <Route
                      path="eip4626/start-operating"
                      element={
                        <Eip4626ContextProvider>
                          <EIP4626 />
                        </Eip4626ContextProvider>
                      }
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/eip3643" replace />}
                    />
                    <Route
                      path="manage-identities"
                      element={
                        <Eip3643ContextProvider>
                          <EIP3643 onlyIdentities>
                            <ManageIdentities />
                          </EIP3643>
                        </Eip3643ContextProvider>
                      }
                    />
                  </Routes>
                </Box>
              </Flex>
              <Footer />
            </Box>
          </Router>
        </AllWalletsProvider>
        <ScrollBar />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Layout;
