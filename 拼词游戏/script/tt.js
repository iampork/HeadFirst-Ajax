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
	randomizeTiles()
}

//随机获取16个字母
function randomizeTiles(){
	var tiles=document.getElementById("letterbox").getElementsByTagName("a");
	for(i=0;i<tiles.length;i++){
		var letterNumber=Math.floor(Math.random()*100);
		var letter=frequencyTable[letterNumber];
		tiles[i].className=tiles[i].className+" l"+letter;
		tiles[i].onclick=addLetter;
	}
}

//把选中字母提取到 id为cruuentWord的div中
function addLetter(){
	var currentWordDiv=document.getElementById("currentWord");
	var wordClass=this.className;
	var wordArry=wordClass.split(" ");
	var word=wordArry[2].substring(1,2);
	if(currentWordDiv.childNodes.length==0){
		var wordP=document.createElement("p");
		var wordPText=document.createTextNode(word);
		currentWordDiv.appendChild(wordP);
		wordP.appendChild(wordPText);
		var submitDiv=document.getElementById("submit");
		var a=submitDiv.firstChild;
		while(a.nodeName=="#text"){
			a=a.nextSibling;
			}
		a.onclick=submitWord;
	}else{
		var wordP=currentWordDiv.firstChild;
		var wordText=wordP.firstChild;;
		wordText.nodeValue+=word;
	}
//	alert(wordP.firstChild.nodeValue);
	this.className=this.className+" disabled";
	this.onclick="";
	
}

//将currentWordDiv中的单词通过id为submit的div传入到wordList中
function submitWord(){
	var request=createRequest();
	if(request==null){
		alert("unable to create request");
		return;
	}
	var currentWordDiv=document.getElementById("currentWord");
	var word=currentWordDiv.firstChild.firstChild.nodeValue;
	var url="lookup-word.php?word="+escape(word);
	request.open("GET",url,false);
	request.send();
	alert(word);
	alert("your sorce is:"+request.responseText);
}
