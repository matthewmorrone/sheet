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

