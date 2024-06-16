const { Long } = require("mongodb");
const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//Setting up schema for Place
const PlaceSchema = new mongoose.Schema({
    attraction: String,
    state: String,
    city: String,
    image_url: String,
    about: String,
    food: String,
    history: String
});

const Place = mongoose.model("Place", PlaceSchema);

const ObjectId = require('mongodb').ObjectId;

//MONGODB FUNCTIONS
async function connect() {
    await mongoose.connect(dbUrl); //connect to mongodb
}

//Function to get all places from the places collection
async function getPlaces(){
    await connect();
    return await Place.find({}).sort({city: 1});
}

//Initialize pets collection with some data
async function initializePlace(){
    const placeList = [{
        attraction: "Kaziranga National Park",
        state: "Assam",
        city: "Kohora",
        image_url: "https://en.wikipedia.org/wiki/File:Kaziranga-National-Park-in-Assam.webp",
        about: "Kaziranga National Park is a protected area in the northeast Indian state of Assam.",
        food: "Assamese cuisine includes rice, fish curry, and pitha."
    }]
    await Place.insertMany(placeList);
}

//Function to get data for a particular place
async function getPlaceDetails(placeId){
    await connect();
    let idFilter = { _id: new ObjectId(placeId)};
    console.log(placeId);
    return await Place.findOne(idFilter);
}
//Function to add new place to the collection
async function addPlace(newPlace){
    await connect();
    await Place.insertMany(newPlace);
}

module.exports = {
    getPlaces,
    initializePlace,
    getPlaceDetails,
    addPlace
}