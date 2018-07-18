window.onload=initPage;

function initPage(){
	var table=document.getElementById("puzzleGrid");
	var td=table.getElementsByTagName("td");
	for(var i=0;i<td.length;i++){
//		td[i].onclick=tileClick;
		var img=td[i];
		img.onclick=tileClick;
	}
}

function tileClick(){
	if(checkEmpty(this)){
		alert("Please click on other number cell");
		return;
	}
	
	var currentRow=this.id.charAt(4);
	var currentCol=this.id.charAt(5);
	
	//白块在点击数字上方，因此点击数字的行不能是第一行
	if(currentRow>1){
		var testcellRow=Number(currentRow)-1;
		var testcellID="cell"+testcellRow+currentCol;
		var testcell=document.getElementById(testcellID);
		if(checkEmpty(testcell)){
			swapTiles(this,testcell);
			return;
		}
	}
	
	//白块在点击数字下方，因此点击数字的行数不能是最后一行
	if(currentRow<4){
		var testcellRow=Number(currentRow)+1;
		var testcellID="cell"+testcellRow+currentCol;
		var testcell=document.getElementById(testcellID);
		if(checkEmpty(testcell)){
			swapTiles(this,testcell);
			return;
		}
	}
	
	//白块在点击数字左方，因此点击数字的列数不能是第一列；
	if(currentCol>1){
		var testcellCol=Number(currentCol)-1;
		var testcellID="cell"+currentRow+testcellCol;
		var testcell=document.getElementById(testcellID);
		if(checkEmpty(testcell)){
			swapTiles(this,testcell);
			return;
		}
	}
	
	//白块在点击数字右方，因此点击数字的列数不能再最后一列；
	if(currentCol<4){
		var testcellCol=Number(currentCol)+1;
		var testcellID="cell"+currentRow+testcellCol;
		var testcell=document.getElementById(testcellID);
		if(checkEmpty(testcell)){
			swapTiles(this,testcell);
			return;
		}
	}
	
	//都不是
	alert("Please click a tile next to an empty cell!");
	
}

function swapTiles(selectedCell,destinationCell){
	var selectedImg=selectedCell.firstChild;
	while(selectedImg.nodeName=="#text"){
		selectedImg=selectedImg.nextSibling;
	}
	var destinationImg=destinationCell.firstChild;
	while(destinationImg.nodeName=="#text"){
		destinationImg=destinationImg.nextSibling;
	}
	destinationCell.appendChild(selectedImg);
	selectedCell.appendChild(destinationImg);
	if(puzzleIsComplete()){
		document.getElementById("puzzleGrid").className="win";
	}
}

function checkEmpty(cell){
	var img=cell.firstChild;
	while(img.nodeName=="#text"){
		img=img.nextSibling;
	}
	if(img.alt=="empty"){
		return true;
	}else{
		return false;
	}
}

function puzzleIsComplete(){
	var imgNumber=document.getElementById("puzzleGrid").getElementsByTagName("img");
	var numberIndex="";
	for(var i=0;i<imgNumber.length;i++){
		num=imgNumber[i].src.substr(-6,2);
		if(num!="ty"){
		numberIndex=numberIndex+num;
		}
	}
	if(numberIndex=="010203040506070809101112131415")
	return true;
	return false;
}
