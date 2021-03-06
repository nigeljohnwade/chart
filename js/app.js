var data = [5,6,2,7,4,9,7,2,1,4,5,6,8,5,4,3,5,7,3,7,5,4,8,5,2,3,1,8];
var MaterialColors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue',
    'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime',
    'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey'];
var brewerColors = [
    '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
    '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
    '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
    ];  
var brewerShort = [
    '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928'
    ]
var brewerPastel = [
    '#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462',
    '#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']
var shuffledRandom = [
    ["#b2df8a", "#fb9a99", "#ffff99", "#cab2d6", "#a6cee3", "#fdbf6f", "#e31a1c", "#1f78b4", "#b15928", "#ff7f00", "#6a3d9a", "#33a02c"]
];
var brandColors = [
    '#48D5B5', '#21314d', '#FF585F', '#6e6e6e'
]

var colors = brewerColors;

function drawChart(){
    if(document.querySelector('#useJsArray').checked && document.querySelector('#jsArray').value.length > 0){
        colors = eval(document.querySelector('#jsArray').value);
        if(document.querySelector('#useRandom').checked){
            colors = shuffleArray(colors);
        }
        if(document.querySelector('#useExtend').checked){
            colors = extendPalette(colors, 0.3, 2);
        }
    }else if (document.querySelector('#useBrewer').checked){
        colors = brewerColors;
        if(document.querySelector('#useRandom').checked){
            colors = shuffleArray(colors);
        }
        if(document.querySelector('#useExtend').checked){
            colors = extendPalette(colors, 0.3, 2);
        }
    }else if (document.querySelector('#useBrewerPastel').checked){
        colors = brewerPastel;
        if(document.querySelector('#useRandom').checked){
            colors = shuffleArray(colors);
        }
        if(document.querySelector('#useExtend').checked){
            colors = extendPalette(colors, 0.3, 2);
        }
    }else if (document.querySelector('#useBrewerShort').checked){
        colors = brewerShort;
        if(document.querySelector('#useRandom').checked){
            colors = shuffleArray(colors);
        }
        if(document.querySelector('#useExtend').checked){
            colors = extendPalette(colors, 0.3, 2);
        }
    }else if (document.querySelector('#useBrand').checked){
        colors = brandColors;
        if(document.querySelector('#useRandom').checked){
            colors = shuffleArray(colors);
        }
        if(document.querySelector('#useExtend').checked){
            colors = extendPalette(colors, 0.3, 2);
        }
    }

    var _data = data.slice(0, colors.length),
        _lineData = [];
    for(var i = 0 ; i < colors.length ; i++){
        _lineData.push(shuffleArray(data));
    } 
    drawColumnChart(_data);
    drawPieChart(_data.slice(0, document.querySelector('#pieSliceMax').value));
    drawLineChart(_lineData.slice(0, document.querySelector('#linesmax').value));
    showCurrentPalette();
    printablePalette();
}
function drawColumnChart(data){
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    var y = d3.scale.linear()
        .range([height, 0]);

    var chart = d3.select("svg.column-chart")
        .attr("width", width)
        .attr("height", height)
        .html("");
        
    y.domain([0, d3.max(data)]);
    var barWidth = width / data.length;
    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + i * barWidth + ",0)"; 
        });
        
    bar.append("rect")
        .attr("y", function(d) { 
            return y(d); 
            })
        .attr("height", function(d) {
            return height - y(d); 
            })
        .attr("width", barWidth - 1)
        .attr("fill", function(d,i){
            return colors[i];
            }
        );
    
    setTimeout(function(){
        data.push(12); 
        console.log(_data);
        }, 2000);
}       
function drawLineChart(data){
    var width = 960,
        height = 500;

    var y = d3.scale.linear()
        .range([height, 0]);
    var x = d3.scale.linear()
        .range([0, width]);
    var chart = d3.select("svg.line-chart")
        .attr("width", width)
        .attr("height", height)
        .html("");
        
    y.domain([0, d3.max(data[0])]);
    x.domain([0, data[0].length])
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) {
            return x(i); 
        })
        .y(function(d, i) {
            return y(d); 
        });
     var city = chart.selectAll(".city")
        .data(data)
        .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d, i) { 
            return line(d); 
        })
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .style("stroke", function(d, i) {
            return colors[i]; 
        });
}
function drawPieChart(data){
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { 
            return d;
        });
    var chart = d3.select("svg.pie-chart")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = chart.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i) {
            return colors[i]; 
        });
}

var Storage = window.localStorage;
var myPalettes = {};
initPalettes();
console.log(myPalettes);
buildPalettes();

