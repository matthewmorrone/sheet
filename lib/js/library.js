(function()
{
    window.nativeAlert = window.alert
    window.alert = function(){window.nativeAlert(Array.prototype.slice.call(arguments).join(", "))}
    window.onerror = function(msg, url, line){window.nativeAlert("Message: " + msg, "\nurl: " + url, "\nLine Number: " + line)}
    window.connect = function(a)
    {
        if (a == true)
        {
            window.addEventListener("offline",  function(e){alert("offline")}, false)
            window.addEventListener("online",   function(e){alert("online")},   false)
        }
        return window.navigator.onLine
    }
    window.js = function(a)     {window.navigator.javaEnabled(a);   return window.navigator.javaEnabled()}
    window.taint = function(a)  {window.navigator.taintEnabled(a);  return window.navigator.taintEnabled()}
    window.title = function()   {document.title(Array.prototype.slice.call(arguments).join(", "))}
    window.video = function()   {return !!document.createel('video').canPlayType}
    window.empty = function(a)  {return !(typeof a === "undefined")}
    window.type = function(v)
    {
        if (v === null){ return 'null'; }
        if (typeof v === 'undefined'){ return 'undefined'; }
        return Object.prototype.toString.call(v).match(/\s(.+?)\]/)[1].toLowerCase()
    }



    window.url = function(){return window.location.pathname}
    window.goto = function(url){window.location.href = url}
    window.getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera')>0||navigator.appVersion.toLowerCase().indexOf('safari')!=-1)?function()
    {
        canvasX = window.innerWidth
        canvasY = window.innerHeight
    }:function()
    {
        canvasX = document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth
        canvasY = document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight
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


// var rexp_keyval = /(.*?): ?(.*?)\r?\n/g
// function headersToObject(allHeaders)
// {
//     var res, hdrObj ={}
//     for (rexp_keyval.lastIndex = 0; res = rexp_keyval.exec(allHeaders); hdrObj[res[1]] = res[2])
//     {
//         return hdrObj
//     }
// }
function isNotEmpty(obj) {return obj.__count__}

function hasLoaded(img)
{
    return img.complete && img.naturalWidth !== 0
}

// function charCodes()
// {
//  Array.map('foo', function(x){ return String.charCodeAt(x) }) // is [112,111,111]
//  [String.charCodeAt(x) for each (x in 'foo')] // is [112,111,111]
// }

function Match(v){Array.indexOf(arguments,v,1)-1}

function Switch(i){arguments[++i]}

var requireAllArgs = function(fn)
{
    return function()
    {
        if (arguments.length < fn.length)
        {
            throw(["Expected", fn.length, "arguments, got", arguments.length].join(" "))
        }
        return fn.apply(this, arguments)
    }
}


function Stack() {try{throw Error()} catch(ex){return ex.stack}}

function isLessThanIE(version)
{
    if (navigator.appName === 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent, re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
        if (re.exec(ua) !== null){if (parseFloat(RegExp.$1) < version){return true}}
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

        if (restoreTop > 0){myField.scrollTop = restoreTop}
    }
    else{myField.value += myValue}
}

Object.prototype.properties = function()
{
    var props = []
    for (var name in object)
    {
        if (object.hasOwnProperty(name))
        {
            props.push(object[name])
        }
    }
    return props
}
Function.prototype.args = function(){return Array.prototype.slice.call(arguments)}

function showDate()
{
    var d = new Date()
    var curr_date = d.getDate()
    var curr_month = d.getMonth() + 1
    var curr_year = d.getFullYear()
    return curr_date + "-" + curr_month + "-" + curr_year
}
Date.prototype.copy = function()
{
    return new Date(this)
}

function isNumber(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n)
}
Number.prototype.prefix = function(len)
{
    return ("0000000000000000" + this).substr(-len)
}
Number.prototype.equals = function(val){return this === val}
Number.prototype.round = function(i){return this.toFixed(i)}
Number.prototype.toHex = function() {return '0x' + Number(this).toString(16)}

Number.prototype.randomInt = function(min, max)
{
    if (!min){min = 1}
    if (!max){max = 10}
    return Math.floor(Math.random() * (max - min + 1)) + min
}
Number.prototype.randomFloat = function(min, max)
{
    if (!min){min = 1}
    if (!max){max = 10}
    return (Math.random() * (max - min + 1)) + min
}
function random(min, max, round)
{
    round = round || 1
    result = (Math.random()*max)+min
    result *= Math.pow(10, round)
    result = Math.round(result)
    result /= Math.pow(10, round)
    return result
}




        String.prototype.equals             = function(val){return String(this) === String(val)}
        String.prototype.extension          = function(){return String(this).substring(String(this).length-3, String(this).length)}
        String.prototype.is_range           = function(){return String(this).search(/\w\d:\w\d/) != -1}
        String.prototype.is_col             = function(){return String(this).search(/\w/) != -1}
        String.prototype.is_col_range       = function(){return String(this).search(/\w:\w/) != -1}
        String.prototype.is_row             = function(){return String(this).search(/\d/) != -1}
        String.prototype.is_row_range       = function(){return String(this).search(/\d:\d/) != -1}
        String.prototype.is_number          = function(){return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
        String.prototype.isnt_blank         = function(){return String(this).search(/\S/) != -1}
        String.prototype.is_decimal         = function(){return String(this).search(/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/) != -1}
        String.prototype.is_email           = function(){return String(this).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) != -1}
        String.prototype.get_digits         = function(){return String(this).replace(/[^\d]/g, "")}
        String.prototype.is_number          = function(){return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
        String.prototype.is_url             = function(){return /(http:\/\/)?(www\.)?(.+?)(\.com|\.org|\.gov|\.edu)(\/.*?)?/.test(this)}
        String.prototype.strip              = function(){return String(this).replace(new RegExp('</?.+?>', 'g'), '') }
        String.prototype.isInteger          = function(){return /^-?\d+$/.test(this)}
        String.prototype.isPositiveDecimal  = function(){return (!/\D/.test(this)) || (/^\d+\.\d+$/.test(this))}
        String.prototype.isAlphanumeric     = function(){return !(/\W/.test(this))}
        String.prototype.validEmail         = function(){return String(this).match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ===null}
        String.prototype.checkMail          = function(){return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this)}
        String.prototype.onlyLetters        = function(){return String(this).toLowerCase().replace(/[^a-z]/g, "") }
        String.prototype.onlyLettersNums    = function(){return String(this).toLowerCase().replace(/[^a-z,0-9,-]/g, "")}
        String.prototype.trim               = function(){return String(this).replace(/^\s+|\s+$/g, "");}
        String.prototype.ltrim              = function(){return String(this).replace(/^\s+/,'')}
        String.prototype.rtrim              = function(){return String(this).replace(/\s+$/,'')}
        String.prototype.ftrim              = function(){return String(this).replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ')}
        String.prototype.toNumber = function() {parseInt(String(this), 16)}
        String.prototype.chomp              = function(i){this.substring(0, this.length-i)}



        String.prototype.escape = function()
        {
            var replacements ={"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"}
            return this.replace(/[<>&"]/g, function(character){return replacements[character]})
        }

        String.prototype.namespace = function (obj)
        {
            var c, b = this.split('.'), p = window
            while (c = b.shift())
            {
                p = (p[c] = (p[c] ||{}))
            }
            if (typeof obj === 'object')
            {
                for (var k in obj)
                {
                    p[k] = obj[k]
                }
            }
            return p
        }
        String.prototype.repeat = function (n){return new Array((n || 1) + 1).join(this)}
        String.prototype.format = function()
        {
            var pattern = /\{\d+\}/g
            var args = arguments
            return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; })
        }
        String.prototype.reverse = function()
        {
            return this.split('').reverse().join('')
        }
        function generateRandomAlphaNum(len)
        {
            var rdmstring = ""
            for(; rdmString.length < len; rdmString += Math.random().toString(36).substr(2))
            {
                return rdmString.substr(0, len)
            }
        }
        function baseConvert(src, srcAlphabet, dstAlphabet, caps)
        {
            alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"

            if (caps == true)
            {
                alphabet = alphabet.toUpperCase()
            }
            if (typeof src === "number")
            {
                src = String(src)
            }
            if (typeof srcAlphabet !== typeof dstAlphabet)
            {
                TypeError("Alphabet types don't match. ")
            }
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
                val  += mlt * srcAlphabet.indexOf(digit)
                wet         = wet.substring(0, wet.length - 1)
                mlt  *= srcBase
            }
            wet         = val
            var ret     = ""
            while (wet >= dstBase)
            {
                var digitVal = wet % dstBase
                var digit       = dstAlphabet.charAt(digitVal)
                ret         = digit + ret
                wet /= dstBase
            }
            var digit       = dstAlphabet.charAt(wet)
            return digit + ret
        }
        function base26(value)
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
            {
                return converted
            }
        }
        // function CreateTranslator(translationTable)
        // {
        //     return function(s)
        //     {
        //         s.replace(new RegExp([k for (k in translationTable)].join('|'), 'g'), function(str) translationTable[str])
        //     }
        // }
