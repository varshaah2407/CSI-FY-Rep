import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import "./AboutForm.scss";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { motion } from "framer-motion";
import { SafetyDivider } from "@mui/icons-material";

const CssTextField = styled(TextField)({
  label: {
    color: "#105773",
  },
  "& label.Mui-focused": {
    color: "#07385a",
  },
  "& .MuiOutlinedInput-root": {
    color: "#07385a",
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

const CssSelect = styled(Select)({
  label: {
    color: "#2ca0ce",
  },
  "& label.Mui-focused": {
    color: "#6ECFF6",
  },
  "& .MuiSvgIcon-root": {
    color: "#2ca0ce",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    "& fieldset": {
      borderColor: "#2ca0ce",
    },
    "&:hover fieldset": {
      borderColor: "#2ca0ce",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6ECFF6",
    },
  },
});

export default function AboutForm(props) {
  let setActiveStep = props.setActiveStep;
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  let [branch, setBranch] = useState(null);
  let [division, setDivision] = useState(null);
  let [roll, setRoll] = useState(null);
  let [formData, setFormData] = useState(null);
  let [nameError, setNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [phoneError, setPhoneError] = useState(false);
  let [branchError, setBranchError] = useState(false);
  let [divisionError, setDivisionError] = useState(false);
  let [rollError, setRollError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
      setName(JSON.parse(localStorage.getItem("formData")).name);
      setEmail(JSON.parse(localStorage.getItem("formData")).email);
      setPhone(JSON.parse(localStorage.getItem("formData")).phone);
      setBranch(JSON.parse(localStorage.getItem("formData")).branch);
      setRoll(JSON.parse(localStorage.getItem("formData")).roll);
      setDivision(JSON.parse(localStorage.getItem("formData")).division);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        roll: "",
        branch: "",
        division: "",
        resume: "",
        cover: "",
        linkedin: "",
        github: "",
        butterUp: "",
      });
    }
  }, []);
  useEffect(() => {
    let data = formData;
    if (name || email || phone || branch || roll || division) {
      data.name = name;
      data.email = email;
      data.phone = phone;
      data.branch = branch;
      data.roll = roll;
      data.division = division;
      localStorage.setItem("formData", JSON.stringify(data));
    }
  }, [name, email, phone, branch, roll, division]);
  function handleSubmit(e) {
    e.preventDefault();
    let isError = false;
    var phoneno = /^\d{10}$/;
    if (!name || name === "") {
      setNameError(true);
      isError = true;
    }
    if (
      !email ||
      email === "" ||
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError(true);
      isError = true;
    }
    if (!phone || phone.toString().length !== 10 || !phone.match(phoneno)) {
      setPhoneError(true);
      isError = true;
    }
    if (!roll || roll.toString().length !== 11) {
      setRollError(true);
      isError = true;
    }
    if (!branch || branch === "") {
      setBranchError(true);
      isError = true;
    }
    if (!division || division === "") {
      setDivisionError(true);
      isError = true;
    }
    if (!isError) {
      setActiveStep(1);
      localStorage.setItem("activeStep", 1);
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
            <div className="field">
              <CssTextField
                className="inp"
                error={nameError}
                label="Name"
                required
                // helperText={"Name"}
                //   inputRef={resumeRef}
                defaultValue={formData.name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
                type="text"
              />
              <CssTextField
                error={emailError ? true : false}
                className="inp"
                label="Email"
                required
                //   inputRef={coverRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                defaultValue={formData.email}
                type="email"
              />
            </div>
            <div className="field">
              <CssTextField
                error={phoneError}
                label="Phone Number"
                className="inp"
                defaultValue={formData.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError(false);
                }}
                //   helperText={githubError ? "Enter your github profile link" : ""}
                //   inputRef={githubRef}
                required
                type="Number"
              />
              <CssTextField
                error={rollError}
                label="Roll Number"
                className="inp"
                defaultValue={formData.roll}
                onChange={(e) => {
                  setRoll(e.target.value);
                  setRollError(false);
                }}
                //   helperText={linkedInError ? "Enter your linkedIn profile link" : ""}
                //   inputRef={linkedInRef}
                required
                type="Number"
              />
            </div>
            <div className="field">
              <Box className="branchBox inp">
                <FormControl
                  fullWidth
                  className={branchError ? "err" : "normal"}
                >
                  <InputLabel id="branch">Branch</InputLabel>
                  <CssSelect
                    error={branchError}
                    labelId="branch"
                    label="Branch"
                    // className="err"
                    onChange={(e) => {
                      setBranch(e.target.value);
                      setBranchError(false);
                    }}
                    defaultValue={formData.branch}
                  >
                    <MenuItem value="Comps">Comps</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Excp">Excp</MenuItem>
                    <MenuItem value="Extc">Extc</MenuItem>
                    <MenuItem value="Mech">Mech</MenuItem>
                  </CssSelect>
                </FormControl>
              </Box>
              <CssTextField
                error={divisionError}
                label="Division"
                required
                className="inp"
                defaultValue={formData.division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setNameError(false);
                }}
                type="text"
              />
            </div>
            <Box
              className="buttonDiv"
              sx={{ float: "right", mt: 3, width: "100%" }}
            >
              <Button variant="contained" className="save-n-next" id="empty" type="submit">
                Next
              </Button>
              {/* <div className="empty"></div> */}
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </motion.div>
  );
}
