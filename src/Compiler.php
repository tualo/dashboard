<?php
namespace Tualo\Office\Dashboard;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\ExtJSCompiler\ICompiler;
use Tualo\Office\ExtJSCompiler\FileHelper;

class Compiler implements ICompiler {
    

    public static function getFiles(){
        $files = [];
        $l = [];
        FileHelper::listFiles(__DIR__."/js/modern",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'modern',
            'modul'=>'dashboard',
            'files'=>$l
        ];  

        $l = [];
        FileHelper::listFiles(__DIR__."/js/classic",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'classic',
            'modul'=>'dashboard',
            'files'=>$l
        ];  
        
        $l = [];
        FileHelper::listFiles(__DIR__."/js/both",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'',
            'modul'=>'dashboard',
            'files'=>$l
        ];
        return $files;
    }
}