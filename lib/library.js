

Array.prototype.sort		= function() 	{var tmp; for(var i = 0; i < this.length; i++) {for(var j = 0; j < this.length; j++) {if(this[i] < this[j]) {tmp = this[i]; this[i] = this[j]; this[j] = tmp}}}}
Array.prototype.shuffle	 	= function() 	{var i = this.length, j, t; while(i--) {j = Math.floor((i + 1) * Math.random()); t = arr[i]; arr[i] = arr[j]; arr[j] = t}}
Array.prototype.unshift	 	= function(el)	{this[this.length] = null; for(var i = 1; i < this.length; i++) {this[i] = this[i-1]}; this[0] = el; return this.length}
Array.prototype.shift	 	= function() 	{var result = this[0]; for(var i = 1; i < this.length; i++) {this[i-1] = this[i]}; this.length = this.length-1; return result}
Array.prototype.clear	 	= function() 	{this.length = 0}
Array.prototype.unique		= function() 	{var a = [],i; this.sort(); for(i = 0; i < this.length; i++) {if(this[i] !== this[i + 1]) {a[a.length] = this[i]}}; return a}
Array.prototype.lastIndexOf = function(n)	{var i = this.length; while(i--) {if(this[i] === n) {return i}}; return -1}
Array.prototype.contains	= function(el) 	{for (var i = 0; i < this.length; i++) {if (this[i] == el) {return true}}; return false}
Array.prototype.remove		= function(el) 	{var i = 0; while (i < this.length) {if (this[i] == el) {this.splice(i, 1)} else {i++}}}
Array.prototype.inArray		= function(val) {for (var i = 0; i < this.length; i++) {if (this[i] === val) {return true}}; return false}
Array.prototype.append		= function(el) 	{this.push(el); return this.length}
Array.prototype.chunk 		= function(arr, n) {var result = []; for (i = 0; i < arr.length; i += n) {result.push(arr.slice(i, i+n))} return result}
Array.prototype.sum 		= function()	{var sum = 0; for (i in this) {sum += parseInt(this[i])}; return sum}
Array.prototype.ave 		= function() 	{return this.sum()/this.length}
Array.prototype.dev = function()
{
	var mean = comp_ave(this)
	var dev = 0
	for (i in this) {this[i] = (this[i] - mean)}
	for (i in this) {this[i] = (this[i] * this[i])}
	for (i in this) {dev += this[i]}
	dev /= (this.length-1)
	dev = Math.sqrt(dev)
	return dev
}



function canvas()
{
	canvas = document.getElementById('pane')
	cheight = canvas.height
	cwidth = canvas.width
	c = canvas.getContext('2d')
	return c
}
function c()				{return $("canvas")[0].getContext("2d")}
function clear() {this.c.clearRect(0, 0, this.width, this.height)}
function origin() {return {hx: $("canvas").width()/2, hy: $("canvas").height()/2}}
function grid()
{
	c.strokeStyle = "rgba(0, 0, 255, 1)"
	c.lineWidth = 1
	for (var i = 0; i <= 20; i++)	 {c.beginPath(); c.moveTo(i*50, 0); c.lineTo(i*50, 1000); c.stroke()}
	for (var j = 0; j <= 20; j++)	 {c.beginPath(); c.moveTo(0, j*50); c.lineTo(1000, j*50); c.stroke()}

	c.beginPath()
	c.lineWidth = 4
	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.moveTo(0, 500)
	c.lineTo(1000, 500)
	c.stroke()

	c.beginPath()
	c.lineWidth = 4
	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.moveTo(500, 0)
	c.lineTo(500, 1000)
	c.stroke()

	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.lineWidth = 4
	for (var i = 0; i <= 20; i++)	 {c.beginPath(); c.moveTo(i*50, 490); c.lineTo(i*50, 510); c.stroke()}
	for (var j = 0; j <= 20; j++)	 {c.beginPath(); c.moveTo(490, j*50); c.lineTo(510, j*50); c.stroke()}
}
function redraw(i)
{
	clear()
	draw()
}

function drawline(c, x1, y1, x2, y2, color)
{
	c.beginPath()
	c.moveTo(x1, y1)
	c.lineTo(x2, y2)
	c.fillStyle = color
	c.stroke()
}
function line(m, b, s)
{
	for (var i = -400; i <= 400; i++)
	{
		circle(canvas.width/2+(i*1.25), canvas.height/2-((i*m+b)*1.25), 1, s, s)
	}
}

function piesection(a, b, color)
{
	c.beginPath()
	c.arc(150,150,150,a,b,false)
	c.fillStyle = color
	c.lineTo(150,150)
	c.fill()
}
function circle(x, y, r, w, s, f, l)
{
	c.beginPath()
	c.arc(x, y, r, Math.PI, -Math.PI, false)
	c.lineWidth = w
	if (s != '') {c.strokeStyle = s; c.stroke()}
	if (f != '') {c.fillStyle = f; c.fill()}
	c.closePath()
	if (l != '') {label(l, x, y)}
}

function label(l, x, y)
{
	c.font = "10pt Calibri"
	c.fillStyle = "rgba(0, 0, 0, 1)"
	c.textAlign = "center";
	c.textBaseline = "middle";
	c.fillText(l, x, y)
}

function pretty(x, y)
{
	circle(x-100, y, 100, 5, "", 'rgba(250, 0, 0, 0.5)');
	circle(x, y-100, 100, 5, "", 'rgba(0, 0, 0, 0.5)');
	circle(x, y+100, 100, 5, "", 'rgba(0, 250, 0, 0.5)');
	circle(x+100, y, 100, 5, "", 'rgba(0, 0, 250, 0.5)');
	circle(x-70, y-70, 100, 5, "", 'rgba(250, 0, 250, 0.5)');
	circle(x+70, y+70, 100, 5, "", 'rgba(250, 250, 0, 0.5)');
	circle(x-70, y+70, 100, 5, "", 'rgba(0, 250, 250, 0.5)');
	circle(x+70, y-70, 100, 5, "", 'rgba(250, 250, 250, 0.5)');

	circle(x-100, y, 100, 5, "black");
	circle(x, y-100, 100, 5, "black");
	circle(x, y+100, 100, 5, "black");
	circle(x+100, y, 100, 5, "black");
	circle(x-70, y-70, 100, 5, "black");
	circle(x-70, y+70, 100, 5, "black");
	circle(x+70, y-70, 100, 5, "black");
	circle(x+70, y+70, 100, 5, "black");
}


function rectangle(x, y, dx, dy, s, f, l)
{
	c.beginPath()
	if (s != '')
	{
		c.strokeStyle = s
		c.stroke()
	}
	if (f != '')
	{
		c.fillStyle = f
		c.fill()
	}
	c.fillRect(x, y, dx, dy)
	if (l != '')
	{
		label(l, x, y)
	}
	c.closePath()
}


function square(x, y, e, w, s, f)
{
	if (s == "")
	{
		s = 'rgba(0, 0, 0, 0)'
	}
	c.beginPath()
	c.rect(x, y, e, e)
	c.lineWidth = w
	c.strokeStyle = s
	c.stroke()
	if (f)
	{
		c.fillStyle = f
		c.fillRect(x, y, e, e)
	}
}

function parabola(a, b, c, s)
{
	for (var i = -400; i <= 400; i++)
	{
		x = i*1.25
		y = (((a/8)*Math.pow(i, 2))+(b*i)+c)*1.25
		circle(canvas.width/2+(x), canvas.height/2-(y), 1, s, s)
	}
}

function dot(c)
{
	c.save()
	c.fillStyle = "black"
	c.fillRect(-2, -2, 4, 4)
	// c.fillRect(x-3, y-18, 4, 4)
	c.restore()
}