// var translationTable ={ a:1, bb:2, b:3, c:4 }
// var MyTranslater = CreateTranslator(translationTable)
// MyTranslater('aabbbc'); // returns: 11234


// function charCodes()
// {
//  Array.map('foo', function(x){ return String.charCodeAt(x) }) // is [112,111,111]
//  [String.charCodeAt(x) for each (x in 'foo')] // is [112,111,111]
// }

function isArray(obj){return Object.prototype.toString.call(obj) === '[object Array]'}
Array.prototype.combine = function(arr){return Array.prototype.push.apply(this, arr)}
Array.prototype.range = function(start, end, step)
{
    var range = []
    var typeofStart = typeof start
    var typeofEnd = typeof end

    if (step === 0)
    {
        throw TypeError("Step cannot be zero.")
    }
    if (typeofStart == "undefined" || typeofEnd == "undefined")
    {
        throw TypeError("Must pass start and end arguments.")
    }
    else if (typeofStart != typeofEnd)
    {
        throw TypeError("Start and end arguments must be of same type."+typeofStart+typeofEnd)
    }
    typeof step == "undefined" && (step = 1)
    if (end < start)
    {
        step = -step
    }
    if (typeofStart == "number")
    {
        while (step > 0 ? end >= start : end <= start)
        {
            range.push(start)
            start += step
        }
    }
    else if (typeofStart == "string")
    {
        if (start.length != 1 || end.length != 1)
        {
            throw TypeError("Only strings with one character are supported.")
        }
        start = start.charCodeAt(0)
        end = end.charCodeAt(0)
        while (step > 0 ? end >= start : end <= start)
        {
            range.push(String.fromCharCode(start))
            start += step
        }
    }
    else
    {
        throw TypeError("Only string and number types are supported")
    }
    return range
}


