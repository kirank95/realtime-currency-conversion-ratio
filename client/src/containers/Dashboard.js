// Libraries
import React from "react";

// Components
import { CardHeader, CardBody, Loading } from "../components";

// Hooks
import useInterval from "../hooks/useInterval";

// Constants
import * as constants from '../constants';

/**
* @Container
* Dashboard -  container to display dashboard of the app
**/
function Dashboard() {

    const [currencies, setCurrencies] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(constants.CURRENCY_EXCHANGE_API_URL.concat(JSON.stringify(constants.CURRENCY_KEYS)))
            .then(response => response.json())
            .then(data => { setCurrencies([...data]); setIsLoading(false); });
    }, []);

    // Polling the API calls to get the live currency exchange values. Using third part service for getting the exchange values.
    // The service permits only 500 API calls per day and hence setting the polling interval to 3 minutes.
    useInterval(() => {
        fetch(constants.CURRENCY_EXCHANGE_API_URL.concat(JSON.stringify(constants.CURRENCY_KEYS)))
            .then(response => response.json())
            .then(data => setCurrencies([...data]));
    }, constants.POLLING_DELAY)

    return (
        <div className="container">
            <div id="row" className="row">
                
                {   
                    isLoading ? ( <Loading />) : (
                    currencies.map((currency, index) => {
                        return (
                            <div key={index} className="col-lg-4 col-sm-6 mb-4">
                                <div className="card main-card">
                                    <CardHeader title="1 INR Equals" />
                                    <CardBody currency={currency} />
                                </div>
                            </div>
                        );   
                    }))
                }   
            </div>
        </div>
    );
}


export default Dashboard;