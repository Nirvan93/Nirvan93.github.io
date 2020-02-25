
/************ { Intervals and events initialization } *************/

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');


//canvas.width = window.screen.availWidth - window.screen.availWidth / 20;
//canvas.height = window.screen.availHeight - window.screen.availHeight / 6;

canvas.width = 1750;
canvas.height = 900;

cWidth = canvas.width;
cHeight = canvas.height;

DEGTORAD = ( Math.PI / 180 );
RADTODEG = ( 180 / Math.PI );

mouseX = 0;
mouseY = 0;
mouseHoldX = 0;
mouseHoldY = 0;
mouseObjectHoldX = 0;
mouseObjectHoldY = 0;

windowMouseX = 0;
windowMouseY = 0;
quality = 20;
loadSounds = true;

mouseEntered = false;
mousePress = false;
mouseHold = false;
mouseRelease = false;
mouseWheelUp = false;
mouseWheelDown = false;
mouseDouble = false;
mouseEnterGUI = false;
mouseEnterOver = false;
mouseGUICounter = 0;
mouseDoubleCounter = 0;
mouseTimer = 0;
mouseObject = null;

var lastUpdate = 0;
var deltaTime = 0;
var time = 0;
var FPS = 60;

canvas.addEventListener("mousedown", mDown, false);
addEventListener("click", mUp, false);
canvas.addEventListener("mousemove", mMove, false);
canvas.addEventListener("mousewheel", mWheel, false);

songName = "My Song";
bpm = 120;	
var lastNote = 0;
var noteHitCounter = 1;
songTact = 0;
songTacts = 1;


mint = 0;
sec = 0;
msec = 0;

songPlay = false; // switch between playing pattern and song
play = false;
var bTime = 0;

toHold = 0;
toCreate = "";
loadFile = false;
loadProject = false;
version = "a0.25";
date = "19.06.2015";
//v0.1 date = "03.06.2015";

showChannel = true;
channelX = 740; channelWidth = 220;
channelY = 140; channelHeight = 300

showRoll = true;
rollX = 40; rollWidth = 550;
rollY = 450; rollHeight = 400;
rollScrollY = 48;

showPlaylist = true;
playX = 40; playWidth = 550;
playY = 40; playHeight = 400
playScrollX = 0; playScrollY = 0;

showToolBox = false;
toolBoxWidth = 120;	toolBoxX = - toolBoxWidth;
toolBoxHeight = canvas.height-36; toolBoxY = 36;

showPicker = false;
pickerX = 300; pickerY = 300;
pickerStep = 20; pickerWidth = 120;
pickArray = null; picked = null;
lastPick = null; pickerTimer = 0;

selected = null;
selectedSprite = new mySprite("img/selectBorder.png",0, 0);
bcSprite = new mySprite("img/bc.png",0, 0);


function newProject()
{
	lastUpdate = 0;
	deltaTime = 0;
	time = 0;
	FPS = 60;
	songName = "My Song";
	bpm = 120;	
	lastNote = 0;
	noteHitCounter = 1;
	songTact = 0;
	songTacts = 1;	
	
	loadFile = false;
	loadProject = false;
	
	mint = 0;
	sec = 0;
	msec = 0;

	songPlay = true;
	play = false;
	bTime = 0;

	toHold = 0;
	toCreate = "";
	
	while( samplers.length > 0 )
	{
		samplers[samplers.length-1].destroy();
	}
	
	// Loaded sounds clearer...
	
	/*while( sounds.length > 5 )
	{
		sounds.splice(sounds.length-1);
	}*/
	
}


function beatTime()
{
	var now = new Date();
	var dt = now.getMilliseconds() - lastUpdate;
	
	lastUpdate = now.getMilliseconds();
	deltaTime = Math.max(dt/1000, .001);	
	time += deltaTime;
	
	if ( play )
	{
		bTime += deltaTime;
		msec += Math.round( Math.max( dt/10, .001 ) );
		
		if ( msec >= 100 ) { msec -= 100; sec++; }
		if ( sec == 60 ) { sec = 0; mint++; }
	
		var noteBeat = ( bTime ) * bpm * 8 * (1 / 60);
		
		if ( lastNote != Math.round( noteBeat ) ) 
		{
			lastNote = Math.round(noteBeat); 
			
			if ( noteHitCounter % 2 == 0 ) noteHit(16);
			if ( noteHitCounter % 4 == 0 ) noteHit(8);
			if ( noteHitCounter % 8 == 0 ) noteHit(4);
			if ( noteHitCounter % 16 == 0 ) noteHit(2);
			if ( noteHitCounter % 32 == 0 ) noteHit(0);
			noteHit(32);
		}
	}
		
}


setInterval(
function() 
{
	  beatTime();
}, 1000/FPS);


setInterval(
function() 
{
	  update();
	  draw
	  draw();
	  resetMouseVariables();
}, 1000/FPS);


function switchPlay()
{
	play = !play;
}

function stopPlay()
{
	play = false;
	lastNote = 0;
	noteHitCounter = 1;
	mint = 0;
	sec = 0;
	msec = 0;
	bTime = 0;
	lastUpdate = 0;
	deltaTime = 0;
	songTact = -1;
	time = 0;
	noteHit(0);
	//tableObjects.forEach( function(tableObject) { tableObject.child.reset(); } );
}

function setPatterns()
{
	samplers.forEach( function(sampler) { sampler.setPattern(); } );
}

