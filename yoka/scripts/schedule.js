window.onload=initPage;
var welcomePaneShowing=true;

function initPage(){
	var tabs=document.getElementById("tabs").getElementsByTagName("a");
	for(var i=0;i<tabs.length;i++){
		var currentTab=tabs[i];
		currentTab.onmouseover=showHint;
		currentTab.onmouseout=hideHint;
		currentTab.onclick=showTab;
	}
	
	var images=document.getElementById("navigation").getElementsByTagName("a");
		for(var i=0;i<images.length;i++){
		var currentImage=images[i];
		currentImage.onmouseover=showHint;
		currentImage.onmouseout=hideHint;
		currentImage.onclick=showTab;
		currentImage.onmouseover=function buttonOver(){
			this.className="active";
		}
		currentImage.onmouseout=function buttonOut(){
			this.className="";
		}
	}
}

function showHint(){
	if(!welcomePaneShowing){
		return;
	}
}

function hideHint(){
	if(welcomePaneShowing){
		var contentPane=document.getElementById("content");
		content.innerHTML="<h3>Click a tab to display the course schedule for the selected class</h3>"
	}
}


function showTab(){
	var selectedTab=this.title;
	var tabs=document.getElementById("tabs").getElementsByTagName("a");
	for(var i=0;i<tabs.length;i++){
		var currentTab=tabs[i];
		if(currentTab.title==selectedTab){
			currentTab.className="active";
		}else{
			currentTab.className="inactive";
		}
	}
	var request=createRequest();
	if(request==null){
		alert("Unable to create request");
		return;
	}
	request.onreadystatechange=showSchedule;
	request.open("GET",selectedTab+".html",true);
	request.send(null);
	
	if(selectedTab=="welcome"){
		welcomePaneShowing=true;
		document.getElementById("content").innerHTML="<h3>Click a tab to display the course schedule for the selected class</h3>";
	}else{
		welcomePaneShowing=false;
	}
}

function showSchedule(){
	if(request.readyState==4){
		if(request.status==200){
			document.getElementById("content").innerHTML=request.responseText;
		}
	}
}

