
	
	function Collider(mother,x,y,width,height)
	{
		id = {}; 
		id.mother = mother || null;
		id.x = x || 0;
		id.y = y || 0;
		id.width = width || 0;
		id.height = height || 0;
		
		
		id.draw = function()
		{
			context.rect(id.x,id.y,id.width,id.height);
			context.fillStyle = "rgba(0,220,0,.3)";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#22AA22";
			context.stroke();
		}
		
		return id;
	}
	
	
	function ball(id)
	{
		id = id || {}; 
		var radius = 20;  
		var lineWidth = 3;
		
		id.collider = new Collider(id, 0, 0, radius*2, radius*2);
		colliders.push(id.collider);
		
		var xspeed = 2 + Math.random() * 12;
		var yspeed = 2 + Math.random() * 5;
		var x = 50 + Math.random() * cWidth - 100;
		var y = 50 + Math.random() * cHeight - 100;
		var width = radius*2;
		var height = radius*2;
		
		var offset = Math.random() * 40;
		var counter;
		var cc = 0;
		
		id.update = function()
		{
			time = time + offset;
			x += t(xspeed);
			y += t(yspeed);
			cc -= .1;
			
			id.collider.x = x - radius;
			id.collider.y = y - radius;
	
			if ( x > cWidth - radius || x < radius ) collideX();
			if ( y < radius || y > cHeight - radius ) collideY();
			lockInScreen();
			
			yspeed += t(gravity);
		}
		
		
		id.draw = function()
		{
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI, false);
			
			context.fillStyle = '#DD0000';
			context.fill();
			context.lineWidth = lineWidth;
			context.strokeStyle = '#AA0000';
			context.stroke();
			
		}
		
		function collideX()
		{
			xspeed = -xspeed; 
			x += t(xspeed); 
			xspeed /= 2;
			
		}
		
		function collideY()
		{
			yspeed = -yspeed; 
			y += t(yspeed);
			yspeed /= 2; 
			if ( Math.abs(yspeed) < .2 ) yspeed = 0;
		}
		
		function lockInScreen()
		{
			if ( x < radius ) x = radius; 
			if ( x > cWidth - radius ) x = cWidth - radius;
			if ( y < radius ) y = radius; 
			if ( y > cHeight - radius ) y = cHeight - radius;
		}
		
		return id;
	}	
	
	flys = [];
	function fly(id)
	{
		id = id || {}; 
		id.radius = 4;  
		id.lineWidth = 2;
		
		id.xspeed = 2 + Math.random() * 5;
		id.yspeed = 2 + Math.random() * 5;
		id.x = 50 + Math.random() * cWidth - 100;
		id.y = 50 + Math.random() * cHeight - 100;
		id.cWidth = id.radius*2;
		id.cHeight = id.radius*2;
		
		id.offset = Math.random() * 40;
		id.counter;
		
		
		id.update = function()
		{
			id.counter = time + id.offset;
			id.x += t(id.xspeed + Math.sin(id.counter)*6 + Math.sin(id.counter*1.5+3.5)*4 + Math.cos(id.counter*1.5+3.5)*12);
			id.y += t(id.yspeed + Math.cos(id.counter)*8 + Math.sin(id.counter*1.75+4.2)*4);
			
			if ( id.x > 700 - id.radius || id.x < id.radius ) { id.xspeed = -id.xspeed; id.x += t(id.xspeed); }
			if ( id.y < id.radius || id.y > 500 - id.radius ) { id.yspeed = -id.yspeed; id.y += t(id.yspeed); }
			
			if ( id.x < id.radius ) id.x = id.radius; if ( id.x > cWidth - id.radius ) id.x = cWidth - id.radius;
			if ( id.y < id.radius ) id.y = id.radius; if ( id.y > cHeight - id.radius ) id.y = cHeight - id.radius;
		}
		
		id.draw = function()
		{
			context.beginPath();
			context.arc(id.x, id.y, id.radius, 0, 2 * Math.PI, false);
			
			context.fillStyle = rgbToHex(100+Math.floor(id.offset+Math.sin(id.counter)*100),100+Math.floor(id.offset+Math.cos(id.counter*2.3)*100),100+Math.floor(id.offset+Math.sin(id.counter*12.73)*100));
			context.fill();
			context.lineWidth = id.lineWidth;
			//context.strokeStyle = rgbToHex(100+Math.floor(id.offset+Math.cos(id.counter)*85),100+Math.floor(id.offset+Math.sin(id.counter*2.3)*100),85+Math.floor(id.offset+Math.cos(id.counter*12.73)*75));
			context.strokeStyle = '#888888';
			context.stroke();
		}
		
		return id;
	}
	

	function updateObjects()
	{
		//if ( time < 3.5 ) { flys.push( fly() ); }
		//if ( time < .3 ) { balls.push( ball() ); }
			
		flys.forEach(function(fly) 
		{
			fly.update();
		});
			
		balls.forEach(function(ball) 
		{
			ball.update();
		});

		
		handleCollisions();
		
		
		flys.forEach(function(fly) 
		{
			fly.draw();
		});

		balls.forEach(function(ball) 
		{
			ball.draw();
		});
		
	}