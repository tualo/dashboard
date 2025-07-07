<?php

namespace Tualo\Office\Dashboard\Routes;

use phpseclib3\Math\BigInteger\Engines\PHP;
use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\Basic\IRoute;
use Tualo\Office\Basic\RouteSecurityHelper;

class JsLoader implements IRoute
{
    public static function register()
    {
        BasicRoute::add('/app/dashboard/lazy/(?P<file>[\w.\/\-]+).js', function ($matches) {
            App::contenttype('application/javascript');
            if (file_exists(dirname(__DIR__, 1) . '/js/lazy/' . $matches['file'] . '.js'))
                readfile(dirname(__DIR__, 1) . '/js/lazy/' . $matches['file'] . '.js');


            exit();
        }, ['get'], false);


        BasicRoute::add('/jsdashboard/(?P<file>[\w.\/\-]+).js', function ($matches) {

            RouteSecurityHelper::serveSecureStaticFile(
                $matches['file'] . '.js',
                dirname(__DIR__, 1) . '/js/lazy/',
                ['js'],
                ['application/javascript']
            );
        }, ['get'], false);
    }
}
