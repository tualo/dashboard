<?php
namespace Tualo\Office\Dashboard;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\ExtJSCompiler\ICompiler;


class Compiler implements ICompiler {
    public static function listFiles($path,&$files,$replacesubpath=''){
        if ($replacesubpath=='') $replacesubpath=$path;
        if (file_exists($path)){
            if ($handle = opendir($path)) {
                while (false !== ($file = readdir($handle))) {
                    if ( ($file!='.') && ($file!='..') ){
                        if (is_dir($path.'/'.$file)){
                            self::listFiles($path.'/'.$file,$files,$replacesubpath);
                        }else{
                            $files[]=[
                                'file'=>$path.'/'.$file,
                                'subpath'=>dirname(str_replace($replacesubpath,'',$path.'/'.$file)),
                                'prio'=>0
                            ];
                        }
                    }
                }
                closedir($handle);
            }
        }
    }

    public static function getFiles(){
        $files = [];
        $l = [];
        self::listFiles(__DIR__."/js/modern",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'modern',
            'modul'=>'dashboard',
            'files'=>$l
        ];  

        $l = [];
        self::listFiles(__DIR__."/js/classic",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'classic',
            'modul'=>'dashboard',
            'files'=>$l
        ];  
        
        $l = [];
        self::listFiles(__DIR__."/js/both",$l);
        $files[] = [
            'prio'=>'10003',
            'toolkit'=>'',
            'modul'=>'dashboard',
            'files'=>$l
        ];
        return $files;
    }
}