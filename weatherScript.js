//re-create a modified index.js to utilize weatherFetcher class
//create array of all potential stadium locations
//run array through filter to result in sub-array of relevant locations for a given fetch
//send array through weatherFetcher
//Use css to display results, highlighting specific features that may be of interest

import {nflZips} from './zipCodes.js';
import {WeatherFetcher} from './weatherFetcher.js';

const myWeatherFetcher = new WeatherFetcher();

//HTML SCRIPT
//[1,1,1,1] used as test filterArray
async function init() {
    const stadiumZips = filterLocations(nflZips, [1,1,1,1]);
    const weatherObjArray = await myWeatherFetcher.getWeatherData(stadiumZips)
    weatherObjArray.forEach((weatherObj, index) => {
        const newPane = document.createElement('div');
        newPane.setAttribute('id', `stadiumPane-${index}`);
        setData(newPane, weatherObj);
        newPane.classList.add('content');
        document.body.appendChild(newPane);
    });
}
init();

function setData(newPane, weatherObj) {
        const location= document.createElement('div');
        location.innerHTML = `Location: ${weatherObj.location}`;
        const temp= document.createElement('div');
        temp.innerHTML = `temp: ${weatherObj.temp}`;
        const wind= document.createElement('div');
        wind.innerHTML = `wind: ${weatherObj.wind}`;
        const description= document.createElement('div');
        description.innerHTML = `description: ${weatherObj.description}`;
        newPane.appendChild(location);
        newPane.appendChild(temp);
        newPane.appendChild(wind);
        newPane.appendChild(description);

        //create child elements (divs for each attribute)
        //add data
        //append


        // locationEl3.innerHTML += myTest3.location;
        // tempEl3.innerHTML += myTest3.temp;
        // windEl3.innerHTML += myTest3.wind;
        // conditionsEl3.innerHTML += myTest3.description;
}




function setLocationFilter(filter) {
    filter[0] = 1;
    filter[3] = 1;
}

function filterLocations(locations, filter) {
    return locations.filter((location, index) => location && filter[index]);
}

function runTest() {
    let locationFilter = new Array(nflZips.length).fill(0);
    setLocationFilter(locationFilter);
    const relevantZips = filterLocations(nflZips, locationFilter);
    console.log("relevant zips: ", relevantZips);
}

//runTest();