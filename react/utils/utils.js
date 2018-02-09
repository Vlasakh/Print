export class Utils
{
    calc(start, pages)
    {
        let $pages = pages;
        let $start = start;

        const $C_INICOLOR = "#BDB20E";
        const $C_INISECCOLOR = "#555";

// "<span style="color:#555;">$cou_down,</span><span style="color:#BDB20E;">$cou_up,</span>"
// "<span style="color:#555;">$cou_down,</span><span style="color:#BDB20E;">$cou_up,</span>"
// "<span style="color:#555;">$cou_down,</span><span style="color:#BDB20E;">$cou_up,</span>"
        // "<br />";

        let $divisible_4 = Math.ceil($pages / 4) * 4; // кол-во страниц кратное 4-м
        let $f_odd;
        if (($pages % 4) != 0) {
            $f_odd = 1;
        } else {
            $f_odd = 0;
        } // счётчик вниз
        let cou_down = $divisible_4 + $start - 1;
        let $cou_up = $start ? $start : 1;   // счётчик вверх
        let $color_sec = $C_INICOLOR;
        let $color = $C_INISECCOLOR;
        let $pagesSet = [];
console.log( '{cou_down, $cou_up, $divisible_4}', {cou_down, $cou_up, $divisible_4} );

        for (let $i = 1; $i <= Math.ceil($pages / 4); $i++) {
            let item;

            if ($f_odd && ($i == 1)) item = [["bl", "red"]];
            else if (((($divisible_4 - $pages) == 3)) && ($i == 2)) item = [["bl", "red"]]; //  || (($divisible_4 - $pages) == 2)
            else item = [[cou_down, $color]];
            cou_down -= 2;
            item[1] = [$cou_up, $color_sec];
            $cou_up += 2;
            $pagesSet.push(item);
        } // endfor

        // "<p>".redFont("<strong>Вторая сторона:</strong>", "#00f").
        let $pagesSet2 = [];
        $cou_up = $start + 1;
        cou_down = $divisible_4 + $start - 2;
        for (let $i = 1; $i <= Math.ceil($pages / 4); $i++) {
            let item;
            // $s1 = redFont("$cou_up,", $color_sec);
            item = [[$cou_up, $color_sec]];
            $cou_up += 2;
            if ((($divisible_4 - $pages) == 2) && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = ["bl", "red"];
            else if (($divisible_4 - $pages) == 3 && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = ["bl", "red"];
            else item[1] = [cou_down, $color];
            cou_down -= 2;
            $pagesSet2.push(item);
        } // endfor
        return [$pagesSet, $pagesSet2];
    }
}
