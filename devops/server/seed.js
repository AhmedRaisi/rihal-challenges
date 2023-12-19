const mongoose = require('mongoose');
const faker = require('faker');
const Student = require('./models/Student');
const Country = require('./models/Country');
const Class = require('./models/Class');

mongoose.connect(process.env.MONGODB_URI);

async function createSeedData() {
  // Create some countries
  let countries = [];
  for (let i = 0; i < 5; i++) {
    const country = new Country({ name: faker.address.country() });
    await country.save();
    countries.push(country);
  }

  // Create some classes
  let classes = [];
  for (let i = 0; i < 5; i++) {
    const classInstance = new Class({ class_name: `Class ${i + 1}` });
    await classInstance.save();
    classes.push(classInstance);
  }

  // Create some students
  for (let i = 0; i < 20; i++) {
    const student = new Student({
      name: faker.name.findName(),
      date_of_birth: faker.date.past(10),
      class_id: classes[Math.floor(Math.random() * classes.length)]._id,
      country_id: countries[Math.floor(Math.random() * countries.length)]._id,
    });
    await student.save();
  }

  console.log('Seed data created!');
}

// Use an async IIFE to call createSeedData
(async () => {
    await createSeedData();
    mongoose.disconnect();
  })();
