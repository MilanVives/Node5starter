const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');

//JSON Middleware in order to be able to parse JSON from the request Body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(express.static('public'));
app.use(helmet());
app.set('view engine', 'pug'); //geen require nodig!
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}

console.log('Application Name:', config.get('name'));
console.log('Application Mail:', config.get('mail.host'));
console.log('Application Psw:', config.get('mail.password'));


console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);






//Check if there is an environment variable PORT on system
//If not use default port 3000
const port = process.env.PORT || 3000;
//Let webserver listen for incoming requests on the defined port
app.listen(port,()=> console.log(`Listening on port ${port}...`));

