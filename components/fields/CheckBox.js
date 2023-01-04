const CustomChecked = ({ state, setState }) => {
  const handleState = () => {
    setState(!state);
  };

  return (
    <input
      type="checkbox"
      onChange={handleState}
      checked={state}
    />
  );
};

export {CustomChecked as CheckBox}