function bowtied(c)
{
	c.fillRect(25, 25, 100, 100)
	c.clearRect(45, 45, 60, 60)
	c.strokeRect(50, 50, 50, 50)
}
function drawBowties(c)
{
	c.translate(45, 45)

	c.save()
	drawBowtie(c, "red")
	dot(c)
	c.restore()

	c.save()
	c.translate(85, 0)
	c.rotate(45 * Math.PI / 180)
	drawBowtie(c, "green")
	dot(c)
	c.restore()

	c.save()
	c.translate(0, 85)
	c.rotate(135 * Math.PI / 180)
	drawBowtie(c, "blue")
	dot(c)
	c.restore()

	c.save()
	c.translate(85, 85)
	c.rotate(90 * Math.PI / 180)
	drawBowtie(c, "yellow")
	dot(c)
	c.restore()
}
function drawBowtie(c, color)
{
	c.fillStyle = "rgba(200, 200, 200, 0.3)"
	c.fillRect(-30, -30, 60, 60)

	c.fillStyle = color
	c.globalAlpha = 1.0
	c.beginPath()
	c.moveTo(25, 25)
	c.lineTo(-25, -25)
	c.lineTo(25, -25)
	c.lineTo(-25, 25)
	c.closePath()
	c.fill()
}


function roundedRect(x, y, w, h, r)
{
	c.beginPath()
	c.moveTo(x, y+r)
	c.lineTo(x, y+h-r)
	c.quadraticCurveTo(x, y+h, x+r, y+h)
	c.lineTo(x+w-r, y+h)
	c.quadraticCurveTo(x+w, y+h, x+w, y+h-r)
	c.lineTo(x+w, y+r)
	c.quadraticCurveTo(x+w, y, x+w-r, y)
	c.lineTo(x+r, y)
	c.quadraticCurveTo(x, y, x, y+r)
	c.stroke()
}
function smiley(x, y, r)
{

	c.beginPath()
	c.arc(x,y,r/2,0,Math.PI*2,true)			 //	 Outer circle
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x,y+r/10,r/4,0,Math.PI,false)	 //	 Mouth (clockwise)
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x-r/5,y-r/8,r/10,0,Math.PI*2,true)	//	 Left eye
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x+r/5,y-r/8,r/10,0,Math.PI*2,true)	//	 Right eye
	c.stroke()
	c.closePath()
}



function triangle()
{
	c.beginPath()
	c.moveTo(25,25)
	c.lineTo(105,25)
	c.lineTo(25,105)
	c.fill()

	c.beginPath()
	c.moveTo(125,125)
	c.lineTo(125,45)
	c.lineTo(45,125)
	c.closePath()
	c.stroke()
}
function arcs()
{
	for (i = 0; i < 4; i++)
	{
		for(j = 0; j < 3; j++)
		{
			c.beginPath()
			var x					 = 25 + j * 50							 // x coordinate
			var y					 = 25 + i * 50							 // y coordinate
			var r					 = 20												// Arc r
			var startAngle	= 0												 // Starting point on circle
			var endAngle		= Math.PI + (Math.PI*j)/2	 // End point on circle
			var clockwise	 = i % 2 == 0 ? false : true // clockwise or anticlockwise

			c.arc(x, y, r, startAngle, endAngle, clockwise)

			if (i > 1)	{c.fill()}
			else				{c.stroke()}
		}
	}
}
function speechbubble()
{
	c.beginPath()
	c.moveTo(75, 25)
	c.quadraticCurveTo(25, 25, 25, 62.5)
	c.quadraticCurveTo(25, 100, 50, 100)
	c.quadraticCurveTo(50, 120, 30, 125)
	c.quadraticCurveTo(60, 120, 65, 100)
	c.quadraticCurveTo(125, 100, 125, 62.5)
	c.quadraticCurveTo(125, 25, 75, 25)
	c.stroke()
}
function heart()
{
	c.beginPath()
	c.moveTo(75, 40)
	c.bezierCurveTo(75, 37, 70, 25, 50, 25)
	c.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5)
	c.bezierCurveTo(20, 80, 40, 102, 75, 120)
	c.bezierCurveTo(110, 102, 130, 80, 130, 62.5)
	c.bezierCurveTo(130, 62.5, 130, 25, 100, 25)
	c.bezierCurveTo(85, 25, 75, 37, 75, 40)
	c.fill()
}
function pacman()
{
	roundedRect(c, 12, 12, 150, 150, 15)
	roundedRect(c, 19, 19, 150, 150, 9)
	roundedRect(c, 53, 53, 49, 33, 10)
	roundedRect(c, 53, 119, 49, 16, 6)
	roundedRect(c, 135, 53, 49, 33, 10)
	roundedRect(c, 135, 119, 25, 49, 10)

	// Character 1
	c.beginPath()
	c.arc(37, 37, 13, Math.PI/7, -Math.PI/7, false)
	c.fillStyle = "gold"
	c.lineTo(34, 37)
	c.fill()
	c.fillStyle = "black"

	// blocks
	for(i = 0; i < 8; i++) {c.fillRect(51+i*16, 35, 4, 4)}
	for(i = 0; i < 6; i++) {c.fillRect(115, 51+i*16, 4, 4)}
	for(i = 0; i < 8; i++) {c.fillRect(51+i*16, 99, 4, 4)}

	// character 2
	c.beginPath()
	c.moveTo(83, 116)
	c.lineTo(83, 102)
	c.fillStyle = "green"
	c.bezierCurveTo(83, 94, 89, 88, 97, 88)
	c.bezierCurveTo(105, 88, 111, 94, 111, 102)
	c.lineTo(111, 116)
	c.lineTo(106.333, 111.333)
	c.lineTo(101.666, 116)
	c.lineTo(97, 111.333)
	c.lineTo(92.333, 116)
	c.lineTo(87.666, 111.333)
	c.lineTo(83, 116)
	c.fill()
	c.fillStyle = "white"
	c.beginPath()
	c.moveTo(91, 96)
	c.bezierCurveTo(88, 96, 87, 99, 87, 101)
	c.bezierCurveTo(87, 103, 88, 106, 91, 106)
	c.bezierCurveTo(94, 106, 95, 103, 95, 101)
	c.bezierCurveTo(95, 99, 94, 96, 91, 96)
	c.moveTo(103, 96)
	c.bezierCurveTo(100, 96, 99, 99, 99, 101)
	c.bezierCurveTo(99, 103, 100, 106, 103, 106)
	c.bezierCurveTo(106, 106, 107, 103, 107, 101)
	c.bezierCurveTo(107, 99, 106, 96, 103, 96)
	c.fill()
	c.fillStyle = "blue"
	c.beginPath()
	c.arc(101, 102, 2, 0, Math.PI*2, true)
	c.fill()
	c.beginPath()
	c.arc(89, 102, 2, 0, Math.PI*2, true)
	c.fill()
}







function colorFormat(r, g, b, a)
{
	if (r > 255) {r = 255}
	if (g > 255) {g = 255}
	if (b > 255) {b = 255}

	var color = "rgba("+r+", "+g+", "+b+", "+a+")"
	$("title").html(color)
	return color
}

function colorChooser()
{
	var c1 = Math.round(parseInt($("#d1").slider("value")))
	var c2 = Math.round(parseInt($("#d2").slider("value")))
	var c3 = Math.round(parseInt($("#d3").slider("value")))
	var v	= (c1 + c2 + c3) / 12 - .25

	var r = Math.round(510 * (1 - v))
	var g = Math.round(510 * v)

	var color = colorFormat(r, g, 0, .75)

	return color
}

function Color(r, g, b, a)
{
	if (!a) {a = 1}

	this.r = r
	this.g = g
	this.b = b
	this.a = a


	this.rgb = function()
	{
		return "rgb("+this.r+", "+this.g+", "+this.b+")"
	}

	this.rgba = function()
	{
		return "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"
	}

	this.rgb2hex = function(r, g, b)
	{
		var hex = [r.toString(16), g.toString(16), b.toString(16)]
		$.each(hex, function(nr, val) 
		{
			if (val.length === 1) 
			{
				hex[ nr ] = "0" + val;
			}
		})
		return hex.join("").toUpperCase()
	}

	this.hex2rgb = function(hex)
	{
		R = hexToR(hex);
		G = hexToG(hex);
		B = hexToB(hex);
		return "rgb("+R+", "+G+", "+B+")"
	}
	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

	this.random = function(a)
	{
		if (a == "hex")
		{
			var letters = '0123456789ABCDEF'.split('')
			var color = '#'
			for (var i = 0; i < 6; i++)
			{
				color += letters[Math.round(Math.random() * 15)]
			}
			return color
		}
		if (a == "rgb")
		{
			return "rgb(" + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ")"
		}
		if (a == "rgba")
		{
			return "rgba(" + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + alpha + ")"
		}
	}
}

