<?php

namespace Tualo\Office\Dashboard\Middlewares;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\IMiddleware;

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