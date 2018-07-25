window.onload = initPage;

function initPage() {
  // find the thumbnails on the page
  var thumbs = 
    document.getElementById("thumbnailPane").getElementsByTagName("img");

  // set the handler for each image
  for (var i = 0; i < thumbs.length; i++) {
    var image = thumbs[i];
    
    // create the onclick function
    image.onclick = function() {
      // find the image name
      var detailURL = 'images/' + this.title + '-detail.jpg';
      document.getElementById("itemDetail").src = detailURL;
      getDetails(this.title);
    }
  }
}

function getDetails(itemName) {
  request = createRequest();
  if (request == null) {
    alert("Unable to create request");
    return;
  }
  var url= "getDetailsJSON.php?ImageID=" + escape(itemName);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

//采用JOSN数据格式
function displayDetails(){
	if(request.readyState==4){
		if(request.status==200){
			var detailsDiv=document.getElementById("description");
			var responJson=eval('('+ request.responseText + ')');
			for (var i=detailsDiv.childNodes.length; i>0; i--) {
        detailsDiv.removeChild(detailsDiv.childNodes[i-1]);
     }
			
			for(var property in responJson){
				var propertyValue=responJson[property];
//				if(property.toString().match(/id/i)){return false}
				if(! isArray(propertyValue)){
					if(property.toString().match(/id/i)){
						
					}else{
							var p = document.createElement("p");
							var str = property.substring(0,1).toUpperCase()+property.substring(1);
					var pText=document.createTextNode(str+": "+propertyValue);
					p.appendChild(pText)
					detailsDiv.appendChild(p);
					}
				}else{
					var p = document.createElement("p");
					var str = property.substring(0,3).toUpperCase()+property.substring(3);
					p.appendChild(document.createTextNode(str+": "));
					var list=document.createElement("ul");
					list.setAttribute("style","list-style: none;");
					for(var i=0;i<propertyValue.length;i++){
						if(property.toString().match(/urls/i)){
							var li = document.createElement("li");
						var a =document.createElement("a");
						a.setAttribute("href","#");
						a.appendChild(document.createTextNode(propertyValue[i]));
						li.appendChild(a);
						list.appendChild(li);
						}else{
							var li = document.createElement("li");
						li.appendChild(document.createTextNode(propertyValue[i]));
						list.appendChild(li);
						}
					}
					detailsDiv.appendChild(p);
					detailsDiv.appendChild(list);
				}
			}
		}
	}
}	

//function isArray(arg) {
//if (typeof arg == 'object') {
//  var criteria = arg.constructor.toString().match(/array/i);
//  return (criteria != null);
//}
//return false;
//}

//采用XML作为返回数据方法
//function displayDetails(){
//	if(request.readyState==4){
//		if(request.status==200){
//			var detailsDiv=document.getElementById("description");
//			//codes
//			for (var i=detailsDiv.childNodes.length; i>0; i--) {
//      detailsDiv.removeChild(detailsDiv.childNodes[i-1]);
//    }
//
//			
//			var responseDoc=request.responseXML;
//			var categorise=responseDoc.getElementsByTagName("category");
//			for(var i=0;i<categorise.length;i++){
//			var category=categorise[i];
//			var nameElement=category.getElementsByTagName("name")[0];
//			var nameValue=nameElement.firstChild.nodeValue;
//			var categoryType=category.getAttribute("type");
//			if((categoryType==null)||(categoryType!="list")){
//				var valueElement=category.getElementsByTagName("value")[0];
//				var categoryValue=valueElement.firstChild.nodeValue;
//				var p=document.createElement("p");
//				var pText=document.createTextNode(nameValue+":"+categoryValue);
//				p.appendChild(pText);
//				detailsDiv.appendChild(p);
//			}else{
//				var p=document.createElement("p");
//				p.appendChild(document.createTextNode(nameValue));
//				var list=document.createElement("ul");
//				var values=category.getElementsByTagName("value");
//				for(var j=0;j<values.length;j++){
//					var li=document.createElement("li");
//					li.appendChild(document.createTextNode(values[j].firstChild.nodeValue));
//					list.appendChild(li);
//				}
//				detailsDiv.appendChild(p);
//				detailsDiv.appendChild(list);
//				}
//			}
//		}
//	}
//}
