const TextFields = ({ fields }) => {
  return fields.map((field) => {
    if (!field.includes('Belongs To') && !field.includes('Type'))
      return (
        <>
          <label htmlFor={field}>{field}:</label>
          <input
            type="text"
            name={field}
          />
        </>
      );
  });
};

export { TextFields };
