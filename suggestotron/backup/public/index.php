<?php
require_once '../src/Suggestotron/Config.php';
\Suggestotron\Config::setDirectory('../config');

$config = \Suggestotron\Config::get('autoload');
require_once $config['class_path'] . '/Suggestotron/Autoloader.php';
#var_dump($_SERVER);

$route = null;
if(isset($_SERVER['REQUEST_URI']))
{
	$route = $_SERVER['REQUEST_URI'];
}

#var_dump(1, $route);

$router = new \Suggestotron\Router();
$router->start($route);
?>
