
function mySprite(src, originX, originY)
{
	var id = {}; 
	id.depth = 0;
	
	id.originX = originX || 0;
	id.originY = originY || 0;
	id.width = 0;
	id.height = 0;
	
	id.sprite = new Image();
	id.sprite.src = src;
	id.loaded = false;
	
	id.sprite.onload = function() 
	{ 
		id.width = id.sprite.width; 
		id.height = id.sprite.height;
		
		if ( id.originX == -1 )
		{
			id.originX = id.width / 2;
			id.originY = id.height / 2;
		}
		
		id.loaded = true;
	}
	
	id.draw = function(x,y,angle,scaleX,scaleY,alpha)
	{
		scaleX = scaleX || 1;
		scaleY = scaleY || 1;
		angle = angle || 0;
		alpha = alpha || 1;
		
		ctx.save();
		
		ctx.translate(x,y);
		ctx.rotate( DEGTORAD * angle );
		ctx.scale(scaleX, scaleY);
		ctx.translate( -id.originX, -id.originY );
		if ( alpha > 1 ) ctx.globalAlpha = 1; else if ( alpha >= 0 ) ctx.globalAlpha = alpha; else ctx.globalAlpha = 0;
		
		if ( id.loaded ) ctx.drawImage(id.sprite,0,0); else drawLoadingArc(id.originX,id.originY);
		
		ctx.restore();
    }
	
	return id;
}


function drawLoadingArc(x,y)
{
	ctx.beginPath();
		ctx.arc(x, y, 15 + Math.sin(time*4) * 5, time*2, (.5 + time ) * Math.PI + time, false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#CCC';
	ctx.stroke();
	
	ctx.fillStyle = "#FFF";
	ctx.font = "12px Arial";
	ctx.fillText("Loading",x-ctx.measureText("Loading").width/2,y);
}



