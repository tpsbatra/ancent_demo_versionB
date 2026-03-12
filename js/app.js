
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

const response = await fetch(
"https://claude-demo-proxy.ssoconsul.workers.dev",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
prompt: prompt
})
}
)

const data = await response.json()

if(data && data.content && data.content.length > 0){
document.getElementById("output").textContent =
data.content[0].text
}else{
document.getElementById("output").textContent =
"Claude returned an unexpected response"
}

}

catch(error){

document.getElementById("output").textContent =
"Error connecting to Claude API"

}

}
