// Dependencies
const express = require('express');
const app = express();
const pokemon = require("./models/pokemon.js");
app.use("/static", express.static("public"));
app.use(express.urlencoded({extended:true}));
const PORT = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"))

app.get("/", (req,res)=>{
    res.redirect('/pokedex')
})

// Index Route
app.get('/pokedex', (req,res)=>{
    res.render('index.ejs',{
        pokemons:pokemon
    });
});

// New Route
app.get('/pokedex/new', (req,res)=>{
    res.render('new.ejs')
})

// Destroy Route
app.delete("/pokedex/:id", (req,res)=>{
    // splice the item out of the array
    pokemon.splice(req.params.id, 1);
    // redirect user back to index
    res.redirect("/pokedex");
});

// Update Route
app.put("/pokedex/:id", (req,res)=>{
    if(req.body.type2 !== ""){
        req.body.type = [req.body.type1, req.body.type2]
    }
    else{req.body.type=[req.body.type1]};
    console.log(req.body)
    pokemon[req.params.id] = req.body;
    res.redirect('/pokedex');
})

// Create Route
app.post('/pokedex', (req,res)=>{
    if(req.body.type2 !== ""){
        req.body.type = [req.body.type1, req.body.type2]
    }
    else{req.body.type=[req.body.type1]};
    console.log(req.body);
    pokemon.push(req.body);
    res.redirect('/pokedex')
})

// EDIT ROUTE - GET to /fruits/:id/edit - render a form to edit the fruit
app.get("/pokedex/:id/edit", (req, res)=>{
    res.render("edit.ejs", {
        pokemons: pokemon[req.params.id],
        index: req.params.id
    })
})


// Show Route
app.get('/pokedex/:id', (req,res)=>{
    res.render('show.ejs', {
        pokemons:pokemon[req.params.id],
        index: req.params.id
    }
    )
})


// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));