var colors = 
[
	{"hex":"F0F8FF", "name":"aliceblue"},
	{"hex":"FFA07A", "name":"lightsalmon"},
	{"hex":"FAEBD7", "name":"antiquewhite"},
	{"hex":"20B2AA", "name":"lightseagreen"},
	{"hex":"00FFFF", "name":"aqua"},
	{"hex":"87CEFA", "name":"lightskyblue"},
	{"hex":"7FFFD4", "name":"aquamarine"},
	{"hex":"778899", "name":"lightslategray"},
	{"hex":"F0FFFF", "name":"azure"},
	{"hex":"B0C4DE", "name":"lightsteelblue"},
	{"hex":"F5F5DC", "name":"beige"},
	{"hex":"FFFFE0", "name":"lightyellow"},
	{"hex":"FFE4C4", "name":"bisque"},
	{"hex":"00FF00", "name":"lime"},
	{"hex":"000000", "name":"black"},
	{"hex":"32CD32", "name":"limegreen"},
	{"hex":"FFEBCD", "name":"blanchedalmond"},
	{"hex":"FAF0E6", "name":"linen"},
	{"hex":"0000FF", "name":"blue"},
	{"hex":"FF00FF", "name":"magenta"},
	{"hex":"8A2BE2", "name":"blueviolet"},
	{"hex":"800000", "name":"maroon"},
	{"hex":"A52A2A", "name":"brown"},
	{"hex":"66CDAA", "name":"mediumaquamarine"},
	{"hex":"DEB887", "name":"burlywood"},
	{"hex":"0000CD", "name":"mediumblue"},
	{"hex":"5F9EA0", "name":"cadetblue"},
	{"hex":"BA55D3", "name":"mediumorchid"},
	{"hex":"7FFF00", "name":"chartreuse"},
	{"hex":"9370DB", "name":"mediumpurple"},
	{"hex":"D2691E", "name":"chocolate"},
	{"hex":"3CB371", "name":"mediumseagreen"},
	{"hex":"FF7F50", "name":"coral"},
	{"hex":"7B68EE", "name":"mediumslateblue"},
	{"hex":"6495ED", "name":"cornflowerblue"},
	{"hex":"00FA9A", "name":"mediumspringgreen"},
	{"hex":"FFF8DC", "name":"cornsilk"},
	{"hex":"48D1CC", "name":"mediumturquoise"},
	{"hex":"DC143C", "name":"crimson"},
	{"hex":"C71585", "name":"mediumvioletred"},
	{"hex":"00FFFF", "name":"cyan"},
	{"hex":"191970", "name":"midnightblue"},
	{"hex":"00008B", "name":"darkblue"},
	{"hex":"F5FFFA", "name":"mintcream"},
	{"hex":"008B8B", "name":"darkcyan"},
	{"hex":"FFE4E1", "name":"mistyrose"},
	{"hex":"B8860B", "name":"darkgoldenrod"},
	{"hex":"FFE4B5", "name":"moccasin"},
	{"hex":"A9A9A9", "name":"darkgray"},
	{"hex":"FFDEAD", "name":"navajowhite"},
	{"hex":"006400", "name":"darkgreen"},
	{"hex":"000080", "name":"navy"},
	{"hex":"BDB76B", "name":"darkkhaki"},
	{"hex":"FDF5E6", "name":"oldlace"},
	{"hex":"8B008B", "name":"darkmagenta"},
	{"hex":"808000", "name":"olive"},
	{"hex":"556B2F", "name":"darkolivegreen"},
	{"hex":"6B8E23", "name":"olivedrab"},
	{"hex":"FF8C00", "name":"darkorange"},
	{"hex":"FFA500", "name":"orange"},
	{"hex":"9932CC", "name":"darkorchid"},
	{"hex":"FF4500", "name":"orangered"},
	{"hex":"8B0000", "name":"darkred"},
	{"hex":"DA70D6", "name":"orchid"},
	{"hex":"E9967A", "name":"darksalmon"},
	{"hex":"EEE8AA", "name":"palegoldenrod"},
	{"hex":"8FBC8F", "name":"darkseagreen"},
	{"hex":"98FB98", "name":"palegreen"},
	{"hex":"483D8B", "name":"darkslateblue"},
	{"hex":"AFEEEE", "name":"paleturquoise"},
	{"hex":"2F4F4F", "name":"darkslategray"},
	{"hex":"DB7093", "name":"palevioletred"},
	{"hex":"00CED1", "name":"darkturquoise"},
	{"hex":"FFEFD5", "name":"papayawhip"},
	{"hex":"9400D3", "name":"darkviolet"},
	{"hex":"FFDAB9", "name":"peachpuff"},
	{"hex":"FF1493", "name":"deeppink"},
	{"hex":"CD853F", "name":"peru"},
	{"hex":"00BFFF", "name":"deepskyblue"},
	{"hex":"FFC0CB", "name":"pink"},
	{"hex":"696969", "name":"dimgray"},
	{"hex":"DDA0DD", "name":"plum"},
	{"hex":"1E90FF", "name":"dodgerblue"},
	{"hex":"B0E0E6", "name":"powderblue"},
	{"hex":"B22222", "name":"firebrick"},
	{"hex":"800080", "name":"purple"},
	{"hex":"FFFAF0", "name":"floralwhite"},
	{"hex":"FF0000", "name":"red"},
	{"hex":"228B22", "name":"forestgreen"},
	{"hex":"BC8F8F", "name":"rosybrown"},
	{"hex":"FF00FF", "name":"fuchsia"},
	{"hex":"4169E1", "name":"royalblue"},
	{"hex":"DCDCDC", "name":"gainsboro"},
	{"hex":"8B4513", "name":"saddlebrown"},
	{"hex":"F8F8FF", "name":"ghostwhite"},
	{"hex":"FA8072", "name":"salmon"},
	{"hex":"FFD700", "name":"gold"},
	{"hex":"FAA460", "name":"sandybrown"},
	{"hex":"DAA520", "name":"goldenrod"},
	{"hex":"2E8B57", "name":"seagreen"},
	{"hex":"808080", "name":"gray"},
	{"hex":"FFF5EE", "name":"seashell"},
	{"hex":"008000", "name":"green"},
	{"hex":"A0522D", "name":"sienna"},
	{"hex":"ADFF2F", "name":"greenyellow"},
	{"hex":"C0C0C0", "name":"silver"},
	{"hex":"F0FFF0", "name":"honeydew"},
	{"hex":"87CEEB", "name":"skyblue"},
	{"hex":"FF69B4", "name":"hotpink"},
	{"hex":"6A5ACD", "name":"slateblue"},
	{"hex":"CD5C5C", "name":"indianred"},
	{"hex":"708090", "name":"slategray"},
	{"hex":"4B0082", "name":"indigo"},
	{"hex":"FFFAFA", "name":"snow"},
	{"hex":"FFFFF0", "name":"ivory"},
	{"hex":"00FF7F", "name":"springgreen"},
	{"hex":"F0E68C", "name":"khaki"},
	{"hex":"4682B4", "name":"steelblue"},
	{"hex":"E6E6FA", "name":"lavender"},
	{"hex":"D2B48C", "name":"tan"},
	{"hex":"FFF0F5", "name":"lavenderblush"},
	{"hex":"008080", "name":"teal"},
	{"hex":"7CFC00", "name":"lawngreen"},
	{"hex":"D8BFD8", "name":"thistle"},
	{"hex":"FFFACD", "name":"lemonchiffon"},
	{"hex":"FF6347", "name":"tomato"},
	{"hex":"ADD8E6", "name":"lightblue"},
	{"hex":"40E0D0", "name":"turquoise"},
	{"hex":"F08080", "name":"lightcoral"},
	{"hex":"EE82EE", "name":"violet"},
	{"hex":"E0FFFF", "name":"lightcyan"},
	{"hex":"F5DEB3", "name":"wheat"},
	{"hex":"FAFAD2", "name":"lightgoldenrodyellow"},
	{"hex":"FFFFFF", "name":"white"},
	{"hex":"90EE90", "name":"lightgreen"},
	{"hex":"F5F5F5", "name":"whitesmoke"},
	{"hex":"D3D3D3", "name":"lightgrey"},
	{"hex":"FFFF00", "name":"yellow"},
	{"hex":"FFB6C1", "name":"lightpink"},
	{"hex":"9ACD32", "name":"yellowgreen"}//,
	// {"hex":"'aqua'/'cyan'"},
	// {"hex":"'gray'/'grey'"},
	// {"hex":"'magenta'/'fuchsia'"}
]




