
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
function sortAsc(a_val, b_val)
{
	if (!isNaN(parseInt(a_val)) && isNaN(parseInt(b_val))) {return -1}
	if (isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {return 1}
	if (!isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val)))
	{
		a_val = parseInt(a_val)
		b_val = parseInt(b_val)
	}
	if (a_val > b_val) {return 1}
	if (a_val < b_val) {return -1}
	return 0
}
function sortDsc(a_val, b_val)
{
	if (!isNaN(parseInt(a_val)) && isNaN(parseInt(b_val))) {return 1}
	if (isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {return -1}
	if (!isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val)))
	{
		a_val = parseInt(a_val)
		b_val = parseInt(b_val)
	}
	if (a_val > b_val) {return -1}
	if (a_val < b_val) {return 1}
	return 0
}