function shuffleArray(arrayToShuffle){
    var _tempArray = arrayToShuffle.slice(0),
        _returnArray = [];
    for (var i = 0 ; _tempArray.length > 0 ; i++){
        _elemNumber = Math.floor(Math.random() * _tempArray.length);
        _returnArray[i] = _tempArray.splice(_elemNumber,1)[0];
    }
    return _returnArray;
}
function extendPalette(palette, step, count){
    var _returnPalette = palette.slice(0);
    for(var j = 0 ; j < count ; j++){
        for(var i = 0 ; i < palette.length ; i++){
            _returnPalette.push(chroma.mix(palette[i], '#fff', step * (j + 1)).hex())
        }
    }
    /*for(var i = 0 ; i < palette.length ; i++){
        _returnPalette.push(chroma.mix(palette[i], '#fff', 0.6))
    }*/
    console.log(_returnPalette);
    return _returnPalette;
}
function initPalettes(){
    //test for stored palettes
    var storedPalettes = JSON.parse(Storage.getItem('MyPalettes'));
    if (storedPalettes && storedPalettes.palettes && storedPalettes.palettes.length > 0) {
        //stored palettes, retreive them
        retreivePalettes();
    }else if(!myPalettes.palettes){
        //no palettes, populate with brewer
        myPalettes = {palettes: [brewerColors]};
        storePalettes();
    }
    printablePalette();
}
function retreivePalettes(){
    myPalettes = JSON.parse(Storage.getItem('MyPalettes'));
}
function storePalette(){
    myPalettes.palettes.push(colors.slice(0));
    storePalettes();
}
function storePalettes(){
    Storage.setItem('MyPalettes', JSON.stringify(myPalettes));
    console.log(JSON.parse(Storage.getItem('MyPalettes')));
    buildPalettes();
}
function togglePalettes(){
    var _swatchContainer = document.querySelector('.swatchContainer');
    style = window.getComputedStyle(_swatchContainer),
    display = style.getPropertyValue('display');
    if(display === 'none'){
        _swatchContainer.setAttribute('style', 'display: block');
    }else{
        _swatchContainer.setAttribute('style', 'display: none');
    }
}
function buildPalettes(){
    var _swatchContainer = document.querySelector('.swatchContainer');
    _swatchContainer.innerHTML = "";
    retreivePalettes();
    if(myPalettes && myPalettes.palettes){
        for(var i = 0 ; i< myPalettes.palettes.length ; i ++){
            var _s = document.createElement('span');
            document.querySelector('.swatchContainer').appendChild(_s);
            var _current = myPalettes.palettes[i];
            for(var j = 0 ; j < _current.length ; j++){
                var _d = document.createElement('div');
                _d.setAttribute('class', 'swatch');
                _d.setAttribute('style', "background-color:" + _current[j]);
                document.querySelectorAll('.swatchContainer span')[i].appendChild(_d);
            }
        }
    }

}
function showCurrentPalette(){
    var _currentPaletteContainer = document.querySelector('.currentPaletteContainer');
    _currentPaletteContainer.innerHTML = "";
    var _s = document.createElement('span');
    document.querySelector('.currentPaletteContainer').appendChild(_s);
    for(var i = 0 ; i< colors.length ; i ++){
        var _d = document.createElement('div');
        _d.setAttribute('class', 'swatch');
        _d.setAttribute('style', "background-color:" + colors[i]);
        var _rgbString = "rgb(" + Math.round(chroma(colors[i]).rgb()[0]) + ', ' +  Math.round(chroma(colors[i]).rgb()[1]) + ', ' + Math.round(chroma(colors[i]).rgb()[2]) + ')';
        var _hslString = "hsl(" + (isNaN(Math.round(chroma(colors[i]).hsl()[0])) ? '0' : Math.round(chroma(colors[i]).hsl()[0]) ) + ', ' + Math.round(chroma(colors[i]).hsl()[1] * 100) + '%, ' + Math.round(chroma(colors[i]).hsl()[2] * 100) + '%)';
        var _hexString = chroma(colors[i]).hex();
        var _xmlString = '&lt;COLOR R="' + chroma(colors[i]).rgb()[0] + '" G="' + chroma(colors[i]).rgb()[1] + '" B="' + chroma(colors[i]).rgb()[2] + '" /&gt;';
        _d.innerHTML = '<p>' + _hexString + '</p><p>' + _rgbString + ' </p><p>' + _hslString + ' </p><p>' + _xmlString + '</p>';
        document.querySelector('.currentPaletteContainer span').appendChild(_d);
    }
}
function printablePalette(){
    var _paletteContainer = document.querySelector('.printablePaletteContainer .palette');
    _paletteContainer.innerHTML = "";
    for( var j = 0 ; j < 4 ; j++){
        var _l = document.createElement('ul');
        for(var i = 0 ; i< colors.length ; i ++){
            var _colorString;
            var _li = document.createElement('li');
            _li.setAttribute('class', 'swatch');
            _li.setAttribute('style', "background-color:" + colors[i]);
            switch(j){
                case 0:
                    _colorString = chroma(colors[i]).hex();
                    break;
                case 1:
                    _colorString = "rgb(" + Math.round(chroma(colors[i]).rgb()[0]) + ', ' +  Math.round(chroma(colors[i]).rgb()[1]) + ', ' + Math.round(chroma(colors[i]).rgb()[2]) +  ')';
                    break;
                case 2:
                    var _colorString = "hsl(" + (isNaN(Math.round(chroma(colors[i]).hsl()[0])) ? '0' : Math.round(chroma(colors[i]).hsl()[0]) ) + ', ' + Math.round(chroma(colors[i]).hsl()[1] * 100) + '%, ' + Math.round(chroma(colors[i]).hsl()[2] * 100) + '%)';
                    break;  
                case 3:
                    _colorString = '&ltCOLOR R="' + Math.round(chroma(colors[i]).rgb()[0]) + '" G="' +  Math.round(chroma(colors[i]).rgb()[1]) + '" B="' + Math.round(chroma(colors[i]).rgb()[2]) +  '" A="255" /&gt;';
                    break;                            
            }
            _li.innerHTML = '<p>' + _colorString + '</p>';
            _l.appendChild(_li);
        }
        _paletteContainer.appendChild(_l);        
    }
}
function togglePrintablePalette(){
    var _printablePaletteContainer = document.querySelector('.printablePaletteContainer');
    style = window.getComputedStyle(_printablePaletteContainer),
    display = style.getPropertyValue('display');
    if(display === 'none'){
        _printablePaletteContainer.setAttribute('style', 'display: block');
    }else{
        _printablePaletteContainer.setAttribute('style', 'display: none');
        printablePalette();
    }
}
function clearPalettes(){
    myPalettes = {palettes: []};
    Storage.setItem('MyPalettes', JSON.stringify(myPalettes));
    buildPalettes();
}