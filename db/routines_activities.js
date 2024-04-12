const client = require('./client.js');

const createRoutines_Activities = async(routineId, activityId, count) => {
  try {
    await client.query(`
    INSERT INTO routines_activities (routines_id, activities_id, count)
    VALUES ('${routineId}', '${activityId}', '${count}')
    `)
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createRoutines_Activities
}