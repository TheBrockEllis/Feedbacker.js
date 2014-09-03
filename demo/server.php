<?php

header("HTTP/1.1 200 OK");
header("Content-type: application/json", true);
echo json_encode( array("result" => true) );

?>