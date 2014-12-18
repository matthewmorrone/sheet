<?
if (extract($_POST) > 0 || extract($_GET) > 0)
{
	// if ($output == "xml")
	// {
	// 	// header('Content-Type: text/xml');
	// }


	$server 	= (isset($server) 		? $server 		: "localhost");
	$username	= (isset($username) 	? $username 	: "root");
	$password 	= (isset($password) 	? $password 	: "root");
	$database 	= (isset($database) 	? $database 	: "");
	// $output 	= (isset($output) 		? $output 		: "json");


	$link = connect($server, $username, $password, $database) or die(mysqli_error($link));


	switch($mode)
	{
		case "show-databases":
			echo prepare(show_databases($link));
			// http://localhost/spreadsheet/server.php?server=localhost&username=root&password=root&mode=show-databases
		break;
		case "show-tables":
			echo prepare(show_tables($link, $database));
			// http://localhost/spreadsheet/server.php?server=localhost&username=root&password=root&database=assig3&mode=show-tables
		break;
		case "show-fields":
			echo prepare(show_fields($link, $table));
			// http://localhost/spreadsheet/server.php?server=localhost&username=root&password=root&database=assig3&mode=show-fields&table=players
		break;
		case "select":
			echo prepare(select_from($link, $table, $fields, $include_fields, $entrylimit, $entryfrom, $entryto));
			// http://localhost/spreadsheet/server.php?server=localhost&username=root&password=root&database=assig3&mode=select&table=players&fields=*
			// http://localhost/spreadsheet/server.php?server=localhost&username=root&password=root&database=assig3&mode=select&table=players&fields=*&include_fields=true
		break;
		// case "debug":
		// 	print_r($_POST);
		// break;
	}


	mysqli_close($link);
}
function connect($account, $username, $password, $database)
{
	$link = new mysqli($account, $username, $password, $database);
	if ($link->connect_error):
		 die($link->connect_error);
	endif;
	return $link;
}
function prepare($result, $fields)
{
	return strToLower(json_encode($result));
}
function show_databases($link)
{
	$result = get_query($link, "SHOW DATABASES;");
	foreach($result as $key=>$row):
		$databases[] = $row["Database"];
	endforeach;
	return $databases;
}
function show_tables($link, $database)
{
	$result = get_query($link, "SHOW TABLES FROM $database;");
	foreach($result as $key=>$row):

		$tables[] = $row["Tables_in_".$database];
	endforeach;
	return $tables;
}
function show_fields($link, $table)
{
	$result = get_query($link, "SHOW FIELDS FROM $table;");
	foreach($result as $key=>$row):
		$fields[] = $row["Field"];
	endforeach;
	// echo "<pre>"; print_r($fields); echo "</pre>";
	return $fields;

}
function select_from($link, $table, $fields, $show_fields, $limit=30, $from=0, $to=30)
{
	$query = "SELECT $fields FROM $table";
	$result = $link->query(trim($query));



	echo $result->num_rows;
	echo "###";





	$query = "SELECT $fields FROM $table";
	$query .= " WHERE id >= $from AND id <= $to";
	$query .= " LIMIT $limit";
	$query .= ";";



	$result = $link->query(trim($query));






	if ($show_fields == "yes")
	{
		if ($fields === "*"):
			$fields = show_fields($link, $table);
		else:
			$fields = explode(",", $fields);
		endif;
		$res[] = array_intersect($fields, show_fields($link, $table));
	}
	for($i = 0; $i < $result->num_rows; $i++):
		$res[] = $result->fetch_row();
	endfor;
	foreach($res as $key=>$row):
		$rows[] = $row;
	endforeach;
	return $rows;
}
function get_query($link, $query)
{
	$result = $link->query(trim($query));
	for($i = 0; $i < $result->num_rows; $i++):
		$res[] = $result->fetch_assoc();
	endfor;
	return $res;
}
function print_query($link, $query)
{
	$result = $link->query(trim($query));
	echo "<table>";
	for($i = 0; $i < $result->num_rows; $i++):
		$row = $result->fetch_assoc();
		if ($i == 0):
			echo "<tr>";
			foreach($row as $field=>$cell):
				echo "<th>$field</th>";
			endforeach;
			echo "</tr>";
		endif;
		echo "<tr>";
		foreach($row as $field=>$cell):
			echo "<td>$cell</td>";
		endforeach;
		echo "</tr>";
	endfor;
	echo "</table>";
}

?>
