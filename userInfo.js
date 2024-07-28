//Declaring variables used to store user information
let userAgent=window.navigator.userAgent;
let userOS;
let userBrowser;
let browserVersion;

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


//Edit the HTML text to show user information
function showUserInfo(){
    document.getElementById("userBrowser").innerHTML="Your browser is recognized as: "+userBrowser+' v'+browserVersion;
    document.getElementById("userOS").innerHTML="Your device's Operating System is : "+userOS;
}


console.log(userAgent);
showUserInfo();



console.log(window.navigator.userAgentData.brands);