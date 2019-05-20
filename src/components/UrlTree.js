import React, {Component} from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { Container } from 'react-bootstrap';

class UrlTree extends Component{

    constructor(props){
        super(props);
        this.state = {
            urls: [
                'home',
                'products',
                'products/grocery',
                'products/grocery/oil',
                'products/grocery/rice',
                'products/grocery/rice/price',
                'products/supershop',
                'products/supershop/shampoo',
                'products/supershop/airfreshner',
                'products/supershop/icecream',
                'products/supershop/icecream/brand',
                'products/supershop/icecream/quantity',
                'products/supershop/icecream/price',
                'home/projects',
                'home/concerns',
                'home/concerns/hospital',
                'home/concerns/hospital/nurses',
                'home/concerns/hospital/patients'
            ],

            data: {
                name: 'root',
                children: [

                ]

            },

        }

        this.urlToJson = this.urlToJson.bind(this);
        this.addNode = this.addNode.bind(this);
    }

    //adding tree nodes recursively

    addNode(obj, tokens, index, tokenArrLen){

        
        if(index === tokenArrLen-1){
            obj.children.push({name:tokens[tokenArrLen-1], children:[] })            
            return;
        }

        
        obj.children.map((ch)=>{
            
            if(ch.name === tokens[index]){
                
                return this.addNode(ch, tokens, index+1, tokenArrLen)
            }
            return ch;
        })
  

    }

    urlToJson(){
        
        this.state.urls.map((url) => {
 
            var tokens = url.split('/');
            
            if(tokens.length === 1){
                this.state.data.children.push({name: tokens[0], children: [] })
            }
            else{
                let toksLen = tokens.length;
                // let lastNode = tokens[toksLen-1];
                
                return this.addNode(this.state.data, tokens, 0, toksLen);
            }
            
            return url;

        })

        // console.log(this.state.data)

    }

    render(){
        return (

          <Container>
              <Tree
                data={this.state.data}
                height={500}
                width={500}
                />
                {   this.urlToJson() }
                
          </Container>  

            
        )
    }

}

export default UrlTree