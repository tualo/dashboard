<?php
namespace tualo\Office\TualoTheme\Routes;
use tualo\Office\Basic\TualoApplication;
use tualo\Office\Basic\Route;
use tualo\Office\Basic\IRoute;


class DashboardRoute implements IRoute{
    public static function register(){

        Route::add('/dashboard/ping',function(){
            TualoApplication::result('success',false);
        
            if (
                   isset($_SESSION['tualoapplication']['loggedIn'])
                && ($_SESSION['tualoapplication']['loggedIn']==true)
                && isset($_SESSION['tualoapplication']['username']) 
                && isset($_SESSION['tualoapplication']['clients']) 
                && isset($_SESSION['tualoapplication']['client']) 
                && isset($_SESSION['tualoapplication']['username'])
            ){
                TualoApplication::result('username', $_SESSION['tualoapplication']['username'] );
                TualoApplication::result('clients', $_SESSION['tualoapplication']['clients'] );
                TualoApplication::result('client', $_SESSION['tualoapplication']['client'] );
                TualoApplication::result('username', $_SESSION['tualoapplication']['username'] );
                TualoApplication::result('success', true );
            }
            TualoApplication::contenttype('application/json');
        },array('get'),false);

        Route::add('/dashboard/(?P<file>[\/.\w\d]+).js',function($matches){
            if (file_exists(dirname(__DIR__).'/js/'.$matches['file'].'.js')){
                TualoApplication::etagFile((dirname(__DIR__).'/js/'.$matches['file'].'.js'));
            }
            TualoApplication::contenttype('application/javascript');
        },array('get','post'),false);

    }
}