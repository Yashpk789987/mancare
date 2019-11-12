import { baseurl } from './BaseUrl'

export const updateRemark = (remark, id) => {
  const action = {
    type: 'UPDATE_REMARK',
    remark, id
  }
  return action;
}

const submittingFeilds = (isSubmitting, submitted, error, fieldMsg = "", submittionDate = "") => {
  const action = {
    type: 'SUBMITTING_FIELDS',
    isSubmitting, submitted, error, fieldMsg, submittionDate
  }
  return action;
}

export const submitFields = (urlParams) => {

    return dispatch => {
      //dispatch(submittingFeilds(true,false,false));
      console.log('BEFORE SUBMITTING');
      fetch(baseurl+'/index.php/Fields/insert'+urlParams)
      .then(result => result.json())
      .then(result => {
          if(result.status == 'Already Reported Once') {
            dispatch(submittingFeilds(false, true, false, "Already Reported Once", result.submittionDate))
          }else {
            console.log("Control has been returned", result)
            dispatch(submittingFeilds(false,true,false))
          }
        })
      .catch(error => {
          console.log("ERROR DURING SUBMITTING",error);
          dispatch(submittingFeilds(false,false,true));
      })
    }
};

export const addNewReport = () => {
  const action = {
    type: 'ADD_NEW_REPORT',
  }
  return action;
}
