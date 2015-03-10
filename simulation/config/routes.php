<?php
return [
    'default' => '/server/list',
    'errors' => '/error/:code',
    'routes' => [
        '/server(/:action(/:serverID))' => [
            'controller' => '\simulation\Controller\Servers',
            'action' => 'list',
        ],
        '/:controller(/:action)' => [
            'controller' => '\simulation\Controller\:controller',
            'action' => 'index',
        ]
    ]
];