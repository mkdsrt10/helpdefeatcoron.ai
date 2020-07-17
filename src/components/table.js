import React from "react"
import "./register.css"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

var x
var dated = new Date()
dated = dated.getDate()
class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dates: [],
			status: ["INCOMPLETE","INCOMPLETE","INCOMPLETE","INCOMPLETE","INCOMPLETE"],
			fetched: [],
			current: dated,
			clientid:"",
		}
	}

	componentDidMount() {
		Auth.currentAuthenticatedUser()
			.then(res => {
				this.setState({clientid: res.username})
				x = res.username
				let arr = []
				let k;
				var today = new Date()
				for (k=0; k<5; k++) {
					arr.push(today.getDate())
					today.setDate(today.getDate() - 1)
				}
				this.setState({dates: arr})
				async function GetData() {
					let response = await fetch(`https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/getdates?client_id=${this.props.clientid}`)
					response = response.json()
					return response
				}
				var fetched
				GetData()
					.then(res => {
						res = res.data
						console.log(res)
						res = res.split(",")
						fetched = res
						let i
						let x = fetched
						for (i=0; i<x.length; i++) {
							let a = x[i].split(";")
							let d = a[0].split("/")
							d = d[0]
							let s = a[1]
							if (this.state.dates.includes(Number(d))) {
								console.log("in loop")
								let arr = this.state.status
								arr[this.state.dates.indexOf(Number(d))] = s + "% COMPLETE"
								this.setState({status: arr})
							}
						}

					})
					.catch(err=>console.log(err))
			})
	}

	colorChoose = (value) => {
		let color
		if (value === "INCOMPLETE") {
			color = "red"
		} else if (value === "33% COMPLETE") {
			color = "#F05E23"
		} else if (value === "66% COMPLETE") {
			color = "#FFCC00"
		} else {
			color = "green"
		}
		return color
	}

	onDateClick = (e) => {
		this.setState({current: e.target.id})
		let {onDateChange} = this.props
		var thisday = new Date()
		var thisdate = thisday.getDate()
		var thismonth = thisday.getMonth()
		if (e.target.id > thisdate) {
			onDateChange(e.target.id, thismonth)
		} else {
			onDateChange(e.target.id, thismonth+1)
		}
		for (let i=0; i < 5; i++) {
				if (this.state.dates[i] == e.target.id) {
					console.log(i)
					console.log(this.state.dates[i])
					console.log(this.state.status[i])
					if (this.state.status[i]==="33% COMPLETE") {
						this.props.vitalDone()
					} else if (this.state.status[i] === "66% COMPLETE") {
						this.props.vitalDone()
						this.props.symptomsDone()
					} else if (this.state.status[i] === "100% COMPLETE") {
						this.props.vitalDone()
						this.props.symptomsDone()
						this.props.personalDone()
					}
				}
			}
	}

	refreshCal = () => {
		console.log(x)
		console.log("CAL REFRESH")
		async function RefreshData() {
			let response = await fetch(`https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/getdates?client_id=${x}`)
			response = response.json()
			return response
		}
		var fetched
		RefreshData()
			.then(res => {
				let arr = this.state.status
				res = res.data
				console.log(res)
				res = res.split(",")
				fetched = res
				let i
				let x = fetched
				for (i=0; i<x.length; i++) {
					let a = x[i].split(";")
					let d = a[0].split("/")
					d = d[0]
					let s = a[1]
					if (this.state.dates.includes(Number(d))) {
						console.log("in loop")
						arr[this.state.dates.indexOf(Number(d))] = s + "% COMPLETE"
					}
				}
				console.log(arr)
				this.setState({status: arr})
				for (let i=0; i < 5; i++) {
					if (this.state.dates[i] == this.state.current) {
						if (this.state.status[i]==="33% COMPLETE") {
							this.props.vitalDone()
						} else if (this.state.status[i] === "66% COMPLETE") {
							this.props.vitalDone()
							this.props.symptomsDone()
						} else if (this.state.status[i] === "100% COMPLETE") {
							this.props.vitalDone()
							this.props.symptomsDone()
							this.props.personalDone()
						}
					}
				}
			})
	}

	render() {

		return(
			<div className="mt3 tl b--light-gray pa4 bg-white Avenir mobileOptimize" style={{"font-family":"Avenir", flex: 1}}>
			  <div>
				  <p className="f4 mt3 mb2 dark-gray">YOUR RECENT HISTORY</p>
				  <p className="mb3 gray">You can update the data by clicking on date below</p>
			  </div>
			  <div className="calender-grid">
			  	<div className="gray ph2 tc pv4 mr2 bg-washed-green br-pill" style={{height:"270px"}}>
			  		<p onClick={this.onDateClick} id={this.state.dates[0]} className={`pa2 pointer mt0 ${(this.state.current == this.state.dates[0]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mb1`}>{this.state.dates[0]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[1]} className={`pa2 pointer ${(this.state.current == this.state.dates[1]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[1]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[2]} className={`pa2 pointer ${(this.state.current == this.state.dates[2]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[2]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[3]} className={`pa2 pointer ${(this.state.current == this.state.dates[3]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[3]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[4]} className={`pa2 pointer ${(this.state.current == this.state.dates[4]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[4]}</p>
			  	</div>
			  	<div className='pl0 pv4 br-pill' style={{height:"270px"}}>
			  		<p className="pv2 mt0 mb1 purple br-100" style={{color: this.colorChoose(this.state.status[0])}}>{this.state.status[0]}</p>
			  		<p className="pv2 mv1" style={{color: this.colorChoose(this.state.status[1])}}>{this.state.status[1]}</p>
			  		<p className="pv2 mv1" style={{color: this.colorChoose(this.state.status[2])}}>{this.state.status[2]}</p>
			  		<p className="pv2 mv1" style={{color: this.colorChoose(this.state.status[3])}}>{this.state.status[3]}</p>
			  		<p className="pv2 mv1" style={{color: this.colorChoose(this.state.status[4])}}>{this.state.status[4]}</p>
			  	</div>
			  </div>
			</div>
		)
	}
}

export default Table;
