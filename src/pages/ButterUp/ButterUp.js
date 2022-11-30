import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import "./ButterUp.scss";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const CssTextField = styled(TextField)({
  label: {
    color: "#105773",
  },
  "& label.Mui-focused": {
    color: "#07385a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#07385a",
    },
    "&:hover fieldset": {
      borderColor: "#07385a",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#07385a",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

export default function ButterUp(props) {
  let setActiveStep = props.setActiveStep;
  let setShowClosed = props.setShowClosed;
  let [butterUp, setButterUp] = useState(-1);
  let [formData, setFormData] = useState(null);
  let [butterUpError, setButterUpError] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
      setButterUp(JSON.parse(localStorage.getItem("formData")).butterUp);
    }
    if (localStorage.getItem("showClosed")) {
      setSubmitting(true);
    }
  }, []);
  useEffect(() => {
    let data = formData;
    if (butterUp !== -1) {
      data.butterUp = butterUp;
      localStorage.setItem("formData", JSON.stringify(data));
    }
  }, [butterUp]);
  function handleSubmit(e) {
    setSubmitting(true);
    let isError = false;
    e.preventDefault();
    if (
      !butterUp ||
      butterUp === "" ||
      butterUp === -1 ||
      butterUp.toString().length < 60
    ) {
      setButterUpError(true);
      isError = true;
    }
    if (!isError) {
      const url = process.env.REACT_APP_SHEETAPI;
      fetch(url, {
        method: "POST",
        headers: {
          //     'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
          //   Autherization: "Basic YXJ5YW46YXJ5YW4=",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            setShowClosed(true);
            localStorage.setItem("showClosed", true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setSubmitting(false);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, width: "75%" }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        sx={{
          width: "100%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        {formData ? (
          <>
            <CssTextField
              id="butterUp"
              label="What Motivates you to join CSI ?"
              required
              helperText={"State your answer in a minimum of 60 letters."}
              multiline
              minRows={7}
              className="butterUp"
              error={butterUpError}
              defaultValue={formData.butterUp}
              onChange={(e) => {
                setButterUp(e.target.value);
                setButterUpError(false);
              }}
              type="text"
            />

            <div className="field"></div>
            <Box
              className="buttonDiv"
              sx={{ float: "right", mt: 3, width: "100%" }}
            >
              <Button
                variant="contained"
                className="save-n-next"
                sx={{ mr: 2 }}
                onClick={(e) => setActiveStep(1)}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                className="save-n-next"
                type="submit"
                disabled={submitting}
              >
                Finish
              </Button>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </motion.div>
  );
}
