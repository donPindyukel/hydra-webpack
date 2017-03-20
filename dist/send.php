<?php

if ( isset($_POST['phone']) && strlen( $_POST['phone'] ) > 5 ) {

	$to      = 'admin@test.ru';
	$subject = 'Subject';
	$headers = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: FromName <callback@test.ru>\r\n";

	if ( isset( $_POST['name'] ) ) {
		$message .= '<p>Имя: ' . $_POST['name'] . '</p>';
	}
	if ( isset( $_POST['phone'] ) ) {
		$message .= '<p>Телефон: ' . $_POST['phone'] . '</p>';
	}

	$message .= '</body></html>';

	$send = mail( $to, $subject, $message, $headers );

	if ( $send ) {
		print "success";
	} else {
		print "error";
	}
}
