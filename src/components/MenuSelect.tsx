import Icon from "@/components/Icon";
import Select, { StylesConfig } from "react-select";

type ItemOption = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  data: ItemOption[];
  styles?: StylesConfig;
  onTokenSelect: (value: string) => void;
  selectedValue?: string | number;
  loadingInProgress?: boolean;
};

export const MenuSelect = (props: Props) => {
  return (
    <Select
      isLoading={props.loadingInProgress}
      options={props.data}
      styles={props.styles}
      placeholder={props.label}
      onChange={(item) =>
        props.onTokenSelect(
          (item as { value: string; label: string }).value as string,
        )
      }
      {...(props.selectedValue && {
        value: props.selectedValue,
      })}
    />
  );
};
