<?php
if (!isset($_GET['serverID']) || empty($_GET['serverID'])) {
    echo "You did not pass in a serverID.";
    exit;
}

$data = new \simulation\ServerData();
$server = $data->getServer($_GET['serverID']);

if ($server === false) {
    echo "Server not found!";
    exit;
}

if ($data->delete($_GET['serverID'])) {
    header("Location: /");
    exit;
} else {
    echo "An error occurred";
}
?>