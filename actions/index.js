export const newField = (id) => {
  const action = {
    type: 'ADD_NEW_FIELD',
    id
  }
  return action;
}

export const updateFieldPickers = (id, doctor, chemist) => {
  const action = {
    type: 'UPDATE_FIELD_PICKERS',
    id,
    doctor,
    chemist
  }
  return action;
}

export const updateFieldRecommendations = (id, promoted) => {
  const action = {
    type: 'UPDATE_FIELD_RECOMMENDATION',
    id, promoted
  }
  return action;
}

export const chooseProfileType = (profile) => {
  const action = {
    type: 'CHOOSE_PROFILE_TYPE',
    profile
  }
  return action;
}
