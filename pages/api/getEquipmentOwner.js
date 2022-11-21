const getOwner = (data) => {
  const conf = require('../../conf.json');
  for (let i = 0; i < conf['ownership_list'].length; i++) {
    let owner = conf['ownership_list'][i];
    if (owner.toLowerCase() === data['Belongs To...'].toLowerCase())
      return owner;

  }
};

export default async function handler(req, res) {
  const body = req.body;

  if (!body) return res.status(400).json({ data: `${body} was not found.` });
  return res.status(200).json({ data: await getOwner(body) });
}
