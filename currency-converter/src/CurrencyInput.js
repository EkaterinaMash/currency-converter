import React from "react";
import {TextField, Autocomplete} from "@mui/material";

export default function CurrencyInput(props) {
    const {
        currencies,
        onChangeAmount,
        onChangeCurrency,
        amount,
        currency,
    } = props;

    return (
        <div>
            <TextField type="number" onChange={onChangeAmount} value={amount}/>
            <Autocomplete
                options={currencies}
                renderInput={(params) => <TextField {...params}/>}
                onChange={onChangeCurrency}
                value={currency}/>
        </div>
    )
}

