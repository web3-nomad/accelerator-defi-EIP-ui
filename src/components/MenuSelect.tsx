import Select, { GroupBase, StylesConfig } from "react-select";

type MenuSelectItemOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  data: GroupBase<string | number>[];
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
      placeholder={props.label}
      onChange={(item) => {
        props.onTokenSelect((item as unknown as MenuSelectItemOption).value);
      }}
      styles={{
        container: (base) => ({
          ...base,
          width: "100%",
        }),
      }}
      {...(props.selectedValue && {
        value: props.selectedValue,
      })}
    />
  );
};