function Cookie()
{
	this.get = function(name)
	{
		var i, x, y, ARRcookies = document.cookie.split(";")
		for (i = 0; i < ARRcookies.length; i++)
		{
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
			x = x.replace(/^\s+|\s+$/g,"")
			if (x == name) {return unescape(y)}
		}
	}

	this.set = function(name, value, exdays)
	{
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + exdays)
		var cvalue = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())
		document.cookie = name + "=" + cvalue
	}

	this.unset = function(name)
	{
		setCookie(name, "", -1)
		return name
	}

	this.clear = function()
	{
		var cookies = document.cookie.split(";")
		for (var i = 0; i < cookies.length; i++)
		{
			unsetCookie(cookies[i].split("=")[0])
		}
	}
}

function showDate()
{
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	//months are zero based
	var curr_year = d.getFullYear();
	return curr_date + "-" + curr_month + "-" + curr_year
}

/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};
Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}}
return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);}
if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);}
if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);}
if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);}
if(x.hour||x.hours){this.addHours(x.hour||x.hours);}
if(x.month||x.months){this.addMonths(x.month||x.months);}
if(x.year||x.years){this.addYears(x.year||x.years);}
if(x.day||x.days){this.addDays(x.day||x.days);}
return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");}
return true;};Date.validateMillisecond=function(n){return Date._validate(n,0,999,"milliseconds");};Date.validateSecond=function(n){return Date._validate(n,0,59,"seconds");};Date.validateMinute=function(n){return Date._validate(n,0,59,"minutes");};Date.validateHour=function(n){return Date._validate(n,0,23,"hours");};Date.validateDay=function(n,year,month){return Date._validate(n,1,Date.getDaysInMonth(year,month),"days");};Date.validateMonth=function(n){return Date._validate(n,0,11,"months");};Date.validateYear=function(n){return Date._validate(n,1,9999,"seconds");};Date.prototype.set=function(config){var x=config;if(!x.millisecond&&x.millisecond!==0){x.millisecond=-1;}
if(!x.second&&x.second!==0){x.second=-1;}
if(!x.minute&&x.minute!==0){x.minute=-1;}
if(!x.hour&&x.hour!==0){x.hour=-1;}
if(!x.day&&x.day!==0){x.day=-1;}
if(!x.month&&x.month!==0){x.month=-1;}
if(!x.year&&x.year!==0){x.year=-1;}
if(x.millisecond!=-1&&Date.validateMillisecond(x.millisecond)){this.addMilliseconds(x.millisecond-this.getMilliseconds());}
if(x.second!=-1&&Date.validateSecond(x.second)){this.addSeconds(x.second-this.getSeconds());}
if(x.minute!=-1&&Date.validateMinute(x.minute)){this.addMinutes(x.minute-this.getMinutes());}
if(x.hour!=-1&&Date.validateHour(x.hour)){this.addHours(x.hour-this.getHours());}
if(x.month!==-1&&Date.validateMonth(x.month)){this.addMonths(x.month-this.getMonth());}
if(x.year!=-1&&Date.validateYear(x.year)){this.addYears(x.year-this.getFullYear());}
if(x.day!=-1&&Date.validateDay(x.day,this.getFullYear(),this.getMonth())){this.addDays(x.day-this.getDate());}
if(x.timezone){this.setTimezone(x.timezone);}
if(x.timezoneOffset){this.setTimezoneOffset(x.timezoneOffset);}
return this;};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.prototype.isLeapYear=function(){var y=this.getFullYear();return(((y%4===0)&&(y%100!==0))||(y%400===0));};Date.prototype.isWeekday=function(){return!(this.is().sat()||this.is().sun());};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth());};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1});};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()});};Date.prototype.moveToDayOfWeek=function(day,orient){var diff=(day-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};Date.prototype.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000);};Date.prototype.getWeekOfYear=function(firstDayOfWeek){var y=this.getFullYear(),m=this.getMonth(),d=this.getDate();var dow=firstDayOfWeek||Date.CultureInfo.firstDayOfWeek;var offset=7+1-new Date(y,0,1).getDay();if(offset==8){offset=1;}
var daynum=((Date.UTC(y,m,d,0,0,0)-Date.UTC(y,0,1,0,0,0))/86400000)+1;var w=Math.floor((daynum-offset+7)/7);if(w===dow){y--;var prevOffset=7+1-new Date(y,0,1).getDay();if(prevOffset==2||prevOffset==8){w=53;}else{w=52;}}
return w;};Date.prototype.isDST=function(){console.log('isDST');return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D";};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST());};Date.prototype.setTimezoneOffset=function(s){var here=this.getTimezoneOffset(),there=Number(s)*-6/10;this.addMinutes(there-here);return this;};Date.prototype.setTimezone=function(s){return this.setTimezoneOffset(Date.getTimezoneOffset(s));};Date.prototype.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r[0]+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};Date.prototype.getDayName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()];};Date.prototype.getMonthName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()];};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(format){var self=this;var p=function p(s){return(s.toString().length==1)?"0"+s:s;};return format?format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(format){switch(format){case"hh":return p(self.getHours()<13?self.getHours():(self.getHours()-12));case"h":return self.getHours()<13?self.getHours():(self.getHours()-12);case"HH":return p(self.getHours());case"H":return self.getHours();case"mm":return p(self.getMinutes());case"m":return self.getMinutes();case"ss":return p(self.getSeconds());case"s":return self.getSeconds();case"yyyy":return self.getFullYear();case"yy":return self.getFullYear().toString().substring(2,4);case"dddd":return self.getDayName();case"ddd":return self.getDayName(true);case"dd":return p(self.getDate());case"d":return self.getDate().toString();case"MMMM":return self.getMonthName();case"MMM":return self.getMonthName(true);case"MM":return p((self.getMonth()+1));case"M":return self.getMonth()+1;case"t":return self.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return self.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return"";}}):this._toString();};
Date.now=function(){return new Date();};Date.today=function(){return Date.now().clearTime();};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this;};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this;};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this;};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var c={};c[this._dateElement]=this;return Date.now().add(c);};Number.prototype.ago=function(){var c={};c[this._dateElement]=this*-1;return Date.now().add(c);};(function(){var $D=Date.prototype,$N=Number.prototype;var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),de;var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
return this.moveToDayOfWeek(n,this._orient);};};for(var i=0;i<dx.length;i++){$D[dx[i]]=$D[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};for(var j=0;j<mx.length;j++){$D[mx[j]]=$D[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$D[de]=$D[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ");};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};Date.Grammar={};Date.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=((s.length==3)?Date.getMonthNumberFromName(s):(Number(s)-1));};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];var now=new Date();this.year=now.getFullYear();this.month=now.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
if(this.now){return new Date();}
var today=Date.today();var method=null;var expression=!!(this.days!=null||this.orient||this.operator);if(expression){var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";gap=(Date.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
if(this.unit=="week"){this.unit="day";this.value=this.value*7;}
this[this.unit+"s"]=this.value*orient;}
return today.add(this);}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour;}
if(this.weekday&&!this.day){this.day=(today.addDays((Date.getDayNumberFromName(this.weekday)-today.getDay()))).getDate();}
if(this.month&&!this.day){this.day=1;}
return today.set(this);}}};var _=Date.Parsing.Operators,g=Date.Grammar,t=Date.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=Date.CultureInfo.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken(Date.CultureInfo.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.mm,g.ss],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[Date.CultureInfo.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw Date.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};}());Date._parse=Date.parse;Date.parse=function(s){var r=null;if(!s){return null;}
try{r=Date.Grammar.start.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};Date.getParseFunction=function(fx){var fn=Date.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};Date.parseExact=function(s,fx){return Date.getParseFunction(fx)(s);};

// moment.js
// version : 2.1.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.1.0",
        round = Math.round, i,
        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000
        isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            w : 'week',
            M : 'month',
            y : 'year'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return this.weekYear();
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return this.isoWeekYear();
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return ~~(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(~~(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(10 * a / 6), 4);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            }
        };

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var years = duration.years || duration.year || duration.y || 0,
            months = duration.months || duration.month || duration.M || 0,
            weeks = duration.weeks || duration.week || duration.w || 0,
            days = duration.days || duration.day || duration.d || 0,
            hours = duration.hours || duration.hour || duration.h || 0,
            minutes = duration.minutes || duration.minute || duration.m || 0,
            seconds = duration.seconds || duration.second || duration.s || 0,
            milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

        // store reference to input for deterministic cloning
        this._input = duration;

        // representation for dateAddRemove
        this._milliseconds = milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = months +
            years * 12;

        this._data = {};

        this._bubble();
    }


    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours,
            currentDate;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (~~array1[i] !== ~~array2[i]) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        return units ? unitAliases[units] || units.toLowerCase().replace(/(.)s$/, '$1') : units;
    }


    /************************************
        Languages
    ************************************/


    Language.prototype = {
        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            return ((input + '').toLowerCase()[0] === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },
        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    };

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        if (!key) {
            return moment.fn._lang;
        }
        if (!languages[key] && hasModule) {
            try {
                require('./lang/' + key);
            } catch (e) {
                // call with no params to set to default
                return moment.fn._lang;
            }
        }
        return languages[key];
    }


    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[.*\]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return m.lang().longDateFormat(input) || input;
        }

        while (i-- && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        }

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
            return parseTokenFourDigits;
        case 'YYYYY':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
            return parseTokenOneOrTwoDigits;
        default :
            return new RegExp(token.replace('\\', ''));
        }
    }

    function timezoneMinutesFromString(string) {
        var tzchunk = (parseTokenTimezone.exec(string) || [])[0],
            parts = (tzchunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + ~~parts[2];

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            datePartArray[1] = (input == null) ? 0 : ~~input - 1;
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[1] = a;
            } else {
                config._isValid = false;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DDDD
        case 'DD' : // fall through to DDDD
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                datePartArray[2] = ~~input;
            }
            break;
        // YEAR
        case 'YY' :
            datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[0] = ~~input;
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[3] = ~~input;
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[4] = ~~input;
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[5] = ~~input;
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
            datePartArray[6] = ~~ (('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        }

        // if the input is null, the date is not valid
        if (input == null) {
            config._isValid = false;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(config) {
        var i, date, input = [];

        if (config._d) {
            return;
        }

        for (i = 0; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[3] += ~~((config._tzm || 0) / 60);
        input[4] += ~~((config._tzm || 0) % 60);

        date = new Date(0);

        if (config._useUTC) {
            date.setUTCFullYear(input[0], input[1], input[2]);
            date.setUTCHours(input[3], input[4], input[5], input[6]);
        } else {
            date.setFullYear(input[0], input[1], input[2]);
            date.setHours(input[3], input[4], input[5], input[6]);
        }

        config._d = date;
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var tokens = config._f.match(formattingTokens),
            string = config._i,
            i, parsedInput;

        config._a = [];

        for (i = 0; i < tokens.length; i++) {
            parsedInput = (getParseRegexForToken(tokens[i], config).exec(string) || [])[0];
            if (parsedInput) {
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            }
            // don't parse if its not a known token
            if (formatTokenFunctions[tokens[i]]) {
                addTimeToArrayFromToken(tokens[i], parsedInput, config);
            }
        }

        // add remaining unparsed input to the string
        if (string) {
            config._il = string;
        }

        // handle am pm
        if (config._isPm && config._a[3] < 12) {
            config._a[3] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[3] === 12) {
            config._a[3] = 0;
        }
        // return
        dateFromArray(config);
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            tempMoment,
            bestMoment,

            scoreToBeat = 99,
            i,
            currentScore;

        for (i = 0; i < config._f.length; i++) {
            tempConfig = extend({}, config);
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            tempMoment = new Moment(tempConfig);

            currentScore = compareArrays(tempConfig._a, tempMoment.toArray());

            // if there is any input that was not parsed
            // add a penalty for that format
            if (tempMoment._il) {
                currentScore += tempMoment._il.length;
            }

            if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempMoment;
            }
        }

        extend(config, bestMoment);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            // match[2] should be "T" or undefined
            config._f = 'YYYY-MM-DD' + (match[2] || " ");
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += " Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromArray(config);
        } else {
            config._d = input instanceof Date ? new Date(+input) : new Date(input);
        }
    }


    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }


    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || input === '') {
            return null;
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);
            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang) {
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang) {
        return makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format
        });
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._input : (isNumber ? {} : input)),
            matched = aspNetTimeSpanJsonRegex.exec(input),
            sign,
            ret;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (matched) {
            sign = (matched[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: ~~matched[2] * sign,
                h: ~~matched[3] * sign,
                m: ~~matched[4] * sign,
                s: ~~matched[5] * sign,
                ms: ~~matched[6] * sign
            };
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(key, values);
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };


    /************************************
        Moment Prototype
    ************************************/


    moment.fn = Moment.prototype = {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            return formatMoment(moment(this).utc(), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            if (this._isValid == null) {
                if (this._a) {
                    this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
                } else {
                    this._isValid = !isNaN(this._d.getTime());
                }
            }
            return !!this._isValid;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).zone(this._offset || 0) : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            var year = this.year();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().weekdaysParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth,
                daysInMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            }

            return this;
        },

        endOf: function (units) {
            return this.startOf(units).add(units, 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        daysInMonth : function () {
            return moment.utc([this.year(), this.month() + 1, 0]).date();
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    };

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    moment.duration.fn = Duration.prototype = {
        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              ~~(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang
    };

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    /************************************
        Exposing Moment
    ************************************/


    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['moment'] = moment;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("moment", [], function () {
            return moment;
        });
    }
}).call(this);



