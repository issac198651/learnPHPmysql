<?php
namespace simulation;

class Controller 
{
    protected $config;
    protected $template;

    public function __construct()
    {
        $this->config = \simulation\Config::get('site');
        $this->template = new \simulation\Template($this->config['view_path'] . "/base.phtml");
    }


    protected function render($template, $data = array())
    {
        $this->template->render($this->config['view_path'] . "/" . $template, $data);
    }
}