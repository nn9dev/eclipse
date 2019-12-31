<?php
  header('Content-Type: application/json');
  function get_boxart($url) {
  	$html = file_get_contents($url);
    preg_match_all( '|<img.*?src=[\'"](.*?)[\'"].*?>|i',$html, $matches);
    $string = '_thumb.jpg';
    $html = str_replace("_thumb", "_front", $matches[0][4]);
    $htmlDoc = new DOMDocument();
    $htmlDoc->loadHTML($html);
    $elements = $htmlDoc->getElementsByTagName("img");
    foreach($elements as $element) {
        $src = $element->getAttribute('src');
        return $src;
    }
  }
  $list = array();
  $json = json_decode(file_get_contents($_GET['system'], '.json?', microtime(true)));
  foreach($json as $game){
    $games = array();
    $games['name'] = $game->title;
    $games['region'] = $game->cover_region_name;
    $games['reference'] = $game->reference_url;
    $games['boxart'] = get_boxart($game->reference_url);
    array_push($list, $games);
  }
  sort($list, 4);
  echo json_encode($list, JSON_PRETTY_PRINT);
?>
