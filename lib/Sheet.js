
function Sheet(rows, cols)
{

	this.rows = rows
	this.cols = cols


	this.generate = function(rows, cols)
	{
		var result = ""
		result += "<table>"
		for(r in _.range(rows))
		{
			result += "<tr>"
			for(c in _.range(cols))
			{
				result += ((r == 0 || c == 0) ? "<th>" : "<td>")
				result += "<input type='text' />"
				result += ((r == 0 || c == 0) ? "</th>" : "</td>")
			}
			result += "</tr>"
		}
		result += "</table>"
		return result
	}

	this.content = this.generate(this.rows, this.cols)
	this.element = $(this.content)

	var table = this.element

	this.activate = function()
	{
		var pressed = false
		var x1 = ""
		var y1 = ""
		var x2 = ""
		var y2 = ""

		table.find("input").each(function()
		{
			$(this).mousedown(function()
			{
				unselect()
				select($(this))
				x1 = $(this).parent().index()
				y1 = $(this).parents("tr").index()
				pressed = true
			})
			$(this).mouseup(function()
			{
				select($(this))
				pressed = false
			})
		})
		table.find("input").mouseover(function()
		{
			if (pressed == true)
			{
				x2 = $(this).parent().index()
				y2 = $(this).parents("tr").index()
				unselect()
				box(x1, y1, x2, y2)
			}
		})

		table.find("input").keydown(function(e)
		{
			if (e.which == 9)	{e.preventDefault(); $(this).parents("th, td").next("th, td").find("input").focus().mousedown()}
			if (e.shiftKey && e.which == 9)	{e.preventDefault(); $(this).parents("th, td").prev("th, td").find("input").focus().mousedown()}
			if (e.which == 13)	{$(this).parents("tr").next("tr").find("th, td").find("input").eq($(this).parent().index()).focus().mousedown()}
			if (e.shiftKey && e.which == 13)	{$(this).parents("tr").prev("tr").find("th, td").find("input").eq($(this).parent().index()).focus().mousedown()}
			if (e.which == 37) 	{$(this).parents("th, td").prev("th, td").find("input").focus().mousedown()}
			if (e.which == 38) 	{$(this).parents("tr").prev("tr").find("th, td").find("input").eq($(this).parent().index()).focus().mousedown()}
			if (e.which == 39) 	{$(this).parents("th, td").next("th, td").find("input").focus().mousedown()}
			if (e.which == 40) 	{$(this).parents("tr").next("tr").find("th, td").find("input").eq($(this).parent().index()).focus().mousedown()}
		})

		table.find("tr").eq(0).find("th input").mousedown(function(e)
		{
			e.originalEvent.preventDefault()

			var drag = true
			var start = $(this).width()
			var index = $(this).parent().index()
			var move = e.pageX

			$(document).mousemove(function(e)
			{
				if(drag)
				{
					table.find("tr").each(function()
					{
						var offset = e.pageX-move+start
						$(this).find("th, td").eq(index).width(offset)
						$(this).find("th input, td input").eq(index).width(offset)
					})
				}
			})

			$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
		})
		table.find("tr:not(:eq(0)) th input").mousedown(function(e)
		{
			e.originalEvent.preventDefault()

			var drag = true
			var start = $(this).height()
			var index = $(this).parents("tr").index()
			var move = e.pageY

			$(document).mousemove(function(e)
			{
				if(drag)
				{
					var offset = e.pageY-move+start
					table.find("tr").eq(index).find("th input, td input").each(function()
					{
						$(this).height(offset)
						$(this).parent().height(offset)
					})
				}
			})
			$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
		})
	}

	function unselect()
	{
		table.find(".hover").removeClass("hover")
	}

	function select(el)
	{

		if (el.parent().index() < 1)
		{
			el.parents("tr").find("input").addClass("hover")
			return
		}
		if (el.parents("tr").index() < 1)
		{
			// alert(el.parents("th, td").index())
			var col = getcol(el.parents("th, td").index())
			col.each(function() {$(this).addClass("hover")})

			return
		}
		el.addClass("hover")
		el.parents("tr").find("th input").addClass("hover")
		el.parents("tbody").find("tr").eq(0).find("th input").eq(el.parent().index()).addClass("hover")
	}

	function getrow(n)
	{
		return table.find("tr").eq(n).find("input")
	}

	function getcol(n)
	{
		var result = $()

		table.find("tr").each(function()
		{
			result = result.add($(this).find("input").eq(n))
		})
		return result
	}

	function box(x1, y1, x2, y2)
	{
		table.find("input").each(function()
		{
			var x = $(this).parent().index()
			var y = $(this).parents("tr").index()

			if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && y >= Math.min(y1, y2) && y <= Math.max(y1, y2))
			{
				select($(this))
			}
		})
	}

	this.data = function(delimiter)
	{
		var result = ''

		table.find('tr').each(function(i)
		{
			$(this).find('th, td').each(function(j)
			{
				if ($(this).children().length == 0)
				{
					result += $(this).html().trim().replace("&nbsp;", "").replace(/(<([^>]+)>)/ig, "")
				}
				else
				{
					result += $(this).children().eq(0).html().trim().replace("&nbsp;", "").replace(/(<([^>]+)>)/ig, "")
				}
				result += delimiter
			})
			result = result.substring(0, result.length-delimiter.length)
			result += "\n"
		})

		return result
	}

	this.activate()

}









	$.fn.spreadsheet = function()
	{




		//row and column resizing
		spreadsheet.find(".col").mousedown(function(e)
		{
			//if (!multiple) {return}
			e.originalEvent.preventDefault()
			drag = true
			start = $(this).width()
			move = e.pageX
			x = this.cellIndex-1
			$(document).mousemove(function(e)
			{
				if(drag)
				{
					spreadsheet.find("tr").each(function()
					{
						$(this).find("td").eq(x).width(e.pageX-move+start)
						$(this).find(".cell").eq(x).width(e.pageX-move+start)
					})
				}
			})
			$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
		})
		spreadsheet.find('.row').mousedown(function(e)
		{
			//if (!multiple) {return}
			e.originalEvent.preventDefault()
			drag = true
			start = $(this).width()
			move = e.pageY
			y = this.parentNode.rowIndex
			$(document).mousemove(function(e)
			{
				if(drag)
				{
					spreadsheet.find("tr").eq(y).find("th, td, th input, td input").each(function()
					{
						$(this).height(e.pageY-move+start)
					})
				}
			})
			$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
		})



})
(jQuery)

