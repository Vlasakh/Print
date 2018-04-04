import React, { PureComponent } from 'react';

export class Form extends PureComponent
{
    render()
    {
        return <form onSubmit={() => 'this._beginCalc'}>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Страниц</span>
                <input type='text' className="form-control" name='pages' onChange={this._setInputData} placeholder="Страниц" aria-describedby="basic-addon1" value={this.props.pages} />
            </div>
            <br />
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon2">Первая страница</span>
                <input type='text' className="form-control" name='start' onChange={this._setInputData} placeholder="Первая страница" aria-describedby="basic-addon2" value={this.props.start} />
            </div>
            <br />
            {/*<button type='submit' className='btn btn-success'>Расчитать</button>*/}
        </form>
    }
}