function Graph()
{
	this.vertices = []
	this.edges = []

	this.newV = function(x, y)	{var v = new Vertex(x, y); this.addV(v); return this.vertices[this.vertices.length-1]}
	this.addV = function(v)	 {this.vertices.push(v); v.draw()}
	this.newE = function(a, b)	{var e = new Edge(a, b); this.addE(e); return this.edges[this.edges.length-1]}
	this.addE = function(e)	 {this.edges.push(e); e.draw()}
	this.getV = function(i)	 {return this.vertices[i]}
	this.getE = function(i)	 {return this.edges[i]}

	this.collide = function(x, y)
	{
		for(var v in this.vertices)
		{
			if (this.vertices[v].proximity(x, y) < 5)
			{
				this.vertices[v].recolor("blue")
				return this.vertices[v]
			}
			else
			{
				this.vertices[v].recolor("black")
			}
		}
	}

	this.draw = function()
	{
		for(var v in this.vertices)
		{
			this.vertices[v].draw()
		}
		for(var e in this.edges)
		{
			this.edges[e].draw()
		}
	}
	this.crossCount = function()
	{
		var total = 0
		for(var i in range(0, this.edges.length-1))
		{
			for(var j in range(parseInt(i)+1, this.edges.length-1))
			{
				if (i == j) {continue}
				x1 = this.edges[i].a.x; y1 = this.edges[i].a.y
				x2 = this.edges[i].b.x; y2 = this.edges[i].b.y
				x3 = this.edges[j].a.x; y3 = this.edges[j].a.y
				x4 = this.edges[j].b.x; y4 = this.edges[j].b.y 
				// alert(i+" "+j+" "+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3+" "+x4+" "+y4)
				var den = (y4 - y3) * (x2 - x1) - (x4 * x3) * (y2 - y1)

				if (den == 0) {continue}

				var ua = ((x4 - x3) * (y1 - y3) - (y4 * y3) * (x1 - x3))
				var ub = ((x2 - x1) * (y1 - y3) - (y2 * y1) * (x1 - x3))

				if (ua > 0 && ua < 1 && ub > 0 && ub < 1)
				{
					total++
				}
			}
		}
		return total
	}
}






