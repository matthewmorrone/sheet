
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









// $(document).mousemove(function(e) {$('#xy').html(e.pageX + "|" + e.pageY)})






	$.fn.spreadsheet = function()
	{


		$(document).mousemove(function(e) {$('#x').html(e.pageX); $('#y').html(e.pageY)})


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






		//look functions
		$(".format").toggle(function()			{$("td .selected").css($(this).attr("prop"), $(this).attr("value"))}, function(){$("td .selected").css($(this).attr("prop"), "")})
		$("#trimboth").click(function()		 {$("td .selected").each(function() {$(this).val($(this).val().replace(/(^\s*)|(\s*$)/g, ""))})})
		$("#trimleft").click(function()		 {$("td .selected").each(function(){$(this).val($(this).val().replace(/(^\s*)/g, ""))})})
		$("#trimright").click(function()		{$("td .selected").each(function(){$(this).val($(this).val().replace(/(\s*$)/g, ""))})})
		$("#clear").click(function()				{$("td .selected").each(function(){$(this).css({"font-weight":"", "text-transform":"", "text-decoration":"", "font-style":"", "text-align":"", "background-color":"", "color":""})})})
		$("#color").change(function()			 {$(".color").val("2px solid "+$(this).val()); $(".acolor").val($(this).val()); $(".bcolor").val($(this).val())})
		$("#font").change(function()				{$("td .selected").css("font-family", $(this).val())})

		$("#search").keyup(function()
		{
			unselect_all()
			var term = $(this).val()
			$("td .cell").each(function()	 {if (($(this).val()).indexOf(term) != -1) {select_cell($(this), true)}})
			if ($(this).val() == "")				{unselect_all()}
		})
		$("#replacer").click(function()
		{
			var ter = $("#search").val()
			var rep = $("#replace").val()
			$("td .selected").each(function()
			{
				var str = $(this).val()
				n = str.replace(ter, rep)
				$(this).val(n)
			})
		})
		$("#switch_s_and_r").click(function()
		{
			var s = $("#search").val()
			var r = $("#replace").val()
			$("#search").val(r)
			$("#replace").val(s)
		})
		$("#clearcontents").click(function()
		{
			clear_contents()
			unselect_all()
		})
		$("#split").click(function()
		{
			var d = $("#delimit").val()
			var z = $("td .selected").val().split(d)
			var startx = $("td .selected").attr("x")
			var starty = $("td .selected").attr("y")

			for (var i = 0; i < z.length; i++)
			{
				cell = $(".visible").find("tr").eq(starty).find(".cell").eq(parseInt(startx)+i)
				cell.val(z[i])
				select_cell(cell, true)
			}
			trackcells(startx, starty, parseInt(startx)+z.length-1, starty)
		})
		$("#join").click(function()
		{
			var start = $("td .selected").eq(0)
			var d = $("#delimit").val()
			var z = []
			$("td .selected").each(function() {z.push($(this).val())})
			var s = z.join(d)
			$("td .selected").each(function() {$(this).val("")})
			unselect_all()
			select_cell(start)
			start.val(s)
		})
		$("#sort").click(function()
		{
			var z = []
			$("td .selected").each(function() {z.push($(this).val())})
			z.sort()
			var i = 0
			$("td .selected").each(function()
			{
				$(this).val(z[i])
				i++
			})
		})
		$("#reverse").click(function()
		{
			var z = []
			$("td .selected").each(function() {z.push($(this).val())})
			z.reverse(function(a, b) {return b - a})
			var i = 0
			$("td .selected").each(function()
			{
				$(this).val(z[i])
				i++
			})
		})
		$("#shuffle").click(function()
		{
			for (var a = 0; a < 10; a++)
			{
				z = []
				$("td .selected").each(function() {z.push($(this).val())})
				z.sort(function() {return 0.5 - Math.random()})
				var i = 0
				$("td .selected").each(function()
				{
					$(this).val(z[i])
					i++
				})
			}
		})
		$("#invert").click(function()
		{
			x1 = getx1()
			y1 = gety1()
			x2 = getx2()
			y2 = gety2()
			dx = getdx()
			dy = getdy()

			unselect_all()
			twodarray = []
			for (var i = x1; i <= x2; i++)
			{
				var row = []
				for (var j = y1; j <= y2; j++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					row.push(cell.val())
					cell.val("")
				}
				twodarray.push(row)
			}
			for (var i = x1; i <= (x1+(dy-1)); i++)
			{
				for (var j = y1; j <= (y1+(dx-1)); j++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					select_cell(cell, false)
					cell.val(twodarray[j-y1][i-x1])
				}
			}
			trackcells(x1, y1, (x1+(dy-1)), (y1+(dx-1)))
		})
		$("#vinvert").click(function()
		{
			x1 = getx1()
			y1 = gety1()
			x2 = getx2()
			y2 = gety2()
			unselect_all()
			var twodarray = []
			for (var i = x1; i <= x2; i++)
			{
				var row = []
				for (var j = y1; j <= y2; j++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					row.push(cell.val())
					cell.val("")
				}
				twodarray.push(row)
			}
			for (var d in twodarray)
			{
				twodarray[d].reverse(function(a, b) {return b - a})
			}
			for (var i = x1; i <= x2; i++)
			{
				for (var j = y1; j <= y2; j++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					cell.val(twodarray[i-x1][j-y1])
					select_cell(cell, false)
				}
			}
			trackcells(x1, y1, x2, y2)
		})
		$("#hinvert").click(function()
		{
			x1 = getx1()
			y1 = gety1()
			x2 = getx2()
			y2 = gety2()
			unselect_all()
			var twodarray = []
			for (var j = y1; j <= y2; j++)
			{
				var row = []
				for (var i = x1; i <= x2; i++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					row.push(cell.val())
					cell.val("")
				}
				twodarray.push(row)
			}
			for (var d in twodarray)
			{
				twodarray[d].reverse(function(a, b) {return b - a})
			}
			for (var j = y1; j <= y2; j++)
			{
				for (var i = x1; i <= x2; i++)
				{
					var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
					cell.val(twodarray[j-y1][i-x1])
					select_cell(cell, false)
				}
			}
			trackcells(x1, y1, x2, y2)
		})
	}
})
(jQuery)
function clear_contents()
{
	$(".visible td .cell").val("")
}
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
function getx1() {return parseInt($("#x1").html())}
function gety1() {return parseInt($("#y1").html())}
function getx2() {return parseInt($("#x2").html())}
function gety2() {return parseInt($("#y2").html())}
function getdx() {return parseInt($("#dx").html())}
function getdy() {return parseInt($("#dy").html())}

function trackcells(x1, y1, x2, y2)
{
	$("#x1").html(Math.min(x1, x2))
	$("#y1").html(Math.min(y1, y2))
	$("#x2").html(Math.max(x1, x2))
	$("#y2").html(Math.max(y1, y2))
	$("#dx").html(Math.abs(x2-x1)+1)
	$("#dy").html(Math.abs(y2-y1)+1)
}

function normalizeheaders()
{
	$(".visible").find("thead tr th .cell").each(function(i) {$(this).val(base26(i)); $(this).addClass("col")})
	$(".visible").find("tbody tr th .cell").each(function(j) {$(this).val(j+1); $(this).addClass("row")})
}

// test



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









