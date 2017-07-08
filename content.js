
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
    $("div.PostSummary__reblogged_by").parent().parent().hide();
    // ...
});

var target = document.getElementById('posts_list');


var state = "blank";
checkState();

var li=document.createElement("li"); 
firstParent = document.querySelector("#posts_list > ul");
firstChild = document.querySelector("#posts_list > ul > li:nth-child(1)");
firstParent.insertBefore(li,firstChild); 
li.id="togglediv";

function checkState(){
	chrome.runtime.sendMessage({greeting: "checkstate"}, function(response) {
  		if (response.check == "show") {
  			observer.disconnect();
  			$("div.PostSummary__reblogged_by").parent().parent().show();
			li.innerText="hide resteems";
			li.onclick= toggleState;
		} else if (response.check == "hide") {
			$("div.PostSummary__reblogged_by").parent().parent().hide();
			// watch for any incoming ajax loaded posts to hide resteemed
			observer.observe(target, {
			  subtree: true,
			  childList: true,
			  attributes: true
			  //...
			});
			li.innerText="show resteems";
			li.onclick= toggleState;
		} else {
			li.innerText="NA";
		}
	});
}

function toggleState(){
	chrome.runtime.sendMessage({greeting: "togglestate"});
	checkState();
}
