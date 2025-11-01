<?php

namespace Tualo\Office\Dashboard\Routes;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;
use Tualo\Office\DS\DSTable;
use YoHang88\LetterAvatar\LetterAvatar;

class ClientSwitch extends \Tualo\Office\Basic\RouteWrapper
{
    public static function scope(): string
    {
        return 'dashboard.clientswitch';
    }

    public static function register()
    {


        Route::add('/dashboard/client/switch', function () {
            TualoApplication::contenttype('application/json');
            TualoApplication::result('success', false);
            TualoApplication::result('msg', 'not logged in');
            $session = TualoApplication::get('session');
            if (isset($_SESSION['tualoapplication']) && isset($_SESSION['tualoapplication']['loggedIn']) && ($_SESSION['tualoapplication']['loggedIn'] == true)) {
                try {
                    $sql = '
                        SELECT
                            macc_users.login,
                            macc_users.passwd,
                            macc_users.typ,
                            concat(ifnull(loginnamen.vorname,"")," ",ifnull(loginnamen.nachname,"")) fullname,
                            test_login({username},{password}) pwresult,

                            macc_users_clients.client  db_name,
                            view_macc_clients.username db_user,
                            view_macc_clients.password db_pass,
                            view_macc_clients.host db_host,
                            view_macc_clients.port db_port

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
                    $hash = ['mandant' => $_REQUEST['toclient'], 'username' => $_SESSION['tualoapplication']['username']];
                    $row = $session->db->singleRow($sql, $hash);

                    if (false !== $row) {
                        @session_start();
                        TualoApplication::result('success', true);
                        $_SESSION['db']['db_host'] = $row['db_host'];
                        $_SESSION['db']['db_user'] = $row['db_user'];
                        $_SESSION['db']['db_pass'] = $row['db_pass'];
                        $_SESSION['db']['db_port'] = $row['db_port'];
                        $_SESSION['db']['db_name'] = $row['db_name'];

                        $_SESSION['tualoapplication']['loggedIn'] = true;
                        $_SESSION['tualoapplication']['typ'] = $row['typ'];
                        $_SESSION['tualoapplication']['username'] = $row['login'];
                        $_SESSION['tualoapplication']['fullname'] = $row['fullname'];
                        $_SESSION['tualoapplication']['client'] = $row['db_name'];
                        $_SESSION['tualoapplication']['clients'] = $session->db->direct('SELECT macc_users_clients.client FROM macc_users_clients join view_macc_clients on macc_users_clients.client = view_macc_clients.id WHERE macc_users_clients.login = {username}', $_SESSION['tualoapplication']);
                        session_commit();
                        // Test DB Access
                        if (is_null($session->getDB())) {
                            TualoApplication::result('success', false);
                            TualoApplication::result('msg', 'Fehler beim Zugriff auf die Datenbank');
                            //                            $session->destroy();
                        } else {

                            TualoApplication::result('fullname',    $_SESSION['tualoapplication']['fullname']);
                            TualoApplication::result('username',    $_SESSION['tualoapplication']['username']);
                            TualoApplication::result('client',      $_SESSION['tualoapplication']['client']);
                            TualoApplication::result('clients',     $_SESSION['tualoapplication']['clients']);
                            TualoApplication::result('dbaccess', true);
                            TualoApplication::result('dbn', $session->getDB()->singleValue('select database() s', [], 's'));
                            TualoApplication::result('success', true);
                        }
                    } else {
                        TualoApplication::result('success', false);
                        TualoApplication::result('msg', 'Fehlerhaft');
                    }
                } catch (\Exception $e) {
                    TualoApplication::result('msg', $e->getMessage());
                }
            }
        }, array('get', 'post'), false, [], self::scope());
    }
}
