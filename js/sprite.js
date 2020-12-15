(function() 
{
  function LoaderProxy() 
  {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null
    };
  }
  
  function Sprite(image, originX, originY, width, height) 
  {
    //originX = originX || 0;
    //originY = originY || 0;
    width = width || image.width;
    height = height || image.height;
	  
	  
    return {
      draw: function(canvas, x, y, angle, scaleX, scaleY) 
	  {
		scaleX = scaleX || 1;
		scaleY = scaleY || 1;
		angle = angle || 0;
		
		canvas.save();
		canvas.translate(x,y);
		canvas.rotate( (Math.PI / 180) * angle );
		canvas.scale(scaleX, scaleY);
		
        canvas.drawImage(
          image,
          0,
          0,
          width,
          height,
          0,
          0,
          width,
          height );
		
		canvas.restore();
      },
	  
      
      fill: function(canvas, x, y, width, height, repeat) {
        repeat = repeat || "repeat";
        var pattern = canvas.createPattern(image, repeat);
        canvas.fillColor(pattern);
        canvas.fillRect(x, y, width, height);
      },
      
      width: width,
      height: height
    };
  };
  
  Sprite.load = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();
    
    img.onload = function() {
      var tile = Sprite(this);
      
      $.extend(proxy, tile);
      
      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };
    
    img.src = url;
    
    return proxy;
  };
 
  var spriteImagePath = "img/";

  window.Sprite = function(name, callback) {
    return Sprite.load(spriteImagePath + name + ".png", callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;
}());
