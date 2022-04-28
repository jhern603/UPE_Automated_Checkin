import { isBuffer } from 'lodash';

const conf = require('./conf.json');
const exclude = require('./exclude.json');
const airtable = require('airtable');
const base = new airtable({ apiKey: conf.API_KEY }).base(conf.BASE_ID);
const _ = require('lodash');
let PID = [];


//To check if someone is already checked in, try making a separate ASYNC function with the .find() api function
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
        } else if (records.length < 1) {
          console.info('Student ID not found!');
          setResult('Student ID not found!');
          return '';
        } else {
          console.log(records);
          return resolve(records[0].fields);
        }
      });
  });
};

export const addToList = (id) => {
  id.forEach((num) => PID.push(num));
};

export const pushSingleMember = (id, setResult) => {
  getMember(id.toString(), setResult)
    .then((res) => {
      let omitted = _.omit(res, exclude);
      base(conf.EXPERIMENT_TABLE_ID).create(omitted, (err, records) => {
        if (err) console.error(err);
        console.log('Successfully added: ', records.id);
        setResult(`Welcome, ${omitted['First Name']}!`);
      });
    })
    .catch((err) => {
      setResult(err);
      return err;
    });
};

export const pushMultipleMembers = (setResult) => {
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
          PID.pop(elem);
          setResult("Users have been checked in");
        });
      })
      .catch(function (err) {
        console.error(err);
      });
 
  });
  
};
