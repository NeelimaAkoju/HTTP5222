const express = require("express");
const path = require("path");
//const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./modules/places/db");

const app = express();
const port = process.env.port || "8888";

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Page route to index page
app.get("/", async(request, response) =>{
    let placeList = await db.getPlaces();
    if (!placeList.length) {
        await db.initializePlace(); 
        petList = await db.getPlaces();
    }
    //console.log(placeList);
    response.render("index", {places: placeList});
});

//Page route to get place details page
app.get("/placeDetails/:id", async(request, response) =>{
    let  placeDetails = await db.getPlaceDetails(request.params.id);
    console.log(placeDetails);
    response.render("details", {place: placeDetails});
});

//page route to about page
app.get("/about", async(request, response) =>{
    response.render("about");
});

//page route to place-add page
app.get("/admin/place/add", async(request, response) => {
    response.render("place-add",{title: "Add Place"});
});

app.post("/admin/place/add/submit", async(request, response) =>{
    let attraction = request.body.placeAttraction;
    let state = request.body.placeState;
    let city = request.body.placeCity;
    let imgUrl = request.body.placeImgUrl;
    let about = request.body.placeAbout;
    let food = request.body.placeFood;
    let history = request.body.placeHistory;

    let newPlace ={
        attraction: attraction,
        state: state,
        city: city,
        imgUrl: imgUrl,
        about: about,
        food: food,
        history: history
    }
    console.log(newPlace);
    await db.addPlace(newPlace);
    response.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});