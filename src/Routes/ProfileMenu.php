<?php

namespace Tualo\Office\Dashboard\Routes;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;


class ProfileMenu extends \Tualo\Office\Basic\RouteWrapper
{
    public static function menu($db, $node)
    {
        $menu = [];
        $menuData = $db->direct(
            '

            select * from (



 
                
                
                select 
                    json_object(
                        "nodeId", getSessionUser(),
                        "text", if(getSessionUserFullName()="",getSessionUser(),getSessionUserFullName()),
                        "iconCls", "icon-avatar user-avatar",
                        "component", "",
                        "leaf", 1=1,
                        "routeTo", "#profile",
                        "param", ""
                    ) menuobject,
                    getSessionUser() id,
                    "" path2,
                    0 priority

                union
                    

                    select

                    json_object(
                        "nodeId", concat("current_",database()),
                        "text", concat("Aktuell: ",database()),
                        "iconCls", "icon-avatar client-avatar",
                        "component", "",
                        "routeTo", concat("#"),
                        "param", "",
                        "children",json_arrayagg(menuobject)
                    ) menuobject,
                    concat("current_",database()) id,
                    "" path2,
                    1 priority

                    from (
                    select 

                    json_object(
                        "nodeId", concat("switch_",client),
                        "text", client,
                        "iconCls", "fa fa-circle",
                        "component", "",
                        "leaf", 1=1,
                        "routeTo", concat("#profile/switchclient/",client),
                        "param", ""
                    ) menuobject,
                    concat("switch_",client) id,
                    "" path2,
                    1 priority
                from                     
                VIEW_SESSION_CLIENTS
                where database()<>client
                ) x

                union

                select 
                    json_object(
                        "nodeId", "profile_logout",
                        "text", "Abmelden",
                        "iconCls", "fa fa-door-open",
                        "component", "",
                        "leaf", 1=1,
                        "routeTo", "#profile/logout",
                        "param", ""
                    ) menuobject,
                    "profile_logout" id,
                    "" path2,
                    999 priority
            ) m 

            having path2={node}
            order by priority
        ',
            ['node' => $node] + $_SESSION['tualoapplication']
        );

        foreach ($menuData as $md) {
            $m = is_string($md['menuobject']) ? json_decode($md['menuobject'], true) : $md['menuobject'];
            /*$submenu = self::menu($db,$m['nodeId']);
            if ($submenu){
                $m['children']=$submenu;
            }else{
                $m['leaf']=true;
            }*/
            $menu[] = $m;
        }
        return $menu;
    }
    public static function register()
    {

        Route::add('/dashboard/profilemenu', function () {

            $db = TualoApplication::getSession()->getDB();
            try {
                if (is_null($db)) {
                    throw new \Exception('no db connection');
                }
                http_response_code(200);
                $menu = self::menu($db, '');
                echo json_encode($menu);
                exit();
            } catch (\Exception $e) {
                TualoApplication::result('msg', $e->getMessage());
            }
        }, array('get', 'post'), false);
    }
}
