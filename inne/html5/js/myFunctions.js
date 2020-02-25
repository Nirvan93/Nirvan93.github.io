    var DEGTORAD = Math.PI / 180;
	var RADTODEG = 180 / Math.PI;
	
	
	function collisionInPoint(x,y) 
	{	
		
		colliders.forEach( function (collider)
		{
			
			if ( x > collider.x && x < collider.x + collider.width )
			{
				if ( y > collider.y && y < collider.y + collider.height ) 
				{
					return collider;
				}
			}
			
		});
		
		return false;
    }
	
				
	function collisionCollider(a) 
	{	
		
		colliders.forEach( function (collider)
		{
			if ( collider != a )
			{
				if ( collider.x < a.x + a.width && collider.x + collider.width > a.x )
				{
					if ( collider.y + collider.height > a.y && collider.y < a.y + a.height ) 
					{
						return collider;
					}
				}
			}
			
		});
		
		return false;
    }
	
	
	function lineCast(x,y,direction,length,quality,type)
	{
		var count = Math.round(length / quality);
		var step = length/count;
		direction = -direction+90;
		
		for(var i = 0; i < count; i++)
		{
			var checkX = x+Math.sin(direction * DEGTORAD) * i * step;
			var checkY = y-Math.cos(direction * DEGTORAD) * i * step;
			return collisionInPoint(checkX,checkY).father;
			//context.fillStyle = "#CC55AA";
			//context.fillRect( checkX, checkY, 1, 1 );
		}
		
		return null;
		
	}
	
	
	function componentToHex(c) 
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	
	
    function rgbToHex(r, g, b) 
	{ 
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); 
	}
	
	
	function t(a)
	{
		return a * deltaTime * gameSpeed;
	}
	
	
	function playSound(s)
	{
		var sound = new Audio(s);
		sound.play();
	}
	
	
	function lengthdir_x(len, dir)
	{ return (Math.cos(dir * Math.PI / 180) * len); }
		
		
	function lengthdir_y(len, dir)
	{ return (-Math.sin(dir * Math.PI / 180) * len); }	
	
	
	function PointDirection(x, y, newx, newy)
	{ return ( (Math.atan2( x - newx, y - newy  ) * ( 180 / Math.PI ) ) + 450 ) % 360; }		
	
	
	function SmoothValue(Actual, New, Speed)
	{ 
		return ( (New - Actual) * Speed ); 
	}
	
	
	