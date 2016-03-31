
/* Gallery Controll script */

var galleryIndex = 1;
var galleryBigSrc = "./beautyshots/DT";
var galerryThumbSrc = "./beautyshots/Thumb/DT";
var galleryLoader = false;

var galleryLoaderCtx = document.getElementById('galleryLoader').getContext('2d');
var galleryLoaderTimer = 0;
var galleryAutoplay = false;
var galleryAutoplayTimeout;


$("#front").click(function(e)
{
	if( galleryIndex < 7 ) galleryIndex++; else galleryIndex = 0;
	GalleryTransition();
});


$("#galleryAutoplayButton").click(function(e)
{
	galleryAutoplay = !galleryAutoplay;
		
	if ( !galleryAutoplay )
	{
		this.innerHTML = "Play <div id='galleryPlay'><div/>";
		clearTimeout(galleryAutoplayTimeout);
	}
	else
	{
		this.innerHTML = "Stop <div id='galleryStop'><div/>";
		TimeOutAutoPlay();
	}
});


var images = $(".clickable").click(function(e)
{
	galleryIndex = this.getAttribute("nr");
	GalleryTransition();
});


function GalleryTransition()
{
	var backSrc = $("#back").attr("src");
	var imgNew = new Image;
	imgNew.src = galleryBigSrc + galleryIndex + ".jpg";
	
	var frontSrc = $("#front").attr("src");
	
	galleryLoader = true;
	galleryLoaderTimer = 0;
	
	setTimeout(function()
	{
		if ( galleryLoader ) $(".GalleryContainer #galleryLoader").animate( {opacity: 1.0},350);
	},50);
	
	imgNew.onload = function()
	{
		galleryLoader = false;
		
		$(".GalleryContainer #galleryLoader").animate( {opacity: 0.0},250); 
		
		$("#back").attr("src", imgNew.src);
		
		$("#front").animate({opacity:0.0},300,function()
		{
			$("#front").attr("src",imgNew.src);
			$("#front").css("opacity", "1.0");
			$("#back").attr("src", backSrc);
		});			
	}
}


setInterval(
function() 
{
	galleryLoaderTimer += .05;
	galleryLoaderCtx.clearRect(0, 0, 80, 80);
	galleryLoaderCtx.save();
	galleryLoaderCtx.beginPath();
			galleryLoaderCtx.arc(40, 40, 25 + Math.sin(galleryLoaderTimer)*10, galleryLoaderTimer*2.5, galleryLoaderTimer * Math.PI + galleryLoaderTimer, false);
			galleryLoaderCtx.lineWidth = 5;
			galleryLoaderCtx.strokeStyle = '#AAA';
			galleryLoaderCtx.stroke();
	galleryLoaderCtx.closePath();
	galleryLoaderCtx.restore();
}, 1000/60);


function TimeOutAutoPlay()
{
	if ( galleryAutoplay )
	{
		galleryAutoplayTimeout = setTimeout(function () 
		{
			if( galleryIndex < 7 ) galleryIndex++; else galleryIndex = 0;
			GalleryTransition();
			TimeOutAutoPlay();
		}, 4250);
	}
}