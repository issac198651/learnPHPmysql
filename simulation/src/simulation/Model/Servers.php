<?php
namespace simulation\Model;

class Servers {

	public function getAllServers()
    {
    	$sql = "SELECT * FROM servers";

        $query = \simulation\Db::getInstance()->prepare($sql);
        $query->execute();

        return $query;
    }

    public function add($data)
    {
    	$sql = "INSERT INTO servers (
    			ServerName,
    			BaseLine,
    			Type
    		) VALUES (
    			:ServerName,
    			:BaseLine,
    			:Type
    		)";
    	$query = \simulation\Db::getInstance()->prepare($sql);

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
		$query = \simulation\Db::getInstance()->prepare($sql);

		$values = [':serverID' => $serverID];
		$query->execute($values);

		return $query->fetch(\PDO::FETCH_ASSOC);	
    }

    public function update($data)
	{
		$sql = "UPDATE servers 
	            SET 
	                ServerName = :ServerName, 
	                BaseLine = :BaseLine,
	                Type = :Type
	            WHERE
	                serverID = :serverID";
	    $query = \simulation\Db::getInstance()->prepare($sql);
	
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
    	$sql = "DELETE FROM servers
	    	        WHERE
	    	            serverID = :serverID";
	    	            
    	$query = \simulation\Db::getInstance()->prepare($sql);
	
	    	$data = [
	    	    ':serverID' => $serverID,
	    	];
	
    	return $query->execute($data);
    }
}
?>
