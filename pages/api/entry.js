const conf = require('./conf.json');
const exclude = require('./exclude.json');
const airtable = require('airtable');
const base = new airtable({ apiKey: conf.API_KEY }).base(conf.BASE_ID);
const _ = require('lodash');
let PID = [];
const member = async (pid) => {
  return new Promise((resolve, reject) => {
    base(conf.MEMBERS_TABLE_ID)
      .select({
        view: 'All Members',
        filterByFormula: `({Panther ID} = \'${pid}\')`,
      })
      .firstPage(function (err, records) {
        if (err) reject(err);
        else {
          resolve(records[0].fields);
        }
      });
  }).catch((err) => {
    console.error(err);
  });
};

export const addToList = (id) => {
  PID = [...PID, id.toString()];
};

export const pushMultipleMembers = () => {
  PID.forEach((elem) => {
    member(elem)
      .then((res) => {
        let omitted = _.omit(res, exclude);
        base(conf.EXPERIMENT_TABLE_ID).create(omitted, function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Successfully added: ', records.id);
        });
      })
      .catch(function (err) {
        console.error(err);
      });
    PID.pop(elem);
  });
};

export const pushSingleMember = (id) => {
  member(id.toString())
    .then((res) => {
      let omitted = _.omit(res, exclude);
      base(conf.EXPERIMENT_TABLE_ID).create(omitted, function (err, records) {
        
        console.log('Successfully added: ', records.id);
        return res;
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
