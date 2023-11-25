<?php
header('Content-Type: application/json');

$query = $_GET['q'];

function query($server, $user, $password, $query)
{
    $connexion= mysqli_connect($server, $user, $password) or die("Error in DB connexion");
    $db = mysqli_select_db($connexion, "amazon_movies") or die("Error in fetch DB");
    $result = mysqli_query($connexion, $query) or die("Error in query");
    mysqli_close($connexion);
    return $result;
}

$result = query("localhost", "root", "", $query);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);
?>