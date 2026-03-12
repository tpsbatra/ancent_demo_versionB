
function showScreen(id){
document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})
document.getElementById(id).classList.add("active")
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

document.getElementById("output").textContent =
data.content[0].text

}

catch(error){

document.getElementById("output").textContent =
"Error connecting to Claude API"

}

}
