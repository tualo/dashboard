<?php
namespace Tualo\Office\Dashboard;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\ExtJSCompiler\ICompiler;


class Compiler implements ICompiler {
    public static function getFiles(){
        $files = [];
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'modern',
            'modul'=>'dashboard',
            'files'=>glob(__DIR__."/js/modern/*.js")
        ];  

        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'classic',
            'modul'=>'dashboard',
            'files'=>glob(__DIR__."/js/classic/*.js")
        ];  
        
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'',
            'modul'=>'dashboard',
            'files'=>glob(__DIR__."/js/both/*.js")
        ];
        return $files;
    }
}