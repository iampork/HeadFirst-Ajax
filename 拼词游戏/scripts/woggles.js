window.onload=initPage;
var frequencyTable = new Array(
  "a", "a", "a", "a", "a", "a", "a", "a", "b", "c", "c", "c", "d", "d", "d",
  "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g",
  "g", "h", "h", "h", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "j",
  "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o",
  "o", "o", "o", "o", "o", "o", "p", "p", "q", "q", "q", "q", "q", "q", "r",
  "r", "r", "r", "r", "r", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t",
  "t", "u", "u", "v", "v", "w", "x", "y", "y","z");
  
function initPage() {
  randomizeTiles();
  var submitDiv = document.getElementById("submit");
  var a = submitDiv.firstChild;
  while (a.nodeName == "#text") {
    a = a.nextSibling;
  }
  a.onclick = function() { 
    alert("Please click tiles to add letters and create a word."); 
  };
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
		var submitDiv=document.getElementById("submit");
		var a=submitDiv.firstChild;
		while(a.nodeName=="#textt"){
			a=a.nextSibling;
		}
		a.onclick=submitWord
	}
	this.className+=" disabled";
	this.onclick="";

}

//将选中单词传到 已选单词框中 并的出分数
function submitWord() {
  var request = createRequest();
  if (request == null) {
    alert ("Unable to create request object.");
    return;
  }
  var currentWordDiv = document.getElementById("currentWord");
  var userWord = currentWordDiv.firstChild.firstChild.nodeValue;
  var url = "lookup-word.php?word=" + escape(userWord);
  request.open("GET", url, false);
  request.send(null);

  if (request.responseText == -1) {
    alert("You have entered an invalid word. Try again!");
  } else {
    var wordListDiv = document.getElementById("wordList");
    var p = document.createElement("p");
    var newWord = document.createTextNode(userWord);
    p.appendChild(newWord);
    wordListDiv.appendChild(p);

    var scoreDiv = document.getElementById("score");
    var scoreNode = scoreDiv.firstChild;
    var scoreText = scoreNode.nodeValue;
    var pieces = scoreText.split(" ");
    var currentScore = parseInt(pieces[1]);
    currentScore += parseInt(request.responseText);
    scoreNode.nodeValue = "Score: " + currentScore;
  }
  var currentWordP = currentWordDiv.firstChild;
  currentWordDiv.removeChild(currentWordP);
  enableAllTiles();
  var submitDiv = document.getElementById("submit");
  var a = submitDiv.firstChild;
  while (a.nodeName == "#text") {
    a = a.nextSibling;
  }
  a.onclick = function() {
    alert("Please click tiles to add letters and create a word.");
  };
}

//启用已被禁用的字母
function enableAllTiles() {
  tiles = document.getElementById("letterbox").getElementsByTagName("a");
  for (i=0; i<tiles.length; i++) {
    var tileClasses = tiles[i].className.split(" ");
    if (tileClasses.length == 4) {
      var newClass = 
        tileClasses[0] + " " + tileClasses[1] + " " + tileClasses[2];
      tiles[i].className = newClass;
      tiles[i].onclick = addLetter;
    }
  }
}

