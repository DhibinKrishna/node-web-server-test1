const express = require('express');
const hbs = require('hbs'); //handlebars
const port = process.env.PORT || 3000;
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Express middleware for logging the requests
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to log to server.log file');
        }
    });
    next();
});

//Express middleware for maintenance page
//Uncomment when requred
//  app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//  });

 app.use(express.static(__dirname + '/public')); //Empress middleware
 //localhost:300/help.html

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('hi');
    //res.send('<h1>hello</h1>');
    // res.send({
    //     name: 'raju',
    //     age: 9
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About</h1>');
    //res.render('about.hbs'); //views folder is default for views
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {pageTitle: 'Projects page'});
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});