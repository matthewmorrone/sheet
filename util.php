<?php
function pr() {
	return call_user_func_array("print_r", func_get_args());
}

function get_file($f) {
	return file_get_contents($f);
}



function proxy($url, $header = 1, $timeout = 60) {
	$proxy = '50.22.206.179:80';
	$referer = 'http://www.google.com/';
	$agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, $header);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_PROXY, $proxy);

	//curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	curl_setopt($ch, CURLOPT_REFERER, $referer);
	curl_setopt($ch, CURLOPT_USERAGENT, $agent);
	$result['EXE'] = curl_exec($ch);
	$result['INF'] = curl_getinfo($ch);
	$result['ERR'] = curl_error($ch);
	curl_close($ch);
	return $result['EXE'];
}

function chomp($i, $c) {
	return substr($i, 0, strlen($i) - $c);
}
function is_url($i) {
	return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $i);
}
function xerror() {
	print ("<br /><br />Error At:<br />___" . __LINE__ . "___<br /><br />");
}
function xecho() {
	foreach (func_get_args() as $i) {
		if (is_array($i)) {
			echo "<pre>";
			print_r($i);
			echo "</pre>";
		}
		else {
			echo $i;
		}
		echo "<br />";
	}
}
function microtime_float() {
	list($usec, $sec) = explode(" ", microtime());
	return ((float)$usec + (float)$sec);
}

function start() {
	date_default_timezone_set("America/New_York");
	require ("phpquery.php");
	return new DateTime();
}

function finish($start) {
	$timediff = $start->diff(new DateTime());
	$minutes = str_pad($timediff->i, 2, '0', STR_PAD_LEFT);
	$seconds = str_pad($timediff->s, 2, '0', STR_PAD_LEFT);

	echo "\n";
	echo $minutes . ':' . $seconds;
	echo "\n\n";
}

