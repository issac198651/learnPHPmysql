<?php
namespace Suggestotron\Model;

class Votes 
{
	public function addVote($topic_id)
	{
		$sql = "UPDATE Votes
					SET
						count = count + 1
					WHERE
						topic_id = :id";

		$query = \Suggestotron\Db::getInstance()->prepare($sql);

		$data = [
			':id' => $topic_id,
		];

		return $query->execute($data);
	}

	public function deleteVote($topic_id)
	{
		$sql = "UPDATE Votes
					SET
						count = count - 1
					WHERE
						topic_id = :id";

		$query = \Suggestotron\Db::getInstance()->prepare($sql);

		$data = [
			':id' => $topic_id,
		];

		return $query->execute($data);
	}
}
?>