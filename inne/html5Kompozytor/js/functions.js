
/***************** { Game Functions } *******************/

window.AudioContext = window.AudioContext || window.webkitAudioContext;
actx = new AudioContext;

sounds = [];
defaultSoundsToLoad = 19;

size = 1;
function update()
{
	size -= ( size - 1 ) * .15;
	pickerTimer -= t(.025);
	for ( var i = 0; i < samplers.length; i++ ) samplers[i].update();
	
	if ( document.getElementById("file").value != "" )
	{
		loadLocalFile(document.getElementById("file").files);
		document.getElementById("file").value = "";
	}
	
	if ( document.getElementById("loadProject").value != "" )
	{
		//loadLocalFile(document.getElementById("file").files);
		loadProjectXML( document.getElementById("loadProject").files[0] );
		document.getElementById("loadProject").value = "";
	}
	
}

var speaker = new mySprite("img/speaker.png", -1);
function draw() 
{
	bcSprite.draw(0,0);
	
	var x = cWidth/2, y = cHeight / 2;
	
	samplers.forEach( function(sampler) { sampler.draw(); } );
	
	speaker.draw( x,y,Math.sin( time * 40 ) * ( size - 1 ) * 20, size, size );
	
	drawHUD();
	drawLogo();
}



/******************** Additional Functions ***********************/

function myDebug() { console.log("dupnęło"); }

function playSound( sound, semitones, volume, cut )
{
	volume = volume || 1;
	cut = cut || 0;
	
	if ( sound == null ) { console.log("No buffer!"); return; }
	var source = actx.createBufferSource();
	source.buffer = sound;
	source.connect(actx.destination);   // connect the source to the context's destination (the speakers)
	
	var semitones = semitones || 0;
	var semitoneRatio = Math.pow(2, 1/12);
	source.playbackRate.value = Math.pow(semitoneRatio, semitones);
	
	var gain = actx.createGain();
	
	gain.gain.value = volume-1;//-96 + volume * 96;
	source.connect(gain);
	gain.connect(actx.destination);
	
	source.start(cut);
	return source;
}

function loadSound( object, url, id ) 
{
	if ( loadSounds )
	{
		var req = new XMLHttpRequest(); 
		req.open("GET",url,true); 
		req.responseType = "arraybuffer"; 
		req.onload = function() 
		{ 
			actx.decodeAudioData(req.response, function(buffer) 
			{ 
				object.sound = buffer;
			}); 
		}; 
		req.send();
	}
}


function loadSoundToBank( url, ids ) 
{
	var idd = ids;
	if ( ids == null ) ids = -1;
	
	if ( loadSounds )
	{
		var req = new XMLHttpRequest(); 
		req.open("GET",url,true); 
		req.responseType = "arraybuffer"; 
		req.url = url;
		
		req.onload = function() 
		{ 
			var u = this.url;
			actx.decodeAudioData(req.response, function(buffer) 
			{ 
				var s = {};
				s.name = formatName(url);
				s.buffer = buffer;
				s.path = u;
				s.type = "url";
				if ( ids == -1 ) s.id = sounds.length; else s.id = idd;
				
				var exists = false;
				//sounds.forEach( 
				
				sounds.forEach( function(sounda) { if ( sounda.name == s.name ) exists = true; } );
				console.log( exists + " " + s.id);
				/*
				for ( var i = 0; i < sounds.length; i++ )
				{
					if ( sounds[i].name == s.name ) exists = true;
				}*/
				
				if ( !exists ) 
				{
					sounds[s.id] = s;
				}
				//console.log(sounds);	
			}); 
		}; 
		req.send();
	}
	else
	{
		var s = {};
		s.name = formatName(url);
		s.buffer = null;
		s.path = url;
		s.type = "offline";
		
		var exists = false;
		for ( var i = 0; i < sounds.length; i++ )
		{
			if ( sounds[i].name == s.name ) exists = true;
		}
		
		if ( !exists ) 
		{
			sounds.push(s);
			defaultSoundsToLoad--;
		}
	}
}


function loadLocalFile( file ) 
{
	for ( var i = 0; i < file.length; i++ )
	{
		var reader = new FileReader();
		var name = file[i].name;
		reader.name = name;
		
		reader.onload = function() 
		{	var n = this.name;
			var p = this.path;
			actx.decodeAudioData( this.result, function(buffer) 
				{ 
					fileBuffer = buffer;
					var exists = false;
					for ( var i = 0; i < sounds.length; i++ )
					{
						if ( sounds[i].name == formatName(n) ) exists = true;
					}
					
					if ( !exists )
					{
						var s = {};
						s.name = formatName(n);
						s.buffer = fileBuffer;
						s.path = p;
						s.type = "local";
						s.id = sounds.length;
						sounds.push(s);
					}			
					
				});	
		
		};
		
		reader.readAsArrayBuffer( file[i] );
	}
}


function openFile()
{
	if ( loadFile ) document.getElementById("file").click();
	loadFile = false;
}

function openProject()
{
	if ( loadProject ) document.getElementById("loadProject").click();
	loadProject = false;
}


function formatName( name )
{
	for(var i = name.length - 1; i >= 0; i--)
	{
		if ( name[i] == "/" || name[i] == "\\" ) name = name.slice(i+1,name.length);
		if ( name[i] == "." ) name = name.slice(0,i);
	}
	
	if ( name.length > 20 ) name = name.slice(0,20);
	
	return name;
}



function getSoundByName( name )
{
	for ( var i = 0; i < sounds.length; i++ )
	{
		if ( sounds[i].name == name ) return i;
	}
}


function t( a )
{ return a * deltaTime*57; }

function distance( x1, y1, x2, y2 )
{ return Math.sqrt( Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 ) ); }

function lengthdir_x( len, dir )
{ return ( Math.cos( dir * Math.PI / 180 ) * len ); }
	
function lengthdir_y( len, dir )
{ return ( -Math.sin( dir * Math.PI / 180 ) * len ); }	

function PointDirection( x, y, newx, newy )
{ return ( ( Math.atan2( x - newx, y - newy  ) * ( 180 / Math.PI ) ) + 450 ) % 360; }		

function SmoothValue( Actual, New, Speed )
{ return ( New - Actual ) * Speed; }