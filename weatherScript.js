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
    const stadiumZips = filterLocations(nflZips, [1,1,1,1, 1, 1, 1, 1]);
    const weatherObjArray = await myWeatherFetcher.getWeatherData(stadiumZips)
    weatherObjArray.forEach((weatherObj, index) => {
        const newPane = document.createElement('div');
        newPane.setAttribute('id', `stadiumPane-${index}`);
        setData(newPane, weatherObj);
        newPane.classList.add('content');
        setStyling(newPane);
        document.getElementById('weather-holder')
            .appendChild(newPane);
    });
}
init();

function setStyling(contentPane) {

    //pane.childNodes.
    //case id, apply logic appropriately

    //could also apply attribute classes (loc, temp, wind etc) and use querySelectorAll(?)
    //loop through nodes
    let val;
    for (let attribute of contentPane.childNodes) {
        const divClass = attribute.className;
        console.log(`div class: ${divClass}`);
        switch (divClass) {
            case 'location': 
                break;
            case 'temp': 
                val = Number.parseInt(attribute.innerHTML.slice(6,8));
                if (val <= 35) contentPane.classList.add('temp-flag');
                break;
            case 'wind':
                val = Number.parseInt(attribute.innerHTML.slice(6,9));
                if (val >= 5) {
                    contentPane.classList.add('wind-flag');
                }
            case 'description':
        }
    }

}

function setData(contentPane, weatherObj) {
        const location= document.createElement('div');
        location.setAttribute('class', 'location');
        location.innerHTML = `Location: ${weatherObj.location}`;
        const temp= document.createElement('div');
        temp.setAttribute('class', 'temp');
        temp.innerHTML = `temp: ${weatherObj.temp}`;
        const wind= document.createElement('div');
        wind.setAttribute('class', 'wind');
        wind.innerHTML = `wind: ${weatherObj.wind}`;
        const description= document.createElement('div');
        description.setAttribute('class', 'description');
        description.innerHTML = `description: ${weatherObj.description}`;
        contentPane.appendChild(location);
        contentPane.appendChild(temp);
        contentPane.appendChild(wind);
        contentPane.appendChild(description);
}

        //set border
        // debugger;
        // if (Number.parseInt(weatherObj.wind) >= 5) newPane.classList.add('wind-flag');
        // else newPane.classList.add('content');
//}




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