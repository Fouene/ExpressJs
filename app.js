const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const multer = require('multer'); //utiliser pour upload des formulaires dans notre cas mais aussi des fichiers
const { urlencoded } = require('body-parser');
const upload = multer();
const jwt = require ('jsonwebtoken');
const expressJwt = require('express-jwt');

const PORT = 3000;
let frenchMovies =[];
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressJwt({ secret : secret}).unless({path: ['/', '/movies','/movie-search','/login']}));

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

var urlencodedParser = bodyParser.urlencoded({ extended: false});

//POST :
// app.post('/movies', urlencodedParser,(req, res) => {
//     console.log('Le titre : ',req.body.movietitle);
//     console.log("L'annèe:",req.body.movieyear);
//     const newMovie = { title : req.body.movietitle, year :req.body.movieyear};
//     // frenchMovies.push(newmovie);  $[ la nouvelle version est ci-dessous]
//     frenchMovies = [...frenchMovies, newMovie];
//     console.log(frenchMovies);

//     res.sendStatus(201);
// });
//le bloc ci-dessus a été commenté suite à l'installation de multer qui fera le lien entre le serveur et le formulaire
app.post('/movies', upload.fields([]), (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    }else {
        const formData = req.body;
        console.log('formData : ', formData);
        const newMovie = { title : req.body.movietitle, year :req.body.movieyear};
        frenchMovies = [...frenchMovies, newMovie];
        console.log(frenchMovies);
        res.sendStatus(201);
    }
})

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
app.get('/movie-search',(req,res) => {
    res.render('movie-search');
});

app.get('/login', (req, res) => {
    res.render('login', { title:'Espace membre'});
});

const fakeUser = { email: 'testuser@testmail.fr', password: 'qsd' };

app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body);
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        if(fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
            const myToken = jwt.sign({iss:'http://expressmovies.fr',user: 'Sam', role :'moderator'}, secret);
            res.json(myToken);
        } else {
            res.sendStatus(401);
        }
    }
});

app.get('/member-only',(req,res) => {
    console.log('req.user', req.user);
    res.send(req.user);
});

app.listen(3000,() => {
    console.log(`listening on port ${PORT}`);
});