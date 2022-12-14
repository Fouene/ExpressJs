const express = require('express');
const app = express();
const bodyParser =require('body-parser')
const PORT = 3000;
let frenchMovies =[];

app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine','ejs');

app.get('/movies',(req,res) => {
    const title = 'Films Français des 30 dernières annèes'
    frenchMovies = [
        {title: 'Le fabuleux destin de Safouene', year: 2001},
        {title: 'Forrest Gump', year: 1998},
        {title: 'Terminator', year: 2015},
        {title: 'Avatar', year: 2022}
    ];
    res.render('movies', { movies: frenchMovies, title: title});
});

//POST :
var urlencodedParser = bodyParser.urlencoded({ extended: false});
app.post('/movies', urlencodedParser,(req, res) => {
    console.log('Le titre : ',req.body.movietitle);
    console.log("L'annèe:",req.body.movieyear);
    const newMovie = { title : req.body.movietitle, year :req.body.movieyear};
    // frenchMovies.push(newmovie);  $[ la nouvelle version est ci-dessous]
    frenchMovies = [...frenchMovies, newMovie];
    console.log(frenchMovies);

    res.sendStatus(201);
});


app.get('/movies/add', (req,res) => {
    res.send(`ajouter un film par içi`);
});

app.get('/movies/:id/:title',(req,res) => {
    const id = req.params.id;
    const title = req.params.title;
    res.render(`movies-details`, { movieid: id, movietitle: title});
});


app.get('/',(req,res) => {
    // res.send('Hello World !!');
    res.render('index')
});

app.listen(3000,() => {
    console.log(`listening on port ${PORT}`);
});