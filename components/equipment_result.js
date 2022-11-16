import Image from 'next/image'

export default function Result({ data }) {
  if (Object.keys(data).length > 0) {
    return (
      <>
        <h1>Result for {data['Serial Number']}</h1>
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