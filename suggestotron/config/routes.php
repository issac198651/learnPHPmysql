<?php
// routes can be:
//return [
//    'default' => '/topic/list',
//    #'errors' => '/error/:code',
//    'routes' => [
//        '/:controller(/:action(/:id))' => [
//            'controller' => '\Suggestotron\Controller\:controller',
//            'action' => ':action',
//            'default action' => defaultaction
//        ]#this is not neccessary, error could have actions to add, every controller should have a default action#,
//         # how to GET the input is a problem, use javascript? check the jQuery and ask DZC
//        #'/:controller(/:action)' => [
//        #    'controller' => '\Suggestotron\Controller\:controller',
//        #    'action' => 'index',
//        #]
//    ]
//];

// this design if for the controller missing
return [
    'default' => '/topic/list',
    'errors' => '/error/:code',
    'routes' => [
        '/topic(/:action(/:id))' => [
            'controller' => '\Suggestotron\Controller\Topics',
            'action' => 'list',
        ],
        '/vote(/:action(/:id))' => [
            'controller' => '\Suggestotron\Controller\Votes',
        ],
        '/:controller(/:action)' => [
            'controller' => '\Suggestotron\Controller\:controller',
            'action' => 'index',
        ]
    ]
];
?>