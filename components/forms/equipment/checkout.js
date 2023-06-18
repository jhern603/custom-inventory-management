import {
  InputLabel,
  TextField,
  Typography,
  Checkbox,
  Link,
  Button,
} from '@mui/material';

const CheckoutForm = ({ data }) => {
  const TOC =
    'https://upefiu.notion.site/Equipment-Checkout-Procedures-5aed624e6ddf4199ad14418cc1bf6ec1';

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form_data = event.target;
    const checkoutData = {
      id: data['id'],
      PID: form_data.PID.value,
      Purpose: form_data.purpose.value,
      'I accept the terms to checking out equipment': form_data.TOC.value,
    };
    const response = await fetch('/api/checkoutEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });
    const result = await response.json();
    if (result) {
      alert('Equipment has been Successfully Checked Out!');
      window.location.reload(false);
    } else alert('There was a Problem Checking out the Equipment!');
  };
  
  return (
    <form onSubmit={handleCheckout}>
      <Typography variant="h5">
        You are attempting to check out: {data['Manuf/Model']}
      </Typography>
      <InputLabel htmlFor="type">Type: {data['Type']}</InputLabel>
      <InputLabel htmlFor="SN">
        Serial Number: {data['Serial Number']}
      </InputLabel>
      <InputLabel htmlFor="PID">Panther ID:</InputLabel>
      <TextField
        name="PID"
        required
      />
      <InputLabel htmlFor="purpose">Purpose of Checkout:</InputLabel>
      <TextField
        multiline
        name="purpose"
        cols="30"
        rows="10"
        minLength="5"
        required
      />
      <InputLabel htmlFor="TOC">
        By checking out this equipment, you are agreeing that you have read the{' '}
        <Link
          href={TOC}
          target="_blank"
          rel="noopener noreferrer">
          terms and conditions
        </Link>{' '}
        of the equipment checkout.
        <Checkbox
          type="checkbox"
          name="TOC"
          required
        />
      </InputLabel>
      <Button variant='contained' type="submit">Proceed to Checkout</Button>
    </form>
  );
};

export { CheckoutForm };
