window.onload=initPage;
function initPage(){
	thumbs=document.getElementById("thumbnailPane").getElementsByTagName("img");
	for(var i=0;i<thumbs.length;i++){
		img=thumbs[i];
		img.onclick=function(){
			detailURL='images/'+this.title+'-detail.jpg'
			document.getElementById("itemDetail").src=detailURL;
			getDetails(this.title);
		}
	}
}
//创建请求对象
function createRequest(){
	try{
		request=new XMLHttpRequest();
	} catch(tryMS){
		try{
			request=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(otherMS){
			try{
				request=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				request=null;
			}
		}
	}
	return request;
}
//请求对象
function getDetails(itemName){
	request=createRequest();
	if(request==null){
		alert("Unable to creat request");
		return;
	}
	var url="getDetails.php?ImageID="+escape(itemName);
	request.open("GET",url,true);
	request.onreadystatechange=displayDetails,//displayDetails 也是一个函数回调函数
	request.send(null);
}
//回调函数
function displayDetails(){
	if(request.readyState==4){
		if(request.status==200){
			detailDiv=document.getElementById("description");
			detailDiv.innerHTML=request.responseText;
		}
	}
}
