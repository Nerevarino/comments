<?php

// $lastVisibleMessageID = $_POST['lastVisibleMessageID'];


//sql connection data
$host = 'localhost';
$port = '5432';
$dbname = 'Comments';
$user = 'evgeniy';
$password = 'e9166890307';
//sql connection data

$sql_query_text = file_get_contents(dirname(__DIR__) . "/sql/getComments.sql");


try {
    $db_manager = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
    $sql_prepared_query = $db_manager->prepare($sql_query_text);
    $sql_prepared_query->execute(array());
    $newComments = $sql_prepared_query->fetchAll();
    echo json_encode($newComments);
    

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
