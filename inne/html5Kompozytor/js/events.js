
/******************** Events Functions ***********************/
	
	
function mDown( event )
{
	if ( !mouseHold )
	{
		mouseHoldX = mouseX; 
		mouseHoldY = mouseY;
		if ( timePanelEnter[0] ) switchPlay();
		if ( timePanelEnter[1] ) stopPlay();		
		mousePress = true;
	}
	
	mouseHold = true;
}

function mousePressOver(t)
{
	var t = t || 0;
	if ( mousePress )
		if ( mouseEnterOver < 0 ) return true;
	return false;
}
	
function mUp( event )
{
	mouseHold = false;
	mouseRelease = true;
}	


function mMove( event )
{
	var rect = canvas.getBoundingClientRect();
	mouseX = event.x - rect.left;
	mouseY = event.y - rect.top;
}		


function mWheel( event )
{
    var evt=window.event || event ;
    var delta = evt.detail? evt.detail : evt.wheelDelta;
    if ( delta > 0 ) mouseWheelUp = true; else mouseWheelDown = true;
}
	
	
function mouseEnter(x,y,x2,y2)
{
	if ( mouseX > x && mouseX < x2)
		if ( mouseY > y && mouseY < y2 )
		{	
			document.body.style.cursor='pointer';
			mouseEntered = true;
			return true;
		}
		
	if ( !mouseEntered ) document.body.style.cursor='default';
	
	return false;
}	


function mouseEnterRect(x,y,x2,y2)
{
	if ( mouseX > x && mouseX < x+x2)
		if ( mouseY > y && mouseY < y+y2 )
		{	
			document.body.style.cursor='pointer';
			mouseEntered = true;
			return true;
		}
		
	if ( !mouseEntered ) document.body.style.cursor='default';
	
	return false;
}	


function mouseEnterRectNoCursor(x,y,x2,y2)
{
	if ( mouseX > x && mouseX < x+x2)
		if ( mouseY > y && mouseY < y+y2 )
		{	
			return true;
		}
	
	return false;
}	


function mouseEnterNoCursor(x,y,x2,y2)
{
	if ( mouseX > x && mouseX < x2)
		if ( mouseY > y && mouseY < y2 )
		{	
			return true;
		}
		
	return false;
}


function resetMouseVariables()
{
	if ( mousePress ) { mouseDoubleCounter++; mouseTimer = t(2.25); }
	if ( mouseTimer < 0 ) mouseDoubleCounter = 0; else mouseTimer -= t(.25);
	
	mouseDouble = false;
	mouseEntered = false;
	mousePress = false;
	mouseRelease = false;
	mouseWheelUp = false;
	mouseWheelDown = false;
	mouseEnterGUI = false;
	mouseEnterOver -= .1;
	
	if ( mouseGUICounter > 0 ) { mouseGUICounter--; mouseEnterGUI = true; } else mouseEnterGUI = false;
	if ( mouseDoubleCounter == 2 ) { mouseDouble = true; mouseDoubleCounter = 0; }
}
	
