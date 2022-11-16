const CheckoutForm = ({ data }) => {

  const TOC = "https://upefiu.notion.site/Equipment-Checkout-Procedures-5aed624e6ddf4199ad14418cc1bf6ec1";
  
  const handleCheckout = async (event) => {
    event.preventDefault()
    const form_data = event.target;
    const checkoutData=
      {
        "id": data['id'],
        "PID": form_data.PID.value,
        "Purpose": form_data.purpose.value,
        "I accept the terms to checking out equipment": form_data.TOC.value
      };
    const response = await fetch('/api/checkoutEquipment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
    const result = await response.json();
    if (result)
      alert("Equipment has been Successfully Checked Out!");
    else
      alert("There was a Problem Checking out the Equipment!");
  }
  return (
    <form onSubmit={handleCheckout}>
      <h3>You are attempting to check out: {data['Manuf/Model']}</h3>
      <label htmlFor="type">Type: {data['Type']}</label>< br />
      <label htmlFor="SN">Serial Number: {data['Serial Number']}</label>< br />
      <label htmlFor="PID">Panther ID:</label>
      <input type="text" name="PID" required />< br />
      <label htmlFor="purpose">Purpose of Checkout:</label>
      <textarea name="purpose" cols="30" rows="10" minLength="5" required></textarea>< br />
      <label htmlFor="TOC">By checking out this equipment, you are agreeing that you have read the <a href={TOC} target="_blank" rel="noopener noreferrer">terms and conditions</a> of the equipment checkout.</label>
      <input type="checkbox" name="TOC" required />< br />
      <input type="submit" value="Proceed to Checkout" />
    </form>
  )
}

export { CheckoutForm }