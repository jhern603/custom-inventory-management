const conf = require('./conf.json');
const airtable = require('airtable');

const base = new airtable({
  apiKey: conf.api_key,
  endpointUrl: "https://api.airtable.com"
}
).base(conf.base_id);
//Helper Function
const pid_record_id = (panther_id) => {
  return new Promise((resolve, reject) => {
    base(conf.members_table_id).select({
      view: 'Grid view',
      filterByFormula: `({Panther ID} = \'${panther_id}\')`,
    }
    ).firstPage((err, res) => {
      if (err) {
        console.error(err)
        return reject(err);
      }
        
      console.log(res)  
      return resolve(res);
    });
  }
  );
}

//Core Logic
const checkout_equipment = async (data) => {
  const checked = data['I accept the terms to checking out equipment'] === 'on' ? true : false;
  const record_id = await pid_record_id(data['PID']);

  return new Promise((resolve, reject) => {
    base(conf.checkout_table_id)
      .create({
        "fld91dF8cgYS1i1Fo": 'Checked Out',
        "fldKos9ic5vNMTuWm": [data['id']],
        "fldG2GVgO0ugqyZSi": [record_id[0].id],
        "fldNCfrGt3vpmXBsI": data['Purpose'],
        "fldMF0HTaqPHQgFgP": checked,
      }, function (err, res) {
        if (err)
          return reject(err);
        return resolve(res);
      });
  });
}
//Receive Request
export default async function handler(req, res) {
  const body = req.body
  if (!body)
    return res.status(400).json({ data: `${body} was not found.` })
  return res.status(200).json({ data: await checkout_equipment(body) })

}
