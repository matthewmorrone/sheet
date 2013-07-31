
var sorthelper = function(e, ui) {w = ui.width(); ui.children().each(function(){$(this).width($(this).width())}); ui.width(w); return ui}
function asort(a, b, c, type) {return parseInt($(a).children(type).eq(c).html())-parseInt($(b).children(type).eq(c).html())}
function dsort(a, b, c, type) {return parseInt($(b).children(type).eq(c).html())-parseInt($(a).children(type).eq(c).html())}
var asort = function(a, b)
{
	var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
	var b_val = $(b).find("th, td").eq(i).text().toLowerCase()

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
var dsort = function(a, b)
{
	var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
	var b_val = $(b).find("th, td").eq(i).text().toLowerCase()

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
		$(this).find("thead").find('th').toggle(function()
		{
			var i = $(this).index()
			var asort = function(a, b)
			{
				var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
				var b_val = $(b).find("th, td").eq(i).text().toLowerCase()

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
 			$('tbody tr').sort(asort).appendTo($(this).parents("table"));
		},
		function()
		{
			var i = $(this).index()
			var dsort = function(a, b)
			{
				var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
				var b_val = $(b).find("th, td").eq(i).text().toLowerCase()

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
 			$('tbody tr').sort(dsort).appendTo($(this).parents("table"));
		})

function asort(a, b, c, type) {return parseInt($(a).children(type).eq(c).html())-parseInt($(b).children(type).eq(c).html())}
function dsort(a, b, c, type) {return parseInt($(b).children(type).eq(c).html())-parseInt($(a).children(type).eq(c).html())}
// function(a, b)
// {
//	var reA = /[^a-zA-Z]/g;
//	var reN = /[^0-9]/g;
//	var aA = $(a).find('.cell').eq(c).val().toUpperCase()[0].replace(reA, ""); //$(a).replace(reA, "");
//	var bA = $(b).find('.cell').eq(c).val().toUpperCase()[0].replace(reA, "");
//	if(aA === bA)
//	{
//			var aN = parseInt(a.replace(reN, ""), 10);
//			var bN = parseInt(b.replace(reN, ""), 10);
//			return aN === bN ? 0 : aN > bN ? 1 : -1;
//	}
//	else
//	{
//			return aA > bA ? 1 : -1;
//	}
// }

// function(a, b)
// {
// 	aa = $(a).find('.cell').eq(c).val().toUpperCase()
// 	bb = $(b).find('.cell').eq(c).val().toUpperCase()
// 	if(aa < bb) {return -1}
// 	if(aa > bb) {return 1}
// 	return 0
// }

		spreadsheet.find(".row").toggle
		(
			function()
			{
				$("table").append($("tr:not(:first)").get().sort(asort($(this)[0].cellIndex-1, "td")))
			},
			function()
			{
				$("table").append($("tr:not(:first)").get().sort(dsort($(this)[0].cellIndex-1, "td")))
			}
		)

		