function coordinates(cell)
{
	return [cell[0].getAttribute("x"), cell[0].getAttribute("y")]
}
function updatefilelist()
{
	$.post("ursql.php", {"mode":"show files"}, function(d)
	{
		$("#filechoice").html(d)
		$("#filechoice").height(60).width(150)
		$("#filechoice").click(function()
		{
			clear_contents()
			$.post("ursql.php", {"mode":"show file", "file":$(this).val()}, function(d){datatocells(d)}, "json")
		})
	},
	'text')
}

function normalizeheaders()
{
	$(".visible").find("thead tr th .cell").each(function(i) {$(this).val(base26(i)); $(this).addClass("col")})
	$(".visible").find("tbody tr th .cell").each(function(j) {$(this).val(j+1); $(this).addClass("row")})
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
	return converted
}



function highlight()
{
	$(".cell").each(function()
	{
		if (is_number($(this).val()))	 {$(this).css({"text-align":"right"})}
		else														{$(this).css({"text-align":"left"})}
		if (is_url($(this).val()))			{$(this).css({"text-decoration":"underline", "color":"darkblue"})}
		else														{$(this).css({"text-decoration":"", "color":""})}
	})
}


function dimensions(r)
{
	var minx = $("#spreadsheet tbody tr").size()
	var miny = $("#spreadsheet thead tr th").size()
	var maxx = 0
	var maxy = 0
	$(".selected").each(function()
	{
		var x = $(this)[0].parentNode.cellIndex
		var y = $(this)[0].parentNode.parentNode.rowIndex
		if (x > maxx) {maxx = x}
		if (y > maxy) {maxy = y}
		if (x < minx) {minx = x}
		if (y < miny) {miny = y}
	})
	if (r == 2) {return [(maxx-minx), (maxy-miny)]}
	if (r == 4) {return [minx-1, maxx, miny-1, maxy]}
	if (r == 6) {return [minx-1, maxx, miny-1, maxy, (maxx-minx+1), (maxy-miny+1)]}
}
function max_dimensions()
{
	var y = $("#spreadsheet tbody").children("tr").length
	var x = $("#spreadsheet thead tr th").length-1

	var maxx = 0
	var maxy = 0

	for (j = 0; j < y; j++)
	{
		var rowx = 0
		var s = ""
		for (i = 0; i < x; i++)
		{
			c = $("#spreadsheet tbody").children("tr").eq(j).children("td").eq(i).children("input").val()
			if (c != "") {rowx++}
			s += c
		}
		if (rowx > maxx)		{maxx = rowx}
		if (s != "")				{maxy++}
	}
	return [maxx, maxy]
}


