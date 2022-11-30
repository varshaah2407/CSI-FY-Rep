import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import "./ShowOffForm.scss";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const CssTextField = styled(TextField)({
  label: {
    color: "#2ca0ce",
  },
  "& label.Mui-focused": {
    color: "#6ECFF6",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2ca0ce",
    },
    "&:hover fieldset": {
      borderColor: "#2ca0ce",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6ECFF6",
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

export default function AboutForm(props) {
  let setActiveStep = props.setActiveStep;
  let [resume, setResume] = useState(-1);
  let [cover, setCover] = useState(-1);
  let [github, setGithub] = useState(-1);
  let [linkedin, setLinkedin] = useState(-1);
  let [formData, setFormData] = useState(null);

  let [resumeError, setResumeError] = useState(false);
  let [coverError, setCoverError] = useState(false);
  let [githubError, setGithubError] = useState(false);
  let [linkedinError, setLinkedinError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
      setResume(JSON.parse(localStorage.getItem("formData")).resume);
      setCover(JSON.parse(localStorage.getItem("formData")).cover);
      setGithub(JSON.parse(localStorage.getItem("formData")).github);
      setLinkedin(JSON.parse(localStorage.getItem("formData")).linkedin);
    }
  }, []);
  useEffect(() => {
    let data = formData;
    if (resume !== -1 || cover !== -1 || github !== -1 || linkedin !== -1) {
      data.resume = resume;
      data.cover = cover;
      data.github = github;
      data.linkedin = linkedin;
      localStorage.setItem("formData", JSON.stringify(data));
    }
  }, [resume, cover, github, linkedin]);
  function handleSubmit(e) {
    let isError = false;
    e.preventDefault();
    if (
      !resume ||
      resume === "" ||
      !resume.includes("drive.google.com/file/")
    ) {
      isError = true;
      setResumeError(true);
    }
    if (!cover || cover === "" || !cover.includes("drive.google.com/file/")) {
      isError = true;
      setCoverError(true);
    }
    if (!github || github === "" || !github.includes("github.com/")) {
      isError = true;
      setGithubError(true);
    }
    if (
      !linkedin ||
      linkedin === "" ||
      !linkedin.includes("linkedin.com/in/")
    ) {
      isError = true;
      setLinkedinError(true);
    }
    if (!isError) {
      setActiveStep(2);
      localStorage.setItem("activeStep", 2);
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
                error={resumeError}
                label="Resume"
                required
                helperText={"Enter Google Drive link"}
                // inputRef={resumeRef}
                defaultValue={formData.resume}
                onChange={(e) => {
                  setResume(e.target.value);
                  setResumeError(false);
                }}
                type="text"
              />
              <CssTextField
                helperText={"Enter Google Drive link"}
                error={coverError ? true : false}
                className="inp"
                label="Cover Letter"
                required
                //   inputRef={coverRef}
                onChange={(e) => {
                  setCover(e.target.value);
                  setCoverError(false);
                }}
                defaultValue={formData.cover}
                type="text"
              />
            </div>
            <div className="field">
              <CssTextField
                helperText={"Enter Github Profile link"}
                error={githubError}
                label="Github ID"
                className="inp"
                defaultValue={formData.github}
                onChange={(e) => {
                  setGithub(e.target.value);
                  setGithubError(false);
                }}
                //   helperText={githubError ? "Enter your github profile link" : ""}
                //   inputRef={githubRef}
                required
                type="text"
              />
              <CssTextField
                helperText={"Enter Linkedin Profile link"}
                error={linkedinError}
                label="Linkedin ID"
                className="inp"
                defaultValue={formData.linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                  setLinkedinError(false);
                }}
                //   helperText={linkedInError ? "Enter your linkedIn profile link" : ""}
                //   inputRef={linkedInRef}
                required
                type="text"
              />
            </div>
            <Box
              className="buttonDivBig"
              sx={{ float: "right", mt: 7, width: "100%" }}
            >
              <a href="/cover-letter.doc" download="cover-letter.doc">
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ maxHeight: "3.5rem" }}
                  className="cover-letter"
                >
                  Cover Letter
                </Button>
              </a>
              <div className="buttonDiv2">
                <Button
                  variant="contained"
                  className="save-n-next"
                  onClick={(e) => setActiveStep(0)}
                  sx={{ maxHeight: "3.5rem" }}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  className="save-n-next"
                  type="submit"
                  sx={{ maxHeight: "3.5rem" }}
                >
                  Next
                </Button>
              </div>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </motion.div>
  );
}
