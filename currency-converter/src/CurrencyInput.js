import React from "react";
import {TextField, Autocomplete} from "@mui/material";
import './CurrencyInput.css'

export default function CurrencyInput(props) {
    const {
        currencies,
        onChangeAmount,
        onChangeCurrency,
        amount,
        currency,
    } = props;

    return (
        <div className="currency-input">
            <TextField type="number" onChange={onChangeAmount} value={amount} className="amount"/>
            <Autocomplete
                options={currencies}
                renderInput={(params) => <TextField {...params}/>}
                onChange={onChangeCurrency}
                value={currency}
                disableClearable={true}
                className="currency"
                classes/>
        </div>
    )
}

