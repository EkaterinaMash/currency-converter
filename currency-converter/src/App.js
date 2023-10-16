import React, {useEffect, useState} from "react";
import './App.css';
import CurrencyInput from "./CurrencyInput";

const BASE_URL = 'http://data.fixer.io/api/latest?access_key=75119577e8cff3ff5dccd71641b88b3c';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [isFromAmount, setIsFromAmount] = useState(true);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const displayedExchangeRate = Number(exchangeRate).toFixed(2);

    let toAmount, fromAmount;

    if (isFromAmount) {
        fromAmount = amount;
        toAmount = (amount * exchangeRate).toFixed(2);

    } else {
        toAmount = amount;
        fromAmount = (amount / exchangeRate).toFixed(2);
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                setCurrencies(Object.keys(data.rates));
                setFromCurrency(data.base);
                setToCurrency(Object.keys(data.rates)[0]);
                setLastUpdate(data.date);
            });
    }, []);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                const lastUpdate = formatDate(data.date);

                setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency]);
                setLastUpdate(lastUpdate);
            })
    }, [fromCurrency, toCurrency]);

    function formatDate(date) {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(date).toLocaleDateString('en-US', options);
    }

    function handleFromAmountChange(event) {
        setAmount(event.target.value);
        setIsFromAmount(true);
    }

    function handleToAmountChange(event) {
        setAmount(event.target.value);
        setIsFromAmount(false);
    }

    function handleFromCurrencyChange(event) {
        const clickEvent = event.target.textContent;
        const enterEvent = event.target?.defaultValue?.toString()?.toUpperCase();

        setFromCurrency(clickEvent || enterEvent);
    }

    function handleToCurrencyChange(event) {
        const clickEvent = event.target.textContent;
        const enterEvent = event.target?.defaultValue?.toString()?.toUpperCase();

        setToCurrency(clickEvent || enterEvent);
    }

    if (fromCurrency && toCurrency) {
        return (
            <>
                <header>

                </header>
                <main>
                    <div className="currency-converter">
                        <div>
                            <h1>Currency converter</h1>
                            <p className="subtitle">Enter amount and choose currencies.</p>
                        </div>
                        <CurrencyInput
                            currencies={currencies}
                            onChangeAmount={handleFromAmountChange}
                            onChangeCurrency={handleFromCurrencyChange}
                            amount={fromAmount}
                            currency={fromCurrency}/>
                        <div className="equal">is equal</div>
                        <CurrencyInput
                            currencies={currencies}
                            onChangeAmount={handleToAmountChange}
                            onChangeCurrency={handleToCurrencyChange}
                            amount={toAmount}
                            currency={toCurrency}/>
                        <div>
                            <p><span className="info">Exchange rate: </span>{displayedExchangeRate}.</p>
                            <p><span className="info">Last update: </span>{lastUpdate}.</p>
                        </div>
                    </div>
                </main>
                <footer>

                </footer>
            </>
        );
    }
}

export default App;
