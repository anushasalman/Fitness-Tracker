const express = require('express');
const app = express();
const { getRoutines, createRoutine } = require('./db/routines.js');
const { getActivities, createActivity } = require('./db/activities.js');
const { createRoutines_Activities } = require('./db/routines_activities.js');

const router = express.Router();
const bodyParser = require('body-parser');

const client = require('./db/client.js');
client.connect();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
  

app.post('/api/v1/routines/', async(req, res, next) => {
  try {
    const newRoutine = await createRoutine(req.body);
    res.send(newRoutine);
  } catch(err) {
    next(err);
  }
});

app.post('/api/v1/activities/', async(req, res, next) => {
  try {
    const newActivity = await createActivity(req.body);
    res.send(newActivity);
  } catch(err) {
    next(err);
  }
});

app.post('/api/v1/routines_activities/', async(req, res, next) => {
  try {
    const newRoutineActivity = await createRoutines_Activities(req.body);
    res.send(newRoutineActivity);
  } catch(err) {
    next(err);
  }
});



app.listen(8080, () => console.log(`listening on port 8080`));