//highlighting by range selection
$("#main").keyup(function()
{
	var input = $(this).val()
	if (is_row_range(input))
	{
		var y1 = input[0]
		var y2 = input[2]
		box(0, y1, 0, y2)
	}
	else if (is_row(input))
	{
		$("#spreadsheet tbody tr").eq(input-1).children(".row").mousedown()
	}
	else if (is_col_range(input))
	{
		var x1 = input.charCodeAt(0)-64
		var x2 = input.charCodeAt(2)-64
		box(x1, 0, x2, 0)
	}
	else if (is_col(input))
	{
		var c = input.charCodeAt(0)-96
		$("#spreadsheet thead tr").children(".col").eq(c-1).mousedown()
	}
	else if (is_range(input))
	{
		var x1 = input.charCodeAt(0)-64
		var y1 = input[1]
		var x2 = input.charCodeAt(3)-64
		var y2 = input[4]
		select(x1, y1, x2, y2)
	}
	else
	{
		$(".selected").each(function() {$(this).removeClass("selected")})
		$(".selected_th").each(function() {$(this).removeClass("selected_th")})
	}
	$(this).focus()
})




//automatic parsing on paste
$(".cell").bind('paste', function()
{
	var l = $(this)
	setTimeout(function()
	{
		var d = $("#delimit option:selected").val()
		var t = l.val()
		t = t.split(d)
		for (i in t)
		{
			$(".selected").eq(i).parent().parent().next("tr").children("td").eq($(".selected").eq(i)[0].parentNode.cellIndex-1).children(".cell").addClass("selected")
			$(".selected").eq(i).val(t[i])
		}
		$(".selected").eq(t.length).removeClass("selected")
	}, 100)
})




function import_csv(file)
{
	if (file == null) {return}
	cdata = []
	$.post(
		"spreadsheet.php",
		{"mode":"1",
		"filename":file},
		function(data)
		{
			cdata = data.split("\n")
			for (var i in cdata)
			{
				cdata[i] = cdata[i].split(",")
			}
			for (var i = 0; i < cdata.length; i++)
			{
				for (var j = 0; j < cdata[i].length; j++)
				{
					$(".displayed tbody").children("tr").eq(i).children("td").eq(j).children("input").val(cdata[i][j])
				}
			}
		},
		"text"
	)
}

function save()
{
	var cell_string = ""
	var x = parseInt($("#x2").html())
	var y = parseInt($("#y2").html())
	for (var j = 1; j <= y; j++)
	{
		for (var i = 1; i < x; i++)
		{
			cell_string += $(".displayed").children("tr").eq(j).children("td").eq(i).children("input").val() + ","
		}
		cell_string += $(".displayed").children("tr").eq(j).children("td").eq(x).children("input").val() + "\n"
	}
	$.post(
		"spreadsheet.php",
		{
			"mode":"2",
			"fileurl":$("#filename").val(),
			"filecontents":cell_string
		},
		function(data)
		{
			updatefilelist()
		},
		"text"
	)
}

function export_csv()
{
	var cell_string = ""
	var x = parseInt($("#x2").html())
	var y = parseInt($("#y2").html())
	for (var j = 0; j <= y; j++)
	{
		for (var i = 0; i < x; i++)
		{
			cell_string += $(".displayed tbody").children("tr").eq(j).children("td").eq(i).children(".cell").val() + ","
		}
		cell_string += $(".displayed tbody").children("tr").eq(j).children("td").eq(x).children(".cell").val() + "\n"
	}
	$.post
	(
		"spreadsheet.php",
		{"mode":"2",
		"fileurl":$("#filename").val(),
		"filecontents":cell_string},
		function(data)
		{
			window.open(data, 'Download')
		},
		"text"
	)
}














