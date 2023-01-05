import Radio from '@mui/material/Radio';

const CustomChecked = ({ state, setState }) => {
  const handleState = () => {
    setState(!state);
  };
  return (
    <Radio
      onClick={handleState}
      checked={state}
    />
  );
};

export { CustomChecked as CheckBox };