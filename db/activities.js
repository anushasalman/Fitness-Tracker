const client = require('./client.js');

const createActivity = async ({ activityName, activityDescription }) => {
  try {
    const { rows: [activities] } = await client.query(`
  INSERT INTO activities (name, description)
  VALUES ('${activityName}', '${activityDescription}')
  RETURNING *;
  `)

  } catch (err) {
    console.log(err);
  }
}


const getActivities = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities;
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

const getOneActivity = async (id) => {
  try{
    const { rows: [activity] } = await client.query(`
    SELECT * FROM activities
    WHERE id = ${id};
    `)
    return activity;

  } catch(err) {
    console.log(err);
  }
};

getOneActivity(1);

module.exports = {
  createActivity,
  getActivities,
  getOneActivity
}