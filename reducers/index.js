const preState = {
  count: 0,
  profile: "none",
  fields: {
    data: [],
    isSubmitting: false,
    submitted: false,
    error: false,
    fieldMsg: "",
    onErrorSubmittionDateMsg: "",
  },
  username: "",
  password: "",
  name: "",
  islogin: false,
  doing_login: false,
  loginMsg: "",
  state: {
    isfetching: false,
    fetchingDone: false,
    adding: false,
    added: false,
    states: [],
    stateMsg: "",
  },
  city: {
    isfetching: false,
    fetchingDone: false,
    adding: false,
    added: false,
    cities: [],
    cityMsg: "",
  },
  employee: {
    isfetching: false,
    fetchingDone: false,
    adding: false,
    added: false,
    employees: [],
    employeeMsg: "",
  },
  reports: {
    status: "null",
    old_date: "null",
    old_date_comment: "",
    isfetching: false,
    fetchingDone: false,
    error: false,
    reportsMsg: "",
    data: [],
    oldData: [],
    selectedReport: [],
    isSelectedReportFetched: false,
  },
  leavePage: "no",
};

const MainReducer = (state = preState, action) => {
  switch (action.type) {
    case "FILTER_LISTS_AFTER_ALLOWING_OLD_REPORT":
      const newOldData = state.reports.oldData.filter(
        (item) => item.report_id !== action.report_id
      );
      const newData = state.reports.data.concat(
        state.reports.oldData.filter(
          (item) => item.report_id == action.report_id
        )
      );
      return {
        ...state,
        reports: { ...state.reports, oldData: newOldData, data: newData },
      };

    case "LEAVE_PAGE":
      return { ...state, leavePage: "yes" };

    case "REFRESH_OLD_LIST":
      return {
        ...state,
        reports: { ...state.reports, oldData: action.oldData },
      };

    case "UPDATE_OLD_REPORT":
      return {
        ...state,
        reports: {
          ...state.reports,
          status: action.status,
          old_date: action.old_date,
          old_date_comment: action.old_date_comment,
        },
      };

    case "FILL_SELECTED_REPORT":
      return {
        ...state,
        reports: { ...state.reports, selectedReport: action.selectedReport },
      };

    case "REFRESH_LIST":
      return { ...state, reports: { ...state.reports, data: action.data } };

    case "UPDATE_REPORT_STATUS":
      return {
        ...state,
        reports: {
          ...state.reports,
          isfetching: action.isfetching,
          fetchingDone: action.fetchingDone,
          error: action.error,
          reportsMsg: action.reportsMsg,
          isSelectedReportFetched: action.isSelectedReportFetched,
        },
      };

    case "ADD_NEW_REPORT":
      return {
        ...state,
        fields: {
          data: [],
          isSubmitting: false,
          submitted: false,
          error: false,
        },
        count: 0,
      };

    case "SUBMITTING_FIELDS":
      return Object.assign({}, state, {
        fields: {
          ...state.fields,
          isSubmitting: action.isSubmitting,
          submitted: action.submitted,
          error: action.error,
          fieldMsg: action.fieldMsg,
          onErrorSubmittionDateMsg: action.submittionDate,
        },
      });

    case "ADDING_EMPLOYEE":
      return Object.assign({}, state, {
        employee: {
          ...state.employee,
          adding: action.adding,
          added: action.added,
          employeeMsg: action.employeeMsg,
        },
      });

    case "FETCHING_CITIES":
      return Object.assign({}, state, {
        city: {
          ...state.city,
          isfetching: action.isfetching,
          fetchingDone: action.fetchingDone,
        },
      });

    case "FILL_CITITES":
      return Object.assign({}, state, {
        city: { ...state.city, cities: action.cities },
      });

    case "ADDING_CITY":
      return Object.assign({}, state, {
        city: {
          ...state.city,
          adding: action.adding,
          added: action.added,
          cityMsg: action.cityMsg,
        },
      });

    case "FETCHING_STATES":
      return Object.assign({}, state, {
        state: {
          ...state.state,
          isfetching: action.isfetching,
          fetchingDone: action.fetchingDone,
        },
      });

    case "FILL_STATES":
      return Object.assign({}, state, {
        state: { ...state.state, states: action.states },
      });

    case "ADDING_STATE":
      return Object.assign({}, state, {
        state: {
          isfetching: action.isfetching,
          fetchingDone: action.fetchingDone,
          adding: action.adding,
          added: action.added,
          states: state.state.states,
          stateMsg: action.stateMsg,
        },
      });

    case "UPDATE_LOG_IN_STATUS":
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
        islogin: action.islogin,
        doing_login: action.doing_login,
        loginMsg: action.loginMsg,
        name: action.name,
      });

    case "CHOOSE_PROFILE_TYPE":
      return Object.assign({}, state, {
        profile: action.profile,
        islogin: false,
        loginMsg: "",
        count: 0,
        fields: { ...state.fields, data: [] },
      });

    case "ADD_NEW_FIELD":
      return Object.assign({}, state, {
        count: action.id + 1,
        fields: {
          data: [
            ...state.fields.data,
            {
              id: action.id,
              doctor: "",
              chemist: "",
              promoted: "",
              remark: "",
            },
          ],
        },
      });

    case "UPDATE_REMARK":
      return Object.assign({}, state, {
        fields: {
          data: state.fields.data.map((item) => {
            if (item.id === action.id) {
              return Object.assign({}, item, {
                remark: action.remark,
              });
            }
            return item;
          }),
        },
      });

    case "UPDATE_FIELD_PICKERS":
      return Object.assign({}, state, {
        fields: {
          data: state.fields.data.map((item) => {
            if (item.id === action.id) {
              return Object.assign({}, item, {
                doctor: action.doctor,
                chemist: action.chemist,
              });
            }
            return item;
          }),
        },
      });

    case "UPDATE_FIELD_RECOMMENDATION":
      return Object.assign({}, state, {
        fields: {
          data: state.fields.data.map((item) => {
            if (item.id === action.id) {
              return Object.assign({}, item, {
                promoted: action.promoted,
              });
            }
            return item;
          }),
        },
      });

    ///////////////////////////////////////////////////////////////

    case "removeVehicleFromWishList":
      return {
        ...state,
        wishList: state.wishList.filter((id) => id !== action.id),
      };

    case "SELECTED_VEHICLE":
      return Object.assign({}, state, {
        selectedVehicle: {
          id: action.id,
          name: action.name,
          image: action.image,
        },
      });

    default:
      return state;
  }
};

export default MainReducer;
