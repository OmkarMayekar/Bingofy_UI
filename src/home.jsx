import React,{ Component, useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


class Home extends Component{

    constructor(props){
        super(props);
        this.state ={
        }
    }


  render() {
        return (
            <Carousel autoPlay>
                <div>
                    <img src="/List1.jpg" />
                </div>
                <div>
                    <img src="/Store.jpg" />
                </div>
                <div>
                    <img src="/Welcome.jpg" />
                </div>
            </Carousel>
        );
    }
}

export default Home;