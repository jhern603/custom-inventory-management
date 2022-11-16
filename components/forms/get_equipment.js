

const GetEquipmentForm = ({ data, setData }) => {


  const handleSearch = async (event) => {
    event.preventDefault()
    const search_data = event.target;
    const response = await fetch('/api/getEquipment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(search_data.search_item.value),
      });
    const result = await response.json();
    setData(result.data);
  }

  const handleUpdate = async () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (confirm(`This equipment's inventory date will be set to: \n${today}\n is this correct?`)) {
      const response = await fetch('/api/updateDate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data, today),
        });
      const result = await response.json();
      if (Object.keys(result).length > 0)
        alert("Inventoried date updated successfully!");
      else
        alert("Inventoried date was not updated!\nCheck that the item has not been surplused and is active in airtable.");
    } else {
      alert("The inventoried date will remain unchanged.")
    }
  }

  const UpdateBtn = () => {
    if (Object.keys(data).length > 0)
      return (<input type="submit" value="Update Inventoried Date" onClick={handleUpdate} />);
  }

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="search_item">Serial Number of Equipment: </label>
      <input required type="search" name="search_item" /><br />
      <input type="submit" value="Search For Equipment" />
      <UpdateBtn />
      
    </form>
  )
}

export { GetEquipmentForm }