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
  // Version for XML server-side script
  var url= "getDetailsXML-updated.php?ImageID=" + escape(itemName);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

function displayDetails(){
	if(request.readyState==4){
		if(request.status==200){
			var detailsDiv=document.getElementById("description");
			//codes
			for (var i=detailsDiv.childNodes.length; i>0; i--) {
        detailsDiv.removeChild(detailsDiv.childNodes[i-1]);
      }

			
			var responseDoc=request.responseXML;
			var categorise=responseDoc.getElementsByTagName("category");
			for(var i=0;i<categorise.length;i++){
			var category=categorise[i];
			var nameElement=category.getElementsByTagName("name")[0];
			var nameValue=nameElement.firstChild.nodeValue;
			var categoryType=category.getAttribute("type");
			if((categoryType==null)||(categoryType!="list")){
				var valueElement=category.getElementsByTagName("value")[0];
				var categoryValue=valueElement.firstChild.nodeValue;
				var p=document.createElement("p");
				var pText=document.createTextNode(nameValue+":"+categoryValue);
				p.appendChild(pText);
				detailsDiv.appendChild(p);
			}else{
				var p=document.createElement("p");
				p.appendChild(document.createTextNode(nameValue));
				var list=document.createElement("ul");
				var values=category.getElementsByTagName("value");
				for(var j=0;j<values.length;j++){
					var li=document.createElement("li");
					li.appendChild(document.createTextNode(values[j].firstChild.nodeValue));
					list.appendChild(li);
				}
				detailsDiv.appendChild(p);
				detailsDiv.appendChild(list);
				}
			}
		}
	}
}
