import Select from 'react-select';
import { MainContext } from '../context/Context';
import { useContext } from 'react';

const SelectionBox = () => {
  const { methodList, setSelectedOption, methodInfoState } = useContext(MainContext);

  const options = Object.keys(methodList).flatMap((key) =>
    methodList[key].map((value, index) => ({
      value: `option_${key}_${index + 1}`,
      label: value,
    }))
  );

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={options.find((option) => option.label === methodInfoState)}  
      name="color"
      options={options}
      onChange={(selectedOption) => {
        setSelectedOption(selectedOption?.label);
      }}
    />
  );
};

export default SelectionBox;




