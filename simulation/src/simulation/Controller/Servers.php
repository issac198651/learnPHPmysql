<?php
namespace simulation\Controller;

class Servers extends \simulation\Controller {
    protected $data;

    public function __construct()
    {
        parent::__construct();
        $this->data = new \simulation\ServerData();
    }

    public function listAction()
    {
        $servers = $this->data->getAllServers();
        
        $this->render("index/list.phtml", ['servers' => $servers]);
    }

    public function addAction()
    {
        if(isset($_POST) && sizeof($_POST) > 0) {
            $this->data->add($_POST);
        
            header("Location: /");
            exit;
        }
        
        $this->render("index/add.phtml");
    }

    public function editAction($options)
    {
        if (isset($_POST['serverID']) && !empty($_POST['serverID'])) {
            if ($this->data->update($_POST)) {
                header("Location: /");
                exit;
            } else {
                echo "An error occurred";
                exit;
            }
        }
        
        if (!isset($options['serverID']) || empty($options['serverID'])) {
            echo "You did not pass in a serverID.";
            exit;
        }
        
        $server = $this->data->getServer($options['serverID']);
        
        if ($server === false) {
            echo "server not found!";
            exit;
        }
        
        $this->render("index/edit.phtml", ['server' => $server]);
    }

    public function deleteAction($options)
    {
        if (!isset($options['serverID']) || empty($options['serverID'])) {
            echo "You did not pass in a serverID.";
            exit;
        }
        
        $server = $this->data->getServer($options['serverID']);
        
        if ($server === false) {
            echo "Server not found!";
            exit;
        }
        
        if ($this->data->delete($options['serverID'])) {
            header("Location: /");
            exit;
        } else {
            echo "An error occurred";
        }
    }
}
?>