<?php
if ($_POST) {
	extract($_POST);




    $server = (isset($server) ? $server : "localhost");
    $username = (isset($username) ? $username : "root");
    $password = (isset($password) ? $password : "root");
    // $connect = connect($server, $username, $password);
	// $link = connect($account, $username, $password, $database) or die(mysqli_error($link));

    $database = (isset($database) ? $database : "default");
    // $database = database($database, $connect);
	// $database 	= (isset($database) 	? $database 	: "");

	$mysqli = new mysqli($server, $username, $password, $database);


	switch($mode) {
		case "show-databases":
			echo json_query($mysqli, "SHOW DATABASES;");
		break;
		case "show-tables":
			echo json_query($mysqli, "SHOW TABLES FROM `$database`;");
		break;
		case "show-columns":
			echo json_encode(pluck(get_query($mysqli, "SHOW FIELDS FROM `$table`;")));
		break;
		case "select":
			// echo "SELECT $fields FROM $table;";
			echo json_query($mysqli, "SELECT $columns FROM $table;");
		break;
	}


	// mysqli_close($link);
	mysqli_close($mysqli);
}

// function connect($account, $username, $password, $database) {
// 	$link = new mysqli($account, $username, $password, $database);
// 	if ($link->connect_error):
// 		 die($link->connect_error);
// 	endif;
// 	return $link;
// }
function pluck($array, $i = 0) {
	$array2 = [];
	foreach($array as $key=>$val) {
		$array2[] = $val[$i];
	}
	return $array2;
}
function json_query($link, $query) {
	return json_encode(get_query($link, $query));
}
function get_query($link, $query) {
	trim($query);
	$result = $link->query($query);
	$num_rows = $result->num_rows;
	for($i = 0; $i < $num_rows; $i++):
		$row = $result->fetch_row(); //try fetch_array and see what happens
		for($j = 0; $j < count($row); $j++):
			$res[$i][$j] = $row[$j];
		endfor;
	endfor;
	return $res;
}
function print_query($link, $query) {
	trim($query);
	$result = $link->query($query);
	$num_rows = $result->num_rows;
	$fields = $result->fetch_fields();
	echo "<table>";
	for($i = 0; $i < $num_rows; $i++):
		$row = $result->fetch_assoc();
		if ($i == 0):
			echo "<tr>";
			foreach($row as $field=>$cell):
				echo "<th>".$field."</th>";
			endforeach;
			echo "</tr>";
		endif;
		echo "<tr>";
		foreach($row as $field=>$cell):
			echo "<td>".$cell."</td>";
		endforeach;
		echo "</tr>";
	endfor;
	echo "</table>";
}

?>
