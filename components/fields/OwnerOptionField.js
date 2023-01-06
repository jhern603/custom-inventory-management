const conf = require('../../conf.json');
const OwnerSelectField = ({ disabled }) => {
  return conf['ownership_list'].map((owner) => {
    if (!disabled)
      return (
        <option
          key={owner}>
          {owner}
        </option>
      );
    else
      return (
        <option
          key={owner}
          disabled>
          {owner}
        </option>
      );
  });
};
export { OwnerSelectField };
