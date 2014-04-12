var NoiseMap = {
    ValueNoise: function(width, height, startOctave, endOctave, persistence, smoothAmount, seed, postprocess)
    {
    	var valueNoiseMap = new Float32Array(width * height);
    
    	// We're storing the random data samples in a quadtree
    	// octave 0 is the whole area
    	// octave 1 is the area divided by 4
    	// octave n is the previous octave with each area divided by 4
    	var startOctave = 3;
    	// Go to the pixel level. This algorithm assumes base 2 area
    	var endOctave = 7; //Math.log(width) / Math.log(2) - 2;
    
    	// We need 4 points to do bilinear interpolation from for the noise generation for each octave.
    	// This is the summation of Math.pow(2, i + 1) - Math.pow(2, i) + 1 which represents the
    	// number of corners per depth of a quadtree. So depth zero has 4 and depth one has 9.
    	var nodeCount = 1 / 3 * (3 * (endOctave + 1) + 3 * Math.pow(2, (endOctave + 1) + 2) + Math.pow(2, 2 * (endOctave + 1) + 2) - 4) -
    	                1 / 3 * (3 * startOctave + 3 * Math.pow(2, startOctaave + 2) + Math.pow(2, 2 * startOctave + 2) - 4);
    
    	var randomTree = new Float32Array(nodeCount);
    	for (var i = 0; i < randomTree.length; ++i)
    	{
    		randomTree[i] = Math.random();
    	}
    	// Make it tileable
    	for (var i = startOctave; i <= endOctave; ++i)
    	{
    		var octaveSize = Math.pow(2, i + 1) - Math.pow(2, i) + 1;
    		var indexOffset = 1 / 3 * (3 * i  + 3 * Math.pow(2, i + 2) + Math.pow(2, 2 * i + 2) - 4) -
    	                         1 / 3 * (3 * startOctave + 3 * Math.pow(2, startOctave + 2) + Math.pow(2, 2 * startOctave + 2) - 4);
    		for(var y = 0; y < octaveSize; ++y)
    		{
    			randomTree[indexOffset + y * octaveSize] = randomTree[indexOffset + y * octaveSize + octaveSize - 1];
    		}
    
    		for(var x = 0; x < octaveSize; ++x)
    		{
    			randomTree[indexOffset + x] = randomTree[indexOffset + (octaveSize - 1) * octaveSize + x];
    		}
    	}
    
    	for(var y = 0; y < height; ++y)
    	{
    		for(var x = 0; x < width; ++x)
    		{
    			valueNoiseMap[y * width + x] = 0;
    			for (var i = startOctave; i <= endOctave; ++i)
    			{
    				var cellSize = width / Math.pow(2, i);
    
    				var integerX = Math.floor(x / cellSize);
    				var integerY = Math.floor(y / cellSize);
    				var indexOffset = 1 / 3 * (3 * i  + 3 * Math.pow(2, i + 2) + Math.pow(2, 2 * i + 2) - 4) -
    				                  1 / 3 * (3 * startOctave + 3 * Math.pow(2, startOctave + 2) + Math.pow(2, 2 * startOctave + 2) - 4);
    		
    				
    				var fractionalX = (x - integerX * cellSize) / cellSize;
    				var fractionalY = (y - integerY * cellSize) / cellSize;
    				//Log(cellSize + " " + fractionalX + " " + fractionalY);
    				var octaveSize = Math.pow(2, i + 1) - Math.pow(2, i) + 1;
    				var i1 = this.Interpolate(randomTree[indexOffset + integerY * octaveSize + integerX],
    				                     randomTree[indexOffset + integerY * octaveSize + integerX + 1],
    				                     fractionalX);
    				var i2 = this.Interpolate(randomTree[indexOffset + (integerY + 1) * octaveSize + integerX],
    				                     randomTree[indexOffset + (integerY + 1) * octaveSize + integerX + 1],
    				                     fractionalX);
    
    				valueNoiseMap[y * width + x] += this.Interpolate(i1 , i2 , fractionalY) * Math.pow(persistence, i - startOctave);
    				// Smooth and then normalize at the very end
    			}
    		}
    	}
    
    	this.Smooth(width, height, valueNoiseMap, smoothAmount);
    
    	this.Normalize(width, height, valueNoiseMap, 0, 1);
    
    	if (postprocess)
    	{
    		postprocess(valueNoiseMap);
    	}
    
    	return valueNoiseMap;
    },
    
    Smooth: function(width, height, noise, amount)
    {
    	// Smooth
    	for (var i = 0; i < amount; ++i)
    	{
    		for (var y = 0; y < height; ++y)
    		{
    			for(var x = 0; x < width; ++x)
    			{
    				var xMinus1 = x == 0 ? width - 1 : x - 1;
    				var yMinus1 = y == 0 ? height - 1 : y - 1;
    				var xPlus1 = (x + 1) % width;
    				var yPlus1 = (y + 1) % height;
    				var corners = (noise[yMinus1 * width + xMinus1] + 
    				               noise[yMinus1 * width + xPlus1] + 
    				               noise[yPlus1 * width + xPlus1] + 
    				               noise[yPlus1 * width + xMinus1]) / 16.0;
    				var sides   = (noise[y * width + xMinus1] + 
    				               noise[y * width + xPlus1] + 
    				               noise[yMinus1 * width + x] + 
    				               noise[yPlus1 * width + x]) / 8.0;
    				var center  = noise[y * width + x] / 4.0;
    				noise[y * width + x] = corners + sides + center;
    			}
    		}
    	}
    },
    
    Normalize: function(width, height, noise, minimum, maximum)
    {
    	var min = Number.MAX_VALUE;
    	var max = -Number.MAX_VALUE;
    
    	// Calculate min and max range used to normalize with
    	for (var y = 0; y < height; ++y)
    	{
    		for(var x = 0; x < width; ++x)
    		{
    			min = Math.min(min, noise[y * width + x]);
    			max = Math.max(max, noise[y * width + x]);
    		}
    	}
    
    	// Normalize the range to 0 to 1
    	for (var y = 0; y < height; ++y)
    	{
    		for(var x = 0; x < width; ++x)
    		{
    			noise[y * width + x] = (noise[y * width + x] - min) / (max - min) * (maximum - minimum) + minimum;
    		}
    	}
    },
    
    Interpolate: function(a, b, x)
    {
    	var ft = x * 3.1415927;
    	var f = (1 - Math.cos(ft)) * 0.5;
    	return a * (1 - f) + b * f;
    },
};