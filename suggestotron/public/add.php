<?php
require_once '../src/Suggestotron/Config.php';
\Suggestotron\Config::setDirectory('../config');

$config = \Suggestotron\Config::get('autoload');
#var_dump($config);
require_once $config['class_path'] . '/Suggestotron/Autoloader.php';

#var_dump($_SERVER['PATH_INFO']);

if(isset($_POST) && sizeof($_POST) > 0)
{
	$data = new \Suggestotron\TopicData();
	$data->add($_POST);
	header("Location: /index.php");
	exit;
}

$template = new \Suggestotron\Template("../views/base.phtml");
$template->render("../views/index/add.phtml");
?>