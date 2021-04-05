import React from 'react'
import { DatePicker } from "react-trip-date";

export default function Calendar(props) {
    return (
        <DatePicker
            style={{ backgroundColor: "blue" }}
            numberOfMonths={2}
            disabledBeforeToday
            onChange={dates => props.handleChangeDate(dates)}
    />
    )
}
