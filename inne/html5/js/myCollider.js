	var colliders = [];
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
