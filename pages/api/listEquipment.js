const conf = require('../../conf.json');
const airtable = require('airtable');
const base = new airtable({
  apiKey: conf.api_key,
  endpointUrl: 'https://api.airtable.com',
}).base(conf.base_id);

const get_equipment = (Type) => {
  let records = [];
  return new Promise((resolve, reject) => {
    if (Type.includes('All'))
      base(conf.inventory_table_id)
        .select({
          view: 'Master View',
        })
        .eachPage(
          function page(results, fetchNextPage) {
            results.forEach((item) => {
              records.push(item['fields']);
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              return reject(err);
            }
            return resolve(records);
          }
        );
    else
      base(conf.inventory_table_id)
        .select({
          view: 'Master View',
          filterByFormula: `({Type} = \'${Type}\')`,
        })
        .eachPage(
          function page(results, fetchNextPage) {
            results.forEach((item) => {
              records.push(item['fields']);
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              return reject(err);
            }
            return resolve(records);
          }
        );
  });
};

export default async function handler(req, res) {
  const body = req.body;

  if (!body) return res.status(400).json({ data: `${body} was not found.` });
  return res.status(200).json({ data: await get_equipment(body) });
}
