
$("#adddatabase").click(function()
{
	adddatabase = prompt("Enter name of new database: ")
	$.post("ursql.php", {"mode":"add database", "database":adddatabase}, function() {show_databases()}, "text")
})
$("#renamedatabase").click(function()
{
	renamedatabase = prompt("Enter new name of database \""+$("#databases select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename database",
			"database":$("#databases select").val(),
			"newname":renamedatabase
		},
		function(d) {alert(d); show_databases()},
		"text"
	)
})
$("#removedatabase").click(function()
{
	if (!confirm("Remove database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"remove database", "database":$("#databases select").val()}, function() {show_databases()}, "text")
})
$("#addtable").click(function()
{
	addtable = prompt("Enter name of new table: ")
	$.post("ursql.php", {"mode":"add table", "database":$("#databases select").val(), "table":addtable}, function() {show_tables()}, "text")
})
$("#renametable").click(function()
{
	renametable = prompt("Enter new name of table \""+$("#tables select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename table",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"newname":renametable
		},
		function(d) {alert(d); show_tables()},
		"text"
	)
})
$("#truncatetable").click(function()
{
	if (!confirm("Truncate table \""+$("#tables select").val()+"\" from database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"truncate table", "database":$("#databases select").val(), "table":$("#tables select").val()}, function() {}, "text")
})
$("#removetable").click(function()
{
	if (!confirm("Remove table \""+$("#tables select").val()+"\" from database \""+$("#databases select").val()+"\" foreal?")) {return}
	//if (!confirm("foreal foreal?")) {return}
	$.post("ursql.php", {"mode":"remove table", "database":$("#databases select").val(), "table":$("#tables select").val()}, function() {show_tables()}, "text")
})

$("#addcolumn").click(function()
{
	addcolumn = prompt("Enter name of new column: ")
	$.post(
		"ursql.php",
		{
			"mode":"add column",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"column":addcolumn,
			"datatype":$("#datatype").val()+$("#datalength").val()
		},
		function() {show_columns()},
		"text"
	)
})
$("#renamecolumn").click(function()
{
	renamecolumn = prompt("Enter new name of column \""+$("#columns select").val()+"\": ")
	$.post
	(
		"ursql.php",
		{
			"mode":"rename column",
			"database":$("#databases select").val(),
			"table":$("#tables select").val(),
			"column":$("#columns select").val(),
			"newname":renamecolumn,
			"datatype":$("#columns select").find(":selected").attr("datatype")
		},
		function(d) {alert(d); show_columns()},
		"text"
	)
})
$("#removecolumn").click(function()
{
	if (!confirm("Remove column \""+$("#columns select").val()+"\" from table \""+$("#tables select").val()+"\" foreal?")) {return}
	$.post("ursql.php", {"mode":"remove column", "database":$("#databases select").val(), "table":$("#tables select").val(), "column":$("#columns select").val()}, function() {show_columns()}, "text")
})

