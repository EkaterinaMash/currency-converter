import React, {useEffect, useState} from "react";
import './App.css';
import CurrencyInput from "./CurrencyInput";

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9d684127ebef32c53a9ea2f0aa43bb19';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [isFromAmount, setIsFromAmount] = useState(true);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();

    let toAmount, fromAmount

    if (isFromAmount) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                setCurrencies(Object.keys(data.rates));
                setFromCurrency(data.base);
                setToCurrency(Object.keys(data.rates)[0]);
            });
    }, []);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency]);
            })
    }, [fromCurrency, toCurrency]);

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
                        <h2>Currency converter</h2>
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
                    </div>
                </main>
                <footer>

                </footer>
            </>
        );
    }
}

export default App;
