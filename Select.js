		selected = false
		$('.cell').mousedown(function()
		{
			unselect_all()
			select($(this)[0].getAttribute("x"), $(this)[0].getAttribute("y"))
			selected = true
			cell = $(this)
		})
		$('.cell').mouseover(function() {if (selected == true) {unselect_all(); select_box(cell, $(this))}})
		$('.cell').mouseup(function(){selected = false})
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
		function unselect_cell(cell)
		{
			unselect(cell.attr("x"), cell.attr("y"))
		}
		function unselect_all() {$('.selected').removeClass('selected')}
		function select_box(cell1, cell2)
		{
			var x1 = Math.min(cell1[0].getAttribute("x"), cell2[0].getAttribute("x"))
			var y1 = Math.min(cell1[0].getAttribute("y"), cell2[0].getAttribute("y"))
			var x2 = Math.max(cell1[0].getAttribute("x"), cell2[0].getAttribute("x"))
			var y2 = Math.max(cell1[0].getAttribute("y"), cell2[0].getAttribute("y"))
			for (var i = x1; i <= x2; i++)
			{
				for (var j = y1; j <= y2; j++)
				{
					select(i, j)
				}
			}
			trackcells(x1, y1, x2, y2)
		}



	var mousedowned = false
	var table = $(".inner").eq(3)
	table.find("td").mousedown(function()
	{
		mousedowned = true
		$(".hover").removeClass("hover")
		x1 = $(this).index()
		y1 = $(this).parent().index()
		highlight($(this), x1, y1)
		table.find("td").mouseover(function()
		{
			if (mousedowned == true)
			{
				unhighlight()
				x2 = $(this).index()
				y2 = $(this).parent().index()
				highlight($(this), x2, y2)
				$(this).parents(".inner").find("td").each(function()
				{
					var dx = $(this).index()
					var dy = $(this).parent().index()
					if (dx >= Math.min(x1, x2) && dx <= Math.max(x1, x2) && dy >= Math.min(y1, y2) && dy <= Math.max(y1, y2))
					{
						highlight($(this), dx, dy)
					}
				})
			}
		})
		table.find("td").mouseup(function()
		{
			mousedowned = false
			unbindmouse()
		})
	})

function highlight(el, x, y)
{
	el.addClass("hover")
	$(".inner").eq(1).find("tr").each(function() {$(this).find("th, td").eq(x).addClass("hover")})
	$(".inner").eq(2).find("tr").eq(y).find("th, td").addClass("hover")
}
function unhighlight()
{
	$(".hover").removeClass("hover")
}








		