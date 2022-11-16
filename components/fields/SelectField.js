const SelectField = ({ list, field }) => {
  return (
    <>
      <label htmlFor={field}>{field}:</label>
      <select name={field} defaultValue={list[0]}>
        {
          list.map(item => {
            return (
              <option value={item} key={item}>{item}</option>
            )
          })
        }
      </select>
    </>);
}
export { SelectField };