<?php
namespace Tualo\Office\Dashboard\Routes;

use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\Basic\IRoute;

class JsLoader implements IRoute{
    public static function register(){
        BasicRoute::add('/app/dashboard/lazy/(?P<file>[\w.\/\-]+).js',function($matches){
            App::contenttype('application/javascript');
            if (file_exists(dirname(__DIR__,1).'/js/lazy/'.$matches['file'].'.js'))
            readfile( dirname(__DIR__,1).'/js/lazy/'.$matches['file'].'.js' );


            exit();
            
        },['get'],false);


        BasicRoute::add('/jsdashboard/(?P<file>[\w.\/\-]+).js',function($matches){

            if (file_exists(  dirname(__DIR__,1).'/js/lazy/'.$matches['file'].'.js' ) ){
                App::etagFile( dirname(__DIR__,1).'/js/lazy/'.$matches['file'].'.js' , true);
                BasicRoute::$finished = true;
                http_response_code(200);
            }
            
        },['get'],false);

    }
}