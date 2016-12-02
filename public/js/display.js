var socket = io();

socket.on("connect", function() {
	console.log("Connected to socket server!");
});



// socket.on("display message", function (message) {
// 	console.log("Message received: ", message)

// });

// var answerTotal = 0;
// var messageIndex = 0;
// var showIndex = 0;
var maxAnswersReached = 0;
// var displayIndex;
var lastDisplayByInput = 1;
var displayIDs = new Array();
var totalAnswers = 100000;

socket.on("display message", function (message) {

	document.getElementById('sound1').play();
	// lastDisplayByInput = 1;
	// alert(message);
	
	timerStop();
	var classIndex =(Math.floor(Math.random() * classNames.length)) % classNames.length;

	var messageIndex = localStorage.getItem("messageCount");
	
		// messageIndex = 0;
		// localStorage.setItem("messageCount", messageIndex);
	
		var messageStorageName = "message" + messageIndex;
 		localStorage.setItem(messageStorageName, message);

 		var classStorageName = "class" + messageIndex;
 		localStorage.setItem(classStorageName, classIndex);

 		localStorage.setItem("messageCount",++messageIndex);
				// alert("class index: " + classIndex);
	// classNamesIndex[messageIndex] = classIndex;

	// messageHistory[messageIndex++] = message;
	if(messageIndex >= totalAnswers){

		localStorage.setItem("totalAnswersOverHundred", 1);	
		localStorage.setItem("messageCount", 0);	
		// messageIndex = 0;
		// maxAnswersReached = 1;
	}

	showMessages(1);
	lastDisplayByInput = 1;
	timerStart();
		

});

var messageHistory = new Array();
var classNamesIndex = new Array();
for (var i = 0; i<totalAnswers; i++){
	messageHistory[i] = "";
	classNamesIndex[i] = 0;
}

var rotateTimer;


function rotateAnswerOnTimer(){
	// if(answerTotal>=6){
	// 	document.getElementById("a1").innerHTML = document.getElementById("a2").innerHTML;
	// 	document.getElementById("a2").innerHTML = document.getElementById("a3").innerHTML;		
	// 	document.getElementById("a3").innerHTML = document.getElementById("a4").innerHTML;
	// 	document.getElementById("a4").innerHTML = document.getElementById("a5").innerHTML;
	// 	document.getElementById("a5").innerHTML = document.getElementById("a6").innerHTML;
		
	// 	if(maxAnswersReached==0){
	// 		document.getElementById("a6").innerHTML = messageHistory[0];
	// 	}else{
	// 		document.getElementById("a6").innerHTML = messageHistory[index];
	// 	}
	showMessages(0);
	lastDisplayByInput = 0;
	timerStart();
	}



function timerStart() {
    rotateTimer = setTimeout(rotateAnswerOnTimer, 60000);
}

function timerStop() {
    clearTimeout(rotateTimer);
}

// function hideBubbles(){
// 	document.getElementById("a1").style.visibility = "hidden";

// 	document.getElementById("a2").style.visibility = "hidden";

// 	document.getElementById("a3").style.visibility = "hidden";

// 	document.getElementById("a4").style.visibility = "hidden";

// 	document.getElementById("a5").style.visibility = "hidden";
// 	document.getElementById("a6").style.visibility = "hidden";

// }

var classNames = new Array();
function showMessages(currentDisplayByInput) {
		// alert(messageIndex);
		// alert("show index: " + showIndex);
		nextShowIndex(currentDisplayByInput);
		// alert("Show index: "+showIndex);
		displayIndex = localStorage.getItem("showIndex");
		// alert("Display index: " + displayIndex);
		// if(toggle ==0 ){
		// 		document.getElementById("a1").style.visibility = "hidden";
		// 		toggle = 1;
		// 	} else{

//			document.getElementById("a1").className = "talk-bubble tri-right round border left-top";
			
			for (var i = 0; i<displayIDs.length; i++){
				displayIDs[i].style.visibility = "visible";
			// 	toggle = 0;
			// }i
			 //    if(((i+showIndex) % 2) == 0){
				// 	displayIDs[i].className = "talk-bubble tri-right round border left-top";
			 //    }else{
				// 	displayIDs[i].className = "talk-bubble tri-right round border right-top";
				// }
				
				var messageStorageName = "message" + displayIndex;
 				var classStorageName = "class" + displayIndex;
				// localStorage.setItem(classStorageName, classIndex);

 				// localStorage.setItem(messageStorageName, message);
				displayIDs[i].innerHTML = localStorage.getItem(messageStorageName);
				displayIDs[i].className = classNames[localStorage.getItem(classStorageName)];

	 	     // document.getElementById("a1").style.display = "none";
	 			displayIndex = nextDisplayIndex(displayIndex) 
	 			if ( displayIndex  == -1 ) {
	 				return;
	 			}
	 		}
	 	}
