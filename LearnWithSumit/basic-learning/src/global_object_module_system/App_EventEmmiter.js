const School = require('./School');

const school = new School();

// register
school.on('bellRing', ({ period, text }) => {
    console.log(`We need to run! ${period} ${text}`);
});
school.startPeriod();
