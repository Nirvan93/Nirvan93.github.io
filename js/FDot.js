var canvasDotAlphaMul = 1;

function Instance_ParticleDot(instance)
	{
		instance = instance || {}; 
		
		instance.radius = 1 + Math.random() * 4;  
		instance.lineWidth = 2;
		instance.index;
		
		instance.xspeed = 0;//2 + Math.random() * 8;
		instance.yspeed = 0;//2 + Math.random() * 8;
		
		instance.x = 50 + Math.random() * canvas.width - 100;
		instance.y = 50 + Math.random() * canvas.height - 100;
		instance.lastX = instance.x;
		instance.lastY = instance.y;
		
		instance.width = instance.radius * 2;
		instance.height = instance.radius * 2;
		
		instance.offset = Math.random() * 40;
		instance.counter;
		
		instance.nearestChangeTimer = 1000;
		instance.nearest = null;
		instance.parent = null;
		instance.occupied = false;
		instance.frameClaimer = null;
		instance.nearestDistance = 100000;
		instance.nearestAnimX = instance.x;
		instance.nearestAnimY = instance.y;
		
		instance.alpha = 0;
		instance.toLogoAlpha = 1;
		instance.lineAlpha = 1;
		instance.drawed = false;
		
		
		instance.OnUpdateBegin = function()
		{
			//instance.nearest = null;
			instance.frameClaimer = null;
		}
		
		instance.GetChainLength = function()
		{
			var len = 0;
			var ni = instance;
			var dist = 1;
			
			 while(ni.nearest != null )
			 {
				var dist = ABSDistance(ni.lastX, ni.lastY, ni.nearest.lastX, ni.nearest.lastY);
				len += ni.nearest.lastX;
				ni = ni.nearest;
			 }
			
			
			ni = instance;
			if (instance.parent != null)
			while(ni.parent != null  )
			{
				len += ABSDistance(ni.lastX, ni.lastY, ni.parent.lastX, ni.parent.lastY);
				ni = ni.parent;
			}

			return len;
		}
		
		function ABSDistance(x,y,nx,ny)
		{
			return Math.abs(x-nx) + Math.abs(y-ny);
		}

		
		instance.FindNearest = function(instances)
		{
			var nearestDist = 10000; // Actual nearest found dot distance value
			var nearestInstance = null; // Actual found nearest dot
			
			instances.forEach(function(otherI) 
			{
				if (instance.GetChainLength() > 700 ) return;
				//if ( instance.nearestChangeTimer < 1) return; // Ignore if there elapsed less than 1 second since last assignment
				if ( otherI.index == instance.index) return; // Ignore self
				//if ( otherI.frameClaimer != null) return; // Ignore already claimed dot in this update frame
				
				
				var dist = Math.abs(otherI.x - instance.x) + Math.abs(otherI.y - instance.y); // Distance to target dot
				
				if (dist < nearestDist ) // Distance lower than actual nearest found one
				{
					if ( otherI.occupied == false) 
					if ( dist < 300 )
					{
						nearestInstance = otherI;
						nearestDist = dist;
					}
				}
			});
			

			// Claiming nearest instance
			if ( nearestInstance != null )
			{
				instance.occupied = true;
				
				if ( nearestInstance.index == instance.index )
				{
					instance.nearest = null;
				}
				else
				{
					// If changed
					// if ( nearestInstance != instance.nearest)
						// instance.nearestChangeTimer = -Math.random() * 2; // 3 to 1 sec
					nearestInstance.occupied = true;
					instance.nearest = nearestInstance;
					instance.nearest.parent = instance;
					instance.nearestDistance = nearestDist;
					nearestInstance.frameClaimer = instance;
				}
			}
		}
		
		
		instance.Update = function()
		{
			var i = instance;
			
			i.drawed = false;
			i.counter = TimeElapsedUnscaled + i.offset;
			i.x += t(i.xspeed + Math.sin(i.counter)*6 + Math.sin(i.counter*1.5+3.5)*4 + Math.cos(i.counter*1.5+3.5)*12);
			i.y += t(i.yspeed + Math.cos(i.counter)*8 + Math.sin(i.counter*1.75+4.2)*4);
			
			if ( i.x > canvas.width - i.radius || i.x < i.radius ) { i.xspeed = -i.xspeed; i.x += t(i.xspeed); }
			if ( i.y < i.radius || i.y > canvas.height - i.radius ) { i.yspeed = -i.yspeed; i.y += t(i.yspeed); }
			
			if ( i.x < i.radius ) i.x = i.radius; if ( i.x > canvas.width - i.radius ) i.x = canvas.width - i.radius;
			if ( i.y < i.radius ) i.y = i.radius; if ( i.y > canvas.height - i.radius ) i.y = canvas.height - i.radius;
			
			//instance.nearestChangeTimer += deltaTime;
		}
		
		
		instance.Draw = function()
		{
			var i = instance;
			
			var newX = i.x;
			var newY = i.y;
			
			// Going nearer to cursor position
			var distToCursor = 100000;
			if (typeof cursorX !== 'undefined') // Cursor in game view
			{ 
				distToCursor = SqrtDistance(cursorX, cursorY, i.x, i.y);
			}
			
			var distanceFactor = 1;
			var distanceFactorUnsquared = 1;
			if ( distToCursor < 250 )
			{
				distanceFactorUnsquared = distToCursor / 250.0;
				distanceFactor = Math.sqrt(Math.sqrt(distanceFactorUnsquared));
				
				newX = Lerp(cursorX, i.x, distanceFactor);
				newY = Lerp(cursorY, i.y, distanceFactor);
			}
			
			i.lastX += SmoothValue(i.lastX, newX, 0.125);
			i.lastY += SmoothValue(i.lastY, newY, 0.125);
			
			i.toLogoAlpha = 1;
			var distToLogo = SqrtDistance(i.lastX, i.lastY, raySourceX, raySourceY);
			if ( distToLogo < 300 ) i.toLogoAlpha = Clamp01(InverseLerp(100, 300, distToLogo));
			
			
			context.beginPath();
			context.arc(i.lastX, i.lastY, i.radius, 0, 2 * Math.PI, false);
			i.alpha = Lerp(255,  (50 + Math.round( Math.sin(i.counter*1.23)*50 )) * canvasDotAlphaMul, Math.sqrt(distanceFactorUnsquared) );
			
			var color = rgbToHex(216,70,70, Math.round(i.alpha * 0.6 * i.toLogoAlpha) );
			context.fillStyle = color;
			context.fill();

			i.lineAlpha = 0;	
			
			if ( i.nearest != null && i.frameClaimer == null )
			{
				// context.beginPath();
				// context.moveTo(i.lastX, i.lastY);
				
				// Animating target line position
				i.nearestAnimX = i.nearest.lastX;
				i.nearestAnimY = i.nearest.lastY;
				// context.lineTo(i.nearestAnimX, i.nearestAnimY);
				
				var nearestDist = SqrtDistance(i.lastX, i.lastY, i.nearest.lastX, i.nearest.lastY);
				i.lineAlpha = 0;
				if ( nearestDist < 700 ) i.lineAlpha = Clamp01( 1 - nearestDist / 700);
				
				// context.strokeStyle = rgbToHex(216,70,70, Math.round(i.alpha* lineAlpha * 0.5 * i.toLogoAlpha) );
				// context.stroke();
				
				// Debugging
				
				 // context.font = "12px Arial";
				 // context.strokeStyle = rgbToHex(0,0,0, i.toLogoAlpha * 240 );
				 // context.strokeText("["+i.index+"] ChainLength: " + i.GetChainLength(), i.x, i.y);
				
				// if ( i.nearest != null) 
				// {
					// context.font = "12px Arial";
					// context.strokeStyle = rgbToHex(0,0,0, i.toLogoAlpha * 240 );
					// context.strokeText("["+i.index+"] Nearest: " + i.nearest.index, i.x, i.y);
				// }
				// else
				// {
					// if ( i.nearest == 'undefined' )
					// {
					    // context.font = "12px Arial";
						// context.strokeStyle = rgbToHex(0,0,0, i.toLogoAlpha * 240 );
						// context.strokeText("["+i.index+"] undefined" , i.x, i.y);
					// }
					// else
					// {
					    // context.font = "12px Arial";
						// context.strokeStyle = rgbToHex(0,0,0, i.toLogoAlpha * 240 );
						// context.strokeText("["+i.index+"] No Nearest" , i.x, i.y);
					// }
				// }

				
			}
			else
			{
				i.nearestAnimX += SmoothValue(i.nearestAnimX, i.lastX, 0.1);
				i.nearestAnimY += SmoothValue(i.nearestAnimY, i.lastY, 0.1);
			}
			

		}
		
		return instance;
	}