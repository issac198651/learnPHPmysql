<?php
#namespace simulation;

class ServerData
{
	protected $connection = null;

	#public function __construct()
	#{
	#	$this->connect();
	#}

	public function connect()
	{
		$this->connection = new PDO("mysql:host=localhost;dbname=simulation", "root", "");
	}

	public function getAllServers()
    {
        $query = $this->connection->prepare("SELECT * FROM servers");
        $query->execute();

        return $query;
    }
}
?>