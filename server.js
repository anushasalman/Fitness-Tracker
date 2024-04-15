const express = require('express');
const app = express();
const { getRoutines, createRoutine } = require('./db/routines.js');
const { getActivities } = require('./db/activities.js');
const router = express.Router();
const bodyParser = require('body-parser');

const client = require('./db/client.js');
client.connect();

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

app.listen(8080, () => console.log(`listening on port 8080`));