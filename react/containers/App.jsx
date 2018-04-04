/**
 * Libs
 * https://github.com/niksy/throttle-debounce
 * https://rawgit.com/Vlasakh/Print/master/react/src/utils.js
 * https://cdn.rawgit.com/Vlasakh/Print/master/react/src/utils.js
 */

import React, { Component } from 'react';

import { Form } from "../components/Form.jsx";
import { Utils } from '../utils/utils';
import { debounce, redFont } from '../../src/utils/utils';

import style from '../../src/styles/index.scss';


const PropTypes = React.PropTypes;


/**
 * Приложение
 */
export class App extends Component
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

        return <div className={style.wrapper}>
            <Form />

{/*
            {pageSet1 && <div className="block01">
                <h4 className="header01"><span className='label label-info '>Брошура:</span></h4>
                // {pageSet1 && <PageSetOne pages={pages} title='Первая сторона:' some="some prop">}
                {pageSet1 && <PageSetOne {...{pageSet: pageSet1, pages, title: 'Первая сторона:'}}>
                    <p><em>{redFont('Помнить про зеркальные поля для подшивки. Поля для подшивки ставить "снутри" !!!')}</em></p>
                </PageSetOne>}

                {pageSet2 && <PageSetOne {...{pageSet: pageSet2, pages, title: 'Вторая сторона:'}}>
                     <p>{redFont(<strong>bl</strong>, "red")} - отсутствующий лист</p>
                     <p>{redFont("<=> ", "green")} - обратный порядок наборов листов, чтобы сразу получить середину и начать складывать еще до окончания печати</p>
                     <p>Кол-во листов : {Math.ceil(pages / 4)}</p>
                </PageSetOne>}
            </div>
            }
*/}
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
    };


    _beginCalcT = debounce(500, false, this._beginCalc);
}


