<?php
namespace Suggestotron\Controller;

class About extends \Suggestotron\Controller 
{
    public function indexAction($options)
    {
        $this->render("/about/index.phtml", ['message' => "This is an about Page!" ]);
    }
}
?>