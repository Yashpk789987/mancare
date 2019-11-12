import { baseurl } from './BaseUrl';

// const doingSignUp = (doingSignUp, SignUpDone, error) => {
//   const action = {
//     type: "UPDATE_SIGN_UP_STATUS",
//     doingSignUp,
//     SignUpDone,
//     error
//   }
//   return action;
// };

// export const doSignUp = (name,email,phone,city,password) => {
//     return dispatch => {
//       dispatch(doingSignUp(true,false,false));
//       console.log('BEFORE SIGNUP');
//       fetch('http://192.168.1.11:3000/signup/', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phone,
//           city,
//           password,
//         }),
//       })
//       .then(result => result.json())
//       .then(result => {
//           console.log("SIGN UP RESULT FROM SERVER", result)
//           dispatch(doingSignUp(false,true,false))
//         })
//       .catch(error => {
//         console.log("ERROR DURING SIGNINGUP");
//         dispatch(doingSignUp(false,false,true));
//       })
//     }
// };

const submittingFeilds = (isSubmitting, submitted, error, fieldMsg = '', submittionDate = '') => {
  const action = {
    type: 'SUBMITTING_FIELDS',
    isSubmitting,
submitted,
error,
fieldMsg,
submittionDate
  };
  return action;
};

const doingLogIn = (username, password, islogin, doing_login, loginMsg, name) => {
  const action = {
    type: 'UPDATE_LOG_IN_STATUS',
    username,
password,
islogin,
doing_login,
loginMsg,
name
  };
  return action;
};

export const doLogIn = (username, password, urlFunction) => dispatch => {
      dispatch(submittingFeilds(false, false, false));
      dispatch(doingLogIn(username, password, false, true, '', ''));
      console.log('BEFORE LOG IN');
      const urlParams = `?username=${username}&password=${password}`;
      console.log(baseurl + urlFunction + urlParams);
      fetch(baseurl + urlFunction + urlParams)
      .then((response) => response.json())
      .then((responseJson) => {
 console.log(responseJson);
        if (responseJson.status == 'Failed') {
          dispatch(doingLogIn(username, password, true, false, 'Login Successful', responseJson.name));
          dispatch(doingLogIn(username, password, false, false, 'Wrong Username or Password', ''));
        } else if (responseJson.status == 'Passed') {
          dispatch(doingLogIn(username, password, true, false, 'Login Successful', responseJson.name));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(doingLogIn(username, password, false, false, 'Error Occured', ''));
      });
    };
