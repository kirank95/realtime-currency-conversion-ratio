import React from "react";

/**
* @Component
* CardHeader -  Component to hold the titles for the card which takes the currency name from props
**/
function CardHeader({title}) {
    return (
        <div className="card-header bg-primary">{title}</div>
    );
}

export default CardHeader;