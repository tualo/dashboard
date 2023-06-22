<?php
namespace Tualo\Office\Dashboard\Routes;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;
use YoHang88\LetterAvatar\LetterAvatar;

class DashboardRoute implements IRoute{
    public static function register(){

        Route::add('/dashboard/ping',function(){
            TualoApplication::result('success',false);
        
            try{
                if (
                    isset($_SESSION['tualoapplication']['loggedIn'])
                    && ($_SESSION['tualoapplication']['loggedIn']==true)
                    && isset($_SESSION['tualoapplication']['username']) 
                    && isset($_SESSION['tualoapplication']['clients']) 
                    && isset($_SESSION['tualoapplication']['client']) 
                    && isset($_SESSION['tualoapplication']['username'])
                ){
                    $db = TualoApplication::get('session')->getDB();
                    if (!is_null($db)){
                        TualoApplication::result('username', $_SESSION['tualoapplication']['username'] );
                        TualoApplication::result('clients', $_SESSION['tualoapplication']['clients'] );
                        TualoApplication::result('client', $_SESSION['tualoapplication']['client'] );
                        TualoApplication::result('fullname', $_SESSION['tualoapplication']['fullname'] );
                        TualoApplication::result('gst','-');
                        TualoApplication::result('bkr','-');
                        try{
                            TualoApplication::result('gst', $db->singleValue('select getSessionCurrentOffice() v',[],'v') );
                            $avatar = new LetterAvatar($db->singleValue('select getSessionCurrentOffice() v',[],'v'), 'square', 64);
                            //   $avatar->setColor($backgroundColor, $foregroundColor)
                            TualoApplication::result('gstavatar',  $avatar->__toString());

                            
                        }catch(\Exception $e){
                            
                        }
                        try{
                            TualoApplication::result('bkr', $db->singleValue('select getSessionCurrentBKR() v',[],'v') );


                            $avatar = new LetterAvatar($db->singleValue('select getSessionCurrentBKR() v',[],'v'), 'square', 64);
                            //   $avatar->setColor($backgroundColor, $foregroundColor)
                            TualoApplication::result('bkravatar',  $avatar->__toString());
    
                        }catch(\Exception $e){
                                
                        }
                        $avatar = new LetterAvatar($_SESSION['tualoapplication']['fullname'], 'square', 64);
                        TualoApplication::result('avatar',  $avatar->__toString());

                        $avatar = new LetterAvatar($_SESSION['tualoapplication']['client'], 'square', 64);
                        TualoApplication::result('clientavatar',  $avatar->__toString());




                        TualoApplication::result('success', true );
                    }
                }

            }catch(\Exception $e){
                TualoApplication::result('msg', $e->getMessage());
            }

            TualoApplication::contenttype('application/json');
        },array('get'),false);

        Route::add('/dashboard/(?P<file>[\/.\w\d]+).js',function($matches){
            if (file_exists(dirname(__DIR__).'/js/'.$matches['file'].'.js')){
                TualoApplication::etagFile((dirname(__DIR__).'/js/'.$matches['file'].'.js'));
            }
            TualoApplication::contenttype('application/javascript');
        },array('get','post'),false);



        Route::add('/dashboard/test',function(){
            TualoApplication::result('success',false);
            TualoApplication::result('success', true );
            $files = file( TualoApplication::get('basePath').'/vendor/tualo/dashboard/'.'/jsloader.map' );
            foreach($files as $file){
                $fn = TualoApplication::get('basePath').'/vendor/tualo/dashboard/'.''.str_replace("\n","",str_replace("./","",$file));
                $files = file_get_contents( $fn );
                TualoApplication::javascriptLoader( $files );
            }
        },array('get'),false);


        Route::add('/dashboard/client/load',function(){
            TualoApplication::result('success', false );
            TualoApplication::result('msg', 'not logged in');
            if (isset($_SESSION['tualoapplication']) && isset($_SESSION['tualoapplication']['loggedIn']) && ($_SESSION['tualoapplication']['loggedIn']==true) ){
                try {
                    TualoApplication::result('msg', 'ok');
                    TualoApplication::result('data', $_SESSION['tualoapplication']['clients'] );
                    TualoApplication::result('current', $_SESSION['tualoapplication']['client'] );
                    TualoApplication::result('success', true );
                }catch(\Exception $e){
                    TualoApplication::result('msg', $e->getMessage());
                }
            }
            TualoApplication::contenttype('application/json');
        
        },array('get','post'),false);


        Route::add('/dashboard/client/switch',function(){
            TualoApplication::contenttype('application/json');
            TualoApplication::result('success', false );
            TualoApplication::result('msg', 'not logged in');
            $session = TualoApplication::get('session');
            if (isset($_SESSION['tualoapplication']) && isset($_SESSION['tualoapplication']['loggedIn']) && ($_SESSION['tualoapplication']['loggedIn']==true) ){
                try {
                    $sql = '
                        SELECT
                            macc_users.login,
                            macc_users.passwd,
                            macc_users.typ,
                            concat(ifnull(loginnamen.vorname,"")," ",ifnull(loginnamen.nachname,"")) fullname,
                            test_login({username},{password}) pwresult,

                            macc_users_clients.client  dbname,
                            view_macc_clients.username dbuser,
                            view_macc_clients.password dbpass,
                            view_macc_clients.host dbhost,
                            view_macc_clients.port dbport

                        FROM
                            macc_users
                            join macc_users_clients 
                            on macc_users_clients.login = macc_users.login
                            join view_macc_clients 
                            on macc_users_clients.client = view_macc_clients.id
                            left join loginnamen 
                            on macc_users.login=loginnamen.login
                        WHERE 
                            macc_users.login = {username}

                        HAVING (  macc_users_clients.client={mandant} or {mandant}=""  )

                        LIMIT 1
                    ';
                    $hash = ['mandant'=>$_REQUEST['toclient'],'username'=>$_SESSION['tualoapplication']['username']];
                    $row = $session->db->singleRow($sql,$hash);

                    if (false !== $row){
                        session_start();
                        TualoApplication::result('success',true);
                        $_SESSION['db']['dbhost'] = $row['dbhost'];
                        $_SESSION['db']['dbuser'] = $row['dbuser'];
                        $_SESSION['db']['dbpass'] = $row['dbpass'];
                        $_SESSION['db']['dbport'] = $row['dbport'];
                        $_SESSION['db']['dbname'] = $row['dbname'];
                        
                        $_SESSION['tualoapplication']['loggedIn'] = true;
                        $_SESSION['tualoapplication']['typ'] = $row['typ'];
                        $_SESSION['tualoapplication']['username'] = $row['login'];
                        $_SESSION['tualoapplication']['fullname'] = $row['fullname'];
                        $_SESSION['tualoapplication']['client'] = $row['dbname'];
                        $_SESSION['tualoapplication']['clients'] = $session->db->direct('SELECT macc_users_clients.client FROM macc_users_clients join view_macc_clients on macc_users_clients.client = view_macc_clients.id WHERE macc_users_clients.login = {username}',$_SESSION['tualoapplication']);
                        session_commit();
                        // Test DB Access
                        if ( is_null( $session->getDB() ) ){
                            TualoApplication::result('success',false);
                            TualoApplication::result('msg','Felher beim Zugriff auf die Datenbank');
//                            $session->destroy();
                        }else{
                            
                            TualoApplication::result('fullname',    $_SESSION['tualoapplication']['fullname']);
                            TualoApplication::result('username',    $_SESSION['tualoapplication']['username']);
                            TualoApplication::result('client',      $_SESSION['tualoapplication']['client']);
                            TualoApplication::result('clients',     $_SESSION['tualoapplication']['clients']);
                            TualoApplication::result('dbaccess',true);
                            TualoApplication::result('dbn',$session->getDB()->singleValue('select database() s',[],'s'));
                            TualoApplication::result('success', true );
                           
                        }

                    }else{
                        TualoApplication::result('success',false);
                        TualoApplication::result('msg','Fehlerhaft');
                    }



                }catch(\Exception $e){
                    TualoApplication::result('msg', $e->getMessage());
                }
            }
        
        },array('get','post'),false);



        Route::add('/dashboard/shake.css',function($matches){
            $path = dirname(dirname(__DIR__)).'';
            $data = file_get_contents( $path."/src/css/shake.css" );
            TualoApplication::body( $data );
            TualoApplication::contenttype('text/css');
        },array('get','post'),false);

    }
}