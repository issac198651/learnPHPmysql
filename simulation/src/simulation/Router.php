<?php
namespace simulation;

class Router {
	protected $config;

	public function start($route)
	{
		$this->config = \simulation\Config::get('routes');
        #var_dump($route);

		if(empty($route) || $route == '/')
        {
            if(isset($this->config['default']))
            {
                $route = $this->config['default'];
            }
            else
            {
                $this->error();
            }
        }

        try {
        	foreach ($this->config['routes'] as $path => $defaults) {
        		$regex = '@' . preg_replace(
        		    '@:(\w+)@',
        		    '(?P<$1>[^/]+)',
        		    str_replace(')', ')?', (string) $path)
        		) . '@';

        		$matches = [];

        		if (preg_match($regex, $route, $matches)) {
        			$options = $defaults;

        			foreach ($matches as $key => $value) {
					    if (is_numeric($key)) {
					        continue;
					    }
					
					    $options[$key] = $value;
					    if (isset($defaults[$key])) {
					        if (strpos($defaults[$key], ":$key") !== false) {
					            $options[$key] = str_replace(":$key", $value, $defaults[$key]);
					        }
					        else if(strpos($options[$key], ":") !== false) {
                                $options[$key] = $defaults[$key];
                            }
					    }
					}
                    #var_dump($options);

					if (isset($options['controller']) && isset($options['action']))         #according to thisfunction, if /topics/add is in
                    {                                                                       #action should be add
                        $callable = [$options['controller'], $options['action'] . 'Action'];
                        #var_dump(5, $callable);
                        if (is_callable($callable)) {
                            $callable = [new $options['controller'], $options['action'] . 'Action'];
                            $callable($options);
                            return;
                        } 
                        else 
                        {
                            $this->error();
                        }
                    } 
                    else 
                    {
                        $this->error();
                    }
        		}
        	}
    
		} catch (\Suggestotron\Controller\Exception $e) {
		    $this->error();
		}
	}

	public function error()
    {
        if (isset($this->config['errors'])) {
            $route = $this->config['errors'];
            $this->start($route);
        } else {
            echo "An unknown error occurred, please try again!";
        }
    
        exit;
    }
}
?>