import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


class weather extends Component{
    
    componentDidMount(){
        var unitValue=''
        if(this.props.unit==='C')
        {
            unitValue="metric"
        }
        else{
            unitValue="imperial"
        }
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+this.props.city+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+unitValue)
            .then(res=>{
                this.props.updateDays(res.data.list);
            })

        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.props.city+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+unitValue)
            .then(res=>{
                this.props.updateCurrent({temp: res.data.main.temp, icon:res.data.weather[0].icon, wind:res.data.wind.speed, feels_like:res.data.main.feels_like})
            })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.updateCity(e.target.city.value)
        var unitValue=''
        if(this.props.unit==='C')
        {
            unitValue="metric"
        }
        else{
            unitValue="imperial"

        }
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+e.target.city.value+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+unitValue)
            .then(res=>{
                this.props.updateDays(res.data.list)
            }).catch(error=>{
                this.props.updateCity('Invalid City Name')
                this.props.updateDays([])
                this.props.updateCurrent({temp: '-', icon: '-', wind: '-', feels_like:'-'})
            });

        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+e.target.city.value+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+unitValue)
            .then(res=>{
                this.props.updateCurrent({temp: res.data.main.temp, 
                                          icon:res.data.weather[0].icon, 
                                          wind:res.data.wind.speed, 
                                          feels_like:res.data.main.feels_like})
            }).catch(error=>{
                this.props.updateCity('Invalid City Name')
                this.props.updateDays([])
                this.props.updateCurrent({temp: '-', icon: '-', wind: '-', feels_like:'-'})
            })
    }


    tempChange=(e)=>{
        if(e.target.value==="metric")
        {
            this.props.updateUnit('C')
            this.props.updateWindUnit('meter/sec')
        }
        else{
            this.props.updateUnit('F')
            this.props.updateWindUnit('miles/hour')
        }
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+this.props.city+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+e.target.value)
            .then(res=>{
                this.props.updateDays(res.data.list)
            }).catch(error=>{
                this.props.updateCity('Invalid City Name')
                this.props.updateDays([])
                this.props.updateCurrent({temp: '-', icon: '-', wind: '-', feels_like:'-'})
            });

        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.props.city+"&appid=d90a4edf4d91049321f5b1505b2d7d7e&units="+e.target.value)
            .then(res=>{
                this.props.updateCurrent({temp: res.data.main.temp, 
                                          icon:res.data.weather[0].icon, 
                                          wind:res.data.wind.speed, 
                                          feels_like:res.data.main.feels_like})
            }).catch(error=>{
                this.props.updateCity('Invalid City Name')
                this.props.updateDays([])
                this.props.updateCurrent({temp: '-', icon: '-', wind: '-', feels_like:'-'})
            })
    }

    render(){
        const dayList=[]
        var j=0
        var highestTemp=-1000
        var lowestTemp=1000
       
        for(var i=0;i<this.props.days.length;i++)
        {
            if(this.props.days[i].main.temp>highestTemp)
                highestTemp=this.props.days[i].main.temp
            if(this.props.days[i].main.temp<lowestTemp)
                lowestTemp=this.props.days[i].main.temp
            if(i===6 || i===14 || i===22 || i===30 || i===38)
            {
                dayList[j]={dt_txt:this.props.days[i].dt_txt,high:highestTemp,low:lowestTemp,icn:this.props.days[i].weather[0].icon}
                j++
                highestTemp=-1000
                lowestTemp=1000
            }
        }


        const forecast = dayList.length?(dayList.map(day=>{return (
            <div className="day" key={day.dt_txt}>
                <Link to={{ pathname: `/${moment(day.dt_txt).format('dddd')}`, state:{date:day.dt_txt}}} style={{ textDecoration: 'none' }}>
                    <h3>{moment(day.dt_txt).format('ddd')}</h3>
                    <img src={"https://openweathermap.org/img/wn/"+day.icn+"@2x.png"} alt="weather_icon" />
                    <p>High: &#8593; {day.high}&deg;{this.props.unit}</p>
                    <p>Low: &#8595; {day.low}&deg;{this.props.unit}</p>
                </Link>
            </div>
        )})):(<div style={{display:"none"}}>
            </div>)

           

        return(
           


            <div className="container">
            <br/>
                <form className="row" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div style={{textAlign:"center"}}>  
                        <label htmlFor="city" className="active" style={{
                            fontSize: "25px",
                            color: "darkBlue"
                        }}><strong>Enter City</strong></label>   
                            <input id="city" type="text" className="validate" onChange={this.handleChange}></input>
                        </div>
                    </div>
                </form>
                        <div className="weather">
                            <div className="current">
                                <div className="info">
                                    <p>&nbsp;</p>
                                    <p className="city">{this.props.city}</p>
                                    <p className="degree"> <button value="imperial" onClick={this.tempChange} style={{position:"static", color:"white"}}>&deg; F</button> | <button value="metric" onClick={this.tempChange} style={{position:"static", color:"white"}}>&deg; C</button></p> 
                                    <img src={"https://openweathermap.org/img/wn/"+this.props.current.icon+"@2x.png"} alt="weather_icon" />
                                    <p className="temp">{this.props.current.temp}&deg; {this.props.unit}<br/>
                                    <span className="feels"><small>Feels like:</small>{this.props.current.feels_like}&deg; {this.props.unit}</span>
                                    </p>
                                    <p className="wind"><small>Wind:</small> {this.props.current.wind} {this.props.windunit}</p>
                                    <p>&nbsp;</p>
                                </div>
                                
                            </div>
                        </div>
                <div className="future">
                                {forecast}
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

const mapDispatchToProps = (dispatch)=>{
    return{
        updateCity: (city)=>{dispatch({type:'UPDATE_CITY',city:city})},
        updateCurrent: (current)=>{dispatch({type:'UPDATE_CURRENT',current:current})},
        updateDays: (days)=>{dispatch({type:'UPDATE_DAYS',days:days})},
        updateUnit: (unit)=>{dispatch({type:'UPDATE_UNIT',unit:unit})},
        updateWindUnit: (windunit)=>{dispatch({type:'UPDATE_WINDUNIT',windunit:windunit})}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(weather)