const express = require('express');
const app = express();
const { getRoutines } = require('./db/routines.js');
const { getActivities } = require('./db/activities.js');

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
});

app.get('/api/v1/activities', async(req, res, next) => {
  try {
  const allActivities = await getActivities();
  console.log('ALL ACTIVITIES', allActivities);
  
  res.send(allActivities);
  } catch(err) {
    next(err);
  }
  });

// app.post()

app.listen(2000, () => console.log(`listening on port 2000`));