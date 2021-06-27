// Global Variable
var pod_name;
var image_name;
var dep_name;
var rep_no;
var port_no;
var type_name;
var d_name;
var command;

function voiceFun(){
  var x = document.getElementById("bars");
  if(x.style.display==="none"){
    x.style.display = "flex";
    (async()=>{
      speak("How can I help you");
      await sleep(4000)
      runSpeechRecognition()
      await sleep(3000)
     })()
     
  }
  else {
    x.style.display = 
  "none";
  }
}
// Speech to Text
function runSpeechRecognition() {


      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
  
      // This runs when the speech recognition service starts
      recognition.onstart = function() {
          console.log("<small>listening, please speak...</small>")
          document.getElementById("cmd").value="Listning..."
      };
      
      recognition.onspeechend = function() {
          console.log("<small>stopped listening, hope you are done...</small>")
          recognition.stop();
      }
    
      // This runs when the speech recognition service returns result
      recognition.onresult = function(event) {
          var transcript = event.results[0][0].transcript;
          var confidence = event.results[0][0].confidence;
          console.log( "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%")
          document.getElementById("cmd").value=transcript
          exchange("kube_voice");
      };
    
       // start recognition
       recognition.start();
}



function launch_pod(){
  pod_name = prompt("Name of Pod: ");
  image_name = prompt("Name of Image: ");
  exchange("launch_pod");
}
function launch_deployment(){
  dep_name = prompt("Name of Deployment: ");
  image_name = prompt("Name of Image: ");
  exchange("launch_deployment");
}
function scale_deployment(){
  dep_name = prompt("Name of Deployment: ");
  rep_no = prompt("Number of Replicas: ");
  exchange("scale_deployment");
}
function create_service(){
  dep_name = prompt("Name of Deployment: ");
  port_no = prompt("Port: ");
  type_name = prompt("Name of Type: ");
  exchange("create_service");
}
function del(){
  d_name = prompt("Enter the Name: ");
  exchange("delete");
}
function run_command(){
  command = document.getElementById('cmd').value;
  exchange("kube_input");
}

// Exchange

function exchange(file){
  var url;
  if(file=="launch_pod"){
    url = "http://192.168.225.31/cgi-bin/launch_pod.py?pod="+pod_name+"&img="+image_name;
    console.log(url)
  }
  else if(file=="launch_deployment"){
    url = "http://192.168.225.31/cgi-bin/launch_deployment.py?dep="+dep_name+"&img="+image_name;
    console.log(url)
  }
  else if(file=="scale_deployment"){
    url = "http://192.168.225.31/cgi-bin/scale_deployment.py?dep="+dep_name+"&replicas="+rep_no;
    console.log(url)
  }
  else if(file=="create_service"){
    url = "http://192.168.225.31/cgi-bin/create_service.py?dep="+dep_name+"&port="+port_no+"&type="+type_name;
    console.log(url)
  }
  else if(file=="delete"){
    url = "http://192.168.225.31/cgi-bin/deletepod.py?name="+d_name;
    console.log(url)
  }
  else if(file=="kube_voice"){
    cmd = document.getElementById("cmd").value;
    url = "http://192.168.225.31/cgi-bin/kube_voice.py?cmd="+cmd;
    console.log(url)
  }
  else{
    url = "http://192.168.225.31/cgi-bin/kube_input.py?cmd="+command;
    console.log(url)
  }

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url,true);
	xhr.send()
	
	xhr.onload = function(){
		//Output from above url
		var out = xhr.responseText;
		console.log(out)
    document.getElementById("out").innerHTML = out;
    $("#newModal").modal("show");
(async()=>{
      speak(out);
      await sleep(3000)

     })()
	}
}

// Speak
function speak(msg){

  const speech = new SpeechSynthesisUtterance();
  speech.text = msg;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

const DEF_DELAY = 1000;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}



