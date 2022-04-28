const conf = require('./conf.json');
const exclude = require('./exclude.json');
const airtable = require('airtable');
const base = new airtable({ apiKey: conf.API_KEY }).base(conf.BASE_ID);
const _ = require('lodash');
let PID = [];

const getMember = async (pid, setResult) => {
  return new Promise((resolve, reject) => {
    base(conf.MEMBERS_TABLE_ID)
      .select({
        view: 'All Members',
        filterByFormula: `({Panther ID} = \'${pid}\')`,
      })
      .firstPage((err, records) => {
        if (err) {
          return reject(err);
        }
        else if (records.length < 1) {
          console.info("Student ID not found!");
          setResult("Student ID not found!")
          return ""
        }
        else
          return resolve(records[0].fields);
      });
  })
};

export const addToList = (id) => {
  id.forEach(num => PID.push(num));
  console.log(PID);
};

export const pushSingleMember = (id, setResult) => {
  getMember(id.toString(), setResult)
    .then((res) =>  {
      let omitted = _.omit(res, exclude);
      base(conf.EXPERIMENT_TABLE_ID).create(omitted, (err, records) => {
        if (err) console.error(err);
        console.log('Successfully added: ', records.id);
        setResult(`Welcome, ${omitted["First Name"] }!`);
      });
    })
    .catch((err) => {
      setResult(err);
      return err;
    })
};

export const pushMultipleMembers = (setResult) => {
  let results = [];
  PID.forEach((elem) => {
    getMember(elem)
      .then((res) => {
        let omitted = _.omit(res, exclude);
        base(conf.EXPERIMENT_TABLE_ID).create(omitted, function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Successfully added: ', records.id);
          results.push(`${omitted["First Name"]} has been checked in.`)
          
          PID.pop(elem);
        });
      })
      .catch(function (err) {
        console.error(err);
      });
    
  });
  setResult(results);
};