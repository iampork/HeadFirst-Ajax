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
		addEventHandler(currentImage,"mouseover",showHint);
		addEventHandler(currentImage,"mouseout",hideHint);
		currentImage.onclick=showTab;
		addEventHandler(currentImage,"mouseover",buttonOver);
		addEventHandler(currentImage,"mouseout",buttonOut);
		function buttonOver(e){
			var me =getActivatedObject(e);
			me.className="active";
		}
		function buttonOut(e){
			var me=getActivatedObject(e);
			me.className="";
		}
	}
}

function showHint(e){
	if(!welcomePaneShowing){
		return;
	}
	var me=getActivatedObject(e);
	switch(me.title){
		case "beginners":
		var showText="Just getting started? Come join us!";
		break;
		case "intermediate":
		var showText="Take your flexibility to the next level!";
		break;
		case "advanced":
		var showText="Perfectly join your body and mind";
		break;
		default:
		var showText="Click a tab to display the course schedule for the class";
	}
	var showContent=document.getElementById("content");
	showContent.innerHTML="<h3>"+showText+"</h3>"
}

function hideHint(){
	if(welcomePaneShowing){
		var contentPane=document.getElementById("content");
		content.innerHTML="<h3>Click a tab to display the course schedule for the selected class</h3>"
	}
}


function showTab(e){
	var me=getActivatedObject(e);
	var selectedTab=me.title;
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

