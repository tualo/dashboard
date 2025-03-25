<?php

namespace Tualo\Office\Dashboard\Routes;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;
use YoHang88\LetterAvatar\LetterAvatar;

class Avatar implements IRoute
{
    public static function register()
    {
        Route::add('/dashboard/avatar', function () {

            $db = TualoApplication::get('session')->db;
            try {
                $avatar = new LetterAvatar('Steven Spielberg', 'square', 64);
                Route::$finished = true;
                echo $avatar->__toString();
                exit();
            } catch (\Exception $e) {
                TualoApplication::result('msg', $e->getMessage());
            }
        }, array('get', 'post'), false);

        Route::add('/profile/avatar', function () {

            $db = TualoApplication::get('session')->db;
            try {
                $avatar = new LetterAvatar('Steven Spielberg', 'square', 64);
                Route::$finished = true;
                echo $avatar->__toString();
                exit();
            } catch (\Exception $e) {
                TualoApplication::result('msg', $e->getMessage());
            }
        }, array('get', 'post'), false);
    }
}
