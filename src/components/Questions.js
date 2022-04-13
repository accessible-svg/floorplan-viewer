import React from "react";
import { useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  questionRow: {
    display: "flex",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  question: {
    display: "flex",
    flexDirection: "row",
  },
}));

let RadioContext = React.createContext(null);

function RadioGroup(props) {
  let { children, label } = props;
  const classes = useStyles();

  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={classes.questionRow}>
      <span {...labelProps}>{label}</span>
      <div className={classes.question}>
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
    </div>
  );
}

function Radio(props) {
  let { children } = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps } = useRadio(props, state, ref);

  return (
    <label style={{ display: "block" }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
}

function Questions({ response, makeEdits }) {
  const onRadioChange = (value, i) => {
    makeEdits(i, value);
  };

  return response.map((response, i) => (
    <>
      <RadioGroup
        key={i}
        value={response.response}
        label={response.question}
        onChange={(value) => onRadioChange(value, i)}
      >
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
      </RadioGroup>
      <Divider />
    </>
  ));
}

export default Questions;
