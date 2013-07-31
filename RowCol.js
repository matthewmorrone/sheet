$(window).scroll(function()
{
	if($(window).scrollTop() + $(window).height() == $(document).height())
	{
		var cn = $(".visible thead tr th").length
		var newrow = "<tr><th><input type='text' value='' class='cell' x="+j+" y="+i+"></th>"
		for (var j = 0; j < cn; j++)
		{
			newrow += "<td><input type='text' value='' class='cell' x="+j+" y="+i+"></td>"
		}
		newrow += "</tr>"
		$(".visible tbody").children("tr").last().after(newrow)
		normalizeheaders()
	}
	if($(window).scrollLeft() + $(window).width() == $(document).width())
	{
		$(".visible thead tr th").last().after("<th><input type='text' value='' class='cell' x="+j+" y="+i+"></th>")
		$(".visible tbody tr").each(function()
		{
			$(this).children().last().after("<td><input type='text' value='' class='cell' x="+j+" y="+i+"></td>")
		})
		normalizeheaders()
	}
})
$("#addrowbefore").click(function()
{
	if ($(".selected").length > 0)
	{
		var ri = $(".selected")[0].parentNode.parentNode.rowIndex
		var cn = $(".visible thead tr th").length
		var newrow = "<tr><th><input type='text' value='' class='cell' x="+j+" y="+i+"></th>"
		for (var i = 0; i < cn; i++)
		{
			newrow += "<td><input type='text' value='' class='cell' x="+j+" y="+i+"></td>"
		}
		newrow += "</tr>"
		$(".visible tr").eq(ri).before(newrow)
		normalizeheaders()
	}
})
$("#addcolbefore").click(function()
{
	if ($(".selected").length > 0)
	{
		var ci = $(".selected")[0].parentNode.cellIndex
		$(".visible thead tr th").eq(ci).before("<th><input type='text' value='' class='cell' x="+j+" y="+i+"></th>")
		$(".visible tbody tr").each(function()
		{
			$(this).children().eq(ci).before("<td><input type='text' value='' class='cell' x="+j+" y="+i+"></td>")
		})
		normalizeheaders()
	}
})
$("#addrowafter").click(function()
{
	if ($(".selected").length > 0)
	{
		var ri = $(".selected")[0].parentNode.parentNode.rowIndex
		var cn = $(".visible thead tr th").length
		var newrow = "<tr><th><div class='row'><span>r</span></div></th>"
		for (var i = 0; i < cn; i++)
		{
			newrow += "<td><input type='text' class='cell'></td>"
		}
		newrow += "</tr>"
		$(".visible tr").eq(ri).after(newrow)
		normalizeheaders()
	}
})
$("#addcolafter").click(function()
{
	if ($(".selected").length > 0)
	{
		var ci = $(".selected")[0].parentNode.cellIndex
		$(".visible thead tr th").eq(ci).after("<th><input type='text' value='' class='cell' x="+j+" y="+i+"></th>")
		$(".visible tbody tr").each(function()
		{
			$(this).children().eq(ci).after("<td><input type='text' value='' class='cell' x="+j+" y="+i+"></td>")
		})
		normalizeheaders()
	}
})

//add rows/cols
$("#addrow").click(function()
{
	var rows = $("#spreadsheet thead tr").children().size()-1
	var rowcode = $(".selected").parent().parent().html()
	try {var row = $(".selected")[0].parentNode.parentNode.rowIndex}
	catch (e) {var row = $("#spreadsheet tr").size()-1}

	$("#spreadsheet tbody tr:nth-child("+row+")").after(rowcode)
	var i = 1
	$("#spreadsheet tbody tr th").each(function() {$(this).html("<div class='rowdiv'>"+i+"<div class='adjust_row'></div></div>"); i++})
})
$("#addcol").click(function()
{
	var cols = $("#spreadsheet tbody tr").size()
	var col_th_code = "<th class='col'><div class='coldiv'>#<div class='adjust_col'>|</div></div></th>"
	var col_td_code = "<td><input type='text' class='cell'></input></td>"

	try {var col = $(".selected")[0].parentNode.cellIndex}
	catch (e) {var col = $("#spreadsheet thead tr th").size()-1}

	$("#spreadsheet thead tr th:nth-child("+col+")").after(col_th_code)
	$("#spreadsheet tbody tr td:nth-child("+col+")").after(col_td_code)
	var i = 0
	$("#spreadsheet thead tr th").each(function() {if (i > 0) {$(this).html("<div class='coldiv'>" + String.fromCharCode(64 + i) + "<div class='adjust_col'>|</div></div>")} i++})
})

