import * as React from "react";
import "./StepFormBox.scss";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import AboutForm from "../AboutForm/AboutForm";
import ShowOffForm from "../ShowOffForm/ShowOffForm";
import ButterUp from "../ButterUp/ButterUp";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 25,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(121.72deg, #219ED5 16.56%, #011A24 150.4%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(121.72deg, #219ED5 16.56%, #011A24 150.4%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#aaa",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#aaa",
  zIndex: 1,
  color: "#fff",
  width: 45,
  height: 45,
  display: "flex",
  borderRadius: "25%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(121.72deg, #219ED5 16.56%, #011A24 150.4%)",
    boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(121.72deg, #219ED5 16.56%, #011A24 150.4%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonIcon />,
    2: <WorkspacePremiumIcon />,
    3: <PsychologyAltIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["About You", "Show Off here", "Butter up"];

export default function StepFormBox(props) {
  let setShowClosed = props.setShowClosed;
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  React.useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
    } else {
      let data = {
        name: "",
        email: "",
        phone: "",
        roll: "",
        branch: "",
        resume: "",
        cover: "",
        linkedin: "",
        github: "",
        butterUp: "",
      };
      setFormData(data);
      localStorage.setItem("formData", JSON.stringify(data));
    }
    if (localStorage.getItem("activeStep")) {
      setActiveStep(parseInt(localStorage.getItem("activeStep")));
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <div className="welcome-title-main">
        <div className="flex-main">
          <h1>CSI</h1>
          <h2>RECRUITMENT</h2>
        </div>
        <h3>First Year Representatives 2022-2023</h3>
      </div>
      <Stack
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
        spacing={4}
      >
        <div className="stepperMain">
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            sx={{ width: "90%" }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="form-container">
          {activeStep === 0 ? (
            <AboutForm setActiveStep={setActiveStep} />
          ) : activeStep === 1 ? (
            <ShowOffForm setActiveStep={setActiveStep} />
          ) : activeStep === 2 ? (
            <ButterUp
              setActiveStep={setActiveStep}
              setShowClosed={setShowClosed}
            />
          ) : (
            <>
              <h1>Invalid</h1>{" "}
            </>
          )}
        </div>
      </Stack>
    </Box>
  );
}
