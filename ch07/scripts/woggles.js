window.onload=initPage;
var frequencyTable = new Array(
  "a", "a", "a", "a", "a", "a", "a", "a", "b", "c", "c", "c", "d", "d", "d",
  "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g",
  "g", "h", "h", "h", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "j",
  "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o",
  "o", "o", "o", "o", "o", "o", "p", "p", "q", "q", "q", "q", "q", "q", "r",
  "r", "r", "r", "r", "r", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t",
  "t", "u", "u", "v", "v", "w", "x", "y", "y","z");
  
function initPage(){
	randomizeTiles();
}
//随机获得字母
function randomizeTiles(){
	var tiles=document.getElementById("letterbox").getElementsByTagName("a");
	for(i=0;i<tiles.length;i++){
		var index=Math.floor(Math.random()*100);
		var letter=frequencyTable[index];
		tiles[i].className=tiles[i].className+" l"+letter;
		tiles[i].onclick= addLetter;
	}
}
//将选中的字母添加到单词框中并使选中的字母不能再次点击
function addLetter(){
	var currentClass=this.className.split(" ");
	var letterClass=currentClass[2].substring(1,2);
	var currentWord=document.getElementById("currentWord");
	if(currentWord.getElementsByTagName("p")[0]){
		var p=currentWord.firstChild;
		var letterText=p.firstChild;
		letterText.nodeValue+=letterClass;
	}else{
		var p=document.createElement("p");
		currentWord.appendChild(p);
		var letterText=document.createTextNode(letterClass);
		p.appendChild(letterText);
	}
	this.className+=" disabled";
	this.onclick="";
}
