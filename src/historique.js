import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


// cette classe est pour afficher la list des capteur connecté. 
class HistoriqueJSX extends React.Component{
    render(){
        
        //get five laste values 
        if ( typeof this.props.capteur === 'undefined' ){
            
            return (
                <div className="HistoriqueJSX">
                    <p> Chargement ...</p>
                </div>
            );
        }
        
        let LastFiveValue = this.props.capteur.data.values.slice(Math.max(this.props.capteur.data.values.length - 5, 1))
        
        console.log(LastFiveValue);
        const values = LastFiveValue.map(function(value){
                    if (Number(value)){
                        return  <tr><td>{Number(value).toFixed(4)}</td></tr>
                    }else{
                        return  <tr><td>{value}</td></tr>
                    }
            
        });
        return (
            <table className="HistoriqueJSX">{values}</table>
        );
    }
}

export default HistoriqueJSX;