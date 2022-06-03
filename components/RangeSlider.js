import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';



export default function RangeSlider(props) {
  const [value, setValue] = React.useState([0, 0]);
  const [start1, setStart1] = React.useState("");
  const [end, setEnd] = React.useState("");

  useEffect(() => {
    handleLabel(value)
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addDurationFilter = (event, newValue) => {
    props.handleAddDurationFilter(newValue[0], newValue[1])
  };

  const handleLabel = (value) => {
    let start = convertSecToMin(value[0])
    let end = convertSecToMin(value[1])

    if (document.getElementsByClassName("durationFilter")[0])
      document.getElementsByClassName("durationFilter")[0].innerText = (start + " - " + end)

    if (typeof window !== 'undefined') {
      if (localStorage.getItem("start") == undefined || localStorage.getItem("end") == undefined) {
        localStorage.setItem("start", start)
        localStorage.setItem("end", end)
      }
      localStorage.setItem("start", start)
      localStorage.setItem("end", end)
      return <div className={"rangeDuration"} key="1"><span>{start}</span>  <span>{end}</span></div>
    }
  };

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60).toString();
      minutes = minutes.length == 1 ? ("0" + minutes) : minutes
      let seconds = (duration - minutes * 60).toString();
      seconds = seconds.length == 1 ? ("0" + seconds) : seconds
      return minutes+':'+seconds
    }
  }

  return (
    <Box className="rangeSliderWrapper" sx={{ width: 300 }}>
      <Slider
        className="rangeSlider"
        value={value}
        onChange={handleChange}
        onChangeCommitted={addDurationFilter}
        valueLabelDisplay='on'
        disableSwap
        min={0}
        max={1620}
        valueLabelFormat={handleLabel(value)}
      />
    </Box>
  );
}
