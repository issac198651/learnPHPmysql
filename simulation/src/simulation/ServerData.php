<?php
namespace simulation;

class ServerData
{
	protected $connection = null;

	public function __construct()
	{
		$this->connect();
	}

	public function connect()
	{
		$config = \simulation\Config::get('database');

		$this->connection = new \PDO("mysql:host=" .$config['hostname']. ";dbname=" .$config['dbname'], $config['username'], $config['password']);
	}

	public function getAllServers()
    {
        $query = $this->connection->prepare("SELECT * FROM servers");
        $query->execute();

        return $query;
    }

    public function add($data)
    {
    	$query = $this->connection->prepare(
    		"INSERT INTO servers (
    			ServerName,
    			BaseLine,
    			Type
    		) VALUES (
    			:ServerName,
    			:BaseLine,
    			:Type
    		)"
    	);

    	$data = [
    		':ServerName' => $data['ServerName'],
    		':BaseLine' => $data['BaseLine'],
    		':Type' => $data['Type']
    	];
        $query->execute($data);
    }

    public function getServer($serverID)
    {
    	$sql = "SELECT * FROM servers WHERE serverID = :serverID LIMIT 1";
		$query = $this->connection->prepare($sql);

		$values = [':serverID' => $serverID];
		$query->execute($values);

		return $query->fetch(\PDO::FETCH_ASSOC);	
    }

    public function update($data)
	{
	    $query = $this->connection->prepare(
	        "UPDATE servers 
	            SET 
	                ServerName = :ServerName, 
	                BaseLine = :BaseLine,
	                Type = :Type
	            WHERE
	                serverID = :serverID"
	    );
	
	    $data = [
	        ':serverID' => $data['serverID'],
	        ':ServerName' => $data['ServerName'],
	        ':BaseLine' => $data['BaseLine'],
	        ':Type' => $data['Type']
	    ];
	
	    return $query->execute($data);
	}

    public function delete($serverID)
    {
    	$query = $this->connection->prepare(
    	    "DELETE FROM servers
	    	        WHERE
	    	            serverID = :serverID"
	    	);
	
	    	$data = [
	    	    ':serverID' => $serverID,
	    	];
	
    	return $query->execute($data);
    }
}
?>