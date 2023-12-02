<?php
namespace Tualo\Office\Dashboard\Routes;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;


class Menu implements IRoute{
    public static function menu($db,$node){
        $menu=[];
        $menuData=$db->direct('

        
            select 
                json_object(
                        "nodeId", macc_menu.id,
                        "text", macc_menu.title,
                        "iconCls", macc_menu.iconcls,
                        "component", macc_menu.component,
                        "routeTo", macc_menu.route_to,
                        "param", macc_menu.param
                ) menuobject,
                macc_menu.id,
                macc_menu.path2
            from 
                macc_menu 
                join rolle_menu 
                    on rolle_menu.id = macc_menu.id
                    and lower(rolle) in ( select `group` from macc_users_groups where id={username} )
            where 
                macc_menu.path2={node}
            group by 
                macc_menu.id
            order by macc_menu.priority
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
        Route::add('/dashboard/menu',function(){

            $db = TualoApplication::get('session')->db;
            try {
                $menu=self::menu($db,'');
                echo json_encode($menu);
                exit();
                
            }catch(\Exception $e){
                TualoApplication::result('msg', $e->getMessage());
            }
        },array('get','post'),false);
    }
}