function Line(a, b)
{
	this.a = a
	this.b = b

	// if (!a || !b) {throw TypeError("Must provide two points.")}

	this.getA = function()	{return this.a}
	this.getB = function()	{return this.b}
	this.setA = function(a) {this.a = a}
	this.setB = function(b) {this.b = b}
	this.draw = function()
	{
		c.beginPath()
		c.moveTo(this.a.x, this.a.y)
		c.lineTo(this.b.x, this.b.y)
		c.stroke()
		c.closePath()
		return this
	}
	this.swap = function()
	{
		var c = this.a
		this.a = this.b
		this.b = c
	}
	this.slope = function()
	{
		return (a.y - b.y) / (a.x - b.x)
	}
	this.intercept = function()
	{
		return this.a.y - this.slope() * this.a.x
	}
	this.distance = function()
	{
		var dx = this.a.x - this.b.x
		var dy = this.a.y - this.b.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.equals = function(that)
	{
		return this.a.equals(that.a) && this.b.equals(that.b)
	}
}


function randomNumber(min, max, round)
{
	result = (Math.random()*max)+min
	result *= Math.pow(10, round)
	result = Math.round(result)
	result /= Math.pow(10, round)
	return result
}


function comp_sum(array)
{
	var sum = 0
	for (i in array) {sum += parseInt(array[i])}
	return sum
}
function comp_ave(array)
{
	var ave = comp_sum(array)/array.length
	return ave
}
function comp_dev(array)
{
	var mean = comp_ave(array)
	var dev = 0
	for (i in array) {array[i] = (array[i] - mean)}
	for (i in array) {array[i] = (array[i] * array[i])}
	for (i in array) {dev += array[i]}
	dev /= (array.length-1)
	dev = Math.sqrt(dev)
	return dev
}
function get_r(xs, ys, xbar, ybar, sdx, sdy)
{
	var xy = 0
	for(var j = 0; j < xs.length; j++)
	{
		xs[j] = parseFloat(xs[j])
		ys[j] = parseFloat(ys[j])
		xy += (xs[j] - xbar) * (ys[j] - ybar)
	}
	corr = Math.round(1/(xs.length-1)*xy/(sdx*sdy)*10000)/10000
	return corr
}

function least_squares(twodarray)
{
	var ave = []
	for (var j = 0; j < twodarray[0].length; j++)
	{
		aver = []
		for (var i = 0; i < twodarray.length; i++)
		{
			aver.push(twodarray[i][j])
		}
		ave.push(aver)
	}
	var xbar = comp_ave(ave[0].slice())
	var ybar = comp_ave(ave[1].slice())
	var sdx = comp_dev(ave[0].slice())
	var sdy = comp_dev(ave[1].slice())
	var r = get_r(ave[0].slice(), ave[1].slice(), xbar, ybar, sdx, sdy)

	var b = r*(sdy/sdx)
	var a = ybar - (b*xbar)

	return [a, b].slice()
}






//	 floor, ceil, round
//	 max, min
//	 pow, sqrt
//	 sin, cos, tan, asin, acos, atan

//	 Math.SQRT2
//	 1.4142135623730951
//	 Math.E
//	 2.718281828459045
//	 Math.LN2
//	 0.6931471805599453
//	 Math.LN10
//	 2.302585092994046
//	 Number.MAX_VALUE
//	 Number.MIN_VALUE
//	 Number.NaN
//	 Number.POSITIVE_INFINITY
//	 Number.NEGATIVE_INFINITY

//	 Number.toFixed()
//	 String.fromCharCode(115, 99, 114, 105, 112, 116);
//	 charAt & charCodeAt


function Maths()
{
	// this.random = function(min, max, round)
	// {
	// 	result = (Math.random()*max)+min
	// 	result *= Math.pow(10, round)
	// 	result = Math.round(result)
	// 	result /= Math.pow(10, round)
	// 	return result
	// }
	// this.rand = function(n) {return Math.random()*n}
	// this.randI = function(n) {return parseInt(rnd(n))}
	this.range = function(start, end, step)
	{
		var range = []
		var typeofStart = typeof start
		var typeofEnd = typeof end

		if (step === 0) {throw TypeError("Step cannot be zero.") }
		if (typeofStart == "undefined" || typeofEnd == "undefined") {throw TypeError("Must pass start and end arguments.")}
		else if (typeofStart != typeofEnd) {throw TypeError("Start and end arguments must be of same type."+typeofStart+typeofEnd)}
		typeof step == "undefined" && (step = 1)
		if (end < start) {step = -step}
		if (typeofStart == "number") {while (step > 0 ? end >= start : end <= start) {range.push(start); start += step}}
		else if (typeofStart == "string")
		{
			if (start.length != 1 || end.length != 1) {throw TypeError("Only strings with one character are supported.") }
			start = start.charCodeAt(0)
			end = end.charCodeAt(0)
			while (step > 0 ? end >= start : end <= start) {range.push(String.fromCharCode(start)); start += step}
		}
		else {throw TypeError("Only string and number types are supported")}
		return range
	}
	this.convert = function(src, srcAlphabet, dstAlphabet, caps)
	{
		alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"

		if (caps == true) {alphabet = alphabet.toUpperCase()}
		if (typeof src === "number") {src = String(src)}
		if (typeof srcAlphabet !== typeof dstAlphabet) {TypeError("Alphabet types don't match. ")}
		if (typeof srcAlphabet === "number")
		{
			var srcBase = srcAlphabet
			var dstBase = dstAlphabet
			srcAlphabet = alphabet.substring(0, srcBase)
			dstAlphabet = alphabet.substring(0, dstBase)
		}
		if (typeof srcAlphabet === "string")
		{
			var srcBase = srcAlphabet.length
			var dstBase = dstAlphabet.length
		}
		var wet = src, val = 0, mlt = 1
		while (wet.length > 0)
		{
			var digit= wet.charAt(wet.length - 1)
			val	 += mlt * srcAlphabet.indexOf(digit)
			wet			= wet.substring(0, wet.length - 1)
			mlt	 *= srcBase
		}
		wet			= val
		var ret		= ""
		while (wet >= dstBase)
		{
			var digitVal = wet % dstBase
			var digit		= dstAlphabet.charAt(digitVal)
			ret			= digit + ret
			wet /= dstBase
		}
		var digit		= dstAlphabet.charAt(wet)
		return digit + ret
	}
	this.base26 = function(value)
	{
		var converted = ""
		var iteration = false
		do
		{
			var remainder = value % 26 + 1
			if (iteration == false && value < 26)
			{
				remainder--
			}
			converted = String.fromCharCode(64 + remainder) + converted
			value = (value - remainder) / 26

			iteration = true
		}
		while (value > 0)
		return converted
	}
}
function Point(x, y, color, velocity, radius, mass)
{
	this.x = x || 0
	this.y = y || 0
	this.color = color || "black"
	this.mass = mass
	this.acceleration = {x: 0, y: -10}
	this.velocity = velocity
	this.radius = radius

	if (empty(color))	 {color = "black"}
	if (empty(mass))	{mass = 1.0}


	this.applyForce = function(x, y)
	{
		this.velocity.x += x
		return this.velocity.y += y
	}

	this.tick = function()
	{
		if (this.y + this.velocity.y * .1 < 0 && this.velocity.y <= 0.1)
		{
			this.velocity.y = -this.velocity.y * .7
		}
		if ((this.x + this.velocity.x * .1 < 0) || (this.x + this.velocity.x * .1 > 512))
		{
			this.velocity.x = -this.velocity.x * .7
		}
		this.y += this.velocity.y * .1
		this.x += this.velocity.x * .1
		this.velocity.x += this.acceleration.x
		return this.velocity.y += this.acceleration.y
	}

	this.display = function(ctx)
	{
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = "rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", .8)"
		ctx.arc(this.x, 512 - this.y, this.radius, 0, 20, true)
		ctx.fill()
		return ctx.restore()
	}

	this.draw = function()
	{
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2*Math.PI)
		c.fill()
		c.fillStyle = color
		c.closePath()
		return this
	}
	this.recolor = function(color)
	{
		this.color = color
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2*Math.PI)
		c.fillStyle = color
		c.fill()
		c.closePath()
		return this
	}
	this.equals = function(that)
	{
		return this.x == that.x && this.y == that.y
	}
	this.proximity = function(x, y)
	{
		var dx = this.x - (x - o.left)
		var dy = this.y - (y - o.top)
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.distance = function(that)
	{
		var dx = this.x - that.x
		var dy = this.y - that.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.getX = function() {return x}
	this.getY = function() {return y}
	this.setX = function(x) {this.x = x}
	this.setY = function(y) {this.y = y}
	this.clone = function()
	{
		return new Point(this.x, this.y)
	}

	this.draw()
	this.add = function(v)
	{
		return new Point(this.x + v.x, this.y + v.y)
	}
	this.clone = function()
	{
		return new Point(this.x, this.y)
	}
	this.degreesTo = function(v)
	{
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var angle = Math.atan2(dy, dx); //	 radians
		return angle * (180 / Math.PI); //	 degrees
	}
	this.distance = function(v)
	{
		var x = this.x - v.x;
		var y = this.y - v.y;
		return Math.sqrt(x * x + y * y)
	}
	this.equals = function(toCompare)
	{
		return this.x == toCompare.x && this.y == toCompare.y
	}
	this.interpolate = function(v, f)
	{
		return new Point((this.x + v.x) * f, (this.y + v.y) * f)
	}
	this.length = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}
	this.normalize = function(thickness)
	{
		var l = this.length();
		this.x = this.x / l * thickness;
		this.y = this.y / l * thickness;
	}
	this.orbit = function(origin, arcWidth, arcHeight, degrees)
	{
		var radians = degrees * (Math.PI / 180);
		this.x = origin.x + arcWidth * Math.cos(radians);
		this.y = origin.y + arcHeight * Math.sin(radians);
	}
	this.offset = function(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}
	this.subtract = function(v)
	{
		return new Point(this.x - v.x, this.y - v.y)
	}
	this.toString = function()
	{
		return "(x=" + this.x + ", y=" + this.y + ")"
	}
	return this
}
Point.interpolate = function(pt1, pt2, f)
{
	return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f)
}
Point.polar = function(len, angle)
{
	return new Point(len * Math.sin(angle), len * Math.cos(angle))
}
Point.distance = function(pt1, pt2)
{
	var x = pt1.x - pt2.x
	var y = pt1.y - pt2.y
	return Math.sqrt(x * x + y * y)
}

