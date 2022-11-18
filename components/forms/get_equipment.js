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
      <label htmlFor="search_item">Serial Number of Equipment: </label>
      <input
        required
        type="search"
        name="search_item"
      />
      <br />
      <input
        type="submit"
        value="Search For Equipment"
      />
    </form>
  );
};

export { GetEquipmentForm };
