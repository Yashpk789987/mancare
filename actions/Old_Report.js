import { baseurl } from './BaseUrl'

export const ToggeleReportStatus = (status='null', old_date='null', old_date_comment='') => {
  const action = {
    type: 'UPDATE_OLD_REPORT',
    status, old_date, old_date_comment
  }
  return action;
}

const leavePage = () => {
  return {
    type: 'LEAVE_PAGE'
  }
}

const filter_lists = (report_id) => {
  return {
    type: 'FILTER_LISTS_AFTER_ALLOWING_OLD_REPORT',
    report_id
  }
}

export const allowOldeport = (report_id) => {
    return dispatch => {
      const url = baseurl+'/index.php/Fields/allowOldReport?report_id='+report_id;
      console.log('BEFORE ALLOWING_OLD_REPORT', url);
      fetch(url)
      .then(result => result.json())
      .then(result => {
          console.log("RESULT HAS COME FROM SERVER", result)
          dispatch(leavePage());
          dispatch(filter_lists(report_id))
        })
      .catch(error => {
        console.log("ERROR DURING ALLOWING OLD REPORT");
      })
    }
};
