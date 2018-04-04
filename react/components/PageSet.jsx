import React, { Component } from 'react';


export class PageSet extends React.PureComponent
{
    render()
    {
        const {pageSet, children, title} = this.props;
        const random = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const id = 'pageSet' + random();
        const id2 = 'pageSet' + random();

        // Брошура
        return <div>
            <p className={style.pageSet_p}>
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
