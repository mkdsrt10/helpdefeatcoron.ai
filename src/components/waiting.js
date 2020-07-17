import React from "react"
import "./transition.css"
import {isMobile, BrowserView, MobileView} from "react-device-detect"

class Waiting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: ""
        }
    }

    componentDidMount() {
    //     console.log("REACHED FETCH WALA PART")
    //     let x = this.props.data
    //     console.log(x)
    //     const uploadData = {
    //         fever2: x.daily_sym.fever2,
    //         chillsorsweating: x.daily_sym.chillsorsweating,
    //         coughing: x.daily_sym.coughing,
    //         difficultybreathing: x.daily_sym.difficultybreathing,
    //         sorethroat: x.daily_sym.sorethroat,
    //         bodyaches: x.daily_sym.bodyaches,
    //         headache:x.daily_sym.headache,
    //         vomiting: x.daily_sym.vomiting,
    //         diarrhea: x.daily_sym.diarrhea,
    //         fatiguetiredness: x.daily_sym.fatiguetiredness,
    //         none9:x.daily_sym.none9,
    //         heartratefeeling: x.vitals_data.heartratefeeling,
    //         heartrate: parseFloat(x.vitals_data.heartrate),
    //         bloodpressure1: x.vitals_data.bloodpressure1,
    //         oxygensaturation: parseFloat(x.vitals_data.oxygensaturation),
    //         bodytemperature: parseFloat(x.vitals_data.bodytemperature),
    //         fever1: x.vitals_data.fever1,
    //         traveltoday:x.personal_data.traveltoday,
    //         exposed:x.personal_data.exposed,
    //         foundanyone:x.personal_data.foundanyone,
    //         feeling:x.personal_data.feeling,
    //         pic:x.personal_data.pic,
    //         date: x.date,
    //         clientid: x.clientid
    //     }
    //     console.log(uploadData)
    //     const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true },
    //             body: JSON.stringify(uploadData)
    //         };
    //     fetch('https://cors-anywhere.herokuapp.com/https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/postvitals?', requestOptions)
    //         .then(res=>this.props.onRouteChange("pred"))
    //         .catch(err=>console.log(err))
        setTimeout(()=>{this.setState({visible: true})}, 25)
    }

    render() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      let {Dated, Month, onRouteChange} = this.props;
      return (
        <div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ${(isMobile)?"ml4":"ml5"} mb3 mt3 dark-gray dib`}>ALGORITHM BASED PREDICTION <p className={`f5 gray mb3 dib ${(isMobile)?"ml4":"ml5"}`}>{monthNames[Month-1]} {Dated}</p></p>
                </div>
                <p className="pa4 pb0 tc f4 purple">Please wait while our algorithm calculates the prediction</p>
                <div className={`mt0 ${(isMobile)?"pl5":"pl6"}`}>
                    <img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" style={{width:"70%", margin:"auto", "margin-top":"0px", padding:"0px"}}/>
                </div>
                <p className="f6 tc light-gray pointer w-60" style={{margin:"auto"}} onClick={()=>onRouteChange("pred")}>Click to continue (temporary... this page would be to get response from server)</p>
            </div>
        </div>
      )
    }
}

export default Waiting;
