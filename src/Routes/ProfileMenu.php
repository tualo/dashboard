<?php
namespace Tualo\Office\Dashboard\Routes;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;


class ProfileMenu implements IRoute{
    public static function menu($db,$node){
        $menu=[];
        $menuData=$db->direct('

            select * from (
                select 
                    json_object(
                        "nodeId", getSessionUser(),
                        "text", if(getSessionUserFullName()="",getSessionUser(),getSessionUserFullName()),
                        "iconCls", "fa fa-user",
                        "component", "",
                        "routeTo", "#profile",
                        "param", ""
                    ) menuobject,
                    getSessionUser() id,
                    "" path2,
                    0 priority
                union

                select 
                    json_object(
                        "nodeId", "profile_logout",
                        "text", "Abmelden",
                        "iconCls", "fa fa-door-open",
                        "component", "",
                        "routeTo", "#profile/logout",
                        "param", ""
                    ) menuobject,
                    "profile_logout" id,
                    "" path2,
                    1 priority
            ) m 

            having path2={node}
            order by priority
        ',['node'=>$node]+$_SESSION['tualoapplication']
        );
        foreach($menuData as $md){
            $m=is_string($md['menuobject'])?json_decode($md['menuobject'],true):$md['menuobject'];
            $submenu = self::menu($db,$m['nodeId']);
            if ($submenu){
                $m['children']=$submenu;
            }else{
                $m['leaf']=true;
            }
            $menu[]=$m;
        }
        return $menu;
    }
    public static function register(){

        Route::add('/dashboard/profilemenu',function(){

            $db = TualoApplication::get('session')->getDB();
            try {
                $menu=self::menu($db,'');
                echo json_encode($menu);
                exit();
                
            }catch(\Exception $e){
                echo $e->getMessage();
                exit();
                TualoApplication::result('msg', $e->getMessage());
            }
        },array('get','post'),false);
    }
}