<?php
namespace Suggestotron\Controller;

class Votes extends \Suggestotron\Controller {
    public function addAction($options) {
        if (!isset($options['id']) || empty($options['id'])) {
            echo "No topic id specified!";
            exit;
        }

        $votes = new \Suggestotron\Model\Votes();
        $votes->addVote($options['id']);

        header("Location: /");
    }

    public function deleteAction($options) {
    	if(!isset($options['id']) || empty($options['id'])) {
    		echo "No topic id specified!";
    	}

    	$votes = new \Suggestotron\Model\Votes();
        $votes->deleteVote($options['id']);

        header("Location: /");
    }
}
?>