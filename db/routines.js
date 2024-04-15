const client = require('./client.js');

const createRoutine = async ({routineName, isPublic, ourGoal}) => {
  try {
    const { rows: [ routines ] } = await client.query(`
INSERT INTO routines (name, is_public, goal)
VALUES ('${routineName}', ${isPublic}, '${ourGoal}')
RETURNING *;
`)

  } catch (err) {
    console.log(err);
  }
}

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);

    return rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createRoutine,
  getRoutines
}