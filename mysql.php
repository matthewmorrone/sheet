<?php

if ($_POST) {
	extract($_POST);

	$server = (isset($server) ? $server : "localhost");
	$username = (isset($username) ? $username : "root");
	$password = (isset($password) ? $password : "");
	$connect = connect($server, $username, $password);

	$database = (isset($database) ? $database : "default");
	$database = database($database, $connect);

	switch ($mode) {
		case "connect":
			echo $connect . " " . $username . "@" . $server;
			break;

		case "show-databases":
			show_databases();
			break;

		case "show-tables":
			show_tables();
			break;

		case "show-columns":
			show_columns();
			break;

		case "show-table":
			show_table();
			break;

		case "show-files":
			show_files();
			break;

		case "show-file":
			show_file();
			break;

		case "add-database":
			add_database();
			break;

		case "rename-database":
			rename_database();
			break;

		case "remove-database":
			remove_database();
			break;

		case "add-table":
			add_table();
			break;

		case "rename-table":
			rename_table();
			break;

		case "truncate-table":
			truncate_table();
			break;

		case "remove-table":
			remove_table();
			break;

		case "add-column":
			add_column();
			break;

		case "rename-column":
			rename_column();
			break;

		case "remove-column":
			remove_column();
			break;

		default:
			break;
	}
}

function santeria($query) {
	$query = strtolower($query);
	$query = str_replace(".", " ", $query);
	$query = str_replace(",", " ", $query);
	$query = str_replace("/", " ", $query);
	$query = str_replace("!", " ", $query);
	$query = str_replace(";", " ", $query);
	$query = str_replace("(", " ", $query);
	$query = str_replace(")", " ", $query);
	$query = str_replace("?", " ", $query);
	$query = str_replace("--", " ", $query);
	$query = str_replace("[", " ", $query);
	$query = str_replace("]", " ", $query);
	$query = str_replace("<", " ", $query);
	$query = str_replace("]", " ", $query);
	$query = str_replace(">", " ", $query);
	$query = str_replace("\"", " ", $query);
	$query = str_replace("'", " ", $query);
	$query = str_replace(":", " ", $query);
	$query = str_replace("+", " ", $query);
	$query = preg_replace('!\s+!', ' ', $query);
	return trim($query);
}
function sanitize($query) {
	trim($query);
	$query = str_replace("\"", "", $query);
	$query = str_replace("\'", "", $query);
	$query = str_replace(" ", "_", $query);
	$query = str_replace("(", "", $query);
	$query = str_replace(")", "", $query);
	$query = str_replace("?", "", $query);
	$query = str_replace("%", "", $query);
	$query = htmlspecialchars($query);
	return $query;
}
function desanitize($query) {
	$query = trim($query);
	$query = stripslashes($query);
	$query = htmlspecialchars($query);
	return $query;
}
function addspaces($query) {
	return str_replace("_", " ", $query);
}

function connect($account, $username, $password) {
	$success = mysql_connect($account, $username, $password) or die(mysql_error());
	return $success;
}

function database($d, $c) {
	if (mysql_select_db($d, $c)) {
		return $d;
	}
}

function get_query($query) {
	$result = mysql_query($query) or die(mysql_error());
	$results = array();
	while ($row = mysql_fetch_assoc($result)) {
		$results[] = $row;
	}
	return $results;
}

function show_databases() {
	$query = "SHOW DATABASES";
	$results = get_query($query);
	$result = '<select><option></option>';
	foreach ($results as $k => $v) {
		foreach ($v as $x => $y) {
			$result.= '<option>' . $y . '</option>';
		}
	}
	$result.= '</select>';
	echo $result;
}

function show_tables() {
	$query = "SHOW TABLES FROM " . $database;
	$results = get_query($query);
	$result = '<select><option></option>';
	foreach ($results as $k => $v) {
		foreach ($v as $x => $y) {
			$result.= '<option>' . $y . '</option>';
		}
	}
	$result.= '</select>';
	echo $result;
}
function show_columns() {
	$query = "SHOW COLUMNS FROM " . $table;
	$results = get_query($query);
	$result = '<select><option></option>';
	foreach ($results as $k => $v) {
		$result.= '<option datatype="' . $v["Type"] . '">' . $v["Field"] . '</option>';
	}
	$result.= '</select>';
	echo $result;
}
function show_table() {
	$query = "SELECT * FROM " . $_POST['table'];
	$results = get_query($query);
	$result[] = array_keys($results[0]);
	foreach ($results as $r) {
		$result[] = array_values($r);
	}
	echo json_encode($result);
}

function add_database() {
	$query = "CREATE DATABASE IF NOT EXISTS " . $database;
	$result = get_query($query);
	print_r($result);
}
function rename_database() {
	$query = "RENAME DATABASE " . $database . " TO " . $newname;
	echo $query;
	$result = get_query($query);
	print_r($result);
}
function remove_database() {
	$query = "DROP DATABASE IF EXISTS " . $database;
	$result = get_query($query);
	print_r($result);
}
function add_table() {
	$query = "CREATE TABLE IF NOT EXISTS " . $table . "(id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))";
	$result = get_query($query);
	print_r($result);
}
function rename_table() {
	$query = "RENAME TABLE " . $table . " TO " . $newname;
	$result = get_query($query);
	print_r($result);
}
function truncate_table() {
	$query = "TRUNCATE TABLE IF EXISTS " . $table;
	$result = get_query($query);
	print_r($result);
}