function select(x, y, s)
{
	if (y == 0)
	{
		$(".visible").find("tr").each(function() {$(this).find(".cell").eq(x).addClass('selected')})
		$(".visible").find("tr:not(:first)").each(function() {$(this).find(".cell").eq(0).addClass('selected')})
		return
	}
	if (x == 0)
	{
		$(".visible").find("tr").eq(y).find(".cell").each(function() {$(this).addClass('selected')})
		$(".visible").find("tr").eq(0).find(".cell:not(:first)").each(function() {$(this).addClass('selected')})
		return
	}
	$(".visible").find("tr").eq(0).find(".cell").eq(x).addClass('selected')
	$(".visible").find("tr").eq(y).find(".cell").eq(0).addClass('selected')
	$(".visible").find("tr").eq(y).find(".cell").eq(x).addClass('selected')
	if (s == true) {trackcells(x, y, x, y)}
}
function select_cell(cell, s)
{
	select(cell.attr("x"), cell.attr("y"), s)
}
function unselect(x, y)
{
	if (y == 0)
	{
		$(".visible").find("tr").each(function() {$(this).find(".cell").eq(x).removeClass('selected')})
		$(".visible").find("tr:not(:first)").each(function() {$(this).find(".cell").eq(0).removeClass('selected')})
		return
	}
	if (x == 0)
	{
		$(".visible").find("tr").eq(y).find(".cell").each(function() {$(this).removeClass('selected')})
		$(".visible").find("tr").eq(0).find(".cell:not(:first)").each(function() {$(this).removeClass('selected')})
		return
	}
	$(".visible").find("tr").eq(0).find(".cell").eq(x).removeClass('selected')
	$(".visible").find("tr").eq(y).find(".cell").eq(0).removeClass('selected')
	$(".visible").find("tr").eq(y).find(".cell").eq(x).removeClass('selected')
	trackcells(x, y, x, y)
}




$(".cell").dblclick(function(e)
{
	var s = $(this)
	var c = $(this).val()
	var edit = $("#spreadsheet").append("<div id='tooltip'><input type='text' value="+c+"></input></div>")
	$("#tooltip").css({"position":"fixed", "left":e.pageX-150, "top":e.pageY-10, "width":"300px", "height":"20px", "z-index":"5"})
	$("#tooltip input").css({"background-color":"yellow", "width":"100%", "height":"100%"})
	$("#tooltip input").focus()
	$("#tooltip input").keyup(function() {s.val($(this).val())})
	$("#tooltip input").blur(function(){$("#tooltip").remove()})
	$("#tooltip input").keyup(function(e) {if (e.which == 13) {$("#tooltip").remove()}})
})



$("#getAdjacencyList").click(function()
{
	var edges = []
	var graph = ""
	for (var j = gety1(); j <= gety2(); j++)
	{
		var head = $(".visible tr").eq(j).find("td .cell").eq(0)
		for (var i = getx1(); i <= getx2(); i++)
		{
			var cell = $(".visible tr").eq(j).find("td .cell").eq(i)
			if (!cell.hasClass("selected")) {continue}
			if (cell.val() != "")
			{
				edges.push([head.val(), cell.val()])
				graph += head.val()+"-"+cell.val()+","
			}
		}
	}
	showGraph(graph)
})
$("#getAdjacencyMatrix").click(function()
{
	var edges = []
	var graph = ""
	for (var j = gety1(); j <= gety2(); j++)
	{
		for (var i = getx1(); i <= getx2(); i++)
		{
			cell = $(".visible tr").eq(j).find(".cell").eq(i)
			if (!cell.hasClass("selected")) {continue}
			if (cell.val() == 1)
			{
				head = $(".visible tr").eq(j).find(".cell").eq(1).val()
				left = $(".visible tr").eq(1).find(".cell").eq(i).val()
				edges.push([head, left])
				graph += head+"-"+left+","
			}
		}
	}
	showGraph(graph)
})

(function($)
{

	// Makes multi-select much easier to use
	$.fn.twosidedmultiselect = function()
	{
		var select1 = $(this)
		select1.wrap("<div class='multiselect-div' />")
		var selectdiv = $(this).parents(".multiselect-div")
		var select2 = select1.clone()
		select1.after(select2)
		select1.attr("name", "")
		select1.attr("side", "left")
		select2.attr("side", "right")

		if (select1.find('option[selected="selected"]').length > 0)
		{
			select2.html(select1.find('option[selected="selected"]'))
		}
		else
		{
			select2.find('option').remove()
		}
		selectdiv.find('option').click(function()
		{
			if ($(this).parent().attr("side") == "left")
			{
				select2.append($(this))
				select1.remove($(this))
			}
			else
			{
				select1.append($(this))
				select2.remove($(this))
			}
		})
	}


})
(jQuery)


