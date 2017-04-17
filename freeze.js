
function allTables(arr, freezeRows, freezeCols) {
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



$.fn.freeze = function(options) {
	var defaults = {freezeRows: 1, freezeCols: 1}
	var settings = $.extend({}, defaults, options)
	var rowCount = $(this).find("tr").length
	var colCount = $(this).find("tr").eq(0).find("th, td").length
	var freezeRows = settings.freezeRows
	var freezeCols = settings.freezeCols

	// $(document).disableSelection()
	// $(".outer").eq(0).disableSelection()

	var arr = []
	$(this).find("tr").each(function(i, o) {
		$(this).find("th, td").each(function(j, p) {
			var ii = -1
			var jj = -1
			var kk = -1
			if (i <  settings.freezeRows && j <  settings.freezeCols) {ii = i; jj = j; kk = 0 }
			else if (i <  settings.freezeRows && j >= settings.freezeCols) {ii = i; jj = j - settings.freezeCols; kk = 1 }
			else if (i >= settings.freezeRows && j <  settings.freezeCols) {ii = i - settings.freezeRows; jj = j; kk = 2 }
			else if (i >= settings.freezeRows && j >= settings.freezeCols) {ii = i - settings.freezeRows; jj = j - settings.freezeCols; kk = 3 }

			if (!arr[kk]) 			{arr[kk] 		= []}
			if (!arr[kk][ii]) 		{arr[kk][ii] 	= []}
			if (!arr[kk][ii][jj]) 	{arr[kk][ii][jj] = $(this)[0]}
		})
	})
	$(this).hide()
	$("#contents").append(allTables(arr, freezeRows, freezeCols))
	$(".inner div").each(function(i) {$(this).attr("id", "div"+i)})

	$("#div6").scroll(function() {$("#div9").scrollTop($(this).scrollTop())})
	$("#div3").scroll(function() {$("#div9").scrollLeft($(this).scrollLeft())})
	$("#div9").scroll(function() {
		$("#div6").scrollTop($(this).scrollTop())
		$("#div3").scrollLeft($(this).scrollLeft())
	})






	$(".inner:eq(0)").find("th, td").mousedown(function(e) {
		e.originalEvent.preventDefault()
		var drag = true
		var start = $(this).width()
		var index = $(this).index()
		var move = e.pageX
		$(document).mousemove(function(e) {
			if(drag) {
				$(".inner:eq(0)").find("tr").each(function() {
					var offset = e.pageX-move+start
					$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					$(".inner:eq(2)").find("tr").each(function() {$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)})
					// $(".inner:eq(2)").parents("table").width(offset)
					$(".inner:eq(0)").parents("div").width(offset+(freezeCols-1)*100)
					$(".inner:eq(2)").parents("div").width(offset+(freezeCols-1)*100)
				})
			}
		})
		$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
	})
	$(".inner:eq(1)").find("th, td").mousedown(function(e) {
		e.originalEvent.preventDefault()
		var drag = true
		var start = $(this).width()
		var index = $(this).index()
		var move = e.pageX
		$(document).mousemove(function(e) {
			if(drag) {
				$(".inner:eq(1)").find("tr").each(function() {
					var offset = e.pageX-move+start
					$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					$(".inner:eq(3)").find("tr").each(function()
					{
						$(this).find("th, td").eq(index).width(offset).css("min-width", offset).css("max-width", offset)
					})
				})
			}
		})
		$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
	})

	$(".inner:eq(2)").find("tr th").mousedown(function(e) {
		e.originalEvent.preventDefault()

		var drag = true
		var start = $(this).height()
		var index = $(this).parents("tr").index()
		var move = e.pageY

		$(document).mousemove(function(e) {
			if(drag) {
				var offset = e.pageY-move+start
				$(".inner:eq(2)").find("tr").eq(index).find("th, td").each(function() {
					$(this).height(offset).css("min-height", offset).css("max-height", offset)
				})
				$(".inner:eq(3)").find("tr").eq(index).find("th, td").each(function() {
					$(this).height(offset).css("min-height", offset).css("max-height", offset)
				})
			}
		})
		$(document).mouseup(function() {drag = false; $(document).unbind("mousemove").unbind("mouseup")})
	})

	// alert($(window).height(), $(window).width())
	// $(".inner").eq(2).height($(window).height()-20*freezeRows)
	// $(".inner").eq(2).parents("div").height($(window).height()-20*freezeRows)
	// $(".inner").eq(3).height($(window).height()-20*freezeRows)
	$(".inner").eq(2).parents("td").height($(window).height()-20*freezeRows)
	$(".inner").eq(3).parents("td").height($(window).height()-20*freezeRows)

	$(".inner").eq(2).parents("div").height($(".inner").eq(2).parents("td").height())
	$(".inner").eq(3).parents("div").height($(".inner").eq(3).parents("td").height())
	$(".outer").height($(window).height())

	$(".inner").eq(1).parents("div").width($(window).width()-100*freezeCols)
	$(".inner").eq(3).parents("div").width($(window).width()-100*freezeCols)
	$(".outer").width($(window).width())


}


//automatic parsing on paste
$(".cell").bind('paste', function() {
	var l = $(this)
	setTimeout(function() {
		var d = $("#delimit option:selected").val()
		var t = l.val()
		t = t.split(d)
		for (i in t) {
			$(".selected").eq(i).parent().parent().next("tr").children("td").eq($(".selected").eq(i)[0].parentNode.cellIndex-1).children(".cell").addClass("selected")
			$(".selected").eq(i).val(t[i])
		}
		$(".selected").eq(t.length).removeClass("selected")
	}, 100)
})

$(".cell").dblclick(function(e) {
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




$(".inner:eq(3)").find("tr").each(function(i) {$(this).attr("beforeSort", i)})
$(".inner:eq(1)").find('th, td').dblclick(function() {
	var i = $(this).index()
	var asort = function(a, b) {
		var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
		var b_val = $(b).find("th, td").eq(i).text().toLowerCase()
		return sortAsc(a_val, b_val)
	}
	var aasort = function(a, b) {
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