// 	 	displayIDs[i].style.visibility = "visible";


// 		document.getElementById("a2").innerHTML = messageHistory[displayIndex];
// 		if ( nextDisplayIndex() == 0 ) {
// 			 		return;
// 			 	}		

// 		document.getElementById("a3").style.visibility = "visible";

// 		document.getElementById("a3").innerHTML = messageHistory[displayIndex];
// 		if ( nextDisplayIndex() == 0 ) {
// 			 		return;
// 			 	}		

// 		document.getElementById("a4").style.visibility = "visible";

// 		document.getElementById("a4").innerHTML = messageHistory[displayIndex];
// 		if ( nextDisplayIndex() == 0 ) {
// 			 		return;
// 			 	}		

// 		document.getElementById("a5").style.visibility = "visible";

// 		document.getElementById("a5").innerHTML = messageHistory[displayIndex];
// 		if ( nextDisplayIndex() == 0 ) {
// 			 		return;
// 			 	}		


// 		document.getElementById("a6").style.visibility = "visible";

// 		document.getElementById("a6").innerHTML = messageHistory[displayIndex];
	

// }

//can comment out
function nextMessageIndex(){
	if(++messageIndex >= totalAnswers){
		messageIndex = 0;
	}
	return messageIndex;
}

//more than display.length, cycle
function nextShowIndex(currentDisplayByInput){
	var messageIndex = localStorage.getItem("messageCount");
	var showIndex = localStorage.getItem("showIndex");
	if(lastDisplayByInput == 0 && currentDisplayByInput == 1){
		if (maxAnswersReached == 1 || messageIndex > displayIDs.length){
			showIndex = messageIndex - displayIDs.length;
			if(showIndex<0){
				showIndex += total;
			}
		}
	}else{
		if(maxAnswersReached==1 || messageIndex > displayIDs.length){
			showIndex++;
			// if(lastDisplayByInput==1 && currentDisplayByInput==1){
				if(maxAnswersReached==1){
					if(showIndex >= messageHistory.length){
						showIndex = 0;
					}
				}if(showIndex >= messageIndex){
					showIndex = 0;
				}
				// alert("showIndex: " + showIndex);
			// }else if(){
				
			// }
		}
	}
	localStorage.setItem("showIndex", showIndex);
}

	// alert("answer of hundred = " + maxAnswersReached);
// 	if (lastDisplayByInput == 1 ){// receive messgae from socket
// 		if(maxAnswersReached == 1){
// 			if(++showIndex >= totalPrompts){
// 			showIndex=0;
// 			}
// 		}else{
// 			if (messageIndex>displayIDs.length) {
// 				if (++showIndex == messageIndex) {
// 					showIndex = 0;
// 				}
// 			}
// 		}
// 	}else{ // come here due to timeout
// 		if ( currentDisplayByInput == 1 ){// wake up from timeout
// 			showIndex = messageIndex - displayIDs.length;
// 			if(showIndex<0){
// 				if(maxAnswersReached==1){
// 					showIndex += totalPrompts;
// 				}else{
// 					showIndex+=messageIndex;
// 				}
// 			}
// 		}else{
// 			if(maxAnswersReached == 1){
// 			if(++showIndex >= totalPrompts){
// 			showIndex=0;
// 			}
// 		}else{
// 			if (messageIndex>displayIDs.length) {
// 				if (++showIndex == messageIndex) {
// 					showIndex = 0;
// 				}
// 			}
// 		}
// 		}
// 		// alert("show index: " + showIndex);
// 	}
// }

function nextDisplayIndex(displayIndex){
	var messageIndex = localStorage.getItem("messageCount");
	var totalAnswersOverHundred = localStorage.getItem("answersOverHundred");
	if(	++displayIndex == messageIndex && messageIndex <= displayIDs.length && maxAnswersReached == 0 ) {
     	return -1;
	}
	if(maxAnswersReached == 1){
		if(displayIndex>totalAnswers){
			displayIndex = 0;
		}
	}else if (displayIndex >= messageIndex){
		displayIndex = 0;
	} 
	return displayIndex;
}
 

  // $('form').submit(function(){
  //   socket.emit('display message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // });
  // socket.on('display message', function(message){
  //   ('#messages').append(('<li>').text(message));
  // });