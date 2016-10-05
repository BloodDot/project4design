<?php
	include 'futil.php';
	$con = mysqli_connect($dbhost, $dbuser, $dbpass);
	if (!$con) 
	{ 
	    die("数据库连接错误" . mysqli_connect_error()); 
	} 
	
	mysqli_select_db($con, $dbname) or die(mysqli_error());
	mysqli_query($con, "set character set 'utf8'");//读库
	$result = mysqli_query($con, "SELECT * FROM `releaselist` WHERE 1") or die(mysqli_error());
	
	$num = mysqli_num_rows($result) or die(mysqli_error());
	
	$releaselist = array();
	
	for ($j = 0 ; $j < $num ; ++$j)
	{
	    $row = mysqli_fetch_row($result);
	    
	    array_push($releaselist, $row);
	}
	
	echo urldecode ( json_encode ( $releaselist ) )
?>