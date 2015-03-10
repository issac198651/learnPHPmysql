<?php
require_once '../src/simulation/Config.php';
\simulation\Config::setDirectory('../config');

$config = \simulation\Config::get('autoload');
require_once $config['class_path'] . '/simulation/Autoloader.php';

#var_dump($_SERVER);
$route = null;
if (isset($_SERVER['REQUEST_URI'])) {
    $route = $_SERVER['REQUEST_URI'];
}

#var_dump($route);

$router = new \simulation\Router();
$router->start($route);
?>