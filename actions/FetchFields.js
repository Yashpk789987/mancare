import { baseurl } from './BaseUrl';

const UpdateReportsStatus = (isfetching, fetchingDone, error, reportsMsg = "", isSelectedReportFetched = false) => {
  const action = {
    type: 'UPDATE_REPORT_STATUS',
    isfetching, fetchingDone, error, reportsMsg, isSelectedReportFetched
  }
  return action;
}

const refreshList = (data) => {
  const action = {
    type: 'REFRESH_LIST',
    data
  }
  return action;
}



export const fetchFields = (date) => {
  const url = baseurl+'/index.php/Fields/getData?date='+date;
  console.log('Fetch Reports',url);
  return dispatch => {
    dispatch(UpdateReportsStatus(true,false,false));
    console.log('BEFORE FETCHING REPORTS', url);
    fetch(url)
    .then(result => result.json())
    .then(result => {
        dispatch(UpdateReportsStatus(false,true,false,"List Refreshed"));
        dispatch(refreshList(result))
      })
    .catch(error => {
        console.log("ERROR DURING FETCHING",error);
        dispatch(UpdateReportsStatus(false,false,true));
    })
  }
}

const fillSelectedReport = (selectedReport) => {
  const action = {
    type: 'FILL_SELECTED_REPORT',
    selectedReport
  }
  return action;
}

export const fetchReport = (report_id) => {
  return dispatch => {
    dispatch(UpdateReportsStatus(true,false,false));
    console.log('BEFORE FETCHING REPORTS');
    fetch(baseurl+'/index.php/Fields/getReport?report_id='+report_id)
    .then(result => result.json())
    .then(result => {
        dispatch(UpdateReportsStatus(false,true,false,"Selected Report fetched",true));
        dispatch(fillSelectedReport(result))
      })
    .catch(error => {
        dispatch(UpdateReportsStatus(false,false,true));
    })
  }
}

const refreshOldList = (oldData) => {
  const action = {
    type: 'REFRESH_OLD_LIST',
    oldData
  }
  return action;
}



export const fetchOldFields = (date) => {
  let url = baseurl+'/index.php/Fields/getOldData?date='+date;
  return dispatch => {
    dispatch(UpdateReportsStatus(true,false,false));
    console.log('BEFORE FETCHING REPORTS', url);
    fetch(url)
    .then(result => result.json())
    .then(result => {
        dispatch(UpdateReportsStatus(false,true,false,"List Refreshed"));
        dispatch(refreshOldList(result))
      })
    .catch(error => {
        console.log("ERROR DURING FETCHING",error);
        dispatch(UpdateReportsStatus(false,false,true));
    })
  }
}
