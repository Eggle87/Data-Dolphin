//Declaring variables used to store user information
let userBrowser=window.navigator.userAgent;
let userOS=window.navigator.userAgentData.platform;


//Summarizing user agent for easier reading
function summarizeAgent(agent){
    let mychar=0;
    for(let i=0;i<agent.length;i++){
        if(agent[i]==')'){
            myChar=i;
        }
    }
    console.log("found ) at "+myChar);
    agent=agent.slice(myChar+1,agent.length);
    return agent;
}



function showUserInfo(){
    document.getElementById("userBrowser").innerHTML="Your browser is recognized as: "+userBrowser;
    document.getElementById("userOS").innerHTML="Your device's Operating System is : "+userOS;
}

userBrowser=summarizeAgent(userBrowser);
showUserInfo();