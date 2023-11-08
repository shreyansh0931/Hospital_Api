const mongoose  = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hospital_api');

  console.log('My Server Connected:MongoDB');
}