const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
//const {addProblem} = require('./routes/problem');
const {addProblemPage, addProblem} = require('./routes/problem');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cp_test'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// app.get('/',function(req,res)
// {
// 	res.render('landing');
// })


// app.get("/contests",function(req,res)
// {
// 	db.connect(function(err){
// 		if(err)	throw err;
// 		db.query("SELECT * FROM contest",function(err,result,fields){
// 			if(err)	throw err;
// 			console.log(result);
// 		})
// 	})
// })

app.get('/', getHomePage);
app.get('/add', addProblemPage);
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
 app.post('/add', addProblem);
// app.post('/edit/:id', editPlayer);

// routes for the app

/*app.get('/', getHomePage);
app.get('/add', addPlayerPage);*/
/*app.get('/', getHomePage);
app.get('/add',addProblemPage)
app.post('/add',addProblem);*/
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
// app.post('/edit/:id', editPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});