import React, { Component } from 'react';
import {Sensor,Data} from './model.js' 
import SensorCompenentJSX from './sensorCompenent.js' 
import ListSensorJSX from './ListSensor.js' 
import HistoriqueJSX from './historique.js'
import mqtt from 'mqtt';
import {BrowserRouter as Router,Route, Redirect} from 'react-router-dom'
import './App.css';



var MQTTServer = 'mqtt://127.0.0.1:8080'
var clientmqtt = mqtt.connect(MQTTServer)


clientmqtt.on('connect', function () {
  clientmqtt.subscribe('#')
})
let SensorSList= [];

//function
function SensorIsInList(name, list) {
  /* 
    args:
    name(string): sensor name
    list(list): list of sensors 

    return: 
    true if sensor name is in the list 
    false if sensor name in not in the list 
  */
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].name === name) {
          return true;
      }
  }
  return false;
}

function getSensorFromList(name, list){
  /* 
    args:
    name(string): sensor name
    list(list): list of sensors 

    return: 
    sensor if sensor name is in the list 
  */
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].name === name) {
          return list[i];
      }
  }
}

class App extends Component {
  constructor(props) {
    super(props); 
    this.sensor = null;
    this.state = {value: '',list: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.GetData();
  }
  handleChange(event) {
    this.setState({value: "/"+event.target.value});
  }
  handleSubmit(event) {
    return <Redirect to="" />;    
  }
   GetData(){
    let this_composont = this;
    clientmqtt.on('message', function (topic, message) { 
      
        // get the message in json type
        var JsonData = JSON.parse(message.toString());
      
        //get sensor name
        var SensorName = topic.substring(6); 
      
        //get new values
        var Vval = JsonData['value'];
        
        //get type sensor 
        var TypeSensor = JsonData['type'] 
      
        //create line for the table, with received data 
         
        //instance for sensor
        var InstanceSensor;
      
        // if sensor is not in the list 
        if(!SensorIsInList(SensorName,SensorSList)){ 
          //new instance Data 
          var _data = new Data([Vval]);
      
          //assign the created instance to InstanceSensor
          InstanceSensor= new Sensor(SensorName,TypeSensor,_data);
          //console.log(InstanceSensor.name)
      
          //add the new instance to the list 
          SensorSList.push(InstanceSensor);
    
      
        }
        else{
          // get sensor instance from the list 
          InstanceSensor= getSensorFromList(SensorName,SensorSList);
    
          //insert values into data.Values
          Array.prototype.push.apply(InstanceSensor.data.values, [Vval]);
          
          //add average column to the line
          }
          //console.log(SensorSList)
          this_composont.setState({list:SensorSList});
      });
  }
  getSensorFromTheStateList(name){
    /* 
      args:
      name(string): sensor name
      list(list): list of sensors 
  
      return: 
      sensor if sensor name is in the list 
    */
    var i;
    for (i = 0; i < this.state.list.length; i++) {
        if (this.state.list[i].name === name) {
            return this.state.list[i];
        }
    }
  }
  render() {
    return (
      <Router>
      <div id="container">

        
          <header><center>
            <form onSubmit={this.handleSubmit} action={this.state.value}> 
                Broker :
                <input type="text" onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </form> 
            </center>
          </header>
          <div className="wrapper">
            <nav>
                <ListSensorJSX list={this.state.list}/>
            </nav>
            <article>
              <Route path="/:NomDucapteur" render={(props) => {return <SensorCompenentJSX capteur={this.getSensorFromTheStateList(props.match.params.NomDucapteur)} />}} />
            </article>
            <aside>
              <h3>Historique</h3>
              <Route path="/:NomDucapteur" render={(props) => {return <HistoriqueJSX capteur={this.getSensorFromTheStateList(props.match.params.NomDucapteur)} />}} />
            </aside>
          </div>
          <footer></footer>
        
       </div>
       </Router>
       
    );
  }
 
}

export default App;


