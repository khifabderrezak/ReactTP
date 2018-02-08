import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


// cette classe est pour afficher la list des capteur connecté. 
class ListSensorJSX extends React.Component{
    render(){
        //console.log(this.props.list)
        const values = this.props.list.map(function(value){
            return <li>
                        <Link to={`/${value.name}`}>
                            <button> 
                                {value.name}
                            </button>
                        </Link>
                        
                    </li>
        });
        return (
            <ul id="list_capteur">{values}</ul>
        );
    }
}

export default ListSensorJSX;
