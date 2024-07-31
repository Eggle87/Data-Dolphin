//Declaring variables used to store user information
let userAgent=window.navigator.userAgent;
let userOS;
let userBrowser;
let browserVersion;
let userLocation;


//Checking if userAgentData is usable on the users browser
function checkForChromium(agent){
    return (agent.search('Chrome'))
}

//Find user Operating system
if(checkForChromium(userAgent)){
    try {
        userOS=window.navigator.userAgentData.platform;
        findBrowser();
    } catch (error) {
        alert('Browser not currently fully supported');
        userOS='Unable to find'
    }
}else{
    alert('Browser not currently fully supported');
    userOS='Unable to find';
}

//Used to find the name of the browser being used
function findBrowser(){
    let brands=window.navigator.userAgentData.brands;
    //filter out the 'not a brand' brand often shown in the useragent
    brands = brands.filter(brand => {
        return !(brand.brand.includes('Not') && brand.brand.includes('A') && brand.brand.includes('Brand'));
    });
    //Show the first brand left, not 100% accurate at the moment
    userBrowser=brands[0].brand;
    browserVersion=brands[0].version;
}

//Geolocation using https://ip-api.com/docs/api:json#test
function getLocation(){
    const apiUrl = 'http://ip-api.com/json/?fields=continent,country,regionName,city,zip';

    //Get API result and set the geolocation text to fit 
    return fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // save data to a variable
        userLocation=data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



//Edit the HTML text to show user information
function showUserInfo(){
    document.getElementById("userBrowser").innerHTML="Your browser is recognized as : "+userBrowser+' v'+browserVersion;
    document.getElementById("userOS").innerHTML="Your device's Operating System is : "+userOS;
    document.getElementById("geo").innerHTML = (`Your current approximate location is : ${userLocation.continent}, ${userLocation.country}, ${userLocation.city}`);
}


console.log(window.navigator.userAgentData.brands);

getLocation().then(showUserInfo);