
/******************** Drawing Functions ***********************/

bpm = 120;
var hWidth = 160;
var hHeight = 50;
var bWidth = 44;

var timePanelEnter = [];
for(var i = 0; i < 4; i++ ) timePanelEnter[i] = 0;

var bpmHold = false;
var lastBpm = bpm;



function drawHUD()
{
	var x = cWidth/2-hWidth/2;
	var y = cHeight-hHeight-60;
	var xx, yy, txt;
	
	
	{ /******************* { Down Panel } *************************/
	
	ctx.fillStyle = "#CCC";
	roundRect( ctx, x, y-3, hWidth, hHeight+6, 10, true, false );
	
	for( var i = 0; i < 3; i++ )
	{
		xx = x + 9 + ( bWidth + 5 ) * i;
		yy = y+3;
		
		if ( timePanelEnter[i] ) { ctx.fillStyle = "#AAA"; mouseGUICounter = 2; } else ctx.fillStyle = "#999";
		roundRect(ctx, xx, yy,bWidth,bWidth,10,true,false);
		
		switch(i)
		{
			case 0:
				if ( !play )
				{
					ctx.beginPath();
						ctx.lineTo(xx+17, yy+12);
						ctx.lineTo(xx+17, yy+32);
						ctx.lineTo(xx+32, yy+22);
						ctx.fillStyle = "#FFF";
						ctx.fill();	
					ctx.closePath();	
					ctx.lineWidth = 0;
				}
				else
				{
					ctx.lineWidth = 4;
					ctx.strokeStyle = "#FFF";	
					
					ctx.beginPath();
						ctx.lineTo(xx+16,yy+11);
						ctx.lineTo(xx+16,yy+31);
					ctx.stroke();
					
					ctx.beginPath();
						ctx.lineTo(xx+28,yy+11);
						ctx.lineTo(xx+28,yy+31);
					ctx.stroke();
					ctx.lineWidth = 0;
				}
			break;
			
			case 1:
				ctx.fillStyle = "#FFF";
				ctx.fillRect(xx+16,yy+16,13,13);	
			break;
			
			case 2:
				ctx.beginPath();
				ctx.arc(xx+bWidth/2, yy+bWidth/2, 7, 0, 2 * Math.PI, false);
				ctx.fillStyle = "#CC0000";
				ctx.fill();
				ctx.closePath();
			break;
		}
		
		timePanelEnter[i] =  mouseEnter(xx,yy,xx+bWidth,yy+bWidth); 
	}
	
	}
	
	{/****************** { Draw bpm counter } *********************/


	xx = cWidth / 2 - 2;
	yy = y - 20;
	
	ctx.fillStyle = "#AAA";
	roundRect( ctx, xx-60, yy-25, 125, 35, 10, true, false );
	
	ctx.font = "25px Arial";
	ctx.fillStyle = "#FFF";	
	
	txt = "bpm: ";
	ctx.fillText(txt,xx - 50, yy);
	txt = bpm.toString();
	ctx.fillText(txt,xx + 15, yy);
	
	
	if ( bpmHold ) bpm = ( lastBpm ) + Math.round( ( mouseHoldY - mouseY ) / 10 );
	
	timePanelEnter[3] = mouseEnter(xx-60,yy-25,xx+65,yy+10);
	if ( timePanelEnter[3] ) 
	{ 
		mouseGUICounter = 2;
		if ( mousePress )
		{
			bpmHold = true; 
			lastBpm = bpm; 
			mouseHoldX = mouseX; 
			mouseHoldY = mouseY;
		}
		
		if ( mouseDouble )
		{
			var bpmt = prompt("Set tempo in bpm", bpm);
			bpmt = parseInt( bpmt );
			if ( bpmt > 0 ) bpm = bpmt; else alert("Wrong data");
			bpmHold = false;
			mouseHold = false;
		}
		
		if ( mouseWheelUp ) bpm++;
		if ( mouseWheelDown ) if ( bpm > 1 ) bpm --;
	}
	
	if ( mouseRelease ) bpmHold = false;
	
	}
	
	{/******************* { Drawing Timer } ***********************/

	xx = cWidth/2;
	yy = y + 85;
	
	ctx.fillStyle = "#AAA";
	roundRect( ctx, xx-75, yy-25, 147, 35, 10, true, false );
	
	ctx.font = "25px Arial";
	ctx.fillStyle = "#FFF";	
	
	if ( sec < 10 ) txt = "0"+sec.toString(); else txt = sec.toString();
	ctx.fillText(":",xx - 30, yy);
	ctx.fillText(txt,xx - 15, yy);
	ctx.fillText(":",xx + 20, yy);
	if ( msec < 10 ) txt = "0"+msec.toString(); else txt = msec.toString();
	ctx.fillText(txt,xx + 33, yy);
	if ( mint < 10 ) txt = "0"+mint.toString(); else txt = mint.toString();
	ctx.fillText(txt,xx - 65, yy);	
	
	}	
	
	{/***************** { Drawing Channel Settings Window } *******************/
	
	
	if ( selected )
	{
		var wx = channelX, wy = channelY;
		var ww = channelWidth, wh = channelHeight;
		var cStepW = ( ww / 100 );
		var cStepH = ( wh / 100 );
		if ( mouseEnterNoCursor( wx, wy, wx + ww, wy + wh ) ) mouseGUICounter = 2;
		
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx-1, wy-1, ww+2, wh+2 ); // Border
		// Drawing Base Graphics of melody roll	
		ctx.fillStyle = "#323C50";
		ctx.fillRect( wx, wy, ww, wh ); // Main Rectangle
		
		ctx.fillStyle = "#5F696E";
		ctx.fillRect( wx + 1, wy + 1, ww - 2, 30 ); // Up Window Bar
		
		ctx.fillRect( wx + ww-10, wy + 32, 10, wh - 33 ); // Right Side Bar
		ctx.fillStyle = "#7F898E";
		ctx.fillRect( wx + ww-9, wy + 33, 8, 30 ); // Right Side Slider
		

		for (var i = 0; i < 10; i++)
		{
			var vx = wx + 10, vy = wy + 45+20*i;
			if ( i % 2 == 0 ) ctx.fillStyle = "#273345"; else ctx.fillStyle = "#323C50";
			
			ctx.fillRect(wx+1,vy-13,ww-11,20);
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "12px Arial";	
			
			
			switch(i)
			{
				case 0:
				ctx.fillText( "Name: " + selected.name, vx, vy );
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver() ) selected.name = prompt("Set new name for this channel.", selected.name);
				break;
				
				case 1:
				ctx.fillText( "Cut Itself: " + selected.cutItSelf, vx, vy );
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver()  ) selected.cutItSelf = !selected.cutItSelf;
				break;
				
				case 2:
				var n; if ( selected.sound == null || sounds[selected.sound] == null  ) n = "Nothing / Not Loaded"; else n = sounds[selected.sound].name;
				ctx.fillText( "File Source: " + n, vx, vy );
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) )
				{
					if ( mousePressOver()  ) { pickArray = sounds; picked = null; pickerX = mouseX; pickerY = mouseY; mouseEnterOver = .2; }
					//if ( mouseDouble ) { var path = ""; path = prompt("Enter url patch to sound.", selected.sound); if ( path != "" ) loadSoundToBank( path ); }
				}
				break;
				
				case 3:
				ctx.fillText( "Volume: " + selected.volume*100+"%", vx, vy );
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver()  ) selected.volume = prompt("Set volume of this sampler.", selected.volume*100)/100;
				break;
				
				case 4:
				ctx.fillText( "Delete", vx, vy  );
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver()  ) selected.destroy();
				break;
				
				/*
				case 5:
				ctx.fillText( "Load File", vx, vy  ); // Zmien to do toolboxa zeby bylo tam ladowanie soundów
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver() ) loadFile = true;
				//if ( mouseDouble ) { var path = ""; path = prompt("Enter url patch to sound.", selected.sound); if ( path != "" ) loadSoundToBank( path ); }
				break;*/

				case 5:
				ctx.fillText( "Cut start delay: " + selected.cutSound, vx, vy  ); // Zmien to do toolboxa zeby bylo tam ladowanie soundów
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver() ) selected.cutSound = prompt("Set time to cut sound on the beginning to avoid delay in hitting note.", selected.cutSound);
				break;
				
			}
		}
		
			
		var xx =  wx + ww - 29;
		var yy = wy + 3;
		var bSize = 26;
		// Roll close button
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2); // Button X Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) showChannel = false;		}
		ctx.fillRect( xx, yy, bSize, bSize);
			
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "20px Arial";
		ctx.fillText( "Channel Settings", wx + 10, wy + 22 );
		ctx.fillText( "X", wx + ww - 22, wy + 23 );
			
		if ( mouseEnter( wx + 1, wy + 1, wx + ww - 20, wy + 30 ) ) 
		{
			if ( mousePress )
			{
				toHold = 1;
				mouseHoldX = mouseX;
				mouseHoldY = mouseY;
				mouseObjectHoldX = channelX;
				mouseObjectHoldY = channelY;
			}
		}
		
		if ( toHold == 1 )
		{
			channelX = mouseX + ( mouseObjectHoldX - mouseHoldX );
			channelY = mouseY + ( mouseObjectHoldY - mouseHoldY );
			if ( mouseRelease ) toHold = 0;
		}
			
	}		

	}	
		
	{/***************** { Drawing Piano Roll } *******************/
	
	if ( showRoll )
	{
		var wx = rollX, wy = rollY;
		var ww = rollWidth, wh = rollHeight;
		
		var wStepW = ( ww / 100 );
		var wStepH = ( wh / 100 );
		if ( mouseEnterNoCursor( wx, wy, wx + ww, wy + wh ) ) mouseGUICounter = 2;
			
		
		if ( mouseEnter( wx + 1, wy + 1, wx + ww - 20, wy + 30 ) ) 
		{
			if ( mousePress )
			{
				toHold = 2;
				mouseHoldX = mouseX;
				mouseHoldY = mouseY;
				mouseObjectHoldX = wx;
				mouseObjectHoldY = wy;
			}
		}
		
		if ( toHold == 2 )
		{
			rollX = mouseX + ( mouseObjectHoldX - mouseHoldX );
			rollY = mouseY + ( mouseObjectHoldY - mouseHoldY );
			if ( mouseRelease ) toHold = 0;
		}
		

		var wx = wx, wy = wy;
		var ww = ww, wh = wh;
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx-1, wy-1, ww+2, wh-18 ); // Border
		// Drawing Base Graphics of melody roll	
		ctx.fillStyle = "#323C50";
		ctx.fillRect( wx, wy, ww, wh-20 ); // Main Rectangle
		
		
		ctx.fillStyle = "#5F696E";
		ctx.fillRect( wx + 1, wy + 1, ww - 2, 30 ); // Up Window Bar
		ctx.fillRect( wx + ww-12, wy + 49, 11, wh - 70 ); // Right Side Bar
		ctx.fillRect( wx + 1, wy + 32, 50, wh - 53 ); // Left Side Bar
		
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx + 53, wy + 33, ww - 55, 15); // Up Arrow Bar
		
		var yyStep = ( wh - 69 ) / 24; // y ratio to draw notes
		ctx.fillStyle = "#7F898E";
		ctx.fillRect( wx + 1, wy + 34 + yyStep * 13, 50, yyStep ); // Left Side Bar Default Note
		
		
		// Right Slider
		var sliderH = wh - 72;
		var step = (wh-70) / 120;
		sliderH = step * 24;
		ctx.fillRect( wx + ww - 11, wy + 50 + rollScrollY * step, 9, sliderH );
		
		if ( mouseEnterRect( wx + ww - 11, wy + 50 + rollScrollY * step, 9, sliderH ) )
		{
			if ( mousePress )
			{
				mouseHoldY = mouseY - wy;
				mouseObjectHoldY = 50 + rollScrollY * step;
				toHold = 6;
			}
			if ( mouseDouble ) { rollScrollY = 48; toHold = 0; }
		}
		
		if ( toHold == 6 )
		{	
			rollScrollY = Math.floor( ( (mouseY-wy) + ( mouseObjectHoldY - mouseHoldY ) ) / step ) - 18;
			if ( rollScrollY > 96 ) rollScrollY = 96; 
			if ( rollScrollY < 0 ) rollScrollY = 0;
			
			if ( mouseRelease ) toHold = 0;
		}
		
		
		var xx =  wx + ww - 29;
		var yy = wy + 3;
		var bSize = 26;
		
		// Roll close button
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2); // Button X Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) showRoll = false;		}
		ctx.fillRect( xx, yy, bSize, bSize);
		
		// Clear pattern button
		xx -= bSize + 5;
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2);
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize ) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) if( selected ) selected.patterns[selected.pattern].notes.splice(0);		}
		ctx.fillRect( xx, yy, bSize, bSize);
		
		// Switch to song playlist button
		xx -= bSize + 5;
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2);
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize ) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) showPlaylist = !showPlaylist;		}
		ctx.fillRect( xx, yy, bSize, bSize);
		
		
		if ( selected )
		{
			var s = selected;
			// pattern previous button
			xx = wx + 126;
			yy = wy + 8;
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize-10, bSize-10);
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize-12, bSize-12 ) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) if ( s.pattern > 0 ) { s.pattern--; s.setPattern(); }	} // !zmiana na strzalkach klawiatury
			ctx.fillRect( xx, yy, bSize-12, bSize-12);
			
			
			var tx = wx + 150, ty = wy + 22, txt = s.patterns[s.pattern].name;
			var tw = ctx.measureText(txt).width;
			
			if ( mouseEnterRect(tx,ty-22,tw,28 ) )
			{
				ctx.fillStyle = "#EFECEE";
				if ( mousePress ) { mouseHold = false; toHold = 0; s.patterns[s.pattern].name = prompt( "Enter new pattern name.", s.patterns[s.pattern].name ); }
				
			}
			

			ctx.font = "20px Arial";
			ctx.fillStyle = "#CFCCCE";
			ctx.fillText( txt, wx + 150, wy + 22 ); 
			
			ctx.font = "14px Arial";
			ctx.fillText( "<", wx + 129, wy + 19 );
			
			
			
			// pattern next button
			xx = wx + 156 + tw;
			yy = wy + 8;
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize-10, bSize-10);
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize-12, bSize-12 ) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) { if ( s.patterns.length <= s.pattern + 1 ) addPattern(s.patterns); s.pattern++; s.setPattern(); }		}
			ctx.fillRect( xx, yy, bSize-12, bSize-12);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.fillText( ">", wx + 159 + tw, wy + 19 );
		}
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "20px Arial";
		ctx.fillText( "Melody Roll", wx + 10, wy + 22 );
		
		ctx.fillStyle = "#CFCCCE";
		ctx.fillText( "X", wx + ww - 22, wy + 23 );
		ctx.fillText( "C", wx + ww - 22 - bSize - 5, wy + 23 );
		ctx.fillText( "P", wx + ww - 22 - bSize * 2 - 10, wy + 23 );
		
		
		// Drawing Horizontal Note Lines
		ctx.font = "10px Arial";
		var xx = wx + 1;
		var yy = wy + 48; 
		ctx.strokeStyle = "rgba(11,27,37,0.35)";
		ctx.lineWidth = 1;
		for( var i = 0; i < 24; i++ )
		{
			ctx.beginPath();
			ctx.moveTo( xx, yy + yyStep * i );
			ctx.lineTo( xx + ww - 13, yy + yyStep * i );
			ctx.closePath();
			ctx.stroke();
			
			ctx.fillStyle = "#CFCCCE";
			ctx.fillText( "note " + (i+1+rollScrollY-48) , xx + 5, yy + 11 + yyStep * i );
		}		
		
		// Drawing Vertical Note Lines
		xx = wx + 53, xxStep = ( ww - 66 ) / 32;
		yy = wy + 35; 
		ctx.lineWidth = 1;

		for( var i = 0; i < 33; i++ )
		{
			ctx.beginPath();
			ctx.moveTo( xx + i * xxStep, yy );
			ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
			ctx.closePath();
			ctx.stroke();
		}
		
		
		// Drawing Additional Tact Lines
		ctx.strokeStyle = "rgba(21,37,47,0.35)";
		for( var i = 0; i < 33; i+=4 )
		{	
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo( xx + i * xxStep, yy );
			ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
			ctx.closePath();
			ctx.stroke();
			if ( i % 8 == 0 )
			{
				ctx.lineWidth = 4;
				ctx.beginPath();
				ctx.moveTo( xx + i * xxStep, yy );
				ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
				ctx.closePath();
				ctx.stroke();
			}
		}
		
		
		ctx.fillStyle = "#FF8C00";
		ctx.fillRect( wx + 41 + xxStep * noteHitCounter, wy + 35, 9, 10); // Note Arrow
		
		var scr = rollScrollY - 48;
		if ( selected )
		{
			var s = selected.pattern;
			//if ( songPlay ) s = selected.child.patternPlay;
			
			var notes = selected.patterns[s].notes;
			
			// Drawing notes squares
			ctx.fillStyle = "#90EE90";
			for ( var i = 0; i < notes.length; i++ )
			{
				//ctx.fillText( notes[i].start + " " + notes[i].duration + "  " + notes[i].value, xx + ( notes[i].start - 1 ) * xxStep + 1 , yy + (13 - notes[i].value) * yyStep + 1 );
				
				if ( notes[i].value > -scr-12 )
					if ( notes[i].value < -scr+13 )
						ctx.fillRect( xx + ( notes[i].start - 1 ) * xxStep + 1 , yy + (13 - notes[i].value-scr) * yyStep + 1, xxStep * notes[i].duration - 2, yyStep - 3 ); 
			}
			
			if ( mouseEnterOver < 0 )
			if ( mouseEnterNoCursor( xx, yy + yyStep - 2, xx + ww - 67, yy + wh - 55 ) )
			{
				var mx = Math.floor( 32 * ( mouseX - wx - 54 ) / 484 );
				var my = Math.floor( 24 * ( mouseY - wy - 47 ) / 332 ) + scr;
				
				ctx.fillStyle = "rgba(26,42,52,0.35)";
				ctx.fillRect( xx + mx * xxStep + 1, yy + (my + 1 - scr) * yyStep + 1, xxStep-2, yyStep-3 );
				
				var deleted = false;
				ctx.fillText( my, xx, yy );
				
				if ( mousePress )
				{
					for ( var i = 0; i < notes.length; i++ )
					{
						if ( mx + 1 >= notes[i].start && mx + 1 < notes[i].start + notes[i].duration )
							if ( 12-my == notes[i].value ) 
							{
								notes.splice(i,1);
								deleted = true;
							}
					}
					
					mouseHold = false;
					
					if ( ! deleted )
					{
						var n = {};
						n.start = mx + 1;
						n.value = 12 - my;
						n.duration = 1;
						notes.push( n );
						notes.sort();
						if ( !play ) playSound( sounds[selected.sound].buffer, n.value, selected.volume );
					}
					
				}
				
			}			
			
		}
		
		}
		
	}
		
	{/***************** { Drawing Playlist } *******************/
	
	if ( showPlaylist )
	{
		var wx = playX, wy = playY;
		var ww = playWidth, wh = playHeight;
		
		var wStepW = ( ww / 100 );
		var wStepH = ( wh / 100 );
		if ( mouseEnterNoCursor( wx, wy, wx + ww, wy + wh ) ) mouseGUICounter = 2;
		
		
		if ( mouseEnter( wx + 1, wy + 1, wx + ww - 20, wy + 30 ) ) 
		{
			if ( mousePress )
			{
				toHold = 3;
				mouseHoldX = mouseX;
				mouseHoldY = mouseY;
				mouseObjectHoldX = wx;
				mouseObjectHoldY = wy;
			}
		}
		
		if ( toHold == 3 )
		{
			playX = mouseX + ( mouseObjectHoldX - mouseHoldX );
			playY = mouseY + ( mouseObjectHoldY - mouseHoldY );
			if ( mouseRelease ) toHold = 0;
		}
		
		var wx = wx, wy = wy;
		var ww = ww, wh = wh;
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx-1, wy-1, ww+2, wh+2 ); // Border
		// Drawing Base Graphics of melody roll	
		ctx.fillStyle = "#323C50";
		ctx.fillRect( wx, wy, ww, wh ); // Main Rectangle
		
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx, wy + wh - 21, ww, 21 ); //Down Side Bar Border
		
		ctx.fillStyle = "#5F696E";
		ctx.fillRect( wx + 1, wy + 1, ww - 2, 30 ); // Up Window Bar
		
		ctx.fillRect( wx + 1, wy + 32, 50, wh - 53 ); // Left Side Bar
		ctx.fillRect( wx + 1, wy + wh - 20, ww - 2, 19 ); //Down Side Bar
		ctx.fillRect( wx + ww-12, wy + 49, 11, wh - 70 ); // Right Side Bar
		
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( wx + 53, wy + 33, ww - 53, 15); // Up Arrow Bar
		
		xxStep = ( ww - 66 ) / 8;
		// Tact numbers
		var st = songTacts; if ( songTacts > 8 ) st = playScrollX+8;
		for ( var i = playScrollX; i < st; i++ )
		{
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "11px Arial";
			ctx.fillText( i, wx + 59 + xxStep * (i - playScrollX), wy + 44 );
		}		
		
		var yyStep = ( wh - 69 ) / 8; // y ratio to draw samplers
		ctx.fillStyle = "#7F898E";
		//ctx.fillRect( wx + 1, wy + 34 + yyStep * 13, 50, yyStep ); // Left Side Bar Default Note
		
		// Down Slider
		var sliderW = ww - 2;
		var step = 0;
		if ( songTacts < 8 ) ctx.fillRect( wx + 1 + playScrollX * step, wy + wh - 19, sliderW, 18);
		else
		{
			step = ww / songTacts;
			sliderW = step * 8 - 2;
			ctx.fillRect( wx + 1 + playScrollX * step, wy + wh - 19, sliderW, 18);
		}
		
		if ( mouseEnterRect(  wx + 1 + playScrollX * step, wy + wh - 19, sliderW, 18 ) )
		{
			
			if ( mousePress )
			{
				mouseHoldX = mouseX - wx;
				mouseObjectHoldX = 1 + playScrollX * step;
				toHold = 4;
			}
			
		}
		
		if ( toHold == 4 )
		{
			playScrollX = Math.floor( ( mouseX - wx + ( mouseObjectHoldX - mouseHoldX ) )/step)-1;
			if ( playScrollX > songTacts - 8 ) playScrollX = songTacts - 8; 
			if ( playScrollX < 0 ) playScrollX = 0;
			
			if ( mouseRelease ) toHold = 0;
		}
		
		
		// Right Slider
		var sliderH = wh - 72;
		var step = 0;
		if ( samplers.length < 8 ) ctx.fillRect( wx + ww - 11, wy + 50 + playScrollY * step, 9, sliderH);
		else
		{
			step = (wh-70) / samplers.length;
			sliderH = step * 8 - 2;
			 ctx.fillRect( wx + ww - 11, wy + 50 + playScrollY * step, 9, sliderH);
		}
		
		if ( mouseEnterRect( wx + ww - 11, wy + 50 + playScrollY * step, 9, sliderH ) )
		{
			
			if ( mousePress )
			{
				mouseHoldY =  mouseY - wy;
				mouseObjectHoldY = 50 + playScrollY * step;
				toHold = 5;
			}
			
		}
		
		if ( toHold == 5 )
		{
			playScrollY = Math.floor( ( mouseY - wy + ( mouseObjectHoldY - mouseHoldY ) ) / step ) -3;
			if ( playScrollY > samplers.length - 8 ) playScrollY = samplers.length - 8; 
			if ( playScrollY < 0 ) playScrollY = 0;
			
			if ( mouseRelease ) toHold = 0;
		}
		
		
		//ctx.fillRect( wx + ww-11, wy + 50, 9, 40 ); // Right Side Slider
		
		
		var xx =  wx + ww - 29;
		var yy = wy + 3;
		var bSize = 26;
		
		
		// Switch pattern / song play
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 47, yy - 1, bSize+2, bSize+2); // Button Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx - 46, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) { songPlay = !songPlay; setPatterns(); }	}
		ctx.fillRect( xx-46, yy, bSize, bSize);
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "20px Arial";
		ctx.fillText( "Song Playlist", wx + 10, wy + 22 );
		
		
		// Playlist close button
		ctx.fillStyle = "#0B1B25";
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2); // Button X Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) showPlaylist = false;		}
		ctx.fillRect( xx, yy, bSize, bSize);
		
		//ctx.fillStyle = "#CFCCCE";
		//ctx.font = "20px Arial";
		//ctx.fillText( "Song Playlist", wx + 10, wy + 22 );
		
		
		// Playlist add / delete song tacts
		ctx.fillStyle = "#0B1B25";
		xx -= 16;
		bSize /= 2.4;
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2); // Button Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) songTacts++; }
		ctx.fillRect( xx, yy, bSize, bSize);
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "12px Arial";
		ctx.fillText( "+", xx+2, yy+10 );
		
		ctx.fillStyle = "#0B1B25";
		yy += 15;
		ctx.fillRect( xx - 1, yy - 1, bSize+2, bSize+2); // Button Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRect( xx, yy, bSize, bSize) )
		{	ctx.fillStyle = "#8F999E";
			if ( mousePress ) if ( songTacts > 0 ) songTacts--; }
		ctx.fillRect( xx, yy, bSize, bSize);
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "12px Arial";
		ctx.fillText( "-", xx+3, yy+9 );
		
		
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "20px Arial";
		if ( songPlay ) ctx.fillText( "S", wx + ww - 67, wy + 23 ); else ctx.fillText( "P", wx + ww - 67, wy + 23 );
		ctx.fillText( "X", wx + ww - 22, wy + 23 );
		
		// Drawing Horizontal Note Lines
		ctx.font = "10px Arial";
		var xx = wx + 1;
		var yy = wy + 48; 
		ctx.strokeStyle = "rgba(11,27,37,0.35)";
		ctx.lineWidth = 1;
		
		ctx.fillStyle = "#CFCCCE";
		
		ctx.beginPath();
		ctx.moveTo( xx, yy );
		ctx.lineTo( xx + ww - 15, yy);
		ctx.closePath();
		ctx.stroke();
		
		// drawing samplers' squares on the left
		for( var i = playScrollY; i < playScrollY + 8; i++ )
		if ( i < samplers.length )
		{
			var s = samplers[i];
			
			if ( selected == s )
			{
				ctx.fillStyle = "#738280";
				ctx.fillRect( xx, yy + 1 + yyStep * (i-playScrollY), xxStep-10, yyStep-2);
			}
			
			ctx.fillStyle = "#CFCCCE";
			
			var press = false; //to use in j loop
			if ( mouseEnterNoCursor( wx, yy+yyStep*(i-playScrollY)-20, wx+ww-10, yy+yyStep*(i+1-playScrollY)+20 ) )
			{
				if ( mousePress ) 
				{
					if ( mouseEnterNoCursor( wx, yy+yyStep*(i-playScrollY), wx+ww-10, yy+yyStep*(i+1-playScrollY) ) )
						selected = samplers[i];
					press = true;
				}
			}
			
			ctx.beginPath();
			ctx.moveTo( xx, yy + yyStep * (i+1-playScrollY) );
			ctx.lineTo( xx + ww - 15, yy + yyStep * (i+1-playScrollY) );
			ctx.closePath();
			ctx.stroke();
			
			
			// Drawing playlist for each sampler
			for(var j = playScrollX; j < playScrollX + 8; j++)
			{
				if ( s.playlist[j] != null )
				if ( s.patterns[s.playlist[j]] )
				{
					ctx.fillStyle = "#424C60";
					ctx.fillRect( xx - 8 + xxStep * (j+1-playScrollX), yy + 1 + yyStep * (i-playScrollY), xxStep, yyStep-2);
					
					ctx.fillStyle = "#CFCCCE";
					ctx.fillText( 
					s.patterns[s.playlist[j]].name , 
					xx + xxStep*(j+1-playScrollX), yy + 11 + yyStep * (i-playScrollY) );
				}
			}
			


			if ( press )
			{
				for(var j = 0; j < 8; j++)
				{
					//Switching tacts by clicking on bar
					if ( mouseEnterRectNoCursor( wx - 6 + xxStep*(j+1), wy+30, xxStep, 20 ) ) 
					{ 
						var played = play;
						stopPlay();
						songTact = j+playScrollX; if ( songTact > songTacts-1 ) songTact = songTacts-1; 
						setPatterns();
						play = played;
					}				
					
					if ( mouseEnterOver < 0 )
					if ( mouseEnterRectNoCursor( xx - 8 + xxStep * ( j + 1 ), yy + yyStep * (i-playScrollY), xxStep, yyStep ) )
					{
						// Flashing rectangle when clicking to add
						ctx.fillStyle = "#C2CCC0";
						ctx.fillRect( xx - 8 + xxStep * (j+1), yy + 1 + yyStep * (i-playScrollY), xxStep, yyStep-2);
						
						var deleted = false;
						
						if ( s.playlist[j + playScrollX] != null ) 
						{
							s.playlist[j + playScrollX] = null;
							deleted = true;
						}
						
						mouseHold = false;
						
						// adding pattern to playlist
						if ( ! deleted )
							addToPlaylist( s.playlist, j+playScrollX, s.pattern );
						
					}
				}				
			}
			
			//var tw = ctx.measureText( tableObjects[i].child.name );
			//if ( tw <60 )
			ctx.fillText( samplers[i].name , xx + 5, yy + 11 + yyStep * (i-playScrollY) );
		}		
		
		// Drawing Vertical Pattern Lines
		xx = wx + 53;
		yy = wy + 35; 
		ctx.lineWidth = 1;

		for( var i = 0; i < 9; i++ )
		{
			ctx.beginPath();
			ctx.moveTo( xx + i * xxStep, yy );
			ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
			ctx.closePath();
			ctx.stroke();
		}
		
		
		// Drawing Additional Tact Lines
		ctx.strokeStyle = "rgba(21,37,47,0.35)";
		for( var i = 0; i < 9; i+=4 )
		{	
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo( xx + i * xxStep, yy );
			ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
			ctx.closePath();
			ctx.stroke();
			
			if ( i % 4 == 0 )
			{
				ctx.lineWidth = 4;
				ctx.beginPath();
				ctx.moveTo( xx + i * xxStep, yy );
				ctx.lineTo( xx + i * xxStep, yy + wh - 55 );
				ctx.closePath();
				ctx.stroke();
			}
		}
		
		if ( playScrollX <= songTact )
			if ( songTact < playScrollX + 8 )
			{
				ctx.fillStyle = "#FF8C00";
				ctx.fillRect( wx + 54 + xxStep * (songTact-playScrollX) + noteHitCounter * xxStep/32, wy + 35, 9, 10); // Note Arrow
			}
		
		}
		
	}
	
	{/***************** { Drawing ToolBox } *******************/
	

		var wx = toolBoxX, wy = toolBoxY;
		var ww = toolBoxWidth, wh = toolBoxHeight;
		
		var xx = 0, yy = 0, bSize = 36;
		//ctx.fillStyle = "#0B1B25";
		//ctx.fillRect( xx, yy, bSize+2, bSize+2); // Button Border
		ctx.fillStyle = "#7F898E";
		if ( mouseEnterRectNoCursor( xx, yy, bSize, bSize) ) showToolBox = true; 
	
		ctx.fillRect( xx, yy, bSize, bSize);
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "20px Arial";
		ctx.fillText( "TX", 4, 25 );
			
		if ( wx > -ww + 1 )
		{
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( wx, wy-1, ww+1, wh+2);
			ctx.fillStyle = "#7F898E";
			ctx.fillRect( wx, wy, ww, wh);
			
			
			// File operations
			
			var xx = wx + 7;
			var yy = wy;
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "15px Arial";
			ctx.fillText( "File operations: ", xx+5, yy+18 );
			ctx.fillText( "____________", xx+5, yy+22 );
			
			var xx = wx + 7;
			var yy = wy + 35;//+20
			var bSize = 26;
			// New project button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) if ( confirm("Ar ju siur?") ) newProject(); 
			}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "17px Arial";
			ctx.fillText( "New", xx+34, yy+18 );
			
			
			
			var xx = wx + 7;
			var yy = wy + 70;
			var bSize = 26;
			// Save button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
		
				if ( mousePress ) 
				{
					var nname = "";
					nname = prompt("Enter the name for song.", songName );
					if ( nname != "" && nname != null ) songName = nname;
					saveProject(); 
				}
				
			}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "17px Arial";
			ctx.fillText( "Save", xx+32, yy+18 );
			
			
			
			var xx = wx + 7;
			var yy = wy + 105;
			var bSize = 26;
			// Load button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) loadProject = true;	}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "17px Arial";
			ctx.fillText( "Load", xx+32, yy+18 );
			
			// Sound Bank Bar
			
			var xx = wx + 7;
			var yy = wy + 135;
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "15px Arial";
			ctx.fillText( "Sound Bank: ", xx+12, yy+18 );
			ctx.fillText( "____________", xx+5, yy+22 );
			
			var xx = wx + 7;
			var yy = wy + 170;
			var bSize = 26;
			// Load Url button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) { var path; path = prompt("Enter url patch to sound.", "any link, can be public dropbox / findsounds or anything else"); if ( path ) if ( path != "" ) loadSoundToBank( path ); } 	
			}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "15px Arial";
			ctx.fillText( "Load from Url", xx+8, yy+18 );
			
			
			
			var xx = wx + 7;
			var yy = wy + 205;
			var bSize = 26;
			// Load Url button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) loadFile = true;
			}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "15px Arial";
			ctx.fillText( "Load from File", xx+5, yy+18 );
			
			
			// Composing Stuff
			
			var xx = wx + 7;
			var yy = wy + 235;
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "15px Arial";
			ctx.fillText( "Music Stuff: ", xx+15, yy+18 );
			ctx.fillText( "____________", xx+5, yy+22 );
			
			
			var xx = wx + 7;
			var yy = wy + 270;
			var bSize = 26;
			// Sampler button
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( xx - 1, yy - 1, bSize * 4 + 2, bSize+2); // Button Border
			ctx.fillStyle = "#7F898E";
			if ( mouseEnterRect( xx, yy, bSize * 4, bSize) )
			{	ctx.fillStyle = "#8F999E";
				if ( mousePress ) toCreate = "Sampler";
			}
				
			ctx.fillRect( xx, yy, bSize*4, bSize);
			
			ctx.fillStyle = "#CFCCCE";
			ctx.font = "17px Arial";
			ctx.fillText( "Sampler", xx+20, yy+18 );
			
			
			
			
							/*
				case 5:
				ctx.fillText( "Load File", vx, vy  ); // Zmien to do toolboxa zeby bylo tam ladowanie soundów
				if ( mouseEnterRect( vx, vy-13, ww-21, 20) ) if ( mousePressOver() ) loadFile = true;
				//if ( mouseDouble ) { var path = ""; path = prompt("Enter url patch to sound.", selected.sound); if ( path != "" ) loadSoundToBank( path ); }
				break;*/
			
		}
			
			
		if ( showToolBox )
		{		
			toolBoxX -= t( toolBoxX ) * 0.2;
			if ( mouseX > ww + 40 ) showToolBox = false;
		}
		else
		{
			toolBoxX -= t( toolBoxX + ww ) * 0.2;
		}
	
	}
	
	if ( toCreate != "" )
	{
		toHold = 1000;
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "17px Arial";
		ctx.fillText( toCreate, mouseX - ctx.measureText(toCreate).width / 2, mouseY );
			
		document.body.style.cursor='pointer';
		
		if ( mouseRelease )
		{
			if ( mouseX > 150 )
			switch(toCreate)
			{
				case "Sampler": 
					var s = samplers.push( new sampler( mouseX, mouseY ) );
					
				break;
			}
			
			toCreate = "";
			document.body.style.cursor='default';
			toHold = 0;
		}
	}
	
	{/***************** { Drawing Array Picker } *******************/
	
	
		if ( pickArray != null )
		if ( pickArray.length > 0 )
		{
			var wx = pickerX, wy = pickerY;
			var ww = pickerWidth, wh = pickerStep * pickArray.length;
			if ( mouseEnterNoCursor( wx, wy, wx + ww, wy + wh ) ) { mouseGUICounter = 2; mouseEnterOver = .2; }
			
			
			ctx.fillStyle = "#0B1B25";
			ctx.fillRect( wx-1, wy-1, ww+2, wh+2 ); // Border
			
			ctx.fillStyle = "#374155";
			ctx.fillRect( wx, wy, ww, wh ); // Main Rectangle
			
			var i = 0;
			
			pickArray.forEach( function(arr)
			{
				var vx = wx+1, vy = wy + pickerStep * i;
				if ( i % 2 == 0 ) ctx.fillStyle = "#273345"; else ctx.fillStyle = "#323C50";
				
				if ( arr == lastPick ) // Drawing preview square in background
				{
					if ( pickArray == sounds )
						if ( pickerTimer > 0 ) 
							ctx.fillRect( wx, vy, ww * ( 1 - pickerTimer ), pickerStep ); 
								else 
									ctx.fillRect( wx, vy, ww, pickerStep );
				} else
				ctx.fillRect(wx,vy,ww,pickerStep);
			
				ctx.fillStyle = "#CFCCCE";
				ctx.font = "12px Arial";	
				ctx.fillText( arr.name, vx+5, vy+14 );
				
				if ( mouseEnterRect( vx, vy, ww, pickerStep) ) 
				{	
					if ( pickArray == sounds )
					{	// Audio preview on picker
						if ( lastPick != arr )
						{
							lastPick = arr;
							pickerTimer = 1;
						}
						
						if ( pickerTimer < 0 && lastPick == arr ) 
						{ 
							playSound( arr.buffer, 0, 0.5 ); 
							pickerTimer = 1; 
						}
					}
			
					if ( mousePress ) 
					{
						if ( pickArray == sounds )
							selected.sound = arr.id;
						pickArray = null;
						//break;
					}
				}
				
				i++;
			});
			
/*
for (var i = 0; i < pickArray.length; i++)
			{
				var vx = wx+1, vy = wy + pickerStep * i;
				if ( i % 2 == 0 ) ctx.fillStyle = "#273345"; else ctx.fillStyle = "#323C50";
				
				if ( pickArray[i] == lastPick ) // Drawing preview square in background
				{
					if ( pickArray == sounds )
						if ( pickerTimer > 0 ) ctx.fillRect(wx,vy,ww*(1-pickerTimer),pickerStep); else ctx.fillRect(wx,vy,ww,pickerStep);
				} else
				ctx.fillRect(wx,vy,ww,pickerStep);
			
				ctx.fillStyle = "#CFCCCE";
				ctx.font = "12px Arial";	
				ctx.fillText( pickArray[i].name, vx+5, vy+14 );
				
				if ( mouseEnterRect( vx, vy, ww, pickerStep) ) 
				{	
					if ( pickArray == sounds )
					{	// Audio preview on picker
						if ( lastPick != pickArray[i] )
						{
							lastPick = pickArray[i];
							pickerTimer = 1;
						}
						if ( pickerTimer < 0 && lastPick == pickArray[i] ) { playSound( pickArray[i].buffer, 0, 0.5 ); pickerTimer = 1; }
					}
			
					if ( mousePress ) 
					{
						if ( pickArray == sounds )
							selected.sound = i;
						pickArray = null;
						break;
					}
				}

			}*/
			
			
			if ( mouseEnterOver < 0 )
				if ( mousePress ) pickArray = null;
			
		}
	
	}
	
}

var titleTimer = 10;
var logoSprite = new mySprite("img/title.png", -1);
function drawLogo()
{
	if ( titleTimer > 0 )
	{
		var lx = canvas.width / 2, ly = canvas.height / 2;
		var a = 0;
		if ( titleTimer < 1 )
		{	var val = 1 - titleTimer;
			a = -val*4;
			lx += val*3;
			ly += val*2;
		}
		
		logoSprite.draw( lx, ly, a, 1, 1, titleTimer );
		
		ctx.fillStyle = "#CFCCCE";
		ctx.font = "16px Arial";
		ctx.fillText( "Version: " + version, lx-200, ly + 60);
		ctx.fillText( date, lx+100, ly + 60);
		
		titleTimer -= t(.1);
	}
	
}


function roundRect(ctx, x, y, width, height, radius, fill, stroke) 
{
	if (typeof stroke == "undefined" ) stroke = true;
	if (typeof radius === "undefined") radius = 5;

	ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	
	if (stroke) ctx.stroke();
	if (fill) ctx.fill();   
}


