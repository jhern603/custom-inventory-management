import Image from 'next/image';

export default function Result({ data }) {
  const handleUpdate = async () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    if (
      confirm(
        `This equipment's inventory date will be set to: \n${today}\n is this correct?`
      )
    ) {
      const response = await fetch('/api/updateDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, today),
      });
      const result = await response.json();
      if (Object.keys(result).length > 0)
        alert('Inventoried date updated successfully!');
      else
        alert(
          'Inventoried date was not updated!\nCheck that the item has not been surplused and is active in airtable.'
        );
    } else {
      alert('The inventoried date will remain unchanged.');
    }
  };

  //Make it so that the "Belongs To" field changes to a dropdown to allow for changes
  const handleEdit = async () => {
    const response = await fetch('/api/editData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (Object.keys(result).length > 0)
      alert('Ownership updated successfully!');
    alert(
      'Inventoried date was not updated!\nCheck that the item has not been surplused and is active in airtable.'
    );
  };

  if (Object.keys(data).length > 0) {
    return (
      <>
        <h1>Result for {data['Serial Number']}</h1>
        <input
          type="submit"
          value="Update Inventoried Date"
          onClick={handleUpdate}
        />
        <input
          type="submit"
          value="Edit Ownership"
          onClick={handleEdit}
          disabled
        />
        <p>Item description: {data['Manuf/Model']}</p>
        <p>Internal ID: {data['Internal ID']}</p>
        <p>Belongs to: {data['Belongs To...']}</p>
        <p>Added to inventory: {data['Added']}</p>
        <p>Last Inventoried: {data['Last Inventoried']}</p>
        <Image
          src={data['Barcode']}
          width={300}
          height={150}
          alt={`Barcode for ${data['Manuf/Model']}`}
        />
      </>
    );
  }
}