function fastexp($b, $m, $n) {
	$t = 1;
	while ($n > 0) {
		if ($m % 2) {
			$t = ($t * $b) % $n;
		}

		// Do this if $m is odd.
		$n = floor($m / 2);
		$b = ($b * $b) % $n;

		// Increase the power of $b by a factor of 2.


	}
	return $t;
}
function is_prime($number) {
	if ($number < 2)

	/* We don't want zero or one showing up as prime */ {
		return FALSE;
	}
	for ($i = 2; $i <= ($number / 2); $i++) {
		if ($number % $i == 0)

		/* Modulus operator, very useful */ {
			return FALSE;
		}
	}
	return TRUE;
}
function generate_prime() {
	$number = 0;
	while (!$this->IsPrime($number))

	/* Keep going till we get a prime number */ {
		$number = rand();
	}
	echo $number . "\n";
	return $number;
}
function alpha_iterate() {
	$a = str_split("abcdefghijklmnopqrstuvwxyz");
	$len = count($a);
	$list = array();

	for ($i = 1; $i < (1 << $len); $i++) {
		$c = '';
		for ($j = 0; $j < $len; $j++) {
			if ($i & (1 << $j)) {
				$c.= $a[$j];
			}
			echo $c . ".it\n";
		}
		sort($list);
		return $list;
	}
}
function alpha_generator($input, &$output, $current = "") {
	static $lookup = array(1 => "1", 2 => "abc", 3 => "def", 4 => "ghi", 5 => "jkl", 6 => "mno", 7 => "pqrs", 8 => "tuv", 9 => "wxyz", 0 => "0");
	$digit = substr($input, 0, 1);

	// e.g. "4"
	$other = substr($input, 1);

	// e.g. "3556"
	$chars = str_split($lookup[$digit], 1);

	// e.g. "ghi"
	foreach ($chars as $char) {

		// e.g. g, h, i
		if ($other === false) {

			// base case
			$output[] = $current . $char;
		}
		else {

			// recursive case
			alphaGenerator($other, $output, $current . $char);
		}
	}

	// $output = array();
	// alphaGenerator("43556", $output);
	// var_dump($output);


}
function generatePasswd($numAlpha = 6, $numNonAlpha = 2) {
	$listAlpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	$listNonAlpha = ',;:!?.$/*-+&@_+;./*&?$-!,';
	return str_shuffle(substr(str_shuffle($listAlpha), 0, $numAlpha) . substr(str_shuffle($listNonAlpha), 0, $numNonAlpha));
}
function hex2bin($h) {
	if (!is_string($h)) {
		$h = (string)$h;
	}
	$r = '';
	for ($a = 0; $a < strlen($h); $a+= 2) {
		$r.= chr(hexdec($h{$a} . $h{($a + 1) }));
	}
	return $r;
}
function convert_number_to_words($number) {
	$hyphen = '-';
	$conjunction = ' and ';
	$separator = ', ';
	$negative = 'negative ';
	$decimal = ' point ';
	$dictionary = array(0 => 'zero', 1 => 'one', 2 => 'two', 3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six', 7 => 'seven', 8 => 'eight', 9 => 'nine', 10 => 'ten', 11 => 'eleven', 12 => 'twelve', 13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen', 16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen', 19 => 'nineteen', 20 => 'twenty', 30 => 'thirty', 40 => 'fourty', 50 => 'fifty', 60 => 'sixty', 70 => 'seventy', 80 => 'eighty', 90 => 'ninety', 100 => 'hundred', 1000 => 'thousand', 1000000 => 'million', 1000000000 => 'billion', 1000000000000 => 'trillion', 1000000000000000 => 'quadrillion', 1000000000000000000 => 'quintillion');

	if (!is_numeric($number)) {
		return false;
	}

	if (($number >= 0 && (int)$number < 0) || (int)$number < 0 - PHP_INT_MAX) {

		// overflow
		trigger_error('convert_number_to_words only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX, E_USER_WARNING);
		return false;
	}

	if ($number < 0) {
		return $negative . convert_number_to_words(abs($number));
	}

	$string = $fraction = null;

	if (strpos($number, '.') !== false) {
		list($number, $fraction) = explode('.', $number);
	}

	switch (true) {
		case $number < 21:
			$string = $dictionary[$number];
			break;

		case $number < 100:
			$tens = ((int)($number / 10)) * 10;
			$units = $number % 10;
			$string = $dictionary[$tens];
			if ($units) {
				$string.= $hyphen . $dictionary[$units];
			}
			break;

		case $number < 1000:
			$hundreds = $number / 100;
			$remainder = $number % 100;
			$string = $dictionary[$hundreds] . ' ' . $dictionary[100];
			if ($remainder) {
				$string.= $conjunction . convert_number_to_words($remainder);
			}
			break;

		default:
			$baseUnit = pow(1000, floor(log($number, 1000)));
			$numBaseUnits = (int)($number / $baseUnit);
			$remainder = $number % $baseUnit;
			$string = convert_number_to_words($numBaseUnits) . ' ' . $dictionary[$baseUnit];
			if ($remainder) {
				$string.= $remainder < 100 ? $conjunction : $separator;
				$string.= convert_number_to_words($remainder);
			}
			break;
	}

	if (null !== $fraction && is_numeric($fraction)) {
		$string.= $decimal;
		$words = array();
		foreach (str_split((string)$fraction) as $number) {
			$words[] = $dictionary[$number];
		}
		$string.= implode(' ', $words);
	}

	return $string;
}
function convertNumber($num) {
	list($num, $dec) = explode(".", $num);

	$output = "";

	if ($num{0} == "-") {
		$output = "negative ";
		$num = ltrim($num, "-");
	}
	else if ($num{0} == "+") {
		$output = "positive ";
		$num = ltrim($num, "+");
	}

	if ($num{0} == "0") {
		$output.= "zero";
	}
	else {
		$num = str_pad($num, 36, "0", STR_PAD_LEFT);
		$group = rtrim(chunk_split($num, 3, " "), " ");
		$groups = explode(" ", $group);

		$groups2 = array();
		foreach ($groups as $g) $groups2[] = convertThreeDigit($g{0}, $g{1}, $g{2});

		for ($z = 0; $z < count($groups2); $z++) {
			if ($groups2[$z] != "") {
				$output.= $groups2[$z] . convertGroup(11 - $z) . ($z < 11 && !array_search('', array_slice($groups2, $z + 1, -1)) && $groups2[11] != '' && $groups[11] {
					0
				} == '0' ? " and " : ", ");
			}
		}

		$output = rtrim($output, ", ");
	}

	if ($dec > 0) {
		$output.= " point";
		for ($i = 0; $i < strlen($dec); $i++) $output.= " " . convertDigit($dec{$i});
	}

	return $output;
}
function convertGroup($index) {
	switch ($index) {
		case 11:
			return " decillion";
		case 10:
			return " nonillion";
		case 9:
			return " octillion";
		case 8:
			return " septillion";
		case 7:
			return " sextillion";
		case 6:
			return " quintrillion";
		case 5:
			return " quadrillion";
		case 4:
			return " trillion";
		case 3:
			return " billion";
		case 2:
			return " million";
		case 1:
			return " thousand";
		case 0:
			return "";
	}
}
function convertThreeDigit($dig1, $dig2, $dig3) {
	$output = "";

	if ($dig1 == "0" && $dig2 == "0" && $dig3 == "0") return "";

	if ($dig1 != "0") {
		$output.= convertDigit($dig1) . " hundred";
		if ($dig2 != "0" || $dig3 != "0") $output.= " and ";
	}

	if ($dig2 != "0") $output.= convertTwoDigit($dig2, $dig3);
	else if ($dig3 != "0") $output.= convertDigit($dig3);

	return $output;
}
function convertTwoDigit($dig1, $dig2) {
	if ($dig2 == "0") {
		switch ($dig1) {
			case "1":
				return "ten";
			case "2":
				return "twenty";
			case "3":
				return "thirty";
			case "4":
				return "forty";
			case "5":
				return "fifty";
			case "6":
				return "sixty";
			case "7":
				return "seventy";
			case "8":
				return "eighty";
			case "9":
				return "ninety";
		}
	}
	else if ($dig1 == "1") {
		switch ($dig2) {
			case "1":
				return "eleven";
			case "2":
				return "twelve";
			case "3":
				return "thirteen";
			case "4":
				return "fourteen";
			case "5":
				return "fifteen";
			case "6":
				return "sixteen";
			case "7":
				return "seventeen";
			case "8":
				return "eighteen";
			case "9":
				return "nineteen";
		}
	}
	else {
		$temp = convertDigit($dig2);
		switch ($dig1) {
			case "2":
				return "twenty-$temp";
			case "3":
				return "thirty-$temp";
			case "4":
				return "forty-$temp";
			case "5":
				return "fifty-$temp";
			case "6":
				return "sixty-$temp";
			case "7":
				return "seventy-$temp";
			case "8":
				return "eighty-$temp";
			case "9":
				return "ninety-$temp";
		}
	}
}
function convertDigit($digit) {
	switch ($digit) {
		case "0":
			return "zero";
		case "1":
			return "one";
		case "2":
			return "two";
		case "3":
			return "three";
		case "4":
			return "four";
		case "5":
			return "five";
		case "6":
			return "six";
		case "7":
			return "seven";
		case "8":
			return "eight";
		case "9":
			return "nine";
	}
}
