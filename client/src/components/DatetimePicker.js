import React, { useState } from "react";
import PropTypes from "prop-types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { TextField } from "@mui/material";
function DatetimePicker({ onClose }) {
  const [date, setDate] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        renderInput={params => {
          return <TextField {...params} />;
        }}
        value={date || moment(Date.now())}
        onChange={setDate}
        onClose={() => date && onClose(date.toString())}
      />
    </LocalizationProvider>
  );
}

DatetimePicker.propTypes = {};

export default DatetimePicker;
