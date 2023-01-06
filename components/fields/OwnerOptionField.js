import { MenuItem } from '@mui/material';
const conf = require('../../conf.json');
const OwnerSelectField = ({ disabled, value, setValue }) => {
  const handleChange = (owner) => {
    
  }
  return conf['ownership_list'].map((owner) => {
    if (!disabled) return <MenuItem key={owner}>{owner}</MenuItem>;
    else
      return (
        <MenuItem
          key={owner}
          disabled>
          {owner}
        </MenuItem>
      );
  });
};
export { OwnerSelectField };
