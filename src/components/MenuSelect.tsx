import { Button, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import Icon from "@/components/Icon";

type ItemOption = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  data: ItemOption[];
  onTokenSelect: (value: string | number) => void;
};

export const MenuSelect = (props: Props) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            style={{ width: "100%" }}
            as={Button}
            rightIcon={
              isOpen ? <Icon name="CaretUp" /> : <Icon name="CaretDown" />
            }
          >
            {props.label}
          </MenuButton>
          {props.data?.length && (
            <MenuList>
              {props.data.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => props.onTokenSelect(item.value)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
};
