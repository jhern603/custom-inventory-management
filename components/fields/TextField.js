import TextField from '@mui/material/TextField';
const TextFields = ({ fields }) => {
  return fields.map((field) => {
    if (!field.includes('Belongs To') && !field.includes('Type'))
      return (
        <>
          <br />
          <TextField
            label={field}
            variant="standard"
            type="text"
            id={field}
          />
        </>
      );
  });
};

export { TextFields as TextField };
