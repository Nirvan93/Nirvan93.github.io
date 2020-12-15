
	{ // Canvas Definition ---------------------------------
	
	var canvas = document.getElementById('fBGCanvas');
    var context = canvas.getContext('2d');
	
	} // Canvas Definition End ----------------------------
	
	
	
	{ // 60 FPS Update Logics ------------------------------
	
		var lastUpdate = Date.now();
		var deltaTime = 1;
		var timeScale = 1;
		
		var TimeElapsed = 0;
		var TimeElapsedUnscaled = 0;
		var FPS = 60; // Target fps
		
		
		// Launch update
		setInterval
		(
			function() 
			{
				//canvas.width = window.innerWidth;
				
				ClockUpdate();
				GameUpdate();
				DrawOnCanvas();
				GameRender();
				
			}, 1000/FPS // 1000 miliseconds / Target FPS
		);
		
			
		function ClockUpdate()
		{
			var now = Date.now();
			var dt = now - lastUpdate;
			lastUpdate = now;
			deltaTime = dt/1000; // Update deltas
			
			if ( TimeElapsed == 0 ) OnGameStart();
			
			TimeElapsed += deltaTime * timeScale;
			TimeElapsedUnscaled += deltaTime;
		}
	
		
		function DrawOnCanvas() 
		{
			context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
		}
		
		
	
	} // 60 FPS ClockUpdate Logics End --------------------------
	


	
	{ // Background Update Stacks ----------------------------
	
		var sss = new FSprite(sss,"img/FLogo.png", 100,100);
		
		function OnGameStart()
		{
			
			
		}
	
					
		function GameUpdate()
		{
			
		}
	
		
		function GameRender() 
		{
			var scale = 0.5;
			sss.Draw(100,200, 90, scale,scale,0.3);
			
			
			context.beginPath();
			context.strokeStyle = '#FF000055';
			context.moveTo(10, 100 );
			context.lineTo(100,150);
			context.lineTo(150,70);
			context.closePath();
			context.fillStyle = '#FF000025';
			context.fill();
			
			context.stroke();
		}
	
	
	} // Game Update Stacks END -------------------
	
	
	
	{ // Input Related ---------------------------------
	
		var cursorX, cursorY;
		canvas.addEventListener("mousemove", mMove, false);
		function mMove(event)
		{
			var x = new Number();
			var y = new Number();

			if (event.pageX != undefined && event.pageY != undefined) 
			{
				x = event.pageX;
				y = event.pageY;
			} 
			else 
			{
				x += document.body.scrollLeft + document.documentElement.scrollLeft;
				y += document.body.scrollTop + document.documentElement.scrollTop;
			}

			 x -= canvas.offsetLeft;
			 y -= canvas.offsetTop;
			 
			 cursorX = x;
			 cursorY = y;
		}
	
	} // Input Related End ---------------------
	
	
	
	{ // Utilities -------------------------------------
	
	
	function componentToHex(c) 
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	
    function rgbToHex(r, g, b, a = 255) 
	{ 
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a); 
	}
	
	function t(a)
	{
		return a * deltaTime * timeScale;
	}
	
	function playSound(s)
	{
		var sound = new Audio(s);
		sound.play();
	}
	
	function lengthdir_x(len, dir)
	{ 
		return (Math.cos(dir * Math.PI / 180) * len); 
	}
		
	function lengthdir_y(len, dir)
	{ 
		return (-Math.sin(dir * Math.PI / 180) * len); 
	}	
	
	function PointDirection(x, y, newx, newy)
	{ 
		return ( (Math.atan2( x - newx, y - newy  ) * ( 180 / Math.PI ) ) + 450 ) % 360; 
	}		
	
	function SmoothValue(Actual, New, Speed)
	{ 
		return ( (New - Actual) * Speed ); 
	}
	
	function SqrtDistance(fromX, fromY, toX, toY)
	{
		var a = fromX - toX;
		var b = fromY - toY;
		return Math.sqrt( a*a + b*b );
	}
	
	function Lerp(a, b, t)
	{
		return (1 - t) * a + t * b
	}
	
	function InverseLerp(a,b,t)
	{
		return (t - a) / (b - a);
	}
	
	function Clamp01(v)
	{
		if ( v < 0 ) return 0; else if (v > 1) return 1; else return v;
	}

	} // Utilities End ------------------------
	
	