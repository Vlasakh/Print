<?php
 if( !isset($_GET['p']) && !isset($_GET['pages']) ) header("Location: http://{$_SERVER["SERVER_NAME"]}{$_SERVER["PHP_SELF"]}?pages=64&start=".(isset($_GET['start']) ? $_GET['start'] : "1"));

 $pages = $_GET['p'] OR $pages = $_GET['pages'];
 $start = $_GET['start'] OR $start = 1;

 if( !$pages ) print "<p>".redFont("Не указаны параметры, для указания параметров скопируйте эту строку в строку адреса и поменяйте параметры.", "red")
    ." : <strong>{$_SERVER["SERVER_NAME"]}{$_SERVER["PHP_SELF"]}?p=16&start=1</strong></p>\n";

 // Брошура
 print "<div style=\"margin-top: 30px; padding: 0 10px; border: 1px dotted #444;\">\n";
 print "<div style=\"position: relative; float:left; margin-top: -10px; float:left; background-color: green; color: white;\"><strong>&nbsp;Брошура:&nbsp;</strong></div>\n";

 $C_INICOLOR = "#BDB20E";
 $C_INISECCOLOR = "#555";

 print "<p style=\"margin-top: 40px\">".redFont("<strong>Первая сторона:</strong>", "green")."<br />";
 $divisible_4 = ceil($pages / 4) * 4; // кол-во страниц кратное 4-м
 if( ($pages % 4) != 0 ) { $f_odd = 1; } else { $f_odd = 0; } // счётчик вниз
 $cou_down = $divisible_4 + $start - 1;
 $cou_up = $start ? $start : 1;   // счётчик вверх
 $color_sec = $C_INICOLOR; $color = $C_INISECCOLOR; $s1 = '';

 for ($i = 1; $i <= ceil($pages / 4); $i++) {
    if( $f_odd && ($i == 1) ) $s1 = redFont("bl, ", "red");
    else if( ((($divisible_4 - $pages) == 3)) && ($i == 2) ) $s1 = redFont("bl, ", "red"); //  || (($divisible_4 - $pages) == 2)
    else $s1 = redFont("$cou_down,", $color);
    $cou_down -= 2;
    $s1 .= redFont("$cou_up,", $color_sec);
    $cou_up += 2;
    $pagesSet[] = $s1;
    //$s1 .= "&nbsp;";
 } // endfor

 $s1 = join(" ", $pagesSet);
 print substr_replace($s1, "", strrpos($s1, ","), 1)."</p>";
 $s1 = join(" ", array_reverse($pagesSet));
 print "<p>".redFont("<=> ", "green").substr_replace($s1, "", strrpos($s1, ","), 1)."<br />&nbsp;</p>\n";

print "<p><em>".redFont("Помнить про зеркальные поля для подшивки. Поля для подшивки ставить &laquo;снутри&raquo; !!!")."</em></p>\n";

 print "<p>".redFont("<strong>Вторая сторона:</strong>", "#00f")."<br />";
 $pagesSet = array(); $cou_up = $start+1; $cou_down = $divisible_4 + $start - 2;
 for( $i = 1; $i <= ceil($pages / 4); $i++ ) {
    $s1 = redFont("$cou_up,", $color_sec);
    $cou_up += 2;
    if( (($divisible_4 - $pages) == 2) && (($divisible_4 - $cou_down + $start - 1) == 1) ) $s1 .= redFont("bl, ", "red");
    else if( ($divisible_4 - $pages) == 3 && (($divisible_4 - $cou_down + $start - 1) == 1) ) $s1 .= redFont("bl, ", "red");
    else $s1 .= redFont("$cou_down,", $color);
    $cou_down -= 2;
    $pagesSet[] = $s1;
 } // endfor

 $s1 = join(" ", $pagesSet);
 print substr_replace($s1, "", strrpos($s1, ","), 1)."</p>";
 $s1 = join(" ", array_reverse($pagesSet));
 print "<p>".redFont("<=> ", "green").substr_replace($s1, "", strrpos($s1, ","), 1)."<br />&nbsp;</p>\n";

 print "<p>".redFont("<strong>bl</strong>", "red")." - отсутствующий лист</p>";
 print "<p>".redFont("<=> ", "green")." - обратный порядок наборов листов, чтобы сразу получить середину и начать складывать еще до окончания печати</p>";
 print "<p>Кол-во листов : ".ceil($pages / 4)."</p>";
 print "</div>\n";








 // По 2 на листе с 2-х сторон
 print "<p>&nbsp;</p>\n";
 print "<div style=\"position: relative; border: 1px dotted #444; padding: 0 10px;\">\n";
 print "<div style=\"position: relative; float:left; margin-top: -10px\">&nbsp;"
    ."<strong>&nbsp;".redFont("&nbsp;По 2 на листе с 2-х сторон:&nbsp;", "#fff", "#0152FF")."</strong>"
    ."&nbsp;</div>\n";
 print "<div style=\"clear:both\"></div>\n";
 print "<p><small><em>печатать 14 шрифтом, или 15 для полного комфорта (при нормальном зрении)</em></small>&nbsp;</p>\n";
 //$pages = 182;
 $f_side =  "<p>".redFont("<strong>Первая сторона:</strong>", "green")."<br />";

 // *** расчёт второй стороны ***
 $j = 1; $twop = 0; $count = 0; $inicolor = "#BDB20E"; $color = $inicolor;
 $s_side = "<p>".redFont("<strong>Вторая сторона:</strong>", "#00f")."<br />";
 for ($i = 1; $i <= $pages; $i++) {
    //if( $j < 3 ) print "$i, ";
    if( $j >= 3 ) { $s_side .= redFont("$i, ", $color); $count++; $twop++; }
    if( $j == 4 ) { $j = 0; }
    $j++;
    if( $twop >= 2 ) { $color = ( $color == $inicolor ) ? "#555":$inicolor; $twop = 0; }
 } // endfor
 $s_side .= "<br />Кол-во : {$count}</p>";

 // *** расчёт первой стороны ***
 $j = 1; $twop = 0; $s_count = $count; $count = 0; $inicolor = "#BDB20E"; $color = $inicolor;
 for ($i = 1; $i <= $pages; $i++) {
    if( $count > $s_count ) $color = "red";
    if( $j < 3 ) { $f_side .= redFont("$i, ", $color); $count++; $twop++; }
    //if( $j >= 3 ) print "$i, ";
    if( $j == 4 ) { $j = 0; }
    $j++;
    if( $twop >= 2 ) { $color = ( $color == $inicolor ) ? "#555":$inicolor; $twop = 0; }
 } // endfor
 $f_side .= "<br />Кол-во : {$count}</p>";

 print $f_side."\n";
 print $s_side."\n";
 print "</div>\n";






 /**
 * Get colored html string to output
 *
 * @param string $str - stirng to format, color and bg settings
 * @return html formatted string
 */
 function redFont($str, $color="red", $bgcolor=0) {
    if( $bgcolor ) $bg = " background-color: {$bgcolor};"; else $bg = '';
	return "<span style=\"color:$color;{$bg}\">".$str."</span>";
 }
?>