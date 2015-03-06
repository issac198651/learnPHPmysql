<?php
require_once '../src/Suggestotron/Config.php';
\Suggestotron\Config::setDirectory('../config');

$config = \Suggestotron\Config::get('autoload');
require_once $config['class_path'] . '/Suggestotron/Autoloader.php';
#var_dump($_SERVER);
if(!isset($_SERVER['REQUEST_URI']) || empty($_SERVER['REQUEST_URI']) || $_SERVER['REQUEST_URI'] == '/')
{
	$route = 'list';
}
else
{
	$route = $_SERVER['REQUEST_URI'];
}

var_dump($route);

$router = new \Suggestotron\Router();
$router->start($route);
?>
