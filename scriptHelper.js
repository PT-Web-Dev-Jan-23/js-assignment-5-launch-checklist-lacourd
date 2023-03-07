// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}

function validateInput(testInput) {
    if (testInput === "") {return "Empty"}
    else if (isNaN(parseInt(testInput)) === true) {return "Not a Number"}
    else if (typeof(parseInt(testInput)) === "number") {return "Is a Number"} 
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    console.log("Something correct has happened!");
    
    let pilotValidation = validateInput(pilot);
    let copilotValidation = validateInput(copilot);
    let fuelLevelValidation = validateInput(fuelLevel);
    let cargoLevelValidation = validateInput(cargoLevel);

    if (pilotValidation === "Empty" || copilotValidation === "Empty" || fuelLevelValidation === "Empty" || cargoLevelValidation === "Empty") {
        alert("All fields are required!");
        return
    }
    if (fuelLevelValidation !== "Is a Number") {
        alert("Please enter the amount of fuel in Liters");
        return
    }
    if (cargoLevelValidation !== "Is a Number") {
        alert("Please enter the cargo mass in kilograms");
        return
    }
    
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()});

    return planetsReturned;
}

function pickPlanet(planets) {
    let picker = Math.floor(Math.random()*planets.length);
    return planets[picker];
}




module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
