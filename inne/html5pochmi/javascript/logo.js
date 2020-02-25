// If we support this browser
if (cssPrefix) 
{
	var cols = 8; // Desired columns
	var rows = 4; // Desired rows
	logoparts = cols * rows;
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

var c = 0;
var points = [];
for(var i = 0; i < logoparts; i++) points.push( point() );
	for(var i = 0; i < logoparts; i++)
	{
		document.getElementById("p"+i).style.webkitTransform = 
		'translateX('+points[i].x+'px) '+'translateY('+points[i].y+'px) ';
	}


function update()
{
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	deltaTime = dt/17;
	elapsed += t(1);
		
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
				
				document.getElementById("p"+i).style.webkitTransform = 
				'translateX('+p.x+'px) '+'translateY('+p.y+
				'px) translateZ(0px) rotateX('+p.rotX+'deg) rotateY('+p.rotY+'deg) rotate('+p.rot+'deg)';
			}
		}
		}
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
	id.multiplier = 10 + Math.random()*10;
			
	return id;
}
	
	