Array.prototype.shuffle     = function()    {return this.sort(function(){return Math.random() - 0.5})}
Array.prototype.empty       = function()    {this.length = 0}
Array.prototype.delete      = function(i)   {this.splice(i, 1)}
Array.prototype.remove      = function(el)  {!!let (pos=this.lastIndexOf(el)); pos != -1 && this.splice(pos, 1)}
Array.prototype.truncate    = function(i)   {this.length = (this.length - i); return this.length}
Array.prototype.max         = function()    {return Math.max.apply(Math, this)}
Array.prototype.min         = function()    {return Math.min.apply(Math, this)}
Array.prototype.getRand     = function()    {return this[Math.floor(Math.random() * this.length)]}
Array.prototype.sort        = function()    {var tmp; for(var i = 0; i < this.length; i++){for(var j = 0; j < this.length; j++){if(this[i] < this[j]){tmp = this[i]; this[i] = this[j]; this[j] = tmp}}}}
Array.prototype.unshift     = function(el)  {this[this.length] = null; for(var i = 1; i < this.length; i++){this[i] = this[i-1]}; this[0] = el; return this.length}
Array.prototype.shift       = function()    {var result = this[0]; for(var i = 1; i < this.length; i++){this[i-1] = this[i]}; this.length = this.length-1; return result}
Array.prototype.clear       = function()    {this.length = 0}
Array.prototype.unique      = function()    {var a = [],i; this.sort(); for(i = 0; i < this.length; i++){if(this[i] !== this[i + 1]){a[a.length] = this[i]}}; return a}
Array.prototype.lastIndexOf = function(n)   {var i = this.length; while(i--){if(this[i] === n){return i}}; return -1}
Array.prototype.contains    = function(el)  {for (var i = 0; i < this.length; i++){if (this[i] == el){return true}}; return false}
Array.prototype.remove      = function(el)  {var i = 0; while (i < this.length){if (this[i] == el){this.splice(i, 1)} else{i++}}}
Array.prototype.inArray     = function(val){for (var i = 0; i < this.length; i++){if (this[i] === val){return true}}; return false}
Array.prototype.append      = function(el)  {this.push(el); return this.length}
Array.prototype.chunk       = function(arr, n){var result = []; for (i = 0; i < arr.length; i += n){result.push(arr.slice(i, i+n))} return result}
Array.prototype.sum         = function()
{
    var sum = 0
    for (var i in this)
    {
        if (!this.hasOwnProperty(i))
        {
            continue
        }
        sum += parseFloat(this[i])
    }
    return sum
}
Array.prototype.ave         = function(){return this.sum()/this.length}
Array.prototype.dev = function()
{
    var mean = comp_ave(this)
    var dev = 0
    for (i in this)
    {
        this[i] = (this[i] - mean)
    }
    for (i in this)
    {
        this[i] = (this[i] * this[i])
    }
    for (i in this)
    {
        dev += this[i]
    }
    dev /= (this.length-1)
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
var average = function()
{
    for (var i=0, total = 0, len=arguments.length; i<len; i++)
    {
        total += arguments[i]
    }
    return total / arguments.length
}

Complex = new function()
{
    function Complex(a, b)
    {

    }
    this.fromCartesian = function(real, mag)
    {
        return new Complex(real, imag)
    }
    this.fromPolar = function(rho, theta)
    {
        return new Complex(rho * Math.cos(theta), rho * Math.sin(theta))
    }
}
var c = Complex.fromPolar(1, Math.pi)




function Color(r, g, b, a)
{
    if (!a)
    {
        a = 1
    }

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
                hex[nr] = "0" + val
            }
        })
        return hex.join("").toUpperCase()
    }

    this.hex2rgb = function(hex)
    {
        R = hexToR(hex)
        G = hexToG(hex)
        B = hexToB(hex)
        return "rgb("+R+", "+G+", "+B+")"
    }
    function hexToR(h){return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h){return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h){return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h){return (h.charAt(0)=="#") ? h.substring(1,7):h}

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

        var letters = '0123456789ABCDEF'.split('')
        var color = '#'
        for (var i = 0; i < 6; i++)
        {
            color += letters[Math.round(Math.random() * 15)]
        }
        return color
    }

    return this
}