function halfway(a, b)
{
	var dx = (a[0] + b[0]) / 2
	var dy = (a[1] + b[1]) / 2
	return {dx: dx, dy: dy}
}


(function($)
{
	$.file_get_contents = function(address)
	{
		return $.ajax({url: address, async: false}).responseText
	}
	$.uppercase = function(input)
	{
		if (typeof input !== "string" || !input) {return null;}
		return input.toUpperCase()
	}
	$.lowercase = function(input) 
	{
		if (typeof input !== "string" || !input) {return null;}
		return input.toLowerCase()
	}
	$.capitalize = function(input) 
	{
		if (typeof input !== "string" || !input) {return null;}
		return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
	}
	$.chomp = function(input, offset)
	{
		if (typeof input !== "string" || !input) {return null;}
		return input.substring(0, input.length-offset)
	}
	$.title = function(input)
	{
		if (arguments.length == 0)
		{
			return $("title").html()
		}
		$("title").html(input)
	}
	$.fn.repeat = function(input, n)
	{
		var result = ""
		for (var i = 0; i < n; i++) {result += input}
		return result
	}
	$.fn.confirm = function(mode)
	{
		if (mode == 1){window.onbeforeunload = function() {return "Please Confirm."}}
		else			{window.onbeforeunload = function() {}}
	}
	$.fn.visible = function()
	{
		return $(this).is(":visible")
	}
	$.fn.antiselect = function()
	{
		$(this).css({"-webkit-touch-callout":"none", "-webkit-user-select":"none", "-khtml-user-select":"none", "-moz-user-select":"none", "-ms-user-select":"none", "user-select":"none"})
		if ($(this)[0].nodeType == 1)
		{
			$(this)[0].setAttribute("unselectable", "on")
		}
		var child = $(this)[0].firstChild
		while (child)
		{
			$(child).antiselect()
			child = child.nextSibling
		}
	}
	$.fn.generateTable = function(x, y, head)
	{
		result = "<table>"
		for (i = 0; i < x; i++)
		{
			head && i == 0 ? result += "<thead>" : ""
			head && i == 1 ? result += "<tbody>" : ""
			result += "<tr>"
			for (j = 0; j < y; j++)
			{
				if	(i == 0)	{result += "<th class='col'>"+String.fromCharCode(64 + j)+"</th>"}
				else if (j == 0)	{result += "<th class='row'>"+i+"</th>"}
				else				{result += "<td></td>"} //<input type='text' class='cell'></input>
			}
			result += "</tr>"
			head && i == 0 ? result += "</thead>" : ""
			head && i == x-1 ? result += "</tbody>" : ""
		}
		result += "</table>"
		$(this).html(result)
	}
	$.fn.maxHeight = function()
	{
		var max = 0
		this.each(function() {max = Math.max(max, $(this).height())})
		return max
	}
	$.fn.maxWidth = function()
	{
		var max = 0
		this.each(function() {max = Math.max(max, $(this).width())})
		return max
	}
	$.fn.tag = function()
	{
		return $(this)[0].tagName
	}
	$.fn.id = function(i)
	{
		if (i === undefined)
		{
			return $(this)[0].id
		}
		if (arguments.length == 0)
		{
			return $(this).attr("id")
		}
		if (i == "")
		{
			$(this).removeAttr("id")
			return this
		}
		$(this).attr("id", i)
	}
	$.fn.removeAttrs = function()
	{
		return this.each(function()
		{
			var attributes = $.map(this.attributes, function(item) {return item.name})
			var el = $(this)
			$.each(attributes, function(i, item) {el.removeAttr(item)})
		})
	}
	$.fn.center = function()
	{
		$(this).css("position", "absolute")
		$(this).css("top",	($(window).height() - $(this).height()) / 2 + $(window).scrollTop()	+ "px")
		$(this).css("left", ($(window).width()	- $(this).width())	/ 2 + $(window).scrollLeft() + "px")
		return $(this)
	}
	$.fn.viewport = function()
	{
		var w = isLessThanIE(8)
			?(!(document.documentElement.clientWidth)
			|| (document.documentElement.clientWidth === 0)) ? document.body.clientWidth:document.documentElement.clientWidth:window.innerWidth
		var h = isLessThanIE(8)
			?(!(document.documentElement.clientHeight)
			|| (document.documentElement.clientHeight === 0)) ? document.body.clientHeight:document.documentElement.clientHeight:window.innerHeight
		return {width: w, height: h}
	}
	$.each({top: "top", bottom: "bottom", left: "left", right: "right"}, function(name, type)
	{
		elem = this[0]
		$.fn[name] = function(value)
		{
			return $.access(this, function(elem, type, value) 
			{
				if (value === undefined) 
				{
					orig = $.css(elem, type)
					ret = parseFloat(orig)
					return $.isNumeric(ret) ? ret : orig
				}
				$(elem).css(type, value)

			}, type, value, arguments.length, null)
		}
	})
})
(jQuery)



