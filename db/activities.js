const client = require('./client.js');

const createActivity = async (activityName, activityDescription) => {
  try {
    await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${activityName}', '${activityDescription}');
    `);

  } catch(err) {
    console.log(err);
  }
}

const getActivities = async() => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities;
    `);
    return rows;
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createActivity,
  getActivities
}