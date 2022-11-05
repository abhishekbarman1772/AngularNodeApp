const seedersExec = async () => {
  await require('../app/common/mongoose').connectToDb();

  await require('./user')();

  await require('../app/common/mongoose').disconnectToDb();

  process.exit(0);
};

seedersExec();
