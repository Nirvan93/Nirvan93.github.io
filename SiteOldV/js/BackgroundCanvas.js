
	{ // Canvas Definition ---------------------------------
	
	var canvas = document.getElementById('fBGCanvas');
    var context = canvas.getContext('2d');
	
	} // Canvas Definition End ----------------------------
	
	var canvasAlphaMul = 0.1;
	var canvasAlphaAddMulFill = 1;
	var canvasAlphaAdd = 0.0;
	var canvasLogoAlpha = 0.35;
	var canvasLogoAlphaInner = 0.5;
	
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
	


	
	{ // Center FLogo ---------------------------
	
		var raySourceX = canvas.width / 2 - 150 + Math.random() * 300;
		var raySourceY = canvas.height / 2 - 150 + Math.random() * 300
		
		var logoInner = new FSprite(logoInner,"img/FInner.png", 100,100);
		var logoRounding = new FSprite(logoRounding,"img/FRounding.png", 100,100);
		
		function InitLogo()
		{
		}
		
	
		function UpdateCenterLogo()
		{
			var period = TimeElapsedUnscaled * 0.3;
			raySourceX += t(Math.sin(period )*6 + Math.sin(period*1.5+3.5)*4 + Math.cos(period*1.5+3.5)*12);
			raySourceY += t(Math.cos(period)*8 + Math.sin(period*1.75+4.2)*4);


		}
	
	} // ------------------
	
	
	
	{ // Background Update Stacks ----------------------------
	
		//var oInstance_Snake;
		particleDots = [];
		pairs = [];
	
		function OnGameStart()
		{
			timeScale = 1.75; // Game speed multiplier, lower for slowmo effect
			
			// oInstance_Snake = Instance_Snake();	// Creating instance of snake
			InitLogo();
			
			var i; // Spawning 180 dots when game starts
			for (i = 0; i < 180; i++){ var dot = new Instance_ParticleDot(); particleDots.push(dot); dot.index = i; }
			
			// Finding nearest dots for shapes
			particleDots.forEach(function(Instance_ParticleDot) 
			{ Instance_ParticleDot.OnUpdateBegin(); });
			
			particleDots.forEach(function(Instance_ParticleDot) 
			{ Instance_ParticleDot.FindNearest(particleDots); });
			
			// Managing line shapes
			
			
		}
	
					
		function GameUpdate()
		{

			UpdateCenterLogo();
			
			{// Update stack for each dot -------------------------
			
			particleDots.forEach(function(Instance_ParticleDot) 
			{
				Instance_ParticleDot.OnUpdateBegin();
			});
			
			// Dots update
			particleDots.forEach(function(Instance_ParticleDot) 
			{
				Instance_ParticleDot.Update();
			});

			} // Update stack for each dot  END ------------------
			
		}
	
		
		function GameRender() 
		{
			// Drawing and computing dots
			particleDots.forEach(function(Instance_ParticleDot) 
			{
				Instance_ParticleDot.Draw();
			});
			
			
			var lastNearest = particleDots[0];
			var started = false;
			var conn = 0;
			// Drawing polygonal shapes
			particleDots.forEach(function(i) 
			{
				var ni = i;
				var safe = 32; // safety for while
				
				while(ni.nearest != null && conn < safe)
				{
					if ( !started )
					{
						context.beginPath();
						started = true;
						context.moveTo(ni.lastX, ni.lastY );
					}
					
					context.lineTo(ni.nearest.lastX,ni.nearest.lastY);
					conn+=1;
					ni = ni.nearest;
				}
				
				if ( conn > 2 )
				{
					 context.closePath();
					 context.strokeStyle = rgb(.8,.2,.2, i.lineAlpha / 255 + canvasAlphaAdd );
					 context.stroke();
					 
					 context.fillStyle = rgb(1,0,0, ( (i.toLogoAlpha * 0.25 * i.alpha / 255) * canvasAlphaAddMulFill) );
					 context.fill();
					 
					 started = false;
					 conn = 0;
				}
				else
				{ }
				
				started = false;
			});
			
					
			// Drawing lines from logo
			particleDots.forEach(function(i) 
			{
				var grad = context.createLinearGradient(i.lastX, i.lastY, raySourceX, raySourceY);
				grad.addColorStop(0.0, rgb(1,0,0, i.toLogoAlpha * 0.25 * i.alpha / 255 + canvasAlphaAdd ) );
				grad.addColorStop(0.75, rgb(1,0,0,0.0) );

				context.beginPath();
				context.strokeStyle = grad;
				context.moveTo(i.lastX, i.lastY );
				context.lineTo(raySourceX,raySourceY);
				context.stroke();
			});
			
			
			// Draw logo
			logoRounding.Draw(raySourceX, raySourceY, TimeElapsed * 10, 1, 1, canvasLogoAlpha);
			logoInner.Draw(raySourceX, raySourceY, 0, 1, 1, canvasLogoAlphaInner);

		}
	
	
	} // Game Update Stacks END -------------------
	
	
	
	{ // Input Related ---------------------------------
	
		var cursorX, cursorY;
		// canvas.addEventListener("mousemove", mMove, false);
		// function mMove(event)
		// {
			// var x = new Number();
			// var y = new Number();

			// if (event.pageX != undefined && event.pageY != undefined) 
			// {
				// x = event.pageX;
				// y = event.pageY;
			// } 
			// else 
			// {
				// x += document.body.scrollLeft + document.documentElement.scrollLeft;
				// y += document.body.scrollTop + document.documentElement.scrollTop;
			// }

			 // x -= canvas.offsetLeft;
			 // y -= canvas.offsetTop;
			 
			 // cursorX = x;
			 // cursorY = y;
		// }
		
		$(window).mousemove( function(event)
		{
			// $('.v').css('left', event.clientX + 'px');
			// $('.h').css('top', event.clientY + 'px');
			// console.log('left', event.clientX + 'px');
			
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
		});
	
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
	
	function rgb(r, g, b, a = 1.0) 
	{ 
		return "#" + componentToHex( Math.round(r*255) ) + componentToHex( Math.round(g*255) ) + componentToHex( Math.round(b*255)) + componentToHex( Math.round(a*255) ); 
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
	
	