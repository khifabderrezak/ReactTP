import React from 'react';
import { Sensor,Data} from './model.js';
import {BrowserRouter as Router } from 'react-router-dom'


// cette classe est pour afficher le capteur( nom, valeur actuelle, historique)
class SensorCompenentJSX extends React.Component
{
	
	
	render(){
		console.log(this.props.capteur);
		if ( typeof(this.props.capteur) === 'undefined' ){
			return (
				<div className="SensorCompenentJSX">
					<p> Chargement ...</p>
				</div>
			);
		}
		var valeur;
		var moyenne;
		if (Number(this.props.capteur.data.getlastValues())){
			valeur = parseFloat(this.props.capteur.data.getlastValues()).toFixed(4);
		}else{
			valeur = this.props.capteur.data.getlastValues();
		}	
		if (Number(this.props.capteur.data.Average())){
			moyenne = this.props.capteur.data.Average().toFixed(4);
		}else{
			moyenne = this.props.capteur.data.Average();
		}
		
		//console.log(valuer)
		return (
			<div className="SensorCompenentJSX">
					<h2>Capteur <em>{this.props.capteur.name}</em><em>{" ["+this.props.capteur.type+"]"}</em></h2>
					<div>
						<div>
							<h3>valuer Actuelle: </h3>
							<p>{valeur}</p>
							<h3>Valeur Moyenne: </h3>
							<p>{moyenne}</p>
						</div>
					</div>
				</div>
			
		);
	}
}

export default SensorCompenentJSX;