toggle: function(fn) 
{
	//	 Save reference to arguments for access in closure
	var args = arguments,
	guid = fn.guid || jQuery.guid++,
	i = 0,
	toggler = function(event) 
	{
		//	 Figure out which function to execute
		var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i
		jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1)

		//	 Make sure that clicks stop
		event.preventDefault()

		//	 and execute the function
		return args[lastToggle].apply(this, arguments) || false
	}

	//	 link all the functions, so any of them can unbind this click handler
	toggler.guid = guid
	while (i < args.length)
	{
		args[i++].guid = guid
	}

	return this.click(toggler)
},


dbltoggle: function(fn) 
{
	//	 Save reference to arguments for access in closure
	var args = arguments,
	guid = fn.guid || jQuery.guid++,
	i = 0,
	dblToggler = function(event) 
	{
		//	 Figure out which function to execute
		var lastDblToggle = (jQuery._data(this, "lastDblToggle" + fn.guid) || 0) % i
		jQuery._data(this, "lastDblToggle" + fn.guid, lastDblToggle + 1)

		//	 Make sure that clicks stop
		event.preventDefault();

		//	 and execute the function
		return args[lastDblToggle].apply(this, arguments) || false
	}

	//	 link all the functions, so any of them can unbind this click handler
	dblToggler.guid = guid
	while (i < args.length)
	{
		args[i++].guid = guid
	}

	return this.dblclick(dblToggler)
},

val: function(value)
{
	var ret, hooks, isFunction, elem = this[0]

	if (!arguments.length)
	{
		if (elem)
		{
			hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]
			if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {return ret}
			ret = elem.value

			return typeof ret === "string" ?
				// handle most common string cases
				ret.replace(rreturn, "") :
				// handle cases where value is null/undef or number
				ret == null ? "" : ret
		}
		return
	}

	isFunction = jQuery.isFunction(value)

	return this.each(function(i)
	{
		var val
		if (this.nodeType !== 1) {return}

		if (isFunction) {val = value.call(this, i, jQuery(this).val())}
		else {val = value}

		// Treat null/undefined as ""; convert numbers to string
		if (val == null) {val = ""}
		else if (typeof val === "number") {val += ""}
		else if (jQuery.isArray(val)) {val = jQuery.map(val, function (value) {return value == null ? "" : value + ""})}

		hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]

		// If set returns undefined, fall back to normal setting
		if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined)
		{
			this.value = val
		}
	})
}


