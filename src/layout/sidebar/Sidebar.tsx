import { Divider, Flex, HStack } from "@chakra-ui/react";
import SidebarOption from "./SidebarOption";

interface optionsProps {
  icon: string;
  title: string;
  route: string;
  isDisabled?: boolean;
  isHidden?: boolean;
}

const routes: optionsProps[] = [
  {
    icon: "Coin",
    title: "EIP-3643",
    route: "/",
    isDisabled: false,
  },
  // {
  //   icon: "GearSix",
  //   title: "EIP-3643 Admin",
  //   route: "/eip3643/admin",
  // },
];

const Sidebar = () => {
  return (
    <HStack alignItems={"flex-start"}>
      <Flex
        data-testid="sidebar"
        bgColor="brand.white"
        minW="240px"
        p="32px 12px"
        justifyContent={"space-between"}
        flexDirection="column"
      >
        <Flex flexDirection="column" alignItems="center" gap={3}>
          {routes.map((route) => {
            return <SidebarOption key={route.title} {...route} />;
          })}
        </Flex>
      </Flex>
      <Divider orientation="vertical" />
    </HStack>
  );
};

export default Sidebar;
