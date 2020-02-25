function mySprite(id, src, originX, originY)
{
	id = id || {}; 
	id.depth = 0;
	
	id.originX = originX;
	id.originY = originY;
	width = 0;
	height = 0;
	RAD = (Math.PI / 180);
	
	id.sprite = new Image();
	id.sprite.src = src;
	
	id.sprite.onload = function() 
	{ 
		width = id.sprite.width; 
		height = id.sprite.height;
	}
	
	id.draw = function(x,y,angle,scaleX,scaleY)
	{
		scaleX = scaleX || 1;
		scaleY = scaleY || 1;
		angle = angle || 0;
		
		context.save();
		
		context.translate(x,y);
		context.rotate( RAD * angle );
		context.scale(scaleX, scaleY);
		context.translate( -originX, -originY );
		
		
		context.drawImage(id.sprite,0,0);
		//alert(sprite.width);
        //context.drawImage(sprite,x,y,width,height,x,y,width,height );
		
		context.restore();
    }
	
	return id;
}