const express = require('express');
const app = express();
const { getRoutines } = require('./db/routines.js');

const client = require('./db/client.js');
client.connect();

app.get('/api/v1/routines', async(req, res, next) => {
try {
const allRoutines = await getRoutines();
console.log('ALL ROUTINES', allRoutines);

res.send(allRoutines);
} catch(err) {
  next(err);
}


})

app.listen(3001, () => console.log(`listening on port 3001`));