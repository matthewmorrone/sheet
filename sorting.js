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


$(this).find('.col').click(function() {
	var i = $(this).index()
	var asort = function(a, b) {
		var a_val = $(a).find(".cell").eq(i).val().toLowerCase()
		var b_val = $(b).find(".cell").eq(i).val().toLowerCase()

		if (!isNaN(parseInt(a_val)) && isNaN(parseInt(b_val))) {return -1}
		if (isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {return 1}
		if (!isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {
			a_val = parseInt(a_val)
			b_val = parseInt(b_val)
		}
		if (a_val > b_val) {return 1}
		if (a_val < b_val) {return -1}
		return 0
	}
	$('#ss1 tbody tr:not(:eq(0))').sort(asort).appendTo($(this).parents("#ss1 tbody"))
	//filter(function(){return ($(this).find(".cell").eq(i).val().toLowerCase() != "")})
})

function sorting() {
	var i = $(this).index()
	var dsort = function(a, b) {
		var a_val = $(a).find("th, td").eq(i).text().toLowerCase()
		var b_val = $(b).find("th, td").eq(i).text().toLowerCase()

		if (!isNaN(parseInt(a_val)) && isNaN(parseInt(b_val))) {
			return 1
		}
		if (isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {
			return -1
		}
		if (!isNaN(parseInt(a_val)) && !isNaN(parseInt(b_val))) {
			a_val = parseInt(a_val)
			b_val = parseInt(b_val)
		}
		if (a_val > b_val) {
			return -1
		}
		if (a_val < b_val) {
			return 1
		}
		return 0
	}
	$('#ss1 tr').sort(dsort).appendTo($(this).parents("#ss1"));
}
