<?php
require_once '../src/Suggestotron/Config.php';
\Suggestotron\Config::setDirectory('../config');

$config = \Suggestotron\Config::get('autoload');
require_once $config['class_path'] . '/Suggestotron/Autoloader.php';

if(!isset($_SERVER['PATH_INFO']) || empty($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO'] == '/')
{
	$route = 'list';
}
else
{
	$route = $_SERVER['PATH_INFO'];
}

var_dump($route);

$router = new \Suggestotron\Router();
$router->start($route);
?>
