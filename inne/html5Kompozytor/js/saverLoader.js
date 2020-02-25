
/*************** { Loading and Generating and Saving Files } **************/ 

//uriContent = "data:application/octet-stream," + encodeURIComponent(content);
//newWindow=window.open(uriContent, 'My Song');


function download(filename, text) 
{
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
	

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


function SaveToDisk(blobURL, fileName) 
{
    var reader = new FileReader();
    reader.readAsDataURL(blobURL);
    reader.onload = function (event) 
	{
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = fileName || 'unknown file';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
}


function saveProject()
{
	var name = songName;
	var save = "";
	var _t = "	";
	
	// Song global settings
	
	save += "<song name='"+name+"' bpm='"+bpm+"' tacts='"+songTacts+"'>\n\n";
	
	// Saving Samplers
	
	save += "	<samplers>";
	
	for( var i = 0; i < samplers.length; i++ )
	{
		// Sampler Head
		save += "\n";
		save += "		<sampler name='" + samplers[i].name + "' x='" + samplers[i].x + "' y='" + samplers[i].y + "' volume='" + samplers[i].volume + "' cutItSelf='" + samplers[i].cutItSelf + "' cutSound='" + samplers[i].cutSound + "' sound='" + samplers[i].sound + "' soundNr='" + samplers[i].soundNr + "'>\n";
		
		
		// Sampler Patterns
		save += "		<patterns>\n";
		for( var p = 0; p < samplers[i].patterns.length; p++ )
		{
			save += "			<pattern id='"+samplers[i].patterns[p].id+"' name='"+samplers[i].patterns[p].name+"'>\n";
			
			for ( var n = 0; n < samplers[i].patterns[p].notes.length; n++ )
			{
				save += "				<note start='"+samplers[i].patterns[p].notes[n].start+"' value='"+samplers[i].patterns[p].notes[n].value+"' duration='" + samplers[i].patterns[p].notes[n].duration + "'/>\n";
			}
			
			save += "			</pattern>\n";
		}
		save += "		</patterns>\n";	
		
		
		// Sampler Playlist
		save += "		<playlist>\n";
		
		for( var p = 0; p < samplers[i].playlist.length; p++ )
		{
			save += "			<tact tact='"+p+"' pattern='"+samplers[i].playlist[p]+"'/>\n";
		}
		
		save += "		</playlist>\n";	
		
		save += "		</sampler>\n\n";
	}
	
	save += "	</samplers>\n\n";
	
	// Full Sound Bank
	
	save += "	<soundBank>\n";
	
	for( var i = 6; i < sounds.length; i++ )
	{
		if ( sounds[i].type == "url" )
			save += "		<sound id='"+sounds[i].id+"' path='"+sounds[i].path+"'/>\n";
	}
	
	save += "	</soundBank>\n"
	
	//Finalizing
	save += "</song>";
	
	download( name+".xml", save );
	
	//download( name+".xml", save );
}


function loadProjectFile( doc )
{
	newProject();
	var sou = doc.getElementsByTagName("sound");
	// < soundBank > < sound ... > ...
	for( var i = 0; i < sou.length; i++ )
	{
		loadSoundToBank( sou[i].attributes[1].value, sou[i].attributes[0].value );
	}
	

	var songa = doc.getElementsByTagName("song")[0].attributes;
	
	name = songa[0].value;
	bpm = songa[1].value;
	songTacts = songa[2].value;
	
	var sampl = doc.getElementsByTagName("sampler");		
	// < samplers > < sampler ... > ...
	for( var i = 0; i < sampl.length; i++ )
	{
		var attr = sampl[i].attributes;
		
		samplers.push( new sampler( attr[1].value*1.0, attr[2].value*1.0 ) );
		//samplers.push( new sampler() );
		
		var sam = samplers[ samplers.length -1 ];
		
		sam.name = attr[0].value;
		sam.volume = attr[3].value;
		sam.cutItSelf = (!attr[4].value);
		sam.cutSound = attr[5].value;
		
		if ( attr[6].value < 6 )
			sam.sound = attr[6].value; 
		else
		{
			// Miejsce na wczytywanie samplera z dzwiekiem jesli byl dodany poprzez url
			for( var l = 6; l < sounds.length; l++ )
				if ( sounds[l].id == attr[6].value ) { sam.sound = l; break; }
		}
		
		sam.soundNr = attr[7].value;
		
		// <pattern ... > ...
		var patt = sampl[i].children[0].children;
		
		for( var p = 0; p < patt.length; p++ )
		{
			if ( p > 0 ) addPattern( sam.patterns );
			
			sam.patterns[p].id = patt[p].attributes[0].value;
			sam.patterns[p].name = patt[p].attributes[1].value;
			
			// <notes ... > ...
			for( var n = 0; n < patt[p].children.length; n++ )
			{
				var nota = patt[p].children[n].attributes;
				addNote( sam.patterns[p], nota[0].value, nota[1].value, nota[2].value );
			}
		}
		
		// <playlist ... > ...
		var pla = sampl[i].children[1].children;
		
		for( var p = 0; p < pla.length; p++ )
		{
			var plaa = pla[p].attributes;
			addToPlaylist( sam.playlist, plaa[0].value, plaa[1].value );
		}
	}
}		


function loadProjectXML( file, url )
{
	console.log(file);
	
	if ( url ) loadProjectFile( file )
	else
	{
		var reader = new FileReader();
		
		reader.onload = function() 
		{
			var doc = loadXMLString( this.result );
			loadProjectFile( doc )
		}
		
		reader.readAsText( file, "UTF-8" );
	}
}


function loadXMLString(txt) 
{
	
	if (window.DOMParser)
	{
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(txt,"text/xml");
	}
	else // code for IE
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(txt); 
	}
	
	return xmlDoc;
}
