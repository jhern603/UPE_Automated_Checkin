const conf = require('./conf.json');
const exclude = require('./exclude.json');
const airtable = require('airtable');
const base = new airtable({ apiKey: conf.API_KEY }).base(conf.BASE_ID);
const _ = require('lodash');
let PID = [];

const getMember = async (pid) => {
  return new Promise((resolve, reject) => {
    base(conf.MEMBERS_TABLE_ID)
      .select({
        view: 'All Members',
        filterByFormula: `({Panther ID} = \'${pid}\')`,
      })
      .firstPage((err, records) => {
        if (err)
          return reject(err);
        else if (records.length < 1) 
          return "Student ID not found!"
        else
          return resolve(records[0].fields);
      });
  })
};

// mmmmmmm
const checkAlreadyCheckedIn = async (pid) => {
    return new Promise((resolve, reject) => {
    base(conf.EXPERIMENT_TABLE_ID)
      .select({
        view: 'All Members',
        filterByFormula: `({Panther ID} = \'${pid}\')`,
      })
      .firstPage((err, records) => {
        if (err)
          return reject(err);
        else if (records.length < 1) 
          return "Student ID not found!"
        else
          return resolve(records[0].fields);
      });
  })
}

export const addToList = (id) => {
  PID = [...PID, id.toString()];
};

export const pushSingleMember = (id) => {
  getMember(id.toString())
    .then((res) => {
      let omitted = _.omit(res, exclude);
      base(conf.EXPERIMENT_TABLE_ID).create(omitted, function (err, records) {
        if (err) return err;
        console.log('Successfully added: ', records.id);
        return Promise.resolve();
      });
    })
    .catch((err) => {
      return err;
    })
};