function FSprite(id, src, originX, originY)
{
	id = id || {}; 
	id.depth = 0;
	
	id.originX = originX;
	id.originY = originY;
	id.width = 0;
	id.height = 0;
	RAD = (Math.PI / 180);
	
	id.sprite = new Image();
	id.sprite.src = src;
	
	id.sprite.onload = function() 
	{ 
		id.width = id.sprite.width; 
		id.height = id.sprite.height;
	}
	
	id.Draw = function(x,y,angle,scaleX,scaleY,alpha)
	{
		scaleX = scaleX || 1;
		scaleY = scaleY || 1;
		angle = angle || 0;
		alpha = alpha || 1;
		
		context.save();
		
		context.translate(x,y);
		context.rotate( RAD * angle );
		
		context.scale(scaleX, scaleY);
		context.translate( -originX, -originY );
		if ( alpha > 1 ) context.globalAlpha = 1; else if ( alpha >= 0 ) context.globalAlpha = alpha; else context.globalAlpha = 0;
		
		context.drawImage(id.sprite,0,0);
		context.restore();
    }
	
	return id;
}