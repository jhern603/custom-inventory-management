import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const GetEquipmentForm = ({ setData, setInventoryDate }) => {
  const handleSearch = async (event) => {
    event.preventDefault();
    const search_data = event.target;
    const response = await fetch('/api/getEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(search_data.search_item.value),
    });
    const result = await response.json();
    setData(result.data);
    setInventoryDate(result.data['Last Inventoried']);
  };

  return (
    <form onSubmit={handleSearch}>
      <br />
      <TextField
        label="Serial Number"
        type="search"
        name="search_item"
        required
      />
      <br />
      <Button
        type="submit"
        variant="outlined">
        Search For Equipment
      </Button>
    </form>
  );
};

export { GetEquipmentForm };
