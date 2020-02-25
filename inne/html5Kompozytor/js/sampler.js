
/***************** { Objects Definitions } ****************/

samplers = [];
samplerSprite = new mySprite("img/sampler.png", -1);

function sampler( posX, posY )
{
	var id = {};
	
	{ /***********{ Position & Scale Stuff } ***********/
	
	var sprite = samplerSprite;
	
	var x = 0;
	var y = 0;
	
	var width = 0;
	var height = 0;
	var halfWidth = 0;
	var halfHeight = 0;
	
	var angle = 0;	
	var scaleX = 1.0;
	var scaleY = 1.0;
	var alpha = 1.0;
	
	}
	
	{ /***********{ Update calculations variables } ***********/
	
	var playing = null;
	var enter = false;
	var hold = false;
	var timer = 1;
	var randoms = [];
	for ( var i = 0; i < quality; i++ ) randoms[i] = Math.random();
	 
	}
	 
	{ /***********{ Data Variables } ***********/
	
	id.name = "Sampler";
	id.type = "Melody";
	id.volume = 0.75;
	id.cutItSelf = false;
	
	id.pattern = 0;
	id.playPattern = 0;	
	id.cutSound = 0;
	id.sound = null;
	id.soundNr = null;
	
	id.patterns = [];
	id.playlist = [];
	
	id.x = 0;
	id.y = 0;
	
	addPattern(id.patterns);
	//addToPlaylist(id.playlist, 0, id.pattern);	
	
	}
	
	create = function() 
	{
		x = posX || 150 + samplers.length * 100;
		y = posY || 500 + samplers.length * 30;
						
		width = 100;
		height = 100;
		halfWidth = width / 2;
		halfHeight = height / 2;
		
		//if ( posY ) y = posY+5;
	}
	
	create();
	
	id.update = function() 
	{
		if ( !mouseEnterGUI ) 
		{
			if ( mouseEnter( x - halfWidth, y - halfHeight, x + halfWidth, y + halfHeight ) ) enter = true; else enter = false;
		}
		
		if ( enter )
		{
			
			if ( !mouseEnterGUI )
			{
				if ( mousePress )
				{
					if ( selected != id ) showRoll = true;
					
					selected = id;
					mouseHoldX = mouseX;
					mouseHoldY = mouseY;
					mouseObjectHoldX = x;
					mouseObjectHoldY = y;
					hold = true;
				}
			}
		}
		else
		{
			if ( mousePress )
				if ( !mouseEnterGUI ) 
					if ( selected == id ) selected = null;
		}
		
		
		if ( mouseRelease ) hold = false;
		
		if ( hold && selected == id )
		{
			x = mouseX + ( mouseObjectHoldX - mouseHoldX );
			y = mouseY + ( mouseObjectHoldY - mouseHoldY );
		}
			
		id.x = x;
		id.y = y;
		timer -= t(timer - 1) * .15;	
	}
	
	id.draw = function() 
	{
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#DDD";
		
		var stepX = ( cWidth/2 - x ) / quality;
		var stepY = ( cHeight/2 - y ) / quality;
		
		for(var i = 0; i < quality; i++)
		{	
			var xx = 0, yy = 0;
			if ( i > 3 && i < quality - 3 )
			{
				var s = 1; if ( i % 2 ) s = -1;
				xx = (timer/2-.5) * randoms[i] * -stepY * 15 * s;
				yy = (timer/2-.5) * randoms[i] * -stepX * 15 * s;
			}
			
			ctx.lineTo( x + stepX * i + xx, y + stepY * i + yy );
		}
		
		ctx.stroke();
		ctx.closePath();
	
		angle = Math.sin( time * 30 ) * ( timer - 1 ) * 15;
	
		if ( sprite ) sprite.draw( x, y, angle, timer, timer, alpha );
		
		ctx.font = "25px Arial";
		ctx.fillStyle = "#CCC";
		
		ctx.shadowColor = "#000"; ctx.shadowBlur = 7; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
		var measure = ctx.measureText(id.name).width / 2;
		ctx.fillText(id.name,x - measure,y+30);
		ctx.shadowColor = "rgba(0,0,0,0)"; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
		
		if ( selected == id )
		{	
			var offs = 2 * Math.sin( time * 9 );
			selectedSprite.draw(x - halfWidth * 1.5 - offs, y - halfHeight * 1.5 - offs, 0 );
			selectedSprite.draw(x + halfWidth * 1.5 + offs, y - halfHeight * 1.5 - offs, 90 );
			selectedSprite.draw(x - halfWidth * 1.5 - offs, y + halfHeight * 1.5 + offs, 270);
			selectedSprite.draw(x + halfWidth * 1.5 + offs, y + halfHeight * 1.5 + offs, 180 );
		}
	}
	
	id.destroy = function() 
	{  
		for(var i = 0; i < samplers.length; i++ ) if ( samplers[i] == id ) { samplers.splice(i,1); delete id; }
	}
	
	id.hit = function() 
	{
		if ( id.playPattern > -1 )
		{
			var p = id.patterns[id.playPattern];
			for ( var i = 0; i < p.notes.length; i++ )
			{
				if ( p.notes[i].start == noteHitCounter )
				{
					timer = 1.25;
					if ( playing ) if ( id.cutItSelf ) playing.stop();
					playing = playSound( sounds[id.sound].buffer, p.notes[i].value, id.volume, id.cutSound );
					for ( var j = 0; j < quality; j++ ) randoms[j] = Math.random();
				}
			}
		}
		
	}
	
	id.setPattern = function() 
	{
		// Setting pattern to play in tact
		if ( songPlay )
		{
			for ( var i = 0; i < id.playlist.length; i++ )
				if ( i == songTact ) { id.playPattern = id.playlist[i]; if( id.playPattern == null ) id.playPattern = -1; return; }
			id.playPattern = -1;
			
		}
		else
			id.playPattern = id.pattern;
		
	}
	
	return id;
}



function generateDefaultSong( st, id )
{
	
}

function addNote( pattern, start, value, duration )
{
	var note = {};
	note.start = start;
	note.value = value;
	note.duration = duration;
	pattern.notes.push( note );
}

function addPattern( patterns )
{
	var pattern = {};
	pattern.id = patterns.length+1;
	pattern.name = "pattern " + (patterns.length+1);
	pattern.notes = [];
	patterns.push( pattern );
}

function addToPlaylist( playlist, tact, pattern )
{
	if ( tact > songTacts-1 ) songTacts = tact+1;
	playlist[tact] = pattern;
}

