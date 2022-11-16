import Image from 'next/image'

export default function Result({ data }) {
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
  
  if (Object.keys(data).length > 0) {
    return (
      <>
        <h1>Result for {data['Serial Number']}</h1>
        <input type="submit" value="Update Inventoried Date" onClick={handleUpdate} />
        <p>Item description: {data['Manuf/Model']}</p>
        <p>Internal ID: {data['Internal ID']}</p>
        <p>Belongs to: {data['Belongs To...']}</p>
        <p>Added to inventory: {data['Added']}</p>
        <p>Last Inventoried: {data['Last Inventoried']}</p>
        <Image src={data['Barcode']} width={300} height={150} alt={`Barcode for ${data['Manuf/Model']}`} />
      </>
    )
  }
}