var ctx = document.getElementById('loadStatus').getContext('2d');
var timer = 0;
var fade = false;

setInterval(function()
{
    if (!fade)
    {
        timer += .05;
        ctx.clearRect(0, 0, 80, 80); ctx.save();
        ctx.beginPath();
		
        ctx.arc(40, 40, 25 + Math.sin(timer) * 10, timer * 2.5, timer * Math.PI + timer, false);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#444';
		
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
	
	if ( timer > 3.5 ) fade = true;
}
, 1000/60);