<?php

namespace Tualo\Office\Dashboard\Routes;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;
use LasseRafn\InitialAvatarGenerator\InitialAvatar;

class Avatar extends \Tualo\Office\Basic\RouteWrapper
{
    public static function dataUri(string $name): string
    {
        $background = '#';
        foreach (str_split(substr(hash('crc32b', $name), 0, 6), 2) as $component) {
            $background .= sprintf('%02X', intdiv(hexdec($component), 2));
        }

        $image = (new InitialAvatar())
            ->name($name)
            ->size(64)
            ->background($background)
            ->color('#fafafa')
            ->preferBold()
            ->generate();

        return 'data:image/png;base64,' . base64_encode((string) $image->toPng());
    }

    public static function register()
    {
        Route::add('/dashboard/avatar', function () {

            $db = TualoApplication::get('session')->db;
            try {
                $avatar = self::dataUri('Steven Spielberg');
                Route::$finished = true;
                echo $avatar;
                exit();
            } catch (\Exception $e) {
                TualoApplication::result('msg', $e->getMessage());
            }
        }, array('get', 'post'), false);

        Route::add('/profile/avatar', function () {

            $db = TualoApplication::get('session')->db;
            try {
                $avatar = self::dataUri('Steven Spielberg');
                Route::$finished = true;
                echo $avatar;
                exit();
            } catch (\Exception $e) {
                TualoApplication::result('msg', $e->getMessage());
            }
        }, array('get', 'post'), false);
    }
}
