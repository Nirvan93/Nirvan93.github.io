
// Dokument jest gotowy...
//$(document).ready(function() 
$(window).load(function()
{
	var lastUpdate = Date.now();
	var elapsed = 0;
	var deltaTime = 1;
	var FPS = 60;
	
	setInterval(
	function() 
	{
		update();
	}, 1000/FPS);
	
	var points = [];
	var cssPrefix = false;
	if (jQuery.browser.msie) { console.log(jQuery.browser.msie); cssPrefix = "ms"; }
	else if (jQuery.browser.webkit) {  cssPrefix = "webkit"; } 
		else if (jQuery.browser.mozilla) { console.log(jQuery.browser.msie); cssPrefix = "moz"; }
	
	
	function shardedButton(cols, rows, width, height, link, name)
	{
		var id = id || {};			//id jako obiekt z różnymi zmiennymi
		id.shards = cols * rows;	//ilość szczątek
		id.name = name;
		id.points = []; 	//punkty pozycji szczątek
		id.event = 0; 		//do wykrycia czy kliknięto na przycisk
		id.timer = 0; 		//do animacji przy kliknięciu
		id.element = document.getElementById(link);	//referencja elementu przycisku w dokumencie
		id.distance = 300;	//dystans myszki do przycisku
		id.sound = false;
		
		var singleWidth = Math.ceil(width / cols);
		var singleHeight = Math.ceil(height / rows);
		var butt = jQuery("#"+link).css("backgroundImage","url(img/"+name+"c.png)").html(""); //referencja do tagu <a>
		
		var i = 0;
		for(x = 0; x < rows; x++) //tworzenie szczątek
		{
			var last;
			for(y = 0; y < cols; y++) 
			{
				last = jQuery("<span />").attr("style","width:" 
				+ (singleWidth) + "px;height:" + (singleHeight) 
				+ "px;background-position:-" + (singleHeight * y) 
				+ "px -" + (singleWidth * x) + "px;");
				
				last.attr("id",id.name+i); i++;
				butt.append(last);
			}
			last.append(jQuery("<div />").addClass("clear"));
		}
		
		$("#"+link).mouseover(function () { if ( id.event != 2 ) id.event = 1; if ( !id.sound ) { playSound("./sfx/kick.wav"); id.sound = true; } });
		$("#"+link).mouseout(function () { if ( id.event != 2 ) id.event = 0; });
		$("#"+link).click(function () 
		{ 
			$('html, body').animate({
				scrollTop: $("#sec"+id.name).offset().top - 150
			}, 2000, 'easeInOutCubic');
		
			buttons.forEach(function(button) { button.startTime = 2 + Math.random() * 2; button.event = 0; });
			id.event = 2; 
			id.timer = 1;
			switch(id.name){ case "start": playSound("./sfx/snare.wav"); break;  case "sklad": playSound("./sfx/over1.wav"); break;  case "onas": playSound("./sfx/over2.wav"); break;  case "muzyka": playSound("./sfx/snare.wav"); break;  case "koncerty": playSound("./sfx/snare.wav"); break; case "kontakt": playSound("./sfx/hat.wav"); break; }
		});
		
		for( var i = 0; i < id.shards; i++ ) //początkowe rozmieszczenie szczątek
		{
			id.points.push( point() );
			if ( cssPrefix )
			{	if ( cssPrefix == "moz" )
				document.getElementById(id.name+i).style.MozTransform = 
				'translateX('+id.points[i].x+'px) '+'translateY('+id.points[i].y+'px) ';
				else
				document.getElementById(id.name+i).style.webkitTransform = 
				'translateX('+id.points[i].x+'px) '+'translateY('+id.points[i].y+'px) ';
			}
		}
		
		id.update = function()
		{
			
			

			for(var i = 0; i < id.shards; i++)
			{
				var p = id.points[i];
				
				switch(id.event)
				{
					case 0: id.sound = false; p.time += ((p.startTime/50 + id.distance/150) - p.time) * .1; break;
					case 1: p.time += (0.075 - p.time) * .2; break;
					case 2: p.time += (0 - p.time) * .25; break;
				}
				
				
				
				if ( p.time != 0 )
				{
					//if ( p.time > .3 && p.time < 3 ) p.time -= t(.1);
					//if ( p.time > 0 ) p.time -= t(.025); else p.time = 0;
					
					var v = [];
					for(var j = 0; j < 4; j++) v.push(0);
					var d = 4;
					v[0] = Math.sin((p.time + p.offset + elapsed / 15)/d) * p.multiplier / 1.4;
					v[1] = Math.cos((p.time/8 + p.offset*3 + elapsed / 9)/d) * p.multiplier / 1.4;
					v[2] = Math.cos((p.time + p.offset + elapsed / 15)/d) * p.multiplier / 1.4;
					v[3] = Math.sin((p.time / 6 + p.offset*2 + elapsed / 10)/d) * p.multiplier / 1.4;
					
					p.x = ( v[0] + v[1] ) * p.time;
					p.y = ( v[2] + v[3] ) * p.time;
					
					p.rotX = p.time * p.multiplier * 5;
					p.rotY = p.time * p.multiplier * 3;
					p.rot = p.time * p.multiplier * 2;
					
					if ( cssPrefix )
					{	if ( cssPrefix == "moz" )
							document.getElementById(id.name+i).style.MozTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
						else if ( cssPrefix == "ms" )
							document.getElementById(id.name+i).style.msTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
						else
							document.getElementById(id.name+i).style.webkitTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
					}
				}
			}
		}
		
		id.mouseUpdate = function(x,y)
		{
			//alert(id.element.offsetLeft + id.element.offsetWidth / 2);
			//id.distance = distance(x,y, id.element.offsetLeft + id.element.offsetWidth / 2, event.clientX, id.element.offsetTop + id.element.offsetHeight / 2);
			var xx = id.element.offsetLeft + id.element.offsetWidth / 2;
			var yy = id.element.offsetTop + id.element.offsetHeight / 2;
			//alert(xx+"   mx:" + x + "   "+yy+"  my:"+y);
			id.distance = distance(x,y,xx,yy);
			//alert(id.distance);
			
			// 
			//, 
		}
		
		return id;
	}
	
	
	function logoObject()
	{
		var id = id || {};
		
		// If we support this browser
		if (cssPrefix) 
		{
			var cols = 8; // Desired columns
			var rows = 4; // Desired rows
			var logoparts = cols * rows;
			var totalWidth = 512; // Logo width
			var totalHeight = 256; // Logo height
			var singleWidth = Math.ceil(totalWidth / cols); // Shard width
			var singleHeight = Math.ceil(totalHeight / rows); // Shard height
			var i = 0;
			// Remove the text and background image from the logo
			var logo = jQuery("#gripLogo").css("backgroundImage","none").html("");
			
			for(x = 0; x < rows; x++) 
			{
				var last;
				for(y = 0; y < cols; y++) 
				{
					last = jQuery("<span />").attr("style","width:" 
					+ (singleWidth) + "px;height:" + (singleHeight) 
					+ "px;background-position:-" + (singleHeight * y) 
					+ "px -" + (singleWidth * x) + "px;");
					
					last.attr("id","p"+i);
					i++;
					
					logo.append(last);
				}
				last.append(jQuery("<div />").addClass("clear"));
			}
			
		}

		for(var i = 0; i < logoparts; i++) points.push( point() );
			for(var i = 0; i < logoparts; i++)
			{
				if ( cssPrefix)
				{
					if ( cssPrefix == "webkit")
					document.getElementById("p"+i).style.webkitTransform = 
					'translateX('+points[i].x+'px) '+'translateY('+points[i].y+'px) ';
					else
					document.getElementById("p"+i).style.MozTransform = 
					'translateX('+points[i].x+'px) '+'translateY('+points[i].y+'px) ';
				}
			}
			
		id.update = function()
		{
			if ( elapsed > 0 )
			{
				for(var i = 0; i < logoparts; i++)
				{
					var p = points[i];
					if ( p.time != 0 )
					{
						if ( p.time > .3 && p.time < 3 ) p.time -= t(.1);
						if ( p.time > 0 ) p.time -= t(.025); else p.time = 0;
						
						var v = [];
						for(var j = 0; j < 4; j++) v.push(0);
						v[0] = Math.sin(p.time + p.offset + elapsed / 15) * p.multiplier;
						v[1] = Math.cos(p.time/8 + p.offset*3 + elapsed / 9) * p.multiplier;
						v[2] = Math.cos(p.time + p.offset + elapsed / 15) * p.multiplier;
						v[3] = Math.sin(p.time / 6 + p.offset*2 + elapsed / 10) * p.multiplier;
						
						p.x = ( v[0] + v[1] ) * p.time;
						p.y = ( v[2] + v[3] ) * p.time;
						
						p.rotX = p.time * p.multiplier * 5;
						p.rotY = p.time * p.multiplier * 3;
						p.rot = p.time * p.multiplier * 2;
						
						if ( cssPrefix )
						{
							if ( cssPrefix == "webkit")
							document.getElementById("p"+i).style.webkitTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
							else if ( cssPrefix == "ms" )
							document.getElementById("p"+i).style.msTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
							else
							document.getElementById("p"+i).style.MozTransform = 
							'translateX('+p.x+'px) '+'translateY('+p.y+
							'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
						}
					}
				}
			}
		}
			
		return id;
	}
	
	
	var logo = new logoObject();
	var buttons = [];
	buttons.push( shardedButton(6,2,120,40,"buttSt","start") );
	buttons.push( shardedButton(6,2,120,40,"buttSk","sklad") );
	buttons.push( shardedButton(6,2,120,40,"buttOn","onas") );
	buttons.push( shardedButton(8,2,160,40,"buttMu","muzyka") );
	buttons.push( shardedButton(9,2,180,40,"buttKonc","koncerty") );
	buttons.push( shardedButton(9,2,180,40,"buttKont","kontakt") );
	
	function update()
	{
		var now = Date.now();
		var dt = now - lastUpdate;
		lastUpdate = now;
		deltaTime = dt/17;
		elapsed += t(1);
		
		logo.update();
		
		buttons.forEach(function(button) 
		{
            button.update();
        });
		
	}
		
	function point(id)
	{
		id = id || {};
		id.x = 0;
		id.y = 0;
		
		id.rotX = 0;
		id.rotY = 0;
		id.rot = 0;
		
		id.offset = -Math.random()*400+Math.random()*800;
		id.time = 3 + Math.random() * 3;
		id.startTime = id.time;
		id.multiplier = 10 + Math.random()*10;
			
		return id;
	}
		
	function t(a)
	{
		return a * deltaTime;
	}
	
	function distance(x,y,x0,y0)
	{
		return Math.sqrt( (x -= x0) * x + (y -= y0) * y);
	}
	
	function playSound(s)
	{
		//var sound = new Audio(s);
		//sound.play();
	}
	
	$(document).mousemove(function(event) 
	{
		buttons.forEach(function(button) 
		{
            button.mouseUpdate(event.clientX, event.clientY);
        });
	});
	
});




