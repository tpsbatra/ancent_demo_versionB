let apiKey=""

function showScreen(id){
document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})
document.getElementById(id).classList.add("active")
}

function handleApiKey(){
const key=document.getElementById("apikey-input").value.trim()

if(!key.startsWith("sk-ant-")){
document.getElementById("apikey-error").style.display="block"
return
}

apiKey=key
document.getElementById("apikey-error").style.display="none"
showScreen("s-demo")
}

function goHome(){
showScreen("s-apikey")
}

async function runAI(){

const prompt=document.getElementById("prompt").value

if(!prompt){
alert("Enter a prompt")
return
}

document.getElementById("output").textContent="Generating..."

try{

const response=await fetch("https://claude-demo-proxy.ssoconsul.workers.dev",{

method:"POST",

headers:{
"Content-Type":"application/json",
"x-api-key": apiKey,
"anthropic-version":"2023-06-01"
},

body:JSON.stringify({

model:"claude-3-5-sonnet-latest",

max_tokens:500,

messages:[
{
role:"user",
content:prompt
}
]

})

})

const data=await response.json()

document.getElementById("output").textContent =
data.content[0].text

}

catch(error){

document.getElementById("output").textContent =
"Error connecting to Claude API"

}

}
