
/*************** { To Load at the end } **************/ 


/*
loadSoundToBank("sounds/ble.wav");
for (var i = 0; i <= 6; i++ )  loadSoundToBank("sounds/ble"+i+".wav");
loadSoundToBank("sounds/elguit.ogg");
loadSoundToBank("sounds/hat.ogg");
for (var i = 0; i <= 3; i++ )  loadSoundToBank("sounds/hit"+i+".wav");*/
//loadSoundToBank("sounds/metalHit.wav");

/*loadSoundToBank("sounds/kick.ogg");
loadSoundToBank("sounds/snare.ogg");
loadSoundToBank("sounds/hat.ogg");
loadSoundToBank("sounds/overh.ogg");
loadSoundToBank("sounds/strings.ogg");
loadSoundToBank("sounds/elguit.ogg");*/

loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/kick.ogg", 0);
loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/snare.ogg", 1);
loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/hat.ogg", 2);
loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/overh.ogg", 3);
loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/strings.ogg", 4);
loadSoundToBank("https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/sounds/elGuit.ogg", 5);


if (window.XMLHttpRequest)
{
	xmlhttp=new XMLHttpRequest();
}
else
{
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","https://dl.dropboxusercontent.com/u/36410575/html5Kompozytor/Example.xml",false);
xmlhttp.send();
console.log( xmlhttp.responseXML );
loadProjectXML( xmlhttp.responseXML, true );

/*
newProject();
samplers.push ( new sampler() );
samplers.push ( new sampler() );
samplers.push ( new sampler() );*/
