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
            pages: 0,
            start: 1,
            pageSet1: null,
            pageSet2: null,
        }
    }


    render()
    {
        const { start, pages, pageSet1, pageSet2 } = this.state;
        // console.log( '{ start, pages, pageSet1 }', { start, pages, pageSet1 } );

        return <div className='wrapper'>
            <form onSubmit={this._beginCalc}>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Страниц</span>
                    <input type='text' className="form-control" name='pages' onChange={this._setInputData} placeholder="Страниц" aria-describedby="basic-addon1" value={this.state.pages} />
                </div>
                <br />
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon2">Первая страница</span>
                    <input type='text' className="form-control" name='start' onChange={this._setInputData} placeholder="Первая страница" aria-describedby="basic-addon2" value={this.state.start} />
                </div>
                <br />
                {/*<button type='submit' className='btn btn-success'>Расчитать</button>*/}
            </form>

            {pageSet1 && <div className="block01">
                <h4 className="header01"><span className='label label-info '>Брошура:</span></h4>
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


    _setInputData = ({target: {value}, target}) =>
    {
            this.setState({[target.getAttribute('name')]: value}, () => {
                this._beginCalcT();
            })
    };


    _beginCalc = (event) => {
        event && event.preventDefault();

        const { pages, start } = this.state;

        const pagesSets = (new Utils).calc(start, pages);

        this.setState({pageSet1: pagesSets[0], pageSet2: pagesSets[1], });
    }


    _beginCalcT = debounce(500, false, this._beginCalc);
}


class PageSetOne extends React.PureComponent
{
    render()
    {
        const {pageSet, children, title} = this.props;
        const random = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const id = 'pageSet' + random();
        const id2 = 'pageSet' + random();

        // Брошура
        return <div>
            <p className='pageSet_p'>
                {redFont(<strong>{title}</strong>, "green")}<br />
                {this._renderPageSet(pageSet, id)}
                &nbsp;&nbsp;
                <button type='button' className='btn btn-xs btn-warning' onClick={this._onCopy.bind(this, id)} title='Копировать значения'>C</button>
            </p>

            <p>
                {redFont("<=> ", "green")}
                {this._renderPageSet(pageSet.reverse(), id2)}
                &nbsp;&nbsp;
                <button type='button' className='btn btn-xs btn-warning' onClick={this._onCopy.bind(this, id2)} title='Копировать значения'>C</button>
                <br />&nbsp;
            </p>

            {children}
        </div>
    }


    _renderPageSet(pageSet, id)
    {
        let inputVal = '';
        let retPageSet;

        retPageSet = pageSet.map((value, idx) =>
        {
            inputVal += `${value[1][0]},${value[0][0]}${idx+1 < pageSet.length ? "," : ''}`;
            return <span key={idx}>
                <span style={{color: value[1][1]}}>{value[1][0]},</span>
                <span style={{color: value[0][1]}}>{value[0][0]}</span>
                {idx+1 < pageSet.length && ", "}
            </span>
        });

        retPageSet.push(<input key={pageSet.length + 1} className='copyText' id={id} type="text" defaultValue={inputVal} />);

        return retPageSet;
    }

    _onCopy = id => {
        const copyTextarea = document.querySelector('#' + id);
        copyTextarea.select();

        try {
            const successful = document.execCommand('copy');
            console.log('Copying text command was ' + successful ? 'successful' : 'unsuccessful');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    };
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
            if ((($divisible_4 - $pages) == 2) && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = ["bl", "red"];
            else if (($divisible_4 - $pages) == 3 && (($divisible_4 - cou_down + $start - 1) == 1)) item[1] = ["bl", "red"];
            else item[1] = [cou_down, $color];
            cou_down -= 2;
            $pagesSet2.push(item);
        } // endfor
        return [$pagesSet, $pagesSet2];
    }
}


ReactDOM.render(
  <App />, document.getElementById('root')
);
