	function Instance_Snake(id)
	{
		id = id || {}; 
		
		headAngle = 0;
		acceleration = 0;
		
		headXpos = 50 + Math.random() * canvas.width - 100;
		headYpos = 50 + Math.random() * canvas.height - 100;
		
		var tail = [];
		var length = 60;
		
		id.born = function()
		{
			for(var i = 0; i < length; i++)
			{
				tail[i] = {};
				tail[i].x = 0;
				tail[i].y = 0;
				tail[i].a = 0;
			}
			
			for(var i = 1; i < length; i++)
			{
				tail[i].x = tail[i-1].x + lengthdir_x(10,tail[i-1].a+180);
				tail[i].y = tail[i-1].y + lengthdir_y(10,tail[i-1].a+180);
				tail[i].a = PointDirection(tail[i].x,tail[i].y,tail[i-1].x,tail[i-1].y);
				
			}
			
		}
		
		id.born();
		
		id.Update = function()
		{	
			headXpos += lengthdir_x(speed, angle);
			headYpos += lengthdir_x(speed, angle);
			
			tail[0].x = lenheadXpos;
			tail[0].y = headYpos;
			tail[0].a = headAngle;
			
			var speedd = .425;
			for(var i = 1; i < length; i++)
			{
				tail[i].x -= ( tail[i].x - tail[i-1].x + lengthdir_x(13,tail[i-1].a+0) ) * speedd;
				tail[i].y -= ( tail[i].y - tail[i-1].y + lengthdir_y(13,tail[i-1].a+0) ) * speedd;
				tail[i].a -= ( tail[i].a - PointDirection(tail[i].x,tail[i].y,tail[i-1].x,tail[i-1].y)+0 ) * speedd;
			}
			
			if ( x < 0 ) x = 0; if ( x > canvas.width ) x = canvas.width;
			if ( y < 0 ) y = 0; if ( y > canvas.height ) y = canvas.height;
		}
		
		
		id.Draw = function()
		{
			for(i = 1; i < length; i++)
			{
				context.beginPath();
				context.arc(tail[i].x, tail[i].y, 8, 0, 2 * Math.PI, false);
				
				context.fillStyle = '#FF9966';
				context.fill();
				context.lineWidth = id.lineWidth;
				context.strokeStyle = '#AA6633';
				context.stroke();
			}
			
			context.beginPath();
			context.arc(tail[0].x, tail[0].y, 10, 0, 2 * Math.PI, false);
			
			context.fillStyle = '#DD4422';
			context.fill();
			context.lineWidth = id.lineWidth;
			context.strokeStyle = '#AA3311';
			context.stroke();
		}
		
		return id;
	}
	
	