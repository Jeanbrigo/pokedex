// Dependencies
const express = require('express');
const app = express();
const pokemon = require("./models/pokemon.js")
app.use("/static", express.static("public"));
app.use(express.urlencoded({extended:true}))
const PORT = 3000;
const methodOverride = require("method-override")

app.get("/", (req,res)=>{
    res.redirect('/pokedex')
})

// Index Route
app.get('/pokedex', (req,res)=>{
    res.render('index.ejs',{
        pokemons:pokemon
    });
});

// Show Route
app.get('/pokedex/:id', (req,res)=>{
    res.render('show.ejs', {
        pokemons:pokemon[req.params.id]
    }
    )
})


// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));