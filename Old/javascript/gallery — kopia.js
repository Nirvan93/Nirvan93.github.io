/*function showImage(source)
{
	alert("test");
	$("#big img").src = images[i].src;
}

var images = $(".clickable").click(function(e)
{
  $("#big img").animate({opacity: 0.0},
                        250,
                        function()
						{
    $("#big img")[0].src = e.target.src.replace('/Thumb','');
    $("#big img").animate( {opacity: 1.0},250); 
	});
});

var galleryIndex = 1;

setTimeout(function()
{
	
  if(galleryIndex<7)
  {
    galleryIndex++;
  }
  else
  {
    galleryIndex = 1;
  }
  
  $(".clickable")[galleryIndex].trigger("click");
  
},100);

function showImage(source)
{
	$("#big img").src = images[i].src;
}

var images = $(".clickable").click(function(e)
{
  $("#big img").animate({opacity: 0.0},
                        250,
                        function()
						{
    $("#big img")[0].src = e.target.src.replace('/Thumb','');
    $("#big img").animate( {opacity: 1.0},250); 
	});
});
*/

var galleryIndex = 1;
var galleryBigSrc = "./beautyshots/DT";
var galerryThumbSrc = "./beautyshots/Thumb/DT";
var galleryLoader = false;

/*var urls;
for(var i = 0; i < $(".clickable").length; i++)
{
	urls += $(".clickable").attr("src");
}*/

//alert($(".clickable:nth-child("+galleryIndex+")").attr("src"));

/*
setTimeout( function()
{
	if ( galleryIndex < 7 )
	{
		galleryIndex++;
	}
	else
	{
		galleryIndex = 1;
	}

	$(".clickable")[galleryIndex].trigger("click");

},100);*/


$("#front").click(function(e)
{
	var backSrc = $("#back").attr("src");
	var imgNew = new Image;
	
	imgNew.src = galleryBigSrc + galleryIndex + ".jpg";
	var frontSrc = $("#front").attr("src");
	
	galleryLoader = true;
	
	if( galleryIndex < 7 )
	{
		galleryIndex++;
	}
	else 
	{
		galleryIndex = 1;
	}
	
	//setTimeout(function()
	//{
		if (galleryLoader) $(".GalleryContainer #loader").animate( {opacity: 1.0},350); 
	//},100);
	
	imgNew.onload = function()
	{
		GalleryTransition(imgNew, frontSrc, backSrc);
	}
});


var images = $(".clickable").click(function(e)
{
	galleryIndex = this.getAttribute("nr");
	
	var backSrc = $("#back").attr("src");
	var imgNew = new Image;
	
	imgNew.src = galleryBigSrc + galleryIndex + ".jpg";
	var frontSrc = $("#front").attr("src");
	
	galleryLoader = true;
	
	if (galleryLoader) $(".GalleryContainer #loader").animate( {opacity: 1.0},350); 
	
	imgNew.onload = function()
	{
		GalleryTransition(imgNew, frontSrc, backSrc);
	}
	
});

function GalleryTransition(imgNew, frontSrc, backSrc)
{
	galleryLoader = false;
	
	$(".GalleryContainer #loader").animate( {opacity: 0.0},250); 
	
	$("#front").attr("src", frontSrc);
	
	$("#front").animate({opacity:0.0},300,function()
	{
		$("#front").attr("src",backSrc);
		$("#front").css("opacity", "1.0");
		$("#back").attr("src", imgNew.src);
	});	
}



