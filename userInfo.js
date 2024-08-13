//Declaring variables used to store user information
let userAgent = window.navigator.userAgent;
let userOS;
let userBrowser;
let browserVersion;
let userLocation;


//Checking if userAgentData is usable on the users browser
function checkForChromium(agent) {
    return (agent.search('Chrome')!==-1)
}

//Get user data based on browser capabilities
if (checkForChromium(userAgent)) {
    try {
        userOS = window.navigator.userAgentData.platform; //Get operating system from userAgentData
        findBrowser();
    } catch (error) {
        alert('Browser not currently fully supported');
        userOS = 'Unable to find';
    }
} else {
    userOS=userAgent.substring(userAgent.indexOf('(')+1,userAgent.indexOf(')')); //Not as visually appealing way to show OS but will work most of the time
    findNonChromium();
}

//Used to find the name of the browser being used
function findBrowser() {
    let brands = window.navigator.userAgentData.brands;
    //filter out the 'not a brand' brand often shown in the useragent
    brands = brands.filter(brand => {
        return !(brand.brand.includes('Not') && brand.brand.includes('A') && brand.brand.includes('Brand'));
    });
    //Show the first brand left, not 100% accurate at the moment
    userBrowser = brands[0].brand;
    browserVersion = brands[0].version;
}

//Utilize substrings instead of brands to identify browser (not ideal as would need to put all browser names in order to work)
function findNonChromium(){
    if(userAgent.includes('Firefox')){
        userBrowser='FireFox';
        browserVersion=userAgent.substring((userAgent.indexOf('Firefox')+8));
    }else if(userAgent.includes('Safari')){
        userBrowser='Safari';
        browserVersion=userAgent.substring((userAgent.indexOf('Safari')+7));
    }else{
        alert('Browser not currently fully supported');
    }
}

//Geolocation using https://ip-api.com/docs/api:json#test
function getLocation() {
    const apiUrl = 'http://ip-api.com/json/?fields=continent,country,regionName,city,zip,query';

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
            userLocation = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



//Edit the HTML text to show user information
function showUserInfo() {
    document.getElementById("userBrowser").innerHTML = "Your browser is recognized as : " + userBrowser + ' v' + browserVersion;
    document.getElementById("userOS").innerHTML = "Your device's Operating System is : " + userOS;
    document.getElementById("geo").innerHTML = (`Your current approximate location is : ${userLocation.continent}, ${userLocation.country}, ${userLocation.city}`);
    document.getElementById('ipAddress').innerHTML = ("Your public IPv4 address is : " + userLocation.query);
}


getLocation().then(showUserInfo);

console.log(userAgent);