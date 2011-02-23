<?php
	$encodedImages = array(
		'assets/test-image-1.jpg',
		'assets/test-image-2.jpg',
		'assets/test-image-4.jpg',
		'assets/test-image-5.jpg',
	);

	if (isset($_GET['id']) && in_array($_GET['id'], $encodedImages)) {
		echo 'data:image/jpg;base64,' . base64_encode(file_get_contents(realpath( './' . $_GET['id'])));
	}