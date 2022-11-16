const conf = require('./conf.json');
const airtable = require('airtable');
const base = new airtable({
  apiKey: conf.api_key,
  endpointUrl: "https://api.airtable.com"
}
).base(conf.base_id);

const update_date = (data) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return new Promise((resolve, reject) => {
    base(conf.inventory_table_id).update(
      data['id'],
      {
        "Last Inventoried": today
      }
      , function (err, record) {
        if (err) {
          return reject(err);
        }
        return resolve(record);
      });
  });
}

export default async function handler(req, res) {
  const body = req.body;
  if (!body)
    return res.status(400).json({ data: `${body} was not found.` })
  return res.status(200).json({ data: await update_date(body) })

}
