const conf = require('../../conf.json');
const airtable = require('airtable');
const base = new airtable({
  apiKey: conf.api_key,
  endpointUrl: 'https://api.airtable.com',
}).base(conf.base_id);

const get_equipment = (serial_number) => {
  return new Promise((resolve, reject) => {
    base(conf.inventory_table_id)
      .select({
        view: 'Master View',
        filterByFormula: `({Serial Number} = \'${serial_number}\')`,
      })
      .firstPage((err, records) => {
        if (err) {
          return reject(err);
        } else if (records.length < 1) {
          setResult('Equipment not found!');
          return '';
        } else {
          let data = records[0].fields;
          data['id'] = records[0].id;
          return resolve(data);
        }
      });
  });
};

export default async function handler(req, res) {
  const body = req.body;

  if (!body) return res.status(400).json({ data: `${body} was not found.` });
  return res.status(200).json({ data: await get_equipment(body) });
}
