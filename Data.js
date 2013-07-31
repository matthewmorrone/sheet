
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

function cellstodata()
{
	var result = ""
	var delimiter = $("#delimiter").val()
	var linebreak = $("#linebreak").val()
	$("table tbody").find("tr").each(function(i)
	{
		var cells = $(this).find(".cell").length
		$(this).find(".cell").each(function(j)
		{
			$(this).val()
			result += $(this).val()
			j < cells-1 ? result += delimiter : result += linebreak
		})
	})
	return result//.replace(/,+/g, ",").replace(/,\s?\n/g, "\n")
}

function dataparse1(data, ext, dl, lb)
{
	if (ext == "csv")
	{
		var x = data.split(lb)
		for (i in x)
		{
			x[i] = x[i].split(dl)
		}
		return x
	}
	if (ext == "xml")
	{
		data = data.getElementsByTagName(data.childNodes[0].childNodes[1].nodeName)
		var x = new Array()
		x[0] = new Array()
		for (var j = 1; j < data[0].childNodes.length; j+=2)
		{
			x[0][j/2] = data[0].childNodes[j].nodeName
		}
		for (var i = 0; i < data.length; i++)
		{
			x[i+1] = new Array()
			for (var j = 1; j < data[i].childNodes.length; j+=2)
			{
				x[i+1][j/2] = data[i].childNodes[j].childNodes[0].nodeValue
			}
		}
		return x
	}
}
function dataparse2(table, textarea, delimiter, linebreak)
{
	if (!textarea || !table) {return}
	result = ''
	textarea.val("")
	textarea.val(function()
	{
		table.find('tr').each(function(i)
		{
			$(this).find('th, td').each(function(j)
			{
				if ($(this).children().length == 0)
				{
					result += $(this).html().trim()
				}
				else
				{
					result += $(this).children().eq(0).html().trim()
				}
				result += delimiter
			})
			result = result.substring(0, result.length-1)
			// if (linebreak == "\n")
			// {
				result += "\n"
			// }
			// else
			// {
			//	result += linebreak
			// }
		})
		return result
	})
	return result
}






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


function json_tabs(tabs)
{
	var result = ""
	for (i in tabs) {result += "<div class='tab'>"+tabs[i]+"</div>"}
	result += "<div id='addtab'>+</div>"
	return result
}

function sort_select(id)
{
	var options = $("#"+id+" option")
	options.sort(function(a, b)
	{
		if (a.text > b.text)		return 1
		else if (a.text < b.text)	return -1
		else						return 0
	})
	$("#"+id).empty().append(options)
}

