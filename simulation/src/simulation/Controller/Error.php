<?php
namespace simulation\Controller;

class Error extends \simulation\Controller 
{
    public function indexAction($options)
    {
        header("HTTP/1.0 404 Not Found");
        $this->render("/errors/index.phtml", ['message' => "Page not found!" ]);
    }
}
?>