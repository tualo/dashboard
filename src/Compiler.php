<?php
namespace Tualo\Office\Dashboard;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\ExtJSCompiler\ICompiler;


class Compiler implements ICompiler {
    public static function listFiles($path){
        $files=[];
        if ($handle = opendir($path)) {
            while (false !== ($file = readdir($handle))) {
                if ( ($file!='.') && ($file!='..') ) $files[]=$file;
            }
            closedir($handle);
        }
        return $files;
    }

    public static function getFiles(){
        $files = [];
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'modern',
            'modul'=>'dashboard',
            'files'=>self::listFiles(__DIR__."/js/modern/")
        ];  

        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'classic',
            'modul'=>'dashboard',
            'files'=>self::listFiles(__DIR__."/js/classic/")
        ];  
        
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'',
            'modul'=>'dashboard',
            'files'=>self::listFiles(__DIR__."/js/both/")
        ];
        return $files;
    }
}