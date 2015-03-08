<?php
namespace Suggestotron;

class Router {
    protected $config;

    public function start($route)
    {
        #change the style of $route
        $pattern = "/\?\w+=/";
        $route = preg_replace($pattern, '/', $route);

        #$route = '/topics/edit';
        #var_dump(2, $route);
        $this->config = \Suggestotron\Config::get('routes');

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

        try
        {
            foreach ($this->config['routes'] as $path => $defaults) #$path = /topic(/:action(/:id))
            {                                                       #defaults = array (size=2)
                #var_dump(6, $this->config['routes']);              #               'controller' => string '\Suggestotron\Controller\Topics' (length=31)
                #var_dump(11, $defaults);                           #               'action' => string 'list' (length=4)
                $regex = '@' . preg_replace(
                    '@:(\w+)@', 
                    '(?P<$1>[^/]+)', 
                    str_replace(')', ')?', (string)$path)
                ) . '@';

                var_dump(7, $regex);                               #$regex = @/topic(/:action(/:id)?)?@                     
                #var_dump(8, $path);                                #$regex should be @/topic(/:action)(/(?P<:id>[^/]+))?)?@ ?
                                                                    #               & @/:controller(/(?P<:id>[^/]+))?@ ?
                $matches = [];

                #var_dump($regex);
                if(preg_match($regex, $route, $matches))
                {
                    var_dump(9, $route);                           #$route = /topic/add
                    var_dump(10, $matches);                        #$matches = array (size=1)
                    $options = $defaults;                           #               0 => string '/topic' (length=6)
                    #var_dump(14, $options);
                    foreach ($matches as $key => $value) 
                    {
                        #var_dump(12, $key);
                        #var_dump(13, $value);
                        #var_dump(3, $matches);
                        if (is_numeric($key))           #true goto next loop, in this case 'end'
                        {
                            continue;
                        }
                    
                        $options[$key] = $value;
                        var_dump(4, $options);         #not printed at all, so alway listaction in options
                        if (isset($defaults[$key])) 
                        {
                            if (strpos($defaults[$key], ":$key") !== false) 
                            {
                                $options[$key] = str_replace(":$key", $value, $defaults[$key]);
                            }
                            else if(strstr($options[$key], ":") !== null)
                            {
                                $options[$key] = $defaults[$key];
                            }
                        }
                        var_dump(6, $options);
                    }

                    if (isset($options['controller']) && isset($options['action']))         #according to thisfunction, if /topics/add is in
                    {                                                                       #action should be add
                        $callable = [$options['controller'], $options['action'] . 'Action'];
                        var_dump(5, $callable);
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
        }
        catch (\Suggestotron\Controller\Exception $e) 
        {
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