const conf = require('../../conf.json');
const OwnerSelectField = ({ setDefaultOption, data, disabled }) => {
  return conf['ownership_list'].map((owner) => {
    if (owner.toLowerCase() === data['Belongs To...'].toLowerCase()) {
      setDefaultOption(owner);
      return (
        <option
          key={owner}
          selected
          disabled>
          {owner}
        </option>
      );
    } else {
      return (
        <option
          key={owner}
          disabled>
          {owner}
        </option>
      );
    }
  });
};
export { OwnerSelectField };
