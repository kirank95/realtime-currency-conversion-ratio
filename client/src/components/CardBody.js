import React from "react";


/**
* @Component
* CardBody -  component used to display the card with currency exchange data for respective currencies
**/
function CardBody(props) {
    const [fromInputValue, setFromInputValue] = React.useState(1);
    const [toInputValue, setToInputValue] = React.useState(props.currency.value);

    //Change handler for other INR input. Also changes the corresponding other currency value.
    const handleFromChange = (e) => {
        setFromInputValue(e.target.value);
        setToInputValue(e.target.value * props.currency.value);
    }

    //Change handler for other currncy input. Also changes the corresponding INR value.
    const handleToChange = (e) => {
        setToInputValue(e.target.value);
        setFromInputValue(e.target.value / props.currency.value);
    }

    return (
        <div id="card-body" className="card-body card-main-body">
            <div className="col-sm-12 card-item"><h4 className="card-item-text">{`${props.currency.value} ${props.currency.currencyCode}`}</h4></div>
            <div className="col-sm-12 card-item card-input-item">
                <input className="card-input" type="text" value={ fromInputValue } onChange={handleFromChange}/><label>INR</label>
                <input className="card-input" type="text" value={ toInputValue } onChange={handleToChange} /><label>{props.currency.currencyCode}</label>
            </div>
        </div>
    );
}

export default CardBody;