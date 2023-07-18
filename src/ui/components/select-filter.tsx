import React from "react";
import Select, { components } from "react-select";

export const SelectFilter = ({
  options,
  selectedOption,
  onSelectedOption,
}: any) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="/images/icons/arrow-select.svg" alt="" />
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      className='custom-select w-full'
      // classNamePrefix={styles.customSelect}
      value={selectedOption}
      onChange={onSelectedOption}
      options={options}
      isSearchable={false}
      components={{ DropdownIndicator }}
    />
  );
};
