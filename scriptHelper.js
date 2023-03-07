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
    if (pilotValidation !== "Not a Number") {
        alert("Please enter the pilot name without call sign")
        return
    }
    if (copilotValidation !== "Not a Number") {
        alert("Please enter the copilot name without call sign");
        return
    }
    
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch`;
    let launchStatusHeading = document.getElementById("launchStatus");

    if (parseInt(fuelLevel) < 10000) {
        launchStatusHeading.style.color = "rgb(199, 37, 78)";
        launchStatusHeading.innerHTML = "Shuttle Not Ready for Launch";
        fuelStatus.innerHTML = "Fuel level too low for launch";
    }
    if (parseInt(fuelLevel) >= 10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }
    if (parseInt(cargoLevel) > 10000) {
        launchStatusHeading.style.color = "rgb(199, 37, 78)";
        launchStatusHeading.innerHTML = "Shuttle Not Ready for Launch";
        cargoStatus.innerHTML = "Cargo mass too high for launch";
    }
    if (parseInt(cargoLevel) <= 10000) {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }
    if (parseInt(cargoLevel) <= 10000 && parseInt(fuelLevel) >= 10000) {
        launchStatusHeading.style.color = "rgb(65, 159, 106)";
        launchStatusHeading.innerHTML = "Shuttle Ready for Launch";
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
