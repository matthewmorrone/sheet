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

function toggleCheckbox(id) 
{
	if (!document.getElementById){return}
	if (!document.getElementsByTagName){return}
	var inputs = document.getElementById(id).getElementsByTagName("input")
	for(var x=0; x < inputs.length; x++) 
	{
		if (inputs[x].type == 'checkbox')
		{
			inputs[x].checked = !inputs[x].checked;
		}
	}
}

(function($)
{
	open = false
	$.fn.accordion = function()
	{
		$(".pane").hide()
		$(".menu").toggle(function()
		{
			$(".menu").next(".pane").hide('slow')
			$(this).next(".pane").show('slow')
			open = true
		},
		function()
		{
			$(".menu").next(".pane").hide('slow')
			if (open == false)
			{
				$(this).next(".pane").show('slow')
				return
			}
			open = false
		})
		$('.menu').eq(4).click()
		open = true
	}

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