var colors =
[{"hex":"F0F8FF", "name":"aliceblue"},{"hex":"FFA07A", "name":"lightsalmon"},{"hex":"FAEBD7", "name":"antiquewhite"},{"hex":"20B2AA", "name":"lightseagreen"},{"hex":"00FFFF", "name":"aqua"},{"hex":"87CEFA", "name":"lightskyblue"},{"hex":"7FFFD4", "name":"aquamarine"},{"hex":"778899", "name":"lightslategray"},{"hex":"F0FFFF", "name":"azure"},{"hex":"B0C4DE", "name":"lightsteelblue"},{"hex":"F5F5DC", "name":"beige"},{"hex":"FFFFE0", "name":"lightyellow"},{"hex":"FFE4C4", "name":"bisque"},{"hex":"00FF00", "name":"lime"},{"hex":"000000", "name":"black"},{"hex":"32CD32", "name":"limegreen"},{"hex":"FFEBCD", "name":"blanchedalmond"},{"hex":"FAF0E6", "name":"linen"},{"hex":"0000FF", "name":"blue"},{"hex":"FF00FF", "name":"magenta"},{"hex":"8A2BE2", "name":"blueviolet"},{"hex":"800000", "name":"maroon"},{"hex":"A52A2A", "name":"brown"},{"hex":"66CDAA", "name":"mediumaquamarine"},{"hex":"DEB887", "name":"burlywood"},{"hex":"0000CD", "name":"mediumblue"},{"hex":"5F9EA0", "name":"cadetblue"},{"hex":"BA55D3", "name":"mediumorchid"},{"hex":"7FFF00", "name":"chartreuse"},{"hex":"9370DB", "name":"mediumpurple"},{"hex":"D2691E", "name":"chocolate"},{"hex":"3CB371", "name":"mediumseagreen"},{"hex":"FF7F50", "name":"coral"},{"hex":"7B68EE", "name":"mediumslateblue"},{"hex":"6495ED", "name":"cornflowerblue"},{"hex":"00FA9A", "name":"mediumspringgreen"},{"hex":"FFF8DC", "name":"cornsilk"},{"hex":"48D1CC", "name":"mediumturquoise"},{"hex":"DC143C", "name":"crimson"},{"hex":"C71585", "name":"mediumvioletred"},{"hex":"00FFFF", "name":"cyan"},{"hex":"191970", "name":"midnightblue"},{"hex":"00008B", "name":"darkblue"},{"hex":"F5FFFA", "name":"mintcream"},{"hex":"008B8B", "name":"darkcyan"},{"hex":"FFE4E1", "name":"mistyrose"},{"hex":"B8860B", "name":"darkgoldenrod"},{"hex":"FFE4B5", "name":"moccasin"},{"hex":"A9A9A9", "name":"darkgray"},{"hex":"FFDEAD", "name":"navajowhite"},{"hex":"006400", "name":"darkgreen"},{"hex":"000080", "name":"navy"},{"hex":"BDB76B", "name":"darkkhaki"},{"hex":"FDF5E6", "name":"oldlace"},{"hex":"8B008B", "name":"darkmagenta"},{"hex":"808000", "name":"olive"},{"hex":"556B2F", "name":"darkolivegreen"},{"hex":"6B8E23", "name":"olivedrab"},{"hex":"FF8C00", "name":"darkorange"},{"hex":"FFA500", "name":"orange"},{"hex":"9932CC", "name":"darkorchid"},{"hex":"FF4500", "name":"orangered"},{"hex":"8B0000", "name":"darkred"},{"hex":"DA70D6", "name":"orchid"},{"hex":"E9967A", "name":"darksalmon"},{"hex":"EEE8AA", "name":"palegoldenrod"},{"hex":"8FBC8F", "name":"darkseagreen"},{"hex":"98FB98", "name":"palegreen"},{"hex":"483D8B", "name":"darkslateblue"},{"hex":"AFEEEE", "name":"paleturquoise"},{"hex":"2F4F4F", "name":"darkslategray"},{"hex":"DB7093", "name":"palevioletred"},{"hex":"00CED1", "name":"darkturquoise"},{"hex":"FFEFD5", "name":"papayawhip"},{"hex":"9400D3", "name":"darkviolet"},{"hex":"FFDAB9", "name":"peachpuff"},{"hex":"FF1493", "name":"deeppink"},{"hex":"CD853F", "name":"peru"},{"hex":"00BFFF", "name":"deepskyblue"},{"hex":"FFC0CB", "name":"pink"},{"hex":"696969", "name":"dimgray"},{"hex":"DDA0DD", "name":"plum"},{"hex":"1E90FF", "name":"dodgerblue"},{"hex":"B0E0E6", "name":"powderblue"},{"hex":"B22222", "name":"firebrick"},{"hex":"800080", "name":"purple"},{"hex":"FFFAF0", "name":"floralwhite"},{"hex":"FF0000", "name":"red"},{"hex":"228B22", "name":"forestgreen"},{"hex":"BC8F8F", "name":"rosybrown"},{"hex":"FF00FF", "name":"fuchsia"},{"hex":"4169E1", "name":"royalblue"},{"hex":"DCDCDC", "name":"gainsboro"},{"hex":"8B4513", "name":"saddlebrown"},{"hex":"F8F8FF", "name":"ghostwhite"},{"hex":"FA8072", "name":"salmon"},{"hex":"FFD700", "name":"gold"},{"hex":"FAA460", "name":"sandybrown"},{"hex":"DAA520", "name":"goldenrod"},{"hex":"2E8B57", "name":"seagreen"},{"hex":"808080", "name":"gray"},{"hex":"FFF5EE", "name":"seashell"},{"hex":"008000", "name":"green"},{"hex":"A0522D", "name":"sienna"},{"hex":"ADFF2F", "name":"greenyellow"},{"hex":"C0C0C0", "name":"silver"},{"hex":"F0FFF0", "name":"honeydew"},{"hex":"87CEEB", "name":"skyblue"},{"hex":"FF69B4", "name":"hotpink"},{"hex":"6A5ACD", "name":"slateblue"},{"hex":"CD5C5C", "name":"indianred"},{"hex":"708090", "name":"slategray"},{"hex":"4B0082", "name":"indigo"},{"hex":"FFFAFA", "name":"snow"},{"hex":"FFFFF0", "name":"ivory"},{"hex":"00FF7F", "name":"springgreen"},{"hex":"F0E68C", "name":"khaki"},{"hex":"4682B4", "name":"steelblue"},{"hex":"E6E6FA", "name":"lavender"},{"hex":"D2B48C", "name":"tan"},{"hex":"FFF0F5", "name":"lavenderblush"},{"hex":"008080", "name":"teal"},{"hex":"7CFC00", "name":"lawngreen"},{"hex":"D8BFD8", "name":"thistle"},{"hex":"FFFACD", "name":"lemonchiffon"},{"hex":"FF6347", "name":"tomato"},{"hex":"ADD8E6", "name":"lightblue"},{"hex":"40E0D0", "name":"turquoise"},{"hex":"F08080", "name":"lightcoral"},{"hex":"EE82EE", "name":"violet"},{"hex":"E0FFFF", "name":"lightcyan"},{"hex":"F5DEB3", "name":"wheat"},{"hex":"FAFAD2", "name":"lightgoldenrodyellow"},{"hex":"FFFFFF", "name":"white"},{"hex":"90EE90", "name":"lightgreen"},{"hex":"F5F5F5", "name":"whitesmoke"},{"hex":"D3D3D3", "name":"lightgrey"},{"hex":"FFFF00", "name":"yellow"},{"hex":"FFB6C1", "name":"lightpink"},{"hex":"9ACD32", "name":"yellowgreen"}//,
//{"hex":"'aqua'/'cyan'"},
//{"hex":"'gray'/'grey'"},
//{"hex":"'magenta'/'fuchsia'"}
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
            if (x == name){return unescape(y)}
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



(function($)
{
    $.file_get_contents = function(address)
    {
        return $.ajax({url: address, async: false}).responseText
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
        for (var i = 0; i < n; i++){result += input}
        return result
    }
    $.fn.confirm = function(mode)
    {
        if (mode == 1)  {window.onbeforeunload = function(){return "Please Confirm."}}
        else            {window.onbeforeunload = function(){}}
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
                if  (i == 0)
                {
                    result += "<th class='col'>"+String.fromCharCode(64 + j)+"</th>"
                }
                else if (j == 0)
                {
                    result += "<th class='row'>"+i+"</th>"
                }
                else
                {
                    result += "<td></td>"
                }
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
        this.each(function(){max = Math.max(max, $(this).height())})
        return max
    }
    $.fn.maxWidth = function()
    {
        var max = 0
        this.each(function(){max = Math.max(max, $(this).width())})
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
            var attributes = $.map(this.attributes, function(item){return item.name})
            var el = $(this)
            $.each(attributes, function(i, item){el.removeAttr(item)})
        })
    }
    $.fn.center = function()
    {
        $(this).css("position", "absolute")
        $(this).css("top",  ($(window).height() - $(this).height()) / 2 + $(window).scrollTop() + "px")
        $(this).css("left", ($(window).width()  - $(this).width())  / 2 + $(window).scrollLeft() + "px")
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
        return{width: w, height: h}
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














function Brainfuck()
{
    var code = '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.'
    var inp = '23\n'
    var out = ''

    var codeSize = code.length
    var i = 0, ip = 0, cp = 0, dp = 0, m ={}

    var loopIn ={}, loopOut ={}
    var tmp = []
    for (var cp = 0; cp < codeSize; cp++)
    {
        if (code[cp] == '[')
        {
            tmp.push(cp)
        }
        else if (code[cp] == ']')
        {
            loopOut[loopIn[cp] = tmp.pop()] = cp
        }

        for (var cp = 0; cp < codeSize && i < 100000; cp++, i++)
        {
            switch(code[cp])
            {
                case '>': dp++; break
                case '<': dp--; break
                case '+': m[dp] = ((m[dp]||0)+1)&255; break
                case '-': m[dp] = ((m[dp]||0)-1)&255; break
                case '.': out += String.fromCharCode(m[dp]); break
                case ',': m[dp] = inp.charCodeAt(ip++)||0; break
                case '[': m[dp]||(cp=loopOut[cp]); break
                case ']': cp = loopIn[cp]-1; break
            }
        }
        Print(out)
    }
}


// function Thread(name)
// {
//  for (var i = 0; i < 5; i++)
//  {
//      Print(name+': '+i)
//      yield
//  }
// }

// //// thread management
// var threads = []

// // thread creation
// threads.push(new Thread('foo'))
// threads.push(new Thread('bar'))

// // scheduler
// while (threads.length)
// {
//  var thread = threads.shift()
//  try
//  {
//      thread.next()
//      threads.push(thread)
//  }
//  catch(ex if ex instanceof StopIteration){}
// }




