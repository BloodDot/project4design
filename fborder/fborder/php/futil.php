<?php // Example 21-1: functions.php
$dbhost  = 'localhost';    // Unlikely to require changing
$dbname  = 'mysms';       // Modify these...
$dbuser  = 'root';   // ...variables according
$dbpass  = '';   // ...to your installation
$appname = "Bruce"; // ...and preference

$con = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$con) 
{ 
    die("Á¬½Ó´íÎó: " . mysqli_connect_error()); 
} 

mysqli_select_db($con, $dbname) or die(mysqli_error());

function createTable($name, $query)
{
    queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
    echo "Table '$name' created or already exists.<br />";
}

function queryMysql($query)
{
    $result = mysqli_query($query) or die(mysqli_error());
	 return $result;
}

function destroySession()
{
    $_SESSION=array();
    
    if (session_id() != "" || isset($_COOKIE[session_name()]))
        setcookie(session_name(), '', time()-2592000, '/');

    session_destroy();
}

function sanitizeString($var)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    return mysqli_real_escape_string($var);
}

function redirect($url)
{
	echo "<script type=text/javascript>window.location.href='$url';</script>";
}


?>
