import { Button, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import Icon from "@/components/Icon";

type ItemOption = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  data: ItemOption[];
  buttonProps?: object;
  onTokenSelect: (value: string) => void;
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
            {...(props.buttonProps ?? {})}
          >
            {props.label}
          </MenuButton>
          {props.data?.length ? (
            <MenuList>
              {props.data.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => props.onTokenSelect(item.value as string)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          ) : (
            <></>
          )}
        </>
      )}
    </Menu>
  );
};
