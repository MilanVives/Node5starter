const express = require('express');
const app = express();
const Joi = require('joi');

//JSON Middleware in order to be able to parse JSON from the request Body
app.use(express.json());

//In memory Array of courses
const courses = [
    {id:1, name:"course 1"},
    {id:2, name:"course 2"},
    {id:3, name:"course 3"},
]

//Default route, Website root GET http://localhost:PORT
app.get('/', (req,res) => {
    res.send('Website home page');
})

//Get all courses route GET http://localhost:PORT/api/courses
app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

//Get one course route GET http://localhost:PORT/api/courses/id
app.get('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course does not exist');
    res.send(course);
})

//Add one course route POST http://localhost:PORT/api/courses
app.post('/api/courses', (req,res)=>{
    //if(!req.body.name || req.body.name.length < 3 ) return res.status(400).send('name not right');
    const result = validateCourse(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

//Edit one course route PUT http://localhost:PORT/api/courses/id
app.put('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course does not exist');
    
    const result = validateCourse(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message)

    course.name = req.body.name;
    res.send(course);
})

//Delete one course route DELETE http://localhost:PORT/api/courses/id
app.delete('/api/courses/:id', (req,res)=>{

const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course does not exist');
const index = courses.indexOf(course);

    courses.splice(index,1) ;
    res.send(course);  

})

//Joi Validation of user input JSON (req.body)
function validateCourse(course){
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

//Check if there is an environment variable PORT on system
//If not use default port 3000
const port = process.env.PORT || 3000;
//Let webserver listen for incoming requests on the defined port
app.listen(port,()=> console.log(`Listening on port ${port}...`));

