import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./LogReg.css";
import { baseUrl } from "../../services/api";
import { setUsers } from "../../redux/reducers";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from "@mui/icons-material/Email";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";


const LogReg = () => {
  console.log("base",baseUrl)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProgressBarShow, setIsProgressBar] = useState(false)
  const [isRegLog, setIsRegLog] = useState(false);
  const [details, setDetails] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProgressBar(true)

    var routeUrl = isRegLog ? "userRegistration" : "userLogin";

    console.log("roteHit",routeUrl)
    const response = await axios.post(`${baseUrl}/${routeUrl}`, details);
    setIsProgressBar(false)

    if (response.status == 201) {
      alert(response.data.error);
    } else if (response.status == 200) {
       if(isRegLog){
        alert(response.data.error)
        setIsRegLog(!isRegLog)
        return
       }    
      const token = response.data.token;
      Cookies.set("userToken", token);
      dispatch(setUsers(response.data));
      navigate(`/home`);
    }
  };
  const handleChangeFormDetails = (formdata) => {
    setDetails({ ...details, ...formdata });
  };

  const checkTokenExist = async () => {
    setIsProgressBar(true)
    const cookie = Cookies.get("userToken");
    if (!cookie) {
      dispatch(setUsers({}));
      setIsProgressBar(false)
      return;
    }

    const response = await axios.post(`${baseUrl}/userLogin`, { cookie });
    setIsProgressBar(false)

    if (response.status == 200) {
      const token = response.data.token;
      Cookies.set("userToken", token);
      console.log("userLogin",response.data)
      dispatch(setUsers(response.data));
      navigate(`/home`);
    } else return;
  };

  useEffect(() => {
    checkTokenExist();
  }, []);

  return (
    <>
      <div className="logReg">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {isProgressBarShow && <div className="modal-overlay">
          <div className="modal-overlay">
            <CircularProgress />
          </div>
        </div>}
          <div className="formItems">
            <PersonIcon />
            <input
              className="logRegFromField"
              placeholder="User Name"
              type="text"
              onChange={(e) =>
                handleChangeFormDetails({ userName: e.target.value.trim() })
              }
            />
          </div>
          {isRegLog && (
            <div className="formItems">
              <PersonPinCircleIcon />
              <input
                className="logRegFromField"
                placeholder="Nick Name"
                type="text"
                onChange={(e) =>
                  handleChangeFormDetails({ nickName: e.target.value.trim() })
                }
              />
            </div>
          )}
          {isRegLog && (
            <div className="formItems">
              <EmailIcon />
              <input
                className="logRegFromField"
                placeholder="Email"
                type="text"
                onChange={(e) =>
                  handleChangeFormDetails({ email: e.target.value.trim() })
                }
              />
            </div>
          )}
          <div className="formItems">
            <KeyIcon />
            <input
              placeholder="Password"
              className="logRegFromField"
              type="text"
              onChange={(e) =>
                handleChangeFormDetails({ password: e.target.value.trim() })
              }
            />
          </div>
          <div className="formItemsButtons">
            <button className="isRegLogButton" type="submit">
              {isRegLog ? "Register" : "Login"}
            </button>
            <span
              className="isRegLogClick"
              style={{ color: "blue" }}
              onClick={() => setIsRegLog(!isRegLog)}
            >
              {isRegLog ? "Login?" : "Register?"}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
export default LogReg;
