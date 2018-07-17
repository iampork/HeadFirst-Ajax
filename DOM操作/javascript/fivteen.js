window.onload=initPage;

function initPage(){
	var table=document.getElementById("puzzleGrid");
	var td=table.getElementsByTagName("td");
	for(var i=0;i<=td.length;i++){
		td[i].onclick=tileClick;
	}
}

function tileClick(){
	alert("tt");
}

function swapTiles(selectedCell,destinationCell){
	var selectedImg=selectedCell.firstChild;
	var destinationImg=destinationCell.firstChild;
	destinationCell.appendChild(selectedImg);
	selectedCell.appendChild(destinationImg);
}
