const client = require('./client.js');
const { createRoutine } = require('./routines.js');
const { createActivity } = require('./activities.js');
const { createRoutines_Activities } = require('./routines_activities.js');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
`)
  } catch (err) {
    console.log(err);
  }
}


const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      is_public BOOLEAN,
      goal INTEGER
    );

    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      description VARCHAR(100)
    );

    CREATE TABLE routines_activities (
      id SERIAL PRIMARY KEY,
      routines_id INT REFERENCES routines(id),
      activities_id INT REFERENCES activities(id),
      count INT
    );


    `)
  } catch (err) {
    console.log(err);
  }
}


const syncAndSeed = async () => {
  await client.connect();
  console.log('CONNECTED');

  await dropTables();
  console.log(`TABLES DROPPED!`);

  await createTables();
  console.log(`TABLES CREATED!`);

  await createRoutine('basketball', true, 60);
  await createRoutine('soccer', true, 45);
  await createRoutine('baseball', false, 30);
  console.log(`ROUTINES CREATED!`)

  await createActivity('running', 'running during a game');
  await createActivity('making baskets', 'shooting the ball into a basket');
  await createActivity('hitting', 'using the bat to hit the ball');
  console.log(`ACTIVITIES CREATED!`)

  await createRoutines_Activities(1, 1, 15);
  await createRoutines_Activities(1, 2, 15);
  await createRoutines_Activities(2, 1, 10);
  await createRoutines_Activities(2, 2, 10);
  await createRoutines_Activities(3, 3, 6);
  await createRoutines_Activities(3, 1, 6);
  console.log(`ROUTINES_ACTIVITIES CREATED!`);



  await client.end();
  console.log(`DISCONNECTED`);
}

syncAndSeed();

