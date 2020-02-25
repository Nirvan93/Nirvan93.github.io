$(document).ready(function() 
{
			var canvas = document.getElementById('cSklad0');
			var ctx = [];
			for (var i = 0; i < 6; i++) ctx[i] = document.getElementById('cSklad'+i).getContext('2d');
			
			var width = canvas.width;
			var height = canvas.height;
			
			var lastUpdate = Date.now();
			var deltaTime = 1;
			var FPS = 60;

			var time = [];
			var counter = [];
			var enter = [];
			var alphas = [];
			var images = [];
			var randoms = [];
			
			for (var i = 0; i < ctx.length; i++)
			{
				time[i] = -1.2;
				alphas[i] = 0;
				counter[i] = 255;
				enter[i] = false;
				randoms[i] = [];
				images[i] = new Image(); images[i].src = "img/sklad"+i+".png";
			}
			
			var borders = [];
			borders[0] = new Image(); borders[0].src = "img/ram0.png";
			borders[1] = new Image(); borders[1].src = "img/ram1.png";
			
			texts = [];
			texts[0] = "Fylyp:#Wódz plemienia GRIPów. Można się do niego zwracać#per 'Panie Pipipie', lecz na takie pozwolenie trzeba sobie zasłużyć i do tej pory#tylko nieliczni są godni tego by moc sie tak do niego zwracać.";
			texts[1] = "Colin:#askhf kja shkfj kejnkn cknk snckk alsncasd dasdsakln#asdas dsad asd asdsa dsa asdasdsadsa dasdasdsad as das as sad asd as   sadas das#sadsadsa asd asdasdsa ads asd asd  g t hytjhytjjytj  tytjyt jt.";
			texts[2] = "Plastuś:#askhf kja shkfj kejnkn cknk snckk alsncasd dasdsakln#asdas dsad asd asdsa dsa asdasdsadsa dasdasdsad as das as sad asd as   sadas das#sadsadsa asd asdasdsa ads asd asd  g t hytjhytjjytj  tytjyt jt.";
			texts[3] = "Wojtek:#askhf kja shkfj kejnkn cknk snckk alsncasd dasdsakln#asdas dsad asd asdsa dsa asdasdsadsa dasdasdsad as das as sad asd as   sadas das#sadsadsa asd asdasdsa ads asd asd  g t hytjhytjjytj  tytjyt jt.";
			texts[4] = "Małpa:#askhf kja shkfj kejnkn cknk snckk alsncasd dasdsakln#asdas dsad asd asdsa dsa asdasdsadsa dasdasdsad as das as sad asd as   sadas das#sadsadsa asd asdasdsa ads asd asd  g t hytjhytjjytj  tytjyt jt.";
			texts[5] = "Młody:#askhf kja shkfj kejnkn cknk snckk alsncasd dasdsakln#asdas dsad asd asdsa dsa asdasdsadsa dasdasdsad as das as sad asd as   sadas das#sadsadsa asd asdasdsa ads asd asd  g t hytjhytjjytj  tytjyt jt.";
			
			for(var i = 0; i < texts.length; i++)
				for (var j = 0; j < texts[i].length; j++) randoms[i][j] = Math.random();
				
				
			setInterval(
			function() 
			{
				  draw();
			}, 1000/FPS);
			
			
			function draw() 
			{
				var now = Date.now();
				var dt = now - lastUpdate;
				lastUpdate = now;
				deltaTime = dt/17;
			
				for(var c = 0; c < ctx.length; c++)
				{	
					ctx[c].clearRect(0, 0, width, height);
					ctx[c].font="bold 15px Verdana";
					
					ctx[c].shadowColor = "rgba(0,0,0,0)";
					ctx[c].shadowBlur = 0;
					ctx[c].shadowOffsetX = 0;
					ctx[c].shadowOffsetY = 0;
					
					ctx[c].drawImage(images[c],0,0);
					
					ctx[c].fillStyle = "rgba(0,0,0,"+alphas[c]+")";
					ctx[c].fillRect(0,0,width,height);
					
					ctx[c].save();
						ctx[c].globalAlpha = alphas[c]*3;
						ctx[c].drawImage(borders[1],0,0);
						
						ctx[c].globalAlpha = 1-alphas[c]*3;
						ctx[c].drawImage(borders[0],0,0);
					ctx[c].restore();
					
					/*
					ctx[c].fillStyle = "rgba(0,0,0,"+(0.25-counter[c]/500).toString()+")";
					ctx[c].fillRect(0,0,width,height);
					
					ctx[c].strokeStyle= "rgba(255,"+counter[c]+","+counter[c]+",1)";
					ctx[c].lineWidth = 12;
					ctx[c].rect(0,0,width,height);
					ctx[c].stroke();*/
				
					if ( enter[c] )
					{
						if ( time[c] < 1.58 ) time[c] += t(.035);
						if ( counter[c] >= 15 ) counter[c]-=15;
						if ( alphas[c] < .3 ) alphas[c] += t(.025);
					}
					else
					{
						if ( time[c] > -1.2 ) time[c] -= t(.05);
						if ( counter[c] <= 240 ) counter[c]+=15;
						if ( alphas[c] > 0.05 ) alphas[c] -= t(.025); else alphas[c] = 0;
					}
					
					if ( time[c] < -1 ) continue;
					
					ctx[c].shadowColor="rgba(0,0,0,+"+1+")";
					ctx[c].shadowOffsetX = 1;
					ctx[c].shadowOffsetY = 1;
					ctx[c].shadowBlur = 6;
					
					var tx = 10, ty = 10, lastLineSign = 0, letterSpace = 0, toMeasure = "", vSpace = 17, line = 1;
					
					for(var i = 0; i < texts[c].length; i++)
					{
						toMeasure += texts[c][i];
						if ( ( ctx[c].measureText(toMeasure).width > 90 && texts[c][i] == ' ' ) || texts[c][i] == '#' )
						{ 
							if ( line == 1 ) ty += 10;
							lastLineSign = i;
							toMeasure = "";
							line++;
							texts[c].slice(i,1);
							continue;
						}
						
						//letterSpace += ctx[c].measureText( text[i] ).width*1.5;
						
						var minn = Math.min( randoms[c][i] + time[c] + i / (texts[c].length*3) ,1.58);
						
						ctx[c].fillStyle = "rgba(255, 255, 255, " + minn + ")";
						
						switch(c)
						{
							case 0:
								ctx[c].fillText(texts[c][i],
									tx + letterSpace + ( i  - lastLineSign ) * 10,
									ty + Math.sin( minn ) * vSpace * line 
									);
								break;
							case 2:
								ctx[c].fillText(texts[c][i],
									tx - 150 + Math.sin( minn ) * 150 + letterSpace + ( i  - lastLineSign ) * 10,
									ty + vSpace * line 
									);	
								break;
								
								
							case 3:
								ctx[c].fillText(texts[c][i],
									tx - 150 + Math.sin( minn ) * 150 + letterSpace + ( i  - lastLineSign ) * 10,
									ty + Math.sin( minn ) * vSpace * line 
									);
								break;
							
							case 4:
								ctx[c].fillText(texts[c][i],
									tx - 150 + Math.sin( minn ) * 150 + letterSpace + ( i  - lastLineSign ) * 10,
									ty + vSpace * line + Math.sin( minn*4 ) * 6
									);	
								break;
								
							case 5:
								ctx[c].fillText(texts[c][i],
									tx - 140 - Math.cos( minn*4 ) * 8 + Math.sin( minn ) * 150 + letterSpace + ( i  - lastLineSign ) * 10,
									ty + vSpace * line + Math.sin( minn*8 ) * 15
									);	
								break;
								
								
							default:
								ctx[c].fillText(texts[c][i],
									tx - Math.sin( minn ) * letterSpace + ( i  - lastLineSign ) * 10,
									ty + vSpace * line 
									);	
								break;
								
						}
					}
				}
				
			}
			
			function t(a)
			{
				return a * deltaTime;
			}
			
			//for ( var c = 0; c < ctx.length; c++ )
			{
				$( "#cSklad0" ).mouseover(function() { enter[0] = true; });
				$( "#cSklad0" ).mouseleave(function() { enter[0] = false; });
				$( "#cSklad1" ).mouseover(function() { enter[1] = true; });
				$( "#cSklad1" ).mouseleave(function() { enter[1] = false; });
				$( "#cSklad2" ).mouseover(function() { enter[2] = true; });
				$( "#cSklad2" ).mouseleave(function() { enter[2] = false; });
				$( "#cSklad3" ).mouseover(function() { enter[3] = true; });
				$( "#cSklad3" ).mouseleave(function() { enter[3] = false; });
				$( "#cSklad4" ).mouseover(function() { enter[4] = true; });
				$( "#cSklad4" ).mouseleave(function() { enter[4] = false; });
				$( "#cSklad5" ).mouseover(function() { enter[5] = true; });
				$( "#cSklad5" ).mouseleave(function() { enter[5] = false; });
			}
});