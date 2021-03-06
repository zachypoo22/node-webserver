const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server log', log + ' \n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//   res.render(__dirname + '/views/maint.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render(__dirname + '/views/home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hi there!',
    });
});

app.get('/about', (req, res) => {
    res.render(__dirname + '/views/about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/projects', (req, res) => {
    res.render(__dirname + '/views/projects.hbs', {
        pageTitle: "Portfolio Page Here",
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'OH NO THIS BAD!'
    });
});

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});