String.prototype.extension 			= function() {return String(this).substring(String(this).length-3, String(this).length)}
String.prototype.is_range			= function() {return String(this).search(/\w\d:\w\d/) != -1}
String.prototype.is_col				= function() {return String(this).search(/\w/) != -1}
String.prototype.is_col_range		= function() {return String(this).search(/\w:\w/) != -1}
String.prototype.is_row				= function() {return String(this).search(/\d/) != -1}
String.prototype.is_row_range		= function() {return String(this).search(/\d:\d/) != -1}
String.prototype.is_number			= function() {return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
String.prototype.isnt_blank			= function() {return String(this).search(/\S/) != -1}
String.prototype.is_decimal			= function() {return String(this).search(/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/) != -1}
String.prototype.is_email			= function() {return String(this).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) != -1}
String.prototype.get_digits			= function() {return String(this).replace(/[^\d]/g, "")}
String.prototype.is_number			= function() {return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
String.prototype.is_url				= function() {return /(http:\/\/)?(www\.)?(.+?)(\.com|\.org|\.gov|\.edu)(\/.*?)?/.test(this)}
String.prototype.strip				= function() {return String(this).replace(new RegExp('</?.+?>', 'g'), '') }
String.prototype.isInteger			= function() {return /^-?\d+$/.test(this)}
String.prototype.isPositiveDecimal 	= function() {return (!/\D/.test(this)) || (/^\d+\.\d+$/.test(this))}
String.prototype.isAlphanumeric		= function() {return !(/\W/.test(this))}
String.prototype.validEmail			= function() {return String(this).match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ===null}
String.prototype.checkMail			= function() {return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this)}
String.prototype.onlyLetters	 	= function() {return String(this).toLowerCase().replace(/[^a-z]/g, "") }
String.prototype.onlyLettersNums 	= function() {return String(this).toLowerCase().replace(/[^a-z,0-9,-]/g, "")}
String.prototype.trim				= function() {return String(this).replace(/^\s+|\s+$/g, '')}
String.prototype.ltrim				= function() {return String(this).replace(/^\s+/,'')}
String.prototype.rtrim				= function() {return String(this).replace(/\s+$/,'')}
String.prototype.ftrim				= function() {return String(this).replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ')}
// String.prototype.prefixArticle	 	= function() {var result = (['a', 'e', 'i', 'o', 'u'].indexOf(this[0]) > -1) ? "an "+this : return "a "+this; return result}
(function()
{
	window.nativeAlert = window.alert
	window.alert = function() {window.nativeAlert(Array.prototype.slice.call(arguments).join(", "))}
	window.onerror = function(msg, url, line) {window.nativeAlert("Message: " + msg, "\nurl: " + url, "\nLine Number: " + line )}
	window.connect = function(a)
	{
		if (a == true)
		{
			window.addEventListener("offline",	function(e) {alert("offline")}, false)
			window.addEventListener("online", 	function(e) {alert("online")}, false)
		}
		return window.navigator.onLine
	}
	window.js = function(a) {window.navigator.javaEnabled(a); return window.navigator.javaEnabled()}
	window.taint = function(a) {window.navigator.taintEnabled(a);	return window.navigator.taintEnabled()}
	window.title = function() 	{document.title(Array.prototype.slice.call(arguments).join(", "))}
	window.video = function() 	{return !!document.createel('video').canPlayType}
	window.empty = function(a) 	{return !(typeof a === "undefined")}
	window.type = function(input)
	{
		if (input instanceof String) 	{return "String"}
		if (input instanceof Number) 	{return "Number"}
		if (input instanceof Boolean)	{return "Boolean"}
		if (input instanceof Object) 	{return "Object"}
		if (input instanceof Array) 	{return "Array"}
		return typeof input
	}
	window.url = function() {return window.location.pathname}
	window.goto = function(url) {window.location.href = url}
	window.getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera')>0||navigator.appVersion.toLowerCase().indexOf('safari')!=-1)?function()
	{
		canvasX = window.innerWidth;
		canvasY = window.innerHeight;
	}:function() 
	{
		canvasX = document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth;
		canvasY = document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight;
	}
	window.onresize = window.getWindowCoords
	window.apiload = function()
	{
		$("head").append('<script src="http://www.google.com/jsapi" type="text/javascript"></script>')
		google.load('jquery', '1.9.1')
		google.load('jqueryui', '1.5.3')
		// google.load('mootools', '1.2.1')
		// google.load('prototype', '1.6.0.3')
		// google.load('scriptaculous', '1.8.2')
		// google.load('mootools', '1.2.1')
		// google.load('dojo', '1.2.3')
		// google.load('swfobject', '2.1')
		// google.load('yui', '2.6.0')
	}
})

function isLessThanIE(version)
{
	if (navigator.appName === 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent, re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
		if (re.exec(ua) !== null) {if (parseFloat(RegExp.$1) < version) {return true}}
	}
	return false
}

function insertAtCursor(myField, myValue)
{
	if (document.selection)
	{
		myField.focus()
		sel = document.selection.createRange()
		sel.text = myValue
	}
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart
		var endPos = myField.selectionEnd
		restoreTop = myField.scrollTop

		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)

		myField.selectionStart = startPos + myValue.length
		myField.selectionEnd = startPos + myValue.length

		if (restoreTop > 0) {myField.scrollTop = restoreTop}
	}
	else {myField.value += myValue}
}










// function Position()
// {

// 	this.offset = function()		{return {x: window.pageXOffset, y: window.pageYOffset}}
// 	this.dimensions = function(){return {inner: {width: window.innerWidth, height: window.innerHeight}, outer: {width: window.outerWidth, height: window.outerHeight}}}
// 	this.d = function() {return {i: {w: window.innerWidth, h: window.innerHeight}, o: {w: window.outerWidth, h: window.outerHeight}}}
// 	// resizeBy()	 Resizes the window by the specified pixels
// 	// resizeTo()	 Resizes the window to the specified width and height
// 	// scroll()
// 	// scrollBy()	 Scrolls the content by the specified number of pixels
// 	// scrollTo()	 Scrolls the content to the specified coordinates

// 	this.viewport = function()
// 	{
// 		var w = isLessThanIE(8)?(!(document.documentElement.clientWidth)	|| (document.documentElement.clientWidth===0))?document.body.clientWidth:document.documentElement.clientWidth:window.innerWidth
// 		var h = isLessThanIE(8)?(!(document.documentElement.clientHeight) 	|| (document.documentElement.clientHeight===0))?document.body.clientHeight:document.documentElement.clientHeight:window.innerHeight;
// 		return {width: w, height: h}
// 	}
// }

// function Timer()
// {
// 	// window.setInterval() Calls a function or evaluates an expression at specified intervals (in milliseconds)
// 	// window.setTimeout()			Calls a function or evaluates an expression after a specified number of milliseconds
// 	// window.clearInterval()	 Clears a timer set with setInterval()
// 	// window.clearTimeout()		Clears a timer set with setTimeout()

// 	this.timedRefresh = function(timeoutPeriod) {window.setTimeout("window.location.reload(true);", timeoutPeriod)}

// }


// function Pane()
// {
// 	// alert()	Displays an alert box with a message and an OK button
// 	// blur()	 Removes focus from the current window

// 	// close()	Closes the current window
// 	// confirm()		Displays a dialog box with a message and an OK and a Cancel button
// 	// createPopup()		Creates a pop-up window
// 	// focus()	Sets focus to the current window
// 	// moveBy() Moves a window relative to its current position
// 	// moveTo() Moves a window to the specified position
// 	// open()	 Opens a new browser window
// 	// print()	Prints the content of the current window
// 	// prompt() Displays a dialog box that prompts the visitor for input

// 	this.iframes = function()	 {return {frames: window.frames, length: window.length}}

// 	this.context = function()	 {return {self: window.self, parent: window.parent, opener: window.opener, top: window.top}}

// }



// function Screen()
// {
// 	this.top			= window.screenTop
// 	this.left	 		= window.screenLeft
// 	this.x				= window.screenX
// 	this.y				= window.screenY

// 	this.availHeight	= window.screen.availHeight // Returns the height of the screen (excluding the Windows Taskbar)
// 	this.availWidth		= window.screen.availWidth	// Returns the width of the screen (excluding the Windows Taskbar)
// 	this.colorDepth		= window.screen.colorDepth	// Returns the bit depth of the color palette for displaying images
// 	this.height			= window.screen.height		// Returns the total height of the screen
// 	this.pixelDepth		= window.screen.pixelDepth	// Returns the color resolution (in bits per pixel) of the screen
// 	this.width			= window.screen.width		// Returns the total width of the screen
// }

// function History()
// {
// 	this.length		= function() 	{return window.history.length}
// 	this.back		= function()	{window.history.back()}
// 	this.backward	= function()	{window.history.back()}
// 	this.forward	= function()	{window.history.forward()}
// 	this.go 		= function(i) 	{window.history.go(i)}
// }

// window.location.hash		 // Returns the anchor portion of a URL
// window.location.host		 // Returns the hostname and port of a URL
// window.location.hostname // Returns the hostname of a URL
// window.location.href		 // Returns the entire URL
// window.location.pathname // Returns the path name of a URL
// window.location.port		 // Returns the port number the server uses for a URL
// window.location.protocol // Returns the protocol of a URL
// window.location.search	 // Returns the query portion of a URL

// assign() Loads a new document
// reload() Reloads the current document
// replace()		Replaces the current document with a new one