$("#adddatabase").click(function()
{
	adddatabase = prompt("Enter name of new database: ")
	$.post("ursql.php", {"mode":"add database", "database":adddatabase}, function() {show_databases()}, "text")
})
$("#renamedatabase").click(function()
{
	renamedatabase = prompt("Enter new name of database \""+$("#databases select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename database",
			"database":$("#databases select").val(),
			"newname":renamedatabase
		},
		function(d) {alert(d); show_databases()},
		"text"
	)
})
$("#removedatabase").click(function()
{
	if (!confirm("Remove database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"remove database", "database":$("#databases select").val()}, function() {show_databases()}, "text")
})
$("#addtable").click(function()
{
	addtable = prompt("Enter name of new table: ")
	$.post("ursql.php", {"mode":"add table", "database":$("#databases select").val(), "table":addtable}, function() {show_tables()}, "text")
})
$("#renametable").click(function()
{
	renametable = prompt("Enter new name of table \""+$("#tables select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename table",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"newname":renametable
		},
		function(d) {alert(d); show_tables()},
		"text"
	)
})
$("#truncatetable").click(function()
{
	if (!confirm("Truncate table \""+$("#tables select").val()+"\" from database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"truncate table", "database":$("#databases select").val(), "table":$("#tables select").val()}, function() {}, "text")
})
$("#removetable").click(function()
{
	if (!confirm("Remove table \""+$("#tables select").val()+"\" from database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"remove table", "database":$("#databases select").val(), "table":$("#tables select").val()}, function() {show_tables()}, "text")
})

$("#addcolumn").click(function()
{
	addcolumn = prompt("Enter name of new column: ")
	$.post(
		"ursql.php",
		{
			"mode":"add column",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"column":addcolumn,
			"datatype":$("#datatype").val()+$("#datalength").val()
		},
		function() {show_columns()},
		"text"
	)
})
$("#renamecolumn").click(function()
{
	renamecolumn = prompt("Enter new name of column \""+$("#columns select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename column",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"column":$("#columns select").val(),
			"newname":renamecolumn,
			"datatype":$("#columns select").find(":selected").attr("datatype")
		},
		function(d) {alert(d); show_columns()},
		"text"
	)
})
$("#removecolumn").click(function()
{
	if (!confirm("Remove column \""+$("#columns select").val()+"\" from table \""+$("#tables select").val()+"\" foreal?")) {return}
	$.post("ursql.php", {"mode":"remove column", "database":$("#databases select").val(), "table":$("#tables select").val(), "column":$("#columns select").val()}, function() {show_columns()}, "text")
})


	$(".inner:eq(3)").find("tr").each(function(i) {$(this).attr("beforeSort", i)})
	$(".inner:eq(1)").find('th, td').dblclick(function()
	{
		var i = $(this).index()
		var asort = function(a, b)
		{
			var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
			var b_val = $(b).find("th, td").eq(i).text().toLowerCase()
			return sortAsc(a_val, b_val)
		}
		var aasort = function(a, b)
		{
			var a_val = $(".inner:eq(3)").find("tr").filter("[beforeSort='"+$(a).index()+"']").attr("afterSort")
			var b_val = $(".inner:eq(3)").find("tr").filter("[beforeSort='"+$(b).index()+"']").attr("afterSort")
			return sortAsc(a_val, b_val)
		}
		$(".inner").eq(3).find("tbody tr").sort(asort).appendTo($(".inner").eq(3))
		$(".inner").eq(3).find("tbody tr").each(function(i) {$(this).attr("afterSort", i)})
		$(".inner").eq(2).find("tbody tr").sort(aasort).appendTo($(".inner").eq(2))

		$(".inner").eq(3).find("tr").each(function(i) {$(this).removeAttr("beforeSort").removeAttr("afterSort")})
		$(".inner").eq(3).find("tr").each(function(i) {$(this).attr("beforeSort", i)})
	})

	$(".inner:eq(0)").find("th, td").mousedown(function(e)
	{
		e.originalEvent.preventDefault()
		var drag = true
		var start = $(this).width()
		var index = $(this).index()
		var move = e.pageX
		$(document).mousemove(function(e)
		{
			if(drag)
			{
				$(".inner:eq(0)").find("tr").each(function()
				{
					var offset = e.pageX-move+start
					$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					$(".inner:eq(2)").find("tr").each(function() {$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)})
					// $(".inner:eq(2)").parents("table").width(offset)
					$(".inner:eq(0)").parents("div").width(offset+(freezeCols-1)*100)
					$(".inner:eq(2)").parents("div").width(offset+(freezeCols-1)*100)
				})
			}
		})
		$(document).mouseup(function() 
		{
			drag = false
			unbindmouse()

		})
	})


function toTable(arr, id)
{
	var result = ""
	result += "<table class='inner' id='"+id+"'>"
	for(i in arr)
	{
		result += "<tr>"
		for(j in arr[i])
		{
			result += arr[i][j].outerHTML
		}
		result += "</tr>"
	}
	result += "</table>"
	return result
}
function allTables(arr, freezeRows, freezeCols)
{
	var result = ""
	result += "<table class='outer'><tr><td>"
		result += "<div style='width: "+(freezeCols*100)+"px; height: "+(freezeRows*20)+"px; position: relative; '>"
			result += "<div>"+toTable(arr[0], "sector0")+"</div>"
		result += "</div>"
	result += "</td><td>"
		result += "<div style='width: 1000px; height: "+(freezeRows*20)+"px; position: relative; '><div style='max-height: 100%; overflow-y: hidden;'>"
			result += "<div>"+toTable(arr[1], "sector1")+"</div>"
		result += "</div></div>"
	result += "</td></tr><tr><td>"
		result += "<div style='width: "+(freezeCols*100)+"px; height: 506px; position: relative; '><div style='max-height: 100%; overflow-x: hidden;'>"
			result += "<div>"+toTable(arr[2], "sector2")+"</div>"
		result += "</div></div>"
	result += "</td><td>"
		result += "<div style='width: 1000px; height: 506px; position: relative; '><div style='max-height: 100%; overflow: auto;'>"
			result += "<div>"+toTable(arr[3], "sector3")+"</div>"
		result += "</div></div>"
	result += "</td></tr></table>"
	return result
}


	// var defaults = {freeze: false, freezeRows: 1, freezeCols: 1}
	// var settings = $.extend({}, defaults, options)
	// var freezeRows = settings.freezeRows
	// var freezeCols = settings.freezeCols
	// var freeze = settings.freeze


	if (freeze == true)
	{
		var arr = []
		$(this).find("tr").each(function(i, o)
		{
			$(this).find("th, td").each(function(j, p)
			{
				var ii = -1, jj = -1, kk = -1
					 if (i <  settings.freezeRows && j <  settings.freezeCols) 	{ii = i; 						jj = j; 						kk = 0}
				else if (i <  settings.freezeRows && j >= settings.freezeCols) 	{ii = i; 						jj = j - settings.freezeCols; 	kk = 1}
				else if (i >= settings.freezeRows && j <  settings.freezeCols) 	{ii = i - settings.freezeRows; 	jj = j; 						kk = 2}
				else if (i >= settings.freezeRows && j >= settings.freezeCols) 	{ii = i - settings.freezeRows; 	jj = j - settings.freezeCols; 	kk = 3}

				if (!arr[kk]) 			arr[kk] 		= []
				if (!arr[kk][ii]) 		arr[kk][ii] 	= []
				if (!arr[kk][ii][jj]) 	arr[kk][ii][jj] = $(this)[0]
			})
		})
		$(this).hide()
		$("body").append(allTables(arr, freezeRows, freezeCols))
		$("div").each(function(i) {$(this).attr("id", "div"+i)})

		$("#div6").scroll(function() {$("#div9").scrollTop($(this).scrollTop())})
		$("#div3").scroll(function() {$("#div9").scrollLeft($(this).scrollLeft())})
		$("#div9").scroll(function()
		{
			$("#div6").scrollTop($(this).scrollTop())
			$("#div3").scrollLeft($(this).scrollLeft())
		})
	}

	$(".inner:eq(1)").find("th, td").mousedown(function(e)
	{
		e.originalEvent.preventDefault()
		var drag = true
		var start = $(this).width()
		var index = $(this).index()
		var move = e.pageX
		$(document).mousemove(function(e)
		{
			if(drag)
			{
				$(".inner:eq(1)").find("tr").each(function()
				{
					var offset = e.pageX-move+start
					if (offset < 20) {return}

					$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					$(".inner:eq(3)").find("tr").each(function() 
					{
						$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					})
				})
			}
		})
		$(document).mouseup(function() {drag = false; unbindmouse()})
	})

	$(".inner:eq(2)").find("tr th").mousedown(function(e)
	{
		e.originalEvent.preventDefault()

		var drag = true
		var start = $(this).height()
		var index = $(this).parents("tr").index()
		var move = e.pageY

		$(document).mousemove(function(e)
		{
			if(drag)
			{
				var offset = e.pageY-move+start
				if (offset < 20) {return}
				$(".inner:eq(2)").find("tr").eq(index).find("th, td").each(function()
				{
					$(this).height(offset).css("min-height", offset).css("max-height", offset)
				})
				$(".inner:eq(3)").find("tr").eq(index).find("th, td").each(function()
				{
					$(this).height(offset).css("min-height", offset).css("max-height", offset)
				})
			}
		})
		$(document).mouseup(function() {drag = false; unbindmouse()})
	})

	$(".inner").eq(2).parents("td").height($(window).height()-20*freezeRows)
	$(".inner").eq(3).parents("td").height($(window).height()-20*freezeRows)

	$(".inner").eq(2).parents("div").height($(".inner").eq(2).parents("td").height())
	$(".inner").eq(3).parents("div").height($(".inner").eq(3).parents("td").height())
	$(".outer").height($(window).height())

	$(".inner").eq(1).parents("div").width($(window).width()-100*freezeCols)
	$(".inner").eq(3).parents("div").width($(window).width()-100*freezeCols)
	$(".outer").width($(window).width())

	// $(".outer td").each(function()
	// {
	// 	var val = $(this).text().toString()
	// 	var pat = /\((.+)\/(.+)\)/g
	// 	var mat = val.match(pat)
	// 	if (mat)
	// 	{
	// 		mat = mat.join().split(/[\/\(\)]/)
	// 		if (mat[1] < mat[2])
	// 		{
	// 			$(this).addClass("attention")
	// 		}
	// 	}
	//})
	// $("title").html($(".attention").length+" assignments need your attention")
}










