//Declaring variables used to store user information
let userAgent;
let userOS='Not found';

function getUserAgent() {
    userAgent=(window.navigator.userAgent);
    if(userAgent.match("Windows")){
        userOS='Windows';
    }
    logUserAgent();
    showUserInfo();
}


function logUserAgent() {
    console.log(userAgent);
    console.log(userOS);
}

function showUserInfo(){
    document.getElementById("userOS").innerHTML="Your device's Operating System is : "+userOS;
}
