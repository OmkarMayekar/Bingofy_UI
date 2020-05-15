import React from 'react';
import {   Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button } from "shards-react";

class ViewRecipeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
             
render(){
    console.log("element =====> ",this.props);
            return(
                    <Card style={{ maxWidth: "80%", marginLeft : '10%', marginBottom : '2%'}}>
                      <CardHeader style={{fontFamily: 'cursive',fontSize: 'x-large'}}>{this.props.value.recipe_title}</CardHeader>
                      <CardBody>
                        <p style={{fontFamily: 'monospace',fontSize: '18px'}}>{this.props.value.recipe_description}.</p>
                      </CardBody>
                      <CardFooter>****xxxx****</CardFooter>
                    </Card>
            );
        }
}

export default ViewRecipeCard;