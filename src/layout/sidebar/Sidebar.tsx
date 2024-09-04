import { Divider, Flex, HStack } from "@chakra-ui/react";
import SidebarOption from "./SidebarOption";
import { useLocation } from "react-router-dom";

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
    route: "/eip3643",
    isDisabled: false,
  },
  {
    icon: "Coin",
    title: "EIP-4626",
    route: "/eip4626",
    isDisabled: false,
  },
];

const Sidebar = () => {
  const location = useLocation();

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
          {routes.map((routeItem) => {
            const isRouteActive = location.pathname.includes(routeItem.route);
            return (
              <SidebarOption
                {...routeItem}
                key={routeItem.title}
                isActive={isRouteActive}
              />
            );
          })}
        </Flex>
      </Flex>
      <Divider orientation="vertical" />
    </HStack>
  );
};

export default Sidebar;
