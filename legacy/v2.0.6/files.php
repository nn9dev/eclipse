<?php

header("content-type: application/json");

echo json_encode(listFiles('.'), JSON_PRETTY_PRINT);


//$folders = listFolderFiles('.');

function listFiles($dir){
    $ffs = scandir($dir);

    unset($ffs[array_search('.', $ffs, true)]);
    unset($ffs[array_search('..', $ffs, true)]);


    $arr = array();

    foreach($ffs as $ff){
        if(is_dir($dir.'/'.$ff)) {
          $fdir = str_replace("./", "", $dir);
          foreach(listFiles($dir.'/'.$ff) as $file) {
            $arr[] = $ff.'/'.$file;

          }

        } else {
          $arr[] = $ff;
        }

    }
    return $arr;
}








?>
