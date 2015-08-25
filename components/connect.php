<?php

if(empty($_SESSION))
{
	session_start();
}

if(!empty($dbc)) {
	$stat = $dbc->stat();
} else {
	$stat = null;
}

if(empty($stat))
{
	//Define constant to connect to database
	DEFINE('DATABASE_USER', 'cjchung_r');
	DEFINE('DATABASE_PASSWORD', 'Christine123');
	DEFINE('DATABASE_HOST', 'dentalstudiojc.com');
	//DEFINE('DATABASE_HOST', '127.0.0.1');
	DEFINE('DATABASE_NAME', 'cjchung_wp');
	//Default time zone ,to be able to send mail
	date_default_timezone_set('US/Eastern');

	//You might not need this
	ini_set('SMTP', "mail.myt.mu"); // Overide The Default Php.ini settings for sending mail


	//This is the address that will appear coming from ( Sender )
	define('EMAIL', 'adamwalzer@gmail.com');

	//Define the root url where the script will be found such as http://website.com or http://website.com/Folder/
	DEFINE('WEBSITE_URL', 'http://dentalstudiojc.com');
	// DEFINE('WEBSITE_URL', '127.0.0.1');


	// Make the connection:
	$dbc = @mysqli_connect(DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME);

	if (!$dbc)
	{
	    trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
	    //echo mysqli_connect_error ( void );
	}

}

?>