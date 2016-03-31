$(document).ready(function () 
{
	var lgtbx = $('.lightbox-g').click(function () 
	{
        var windowHeight = window.innerHeight || $(window).height(),
            windowWidth = window.innerWidth || $(window).width();

		var lIndex = this.getAttribute("nr")+1;
		var lLength = lgtbx.length;
			
        // Create the overlay, append it to body and make it visible.
        $('<div id="overlay"></div>')
            .css('opacity', '0')
            .animate({'opacity': '0.5'}, 'slow').appendTo('body');

        // Create the lightbox container which shall contain the image
        $('<div id="lightbox"></div>').hide().appendTo('body');

        // Create img-element and add to #lightbox when loaded.
		var viewImg = 
		$('<img>')
            .attr('src', $(this).attr('src'))
            .css({
            'max-height': windowHeight-50,
                'max-width': windowWidth-70
        })
            .load(function () 
			{
            $('#lightbox')
                .css({
                'top': (windowHeight - $('#lightbox').height()) / 2,
                    'left': (windowWidth - $('#lightbox').width()) / 2
            })
                .fadeIn();
        })
            .appendTo('#lightbox');
			
		var t = $("<div id='lightboxClose'></div>").appendTo('#lightbox');
		
		t.click(function ()
		{
			$('#overlay, #lightbox').remove();
		});

        
        $('#overlay, #lightbox').click(function () 
		{
			var lastSrc = $('#lightbox').find('img').attr("src");
			
			if ( lIndex > 3/*lLength - 1*/ ) lIndex = 0;
			lIndex++;
			
			var newSrc = lastSrc.substr(0, lastSrc.length-5)+lIndex+".jpg";
			
			$('#lightbox').find('img').attr('src', newSrc);
        });

    });
	
	
	$(document).keyup(function(e) 
	{
		if (e.keyCode == 27) 
		{ 
			$('#overlay, #lightbox').remove();
		}
	});

	
	function ShowImage()
	{
		
	}

});