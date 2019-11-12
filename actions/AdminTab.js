import { baseurl } from './BaseUrl';
// const addingState = (adding, added, stateMsg) => {
//   const action = {
//     type: "ADDING_STATE",
//     adding, added,stateMsg
//   }
//   return action;
// }
//
// export const AddState = (name, urlFunction) => {
//   return dispatch => {
//     dispatch(addingState(true,false, ""));
//     console.log('BEFORE ADDING STATE');
//     let urlParams = '?name='+name;
//     fetch('http://192.168.1.17:8080'+urlFunction+urlParams)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       if(responseJson.status == 'Failed') {
//         dispatch(addingState(false,false, "Failed to Submit State"));
//       }else if(responseJson.status == 'Passed') {
//         dispatch(addingState(false,true, "State Successfully Submitted"));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       dispatch(addingState(false,false,"Error Occured."));
//     });
//   }
// }
//
// const addingCity = (adding, added, cityMsg) => {
//   const action = {
//     type: "ADDING_CITY",
//     adding, added, cityMsg
//   }
//   return action;
// }
//
// export const AddCity = (name, stateid, urlFunction) => {
//   return dispatch => {
//     dispatch(addingCity(true,false, ""));
//     let urlParams = '?name='+name+'&stateid='+stateid;
//     console.log('BEFORE ADDING CITY ', urlParams);
//     fetch('http://192.168.1.16:8080'+urlFunction+urlParams)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       if(responseJson.status == 'Failed') {
//         dispatch(addingCity(false,false, "Failed to Submit City"));
//       }else if(responseJson.status == 'Passed') {
//         dispatch(addingCity(false,true, "City Successfully Submitted"));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       dispatch(addingCity(false,false,"Error Occured."));
//     });
//   }
// }
//

const addingEmployee = (adding, added, employeeMsg) => {
  const action = {
    type: "ADDING_EMPLOYEE",
    adding, added, employeeMsg
  }
  return action;
}

export const AddEmployees = ( employee, urlFunction ) => {
  return dispatch => {
    dispatch(addingEmployee(true,false, ""));
    let urlParams = '?name='+employee.name+'&mobileno='+employee.mobileno+'&address='+employee.address+'&password='+employee.password+'&username='+employee.username+'&email='+employee.email;
    console.log('BEFORE ADDING EMPLOYEE ', urlParams);
    fetch(baseurl+urlFunction+urlParams)
    .then((response) =>  response.json() )
    .then((responseJson) => {
      if(responseJson.status == 'Failed') {
        dispatch(addingEmployee(false,false, "Failed to Submit Employee"));
      }else if(responseJson.status == 'Passed') {
        dispatch(addingEmployee(false,true, "Employee Successfully Inserted."));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(addingCity(false,false,"Error Occured."));
    });
  }
}




const fetchingStates = (isfetching, fetchingDone) => {
  const action = {
    type: "FETCHING_STATES",
    isfetching, fetchingDone
  }
  return action;
}

const fillStates = (states) => {
  const action = {
    type: "FILL_STATES",
    states
  }
  return action;
}

export const getStates = () => {
  return dispatch => {
    dispatch(fetchingStates(true, false));
    fetch(baseurl+'/index.php/StateController/DisplayAllStates')
    .then((response) => response.json())
    .then((responseJson) => {
        dispatch(fetchingStates(false,true));
        dispatch(fillStates(responseJson));
    })
    .catch((error) => {
      console.log(error);
      dispatch(addingCity(false,false));
    });
  }
}

const fetchingCities = (isfetching, fetchingDone) => {
  const action = {
    type: "FETCHING_CITIES",
    isfetching, fetchingDone
  }
  return action;
}

const fillCities = (cities) => {
  const action = {
    type: "FILL_CITITES",
    cities
  }
  return action;
}

export const getCities = () => {
  return dispatch => {
    dispatch(fetchingCities(true, false));
    fetch(baseurl+'/index.php/CityController/DisplayAllCities')
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.result == 'Failed') {
        dispatch(fetchingCities(false,false));
      }else {
        dispatch(fetchingCities(false,true));
        dispatch(fillCities(responseJson));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchingCities(false,false));
    });
  }
}
