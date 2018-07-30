window.onload=initPage;

var warnings = {
  "firstname" : {
    "required": "Please enter in your first name.",
    "letters" : "Only letters are allowed in a first name.",
    "err"     : 0
  },
  "lastname" : {
    "required": "Please enter in your last name.",
    "letters" : "Only letters are allowed in a last name.",
    "err"     : 0
  },
  "email" : {
    "required": "Please enter in your e-mail address.",
    "format" : "Please enter your e-mail in the form 'name@domain.com'.",
    "err"     : 0
  }
}

function initPage(){
	addEventHandler(document.getElementById("firstname"),"blur",isLetter);
	addEventHandler(document.getElementById("firstname"),"blur",isNull);
	addEventHandler(document.getElementById("lastname"),"blur",isNull);
	addEventHandler(document.getElementById("lastname"),"blur",isLetter);
	addEventHandler(document.getElementById("email"),"blur",isNull);
	addEventHandler(document.getElementById("email"),"blur",isRightEmail);
}


function isNull(e){
	var me=getActivatedObject(e);
	if(me.value==""){
		warning(me,"required");
	}else{
		noWarn(me,"required");
	}
}


function isLetter(e){
	var me=getActivatedObject(e);
	var nonAlphaChars = /[^a-zA-Z]/;
	if(nonAlphaChars.test(me.value)){
		warning(me,"letters");
	}else{
		noWarn(me,"letters");
	}
}


function isRightEmail(e){
	var me=getActivatedObject(e);
	if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(me.value)){
		warning(me,"format");
	}else{
		noWarn(me,"format");
	}
}

function warning(obj,waringtype){
	var objParent=obj.parentNode;
	var warning=eval("warnings."+obj.id+"."+waringtype);
	if(objParent.getElementsByTagName("p").length==0){
		var p=document.createElement("p");
		obj.parentNode.appendChild(p);
		var pText=document.createTextNode(warning);
		p.appendChild(pText);
	}else{
		var p=objParent.getElementsByTagName("p")[0];
		p.firstChild.nodeValue=warning;
	}
	document.getElementById("enroll").disabled=true;
}

function noWarn(obj,warningtype){
	if(obj.parentNode.getElementsByTagName("p").length>0){
		var p=obj.parentNode.getElementsByTagName("p")[0];
		var currentWarnings=p.firstChild.nodeValue;
		var warning=eval("warnings."+obj.id+"."+warningtype);
		if(currentWarnings==warning){
			obj.parentNode.removeChild(p);
		}
	}
	
	var fieldsets=document.getElementsByTagName("fieldset");
	for(var i=0;i<fieldsets.length;i++){
		var p=obj.parentNode.getElementsByTagName("p");
		if(p.length>0){
			document.getElementById("enroll").disabled=true;
			return;
		}
	}
	document.getElementById("enroll").disabled=false;
}
