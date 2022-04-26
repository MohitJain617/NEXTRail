import React from "react";
import TrainDetails from "./TrainDetails";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PnrPageDetails from "./PnrPageDetails";
import NavBar from "./NavBar";
import TrainBwStation from "./TrainBwStation";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import PayementPage from "./PaymentPage";
import BookingPage from "./BookingPage";
import PnrPageResult from "./PnrPageResult";
import TrainResults from "./TrainResults";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { ERROR, INFO } from "./AlertTypes";
import TrainDetailsResults from "./TrainDetailsResult";

function HomePage() {
  const defaultUser = "Stranger";
  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState(defaultUser);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("Default Alert");
  const [severity, setSeverity] = React.useState(INFO);

  React.useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Token ".concat(localStorage.getItem("token")),
        },
      };
      fetch("/accounts/user/", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          } else {
            setIsAuth(true);
            setUser(data.username);
          }
        })
        .catch((error) => {
          setIsAuth(false);
          setUser("Strange");
          localStorage.removeItem("token");
        });
    } else {
      setIsAuth(false);
      setUser(defaultUser);
      localStorage.removeItem("token");
    }
  }, []);

  function sendAlert(alert, severity = INFO) {
    setSeverity(severity);
    setAlertOpen(true);
    setAlertMsg(alert);
  }

  function loginUser(userName, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    };
    fetch("/accounts/login/", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          return Promise.reject(data.error);
        } else {
          localStorage.setItem("token", data.token);
          setIsAuth(true);
          setUser(data.username);
          navigate("/");
        }
      })
      .catch((error) => {
        sendAlert("Invalid Credentials!", ERROR);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  function logoutUser() {
    if (localStorage.getItem("token") !== null) {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Token ".concat(localStorage.getItem("token")),
        },
      };
      fetch("/accounts/logout/", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          } else if (response.status == 204) {
            console.log("Invalidated token");
          }
        })
        .catch((error) => {
          console.error();
        });
    }
    setIsAuth(false);
    setUser(defaultUser);
    localStorage.removeItem("token");
  }

  return (
    <div>
      <NavBar isAuth={isAuth} logout={logoutUser} user={user} />
      <Snackbar
        open={alertOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        style={{ bottom: "85%"}}
      >
        <Alert severity={severity} onClose={handleClose} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Routes>
        {/* <Route exact path='/'><p>This is home page</p></Route> */}
        <Route path="/" element={<TrainBwStation sendAlert={sendAlert} />} />
        <Route path="/train" element={<TrainDetails sendAlert={sendAlert} />} />
        <Route path="/trains" element={<TrainDetailsResults />} />
        <Route path="/results" element={<TrainResults />} />
        <Route path="/pnr" element={<PnrPageDetails sendAlert={sendAlert} />} />
        <Route path="/pnr/success" element={<PnrPageResult />} />
        <Route
          path="/login"
          element={<LogInPage isAuth={isAuth} login={loginUser} />}
        />
        <Route
          path="/signup"
          element={
            <SignUpPage
              isAuth={isAuth}
              login={loginUser}
              sendAlert={sendAlert}
            />
          }
        />
        <Route path="/payment" element={<PayementPage />} />
        <Route path="/bookings" element={<BookingPage isAuth={isAuth} />} />
      </Routes>
    </div>
  );
}

export default HomePage;
