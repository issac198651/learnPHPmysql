<?php
require 'ServerData.php';

$data = new ServerData();
$data->connect();

$servers = $data->getAllServers();

foreach ($servers as $server) {
    echo "<table>";
    echo "<tr>";
    echo "<td>" .$server['ServerName'] . "</td>";
    echo "<td>" .$server['BaseLine'] . "</td>";
    echo "<td>" .$server['Type'] . "</td>";
    echo "<td>" .$server['User'] . "</td>";
    echo "<td>" .$server['Phone'] . "</td>";
    echo "<td>" .$server['Comment'] . "</td>";
    echo "</tr>";
    echo "</table>";
}
?>