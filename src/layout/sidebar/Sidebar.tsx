import { Flex } from "@chakra-ui/react";
import SidebarOption from "./SidebarOption";

interface optionsProps {
  icon: string;
  title: string;
  route: string;
  isDisabled?: boolean;
  isHidden?: boolean;
}

const Sidebar = () => {
  const options: optionsProps[] = [
    {
      icon: "Coin",
      title: "Route1",
      route: "route1",
      isDisabled: false,
    },
    {
      icon: "Users",
      title: "Route2",
      route: "route2",
      isDisabled: false,
    },
    {
      icon: "GearSix",
      title: "Route3",
      route: "route3",
    },
  ];

  return (
    <Flex
      data-testid="sidebar"
      bgColor="brand.white"
      minW="240px"
      p="32px 12px"
      justifyContent={"space-between"}
      flexDirection="column"
    >
      <Flex flexDirection="column" alignItems="center" gap={3}>
        {options.map((option) => {
          return <SidebarOption key={option.title} {...option} />;
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
