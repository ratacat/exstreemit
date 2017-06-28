var state = "show";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "checkstate") {
      sendResponse({check: state});
    } else if (request.greeting == "togglestate") {
    	toggleState();
    }
    return true;
  });

function toggleState (){
	if (state == "show") {
		state = "hide";
		console.log("state changed from show to hide");
	} else {
		state = "show";
		console.log("state changed from hide to show");
	}
}