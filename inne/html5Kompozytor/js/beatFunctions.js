/******************** Hit Beat Functions ***********************/


function noteHit(n)
{
	switch(n)
	{
		case 32:
			
			samplers.forEach( function(sampler) { sampler.hit(); } );
			if ( noteHitCounter < 32 ) noteHitCounter ++; else noteHitCounter = 1;
			break;		
		
		case 0:
			songTact++;
			if ( songTact == songTacts ) songTact = 0;
			if ( songPlay == false ) songTact = 0;
			samplers.forEach( function(sampler) { sampler.setPattern(); } );
			
			size += .15;
			break;
			
		case 2:
			//samplers.forEach( function(sampler) { sampler.hit(); } );
			break;		
	
		case 4:
			size = 1.1; 
			break;	
			
		case 8:
			
			break;					
			
		case 16:
			
			break;		


	}
	
	
}

