import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';

const Code = styled.div/* .attrs(({top, duration, delay, tableau}) => ({
    style : {
       top : top+'px',
       animationDirection : 'normal',
       animationDelay : delay[Math.floor(Math.random() * delay.length)],
       animationDuration: duration[Math.floor(Math.random() * duration.length)],
       animationName: 'glissement',
       animationIterationCount: 'infinite',
    }
})) */`
    animation-timing-function: linear;
    color : #B7C6DA;
    white-space : nowrap;
    position : absolute;
    z-index : 0;
    left : -100%;
    @keyframes glissement {
        from {
          left:  -100%;
        }
      
        to {
          left: 150%;
        }
      }
`;

let tableau = ['Array.prototype.randomElement = function () {return this[Math.floor(Math.random() * this.length)]}',
                'Array.prototype.randomElement = function () {return this[Math.floor(Math.random() * this.length)]}',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>',
                '<Codekey={index} ref={this.myRef} top={myIndex = myIndex+20} duration={duration} delay={delay} tableau={tableau}> {item}</Code>'
            ];
let duration = ['13s', '16s', '19s', '22s'];
let delay = ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s','9s', '10s', '11s', '12s', '13s', '14s', '15s', '16s'];
let myIndex = 0;
class Matrix extends React.Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount () {
        
    }
    render(){
        return(
            <div>
                {
                    tableau.map((item,index) => 
                        <Code
                        key={index} 
                        ref={this.myRef}
                        top={myIndex = myIndex+26}
                        duration={duration}
                        delay={delay}
                        tableau={tableau}
                        >
                        {item}
                        </Code>
                    )
                }
            
            </div>

        );
    }
}

export default Matrix;


