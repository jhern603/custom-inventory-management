const conf = require('../../conf.json');
const airtable = require('airtable');
const base = new airtable({
  apiKey: conf.api_key,
  endpointUrl: 'https://api.airtable.com',
}).base(conf.base_id);

const create_equipment = (data) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return new Promise((resolve, reject) => {
    base(conf.inventory_table_id).create(
      {
        fldAq4XGFkcYzoQ7d: data['Serial Number'],
        fldPtltNwfN81g9LM: data['SCIS Tracking ID'],
        fldlqY9Nb0Oq8imKm: data['Manuf/Model'],
        fldULbOF43oupVpQS: [data['Type']],
        fldxJM81gyIhLkMYy: data['Belongs To'],
        fldoasg0RxGBf099G: data['Location'],
        fldn6RpEZ0hlRZrsq: today,
      },
      function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      }
    );
  });
};

export default async function handler(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ data: `${body} was not found.` });
  return res.status(200).json({ data: await create_equipment(body) });
}
