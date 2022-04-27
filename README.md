# Automated UPE Event Checkin Tools
#### This tool will automate the checkin process for attendees for all UPE events while allowing us to collect demographic data for statistical purposes based on their student ID

### Usage
At its current state, student IDs must be fed through the PID object in entry.js
To run the tool, execute the following: `node entry.js`

`addToList(id)` is used to add ID numbers to the PID object for batch updating
`pushMultipleMembers()` is used to read ID Numbers from the PID object and push data to airtable
`pushSingleMember(id)` is used to push a single ID number to airtable

For student IDs that have a space in them (i.e. "NNNNNNNN (SCH)"), the ID <b>MUST</b> be wrapped in some form of quotation marks.

### Setup
Commit this repo by executing `git clone https://github.com/jhern603/UPE_Automated_Checkin`

Install node dependencies by running `npm install`

### Issues
