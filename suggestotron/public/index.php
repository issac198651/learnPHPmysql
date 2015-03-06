<?php
require_once '../src/Suggestotron/Config.php';
\Suggestotron\Config::setDirectory('../config');

$config = \Suggestotron\Config::get('autoload');
require_once $config['class_path'] . '/Suggestotron/Autoloader.php';
#var_dump($_SERVER);
if(!isset($_SERVER['REDIRECT_URL']) || empty($_SERVER['REDIRECT_URL']) || $_SERVER['REDIRECT_URL'] == '/')
{
	$route = 'list';
}
else
{
	$route = $_SERVER['REDIRECT_URL'];
}

var_dump($route);

$router = new \Suggestotron\Router();
$router->start($route);
?>
