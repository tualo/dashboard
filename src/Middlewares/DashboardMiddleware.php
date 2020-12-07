<?php

namespace tualo\Office\Dashboard\Middleware;
use tualo\Office\Basic\TualoApplication;
use tualo\Office\Basic\IMiddleware;

class DashboardMiddleware implements IMiddleware{
    public static function register(){
        TualoApplication::use('dashboard',function(){
            try{
                TualoApplication::javascript('dashboard_app', './dashboard/Application.js',[],100000);
            }catch(\Exception $e){
                TualoApplication::set('maintanceMode','on');
                TualoApplication::addError($e->getMessage());
            }
        },-100); // should be one of the last
    }
}