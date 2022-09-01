const express = require('express');
const app = express();

const PORT = 3000;

app.set('views','C:\Users\safouene.mani\Desktop\projects\GPMILL-landing-zone\src\views');
app.set('view engine');

app.get('/movies',(req,res) => {
    res.send('bientot movies page');
});

app.get('/movies/add',(req,res) => {
    res.send(`ajouter un film par içi`);
});

app.get('/movies/:id',(req,res) => {
    const id = req.params.id;
    res.send(`file numéro ${id}`);
});


app.get('/',(req,res) => {
    res.send('Hello World !!');
});

app.listen(3000,() => {
    console.log(`listening on port ${PORT}`);
});