let apiKey=""

function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}


function handleApiKey(){

const key=document.getElementById("apikey-input").value.trim()

if(!key.startsWith("sk-")){

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

const response=await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${apiKey}`
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{role:"user",content:prompt}
]

})

})

const data=await response.json()

document.getElementById("output").textContent=
data.choices[0].message.content

}

catch(error){

document.getElementById("output").textContent=
"Error connecting to OpenAI API"

}

}
