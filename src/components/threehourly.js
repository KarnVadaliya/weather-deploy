import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'




class threehourly extends Component{
   
    handleClick = (e) =>{
         this.props.history.push("/")
     }

    convertTime = (time) =>{
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time[0]+" "+time[5]; // return adjusted time or original string
    }

    render(){
    var dateArray = this.props.location.state.date.split(' ')
    var dayList=[]
    var j=0
    for(var i=0;i<this.props.days.length;i++)
    {
        const currDateArray=this.props.days[i].dt_txt.split(' ')
        if(currDateArray[0]===dateArray[0])
        {
            dayList[j]=this.props.days[i]
            j++
        }
    }



    const allTimes = dayList.length?(
        dayList.map(day=>{
            return(
                <div className="col s12 m3" key={day.dt_txt}>
                <div className="flexBox">
                   <div className="timeDay">
                        
                            <h5 style={{color: "darkBlue"}}>{this.convertTime(day.dt_txt.split(' ')[1])}</h5>
                            <br></br>
                            <p className="card-title bold">{day.weather[0].main}</p>
                            <br></br>
                            <img src={"https://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"} alt="weather_icon" />
                            <br></br>
                            <h5><strong>{day.main.temp}&deg;</strong>{this.props.unit}</h5>
                            <br></br>
                            <h5><p>Feels like:</p> {day.main.feels_like}&deg;{this.props.unit}</h5>
                        </div>
                        </div>
                </div>
            )
    })):(<div style={{display:"none"}}>
    </div>)
   
        return(
            <div className="container">
            <button onClick={this.handleClick}>
            <FontAwesomeIcon icon={faChevronLeft} style={
                {
                    fontSize: "50px",
                    color: "darkblue"
                }
            }/></button>
                <h4>{moment(this.props.location.state.date).format("dddd, MMMM Do YYYY")}</h4>
                <div className="row">
                    {allTimes}
                </div>    
            </div>
        )
    }


}


const mapStateToProps = (state)=>{
    return{
        city:state.city,
        current:state.current,
        days:state.days,
        unit:state.unit,
        windunit:state.windunit
    }
}


export default connect(mapStateToProps)(threehourly)