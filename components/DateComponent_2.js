import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class DateComponent extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props)
    this.state = {
      date: "",
      minDate: "",
      maxDate: ""
    }
  }

  componentDidMount() {
    let today = new Date()

    let maxDate = today;
    maxDate.setDate(maxDate.getDate() - 2)

    this.setState({ date: maxDate.toLocaleDateString(), maxDate: maxDate.toLocaleDateString() })

  }

  render(){
    return (
        <DatePicker
          style={{width: 200,}}
          date={this.state.date}
          mode="date"
          placeholder="select Record Date"
          format="MM/DD/YY"
          maxDate={this.state.maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.props.updateDate(date.toLocaleString())
            this.setState({date: date.toLocaleString()})
          }}
        />
    )
  }
}
