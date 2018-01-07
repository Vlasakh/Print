/**
 * Libs
 * https://github.com/niksy/throttle-debounce
 */

console.clear();

const PropTypes = React.PropTypes;


/**
 * Приложение
 */
class App extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            pages: 16,
            start: 1,
            pageSet1: null,
            pageSet2: null,
        }
    }


    render()
    {
        const { start, pages, pageSet1, pageSet2 } = this.state;
        console.log( '{ start, pages, pageSet1 }', { start, pages, pageSet1 } );

        return <div className='wrapper'>
            <form onSubmit={this._beginCalc}>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Страниц</span>
                    <input type='text' className="form-control" name='pages' onChange={this._setInputData} placeholder="Страниц" aria-describedby="basic-addon1" value={pages} />
                </div>
                <br />
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon2">Первая страница</span>
                    <input type='text' className="form-control" name='start' onChange={this._setInputData} placeholder="Первая страница" aria-describedby="basic-addon2" value={start} />
                </div>
                <br />
                <button type='submit' className='btn btn-success'>Расчитать</button>
            </form>

            {pageSet1 && <div className="block01">
                <div className="header01"><strong>&nbsp;Брошура:&nbsp;</strong></div>
                {pageSet1 && <PageSetOne {...{pageSet: pageSet1, pages, title: 'Первая сторона:'}}>
                    <p><em>{redFont('Помнить про зеркальные поля для подшивки. Поля для подшивки ставить "снутри" !!!')}</em></p>
                </PageSetOne>}

                {pageSet2 && <PageSetOne {...{pageSet: pageSet2, pages, title: 'Вторая сторона:'}}>
                     <p>{redFont(<strong>bl</strong>, "red")} - отсутствующий лист</p>
                     <p>{redFont("<=> ", "green")} - обратный порядок наборов листов, чтобы сразу получить середину и начать складывать еще до окончания печати</p>
                     <p>Кол-во листов : {Math.ceil(pages / 4)}</p>
                </PageSetOne>}
            </div>}
        </div>
    }


    _setInputData = ({target: {value}, target}) => {
        console.log( '{value, target}', target.value, target.getAttribute('name') );

        this.setState({[target.getAttribute('name')]: value})
    };


    _beginCalc = (event) => {
        event.preventDefault();

        const { pages, start } = this.state;

        const pagesSets = (new Utils).calc(start, pages);

        console.log( '{pagesSets}', {pagesSets} );
        this.setState({pageSet1: pagesSets[0], pageSet2: pagesSets[1], });
    }
}


function PageSetOne({pageSet, children, title}) {
    // Брошура
    return <div>
        <p style={{marginTop: '40px'}}>
            {redFont(<strong>{title}</strong>, "green")}<br />
            {pageSet.map((value, idx) =>
                <span>
                    <span style={{color: value[1][1]}}>{value[1][0]},</span>
                    <span style={{color: value[0][1]}}>{value[0][0]}</span>
                    {idx+1 < pageSet.length && ","}
                    &nbsp;
                </span>
            )}
        </p>

        <p>
            {redFont("<=> ", "green")}
            {pageSet.reverse().map((value, idx) =>
                <span>
                    <span style={{color: value[1][1]}}>{value[1][0]},</span>
                    <span style={{color: value[0][1]}}>{value[0][0]}</span>
                    {idx+1 < pageSet.length && ","}
                    &nbsp;
                </span>
            )}
            <br />&nbsp;
        </p>

        {children}
    </div>
}


class Utils
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

        "<br />";
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
        for ($i = 1; $i <= Math.ceil($pages / 4); $i++) {
            let item;
            // $s1 = redFont("$cou_up,", $color_sec);
            item = [[$cou_up, $color_sec]];
            $cou_up += 2;
            if ((($divisible_4 - $pages) == 2) && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = [["bl", "red"]];
            else if (($divisible_4 - $pages) == 3 && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = [["bl", "red"]];
            else item[1] = [cou_down, $color];
            cou_down -= 2;
            $pagesSet2.push(item);
        } // endfor
        return [$pagesSet, $pagesSet2];
/*

        $s1 = join(" ", $pagesSet);
        print
        substr_replace($s1, "", strrpos($s1, ","), 1).
        "</p>";
        $s1 = join(" ", array_reverse($pagesSet));
        print
        "<p>".redFont("<=> ", "green").substr_replace($s1, "", strrpos($s1, ","), 1)."<br />&nbsp;</p>\n";*/
    }
}


/*
function redFont($str, $color = "red", $bgcolor = 0) {
    let $bg;
    if ($bgcolor) $bg = "bg"; else $bg = '';
    return `<span style="color:${$color};${$bg}">`+$str+
    "</span>";
}
*/

function redFont (str, color = 'red', bg = 'white')
{
    return <span style={{color:color, backgroundColor: bg}}>{str}</span>;
}


ReactDOM.render(
  <App />, document.getElementById('root')
);
