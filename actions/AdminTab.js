import { baseurl } from "./BaseUrl";

const addingEmployee = (adding, added, employeeMsg) => {
  const action = {
    type: "ADDING_EMPLOYEE",
    adding,
    added,
    employeeMsg,
  };
  return action;
};

export const AddEmployees = (employee, urlFunction) => {
  return (dispatch) => {
    dispatch(addingEmployee(true, false, ""));
    let urlParams =
      "?name=" +
      employee.name +
      "&mobileno=" +
      employee.mobileno +
      "&address=" +
      employee.address +
      "&password=" +
      employee.password +
      "&username=" +
      employee.username +
      "&email=" +
      employee.email;
    console.log(baseurl + urlFunction + urlParams);
    fetch(baseurl + urlFunction + urlParams)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "Failed") {
          dispatch(addingEmployee(false, false, "Failed to Submit Employee"));
        } else if (responseJson.status == "Passed") {
          dispatch(
            addingEmployee(false, true, "Employee Successfully Inserted.")
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(addingEmployee(false, false, "Error Occured."));
      });
  };
};

const fetchingStates = (isfetching, fetchingDone) => {
  const action = {
    type: "FETCHING_STATES",
    isfetching,
    fetchingDone,
  };
  return action;
};

const fillStates = (states) => {
  const action = {
    type: "FILL_STATES",
    states,
  };
  return action;
};

export const getStates = () => {
  return (dispatch) => {
    dispatch(fetchingStates(true, false));
    fetch(baseurl + "/index.php/StateController/DisplayAllStates")
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(fetchingStates(false, true));
        dispatch(fillStates(responseJson));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addingCity(false, false));
      });
  };
};

const fetchingCities = (isfetching, fetchingDone) => {
  const action = {
    type: "FETCHING_CITIES",
    isfetching,
    fetchingDone,
  };
  return action;
};

const fillCities = (cities) => {
  const action = {
    type: "FILL_CITITES",
    cities,
  };
  return action;
};

export const getCities = () => {
  return (dispatch) => {
    dispatch(fetchingCities(true, false));
    fetch(baseurl + "/index.php/CityController/DisplayAllCities")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result == "Failed") {
          dispatch(fetchingCities(false, false));
        } else {
          dispatch(fetchingCities(false, true));
          dispatch(fillCities(responseJson));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchingCities(false, false));
      });
  };
};
