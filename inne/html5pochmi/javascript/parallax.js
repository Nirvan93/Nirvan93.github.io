function calcParallax(tileheight, speedratio, scrollposition) 
{
  //    by Brett Taylor http://inner.geek.nz/
  //    originally published at http://inner.geek.nz/javascript/parallax/
  //    usable under terms of CC-BY 3.0 licence
  //    http://creativecommons.org/licenses/by/3.0/
  return ((tileheight) - (Math.floor(scrollposition / speedratio) % (tileheight+1)));
}


window.onload = function() 
{
	move();
	window.onscroll = function() 
	{
		move();
	}
 
	function move()
	{
		//var posX = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : window.pageXOffset;
		var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;
		
		if ( posY < 1600 )
		{
			$("#par1").stop().animate({ top : (600+posY * 0.1) }, 0);
			$("#par1").stop().animate({ right : (-1050+posY * 0.95) }, 0);
		}
		
		if ( posY > 600 && posY < 2500 )
		{
			$("#par2").stop().animate({ top : (1500+posY * 0.1) }, 0);
			$("#par2").stop().animate({ left : (-1400+posY * 0.95) }, 0);
		}
		
		if ( posY > 1500 && posY < 3700 )
		{
			$("#par3").stop().animate({ top : (2500+posY * 0.1) }, 0);
			$("#par3").stop().animate({ right : (-2500+posY * 0.95) }, 0);
		}
		
		if ( posY > 1800 && posY < 4400 )
		{
			$("#par4").stop().animate({ top : (3300+posY * 0.1) }, 0);
			$("#par4").stop().animate({ left : (-2750+posY * 0.95) }, 0);
						console.log( "R: " + document.getElementById("par4").style.left );
			console.log( "T: " + document.getElementById("par4").style.top );
		}
		
		if ( posY > 3400 && posY < 6200 )
		{
			$("#par5").stop().animate({ top : (4200+posY * 0.1) }, 0);
			$("#par5").stop().animate({ right : (-4850+posY * 1.15) }, 0);
		}
		
		
		//var ground = document.getElementById('bcParallax');
		//var groundparallax = calcParallax(720, 10, posY);
		//ground.style.backgroundPosition = "0 " + groundparallax + "px"; 
		//ground.style.backgroundPosition = "0 " + posY/10 + "px"; 
	}
 
}