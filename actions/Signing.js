import { baseurl } from "./BaseUrl";

const submittingFeilds = (
  isSubmitting,
  submitted,
  error,
  fieldMsg = "",
  submittionDate = ""
) => {
  const action = {
    type: "SUBMITTING_FIELDS",
    isSubmitting,
    submitted,
    error,
    fieldMsg,
    submittionDate,
  };
  return action;
};

const doingLogIn = (
  username,
  password,
  islogin,
  doing_login,
  loginMsg,
  name
) => {
  const action = {
    type: "UPDATE_LOG_IN_STATUS",
    username,
    password,
    islogin,
    doing_login,
    loginMsg,
    name,
  };
  return action;
};

export const doLogIn = (username, password, urlFunction) => (dispatch) => {
  dispatch(submittingFeilds(false, false, false));
  dispatch(doingLogIn(username, password, false, true, "", ""));

  const urlParams = `?username=${username}&password=${password}`;
  console.log(baseurl + urlFunction + urlParams);
  fetch(baseurl + urlFunction + urlParams)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "Failed") {
        dispatch(
          doingLogIn(
            username,
            password,
            false,
            false,
            "Wrong Username or Password",
            ""
          )
        );
      } else if (responseJson.status == "Passed") {
        dispatch(
          doingLogIn(
            username,
            password,
            true,
            false,
            "Login Successful",
            responseJson.name
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        doingLogIn(username, password, false, false, "Error Occured", "")
      );
    });
};