//rename table lu_wind_direction to lu_direction;
function remove_table() {
	$query = "DROP TABLE IF EXISTS " . $table;
	$result = get_query($query);
	print_r($result);
}
function add_column() {
	$query = "ALTER TABLE " . $table . " ADD " . $column . " " . $datatype;
	 //AFTER name; //FIRST
	$result = get_query($query);
}
function rename_column() {
	$query = "ALTER TABLE " . $table . " CHANGE " . $column . " " . $newname . " " . $datatype;
	$result = get_query($query);
	print_r($result);
}
function remove_column() {
	$query = "ALTER TABLE " . $table . " DROP " . $column;
	$result = get_query($query);
	print_r($result);
}

function generate_query($array) {

	//print "<ul>"; foreach ($_POST as $key => $value) {print "<li>".$key.": ".$value."</li>"; if (is_array($value)) {$subarray = $value; print "<ul>"; foreach ($subarray as $key => $value) {print "<li>".$key.": ".$value."</li>";} print "</ul>";}} print "</ul>";
	if ($array["command"] == "CREATE") {
		$query.= $array["command"];
		$query.= " TABLE ";
		$query.= $array["newtablename"];
		$query.= " (number int PRIMARY KEY)";
	}
	if ($array["command"] == "DROP") {
		if ($array["tablename"] != "null") {
			$query.= "DROP TABLE IF EXISTS " . $array["tablename"][0];
		}
	}
	if ($array["command"] == "TRUNCATE") {
		if ($array["tablename"] != "null") {
			$query.= "TRUNCATE TABLE IF EXISTS " . $array["tablename"][0];
		}
	}
	if ($array["command"] == "DELETE") {
		$query.= $array["command"];
		$query.= " FROM ";
		$query.= $array["tablename"][0];
		$query.= " WHERE number = " . $array["number"];
	}
	if ($array["command"] == "ALTER") {
		$query.= $array["command"];
		$query.= " TABLE ";
		$query.= $array["tablename"];
		$query.= " CHANGE ";
		$query.= $array["oldname"];
		$query.= " ";
		$query.= $array["newname"];
	}
	if ($array["command"] == "SELECT") {
		if ($array["b_cols"]) {
			$query.= $array["command"];
			if ($array["distinct"]) {
				$query.= " DISTINCT";
			}
			$columns = $array["b_cols"];
			foreach ($columns as $column) {
				$query.= " " . $column . ",";
			}
			$query = chomp($query, 1);
			$query.= " FROM " . $array["tables"];

			if ($array["paramed"]) {
				for ($i = 0; $i < count($array["param"]); $i++) {
					if ($array["values"][$i]) {
						if ($array["bool"][$i]) {
							$query.= " " . $array["bool"][$i];
						}
						if ($array["param"][$i]) {
							$query.= " " . $array["param"][$i];
						}
						if ($array["not"][$i]) {
							$query.= " " . $array["not"][$i];
						}
						if ($array["operator"][$i]) {
							$query.= " " . $array["operator"][$i];
						}
						if ($array["operator"][$i] == "IN") {
							$query.= " (";
							$words = explode(", ", $array["values"][$i]);
							foreach ($words as $word) {
								$query.= "'" . $word . "', ";
							}
							$query = substr($query, 0, strlen($query) - 2);
							$query.= ")";
						}
						else if ($array["operator"][$i] == "BETWEEN") {
							$query.= " " . $array["value1"][$i] . " AND " . $array["value2"][$i];
						}
						else {
							$query.= " " . $array["values"][$i];
						}
					}
				}
			}
			if ($array["grouped"] == "on") {
				$query.= " GROUP BY " . $array["group"];
			}
			if ($array["ordered"] == "on") {
				$query.= " ORDER BY " . $array["order"];
				if ($array["direction"]) {
					$query.= " " . $array["direction"];
				}
			}
			if ($array["limited"] == "on") {
				$query.= " LIMIT " . $array["limit"] . " ";
			}
		}
	}
	return $query;
}
function get_options($query) {
	trim($query);
	$query = stripslashes($query);
	$result = mysql_query($query) or die($query . " " . mysql_error());

	$row = mysql_fetch_array($result);
	$num_rows = mysql_num_rows($result);
	$num_fields = mysql_num_fields($result);

	print '<select size="10">';

	$values = array_values($row);
	if ($buffer == "yes") {
		print "<option value='' selected=true></option>";
	}
	for ($index = 0; $index < 1; $index++) {
		$value = htmlspecialchars($values[2 * $index + 1]);
		print "<option value=" . $value . " ";
		if ($buffer == "no") {
			print "selected=true";
		}
		print ">" . $value . "</option>";
	}
	while ($row = mysql_fetch_array($result)) {
		$values = array_values($row);
		for ($index = 0; $index < 1; $index++) {
			$value = htmlspecialchars($values[2 * $index + 1]);
			print "<option value=" . $value . " ";
			if ($buffer == "no") {
				print "selected=true";
			}
			print ">" . $value . "</option>";
		}
	}
	print "</select>";
}
function check_table($table) {
	if (count($table[0] != count($table[1]))) {
		print ("Make sure the first line and the data entries have an equal number of entries!<br />");
		return -1;
	}
	for ($i = 1; $i < count($table); $i++) {
		if (count($table[$i]) != count($table[0])) {
			print ("Row $i does not have the correct number of data entries!<br />");
			return $i;
		}
	}
	return true;
}
