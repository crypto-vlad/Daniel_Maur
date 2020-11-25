import React, { Component } from 'react';
import {
  View,
  ART
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export class ArtTest extends Component {
  static defaultProps = {
    proportion: 0.5,//0-1
    surfaceWidth: 100,
    surfaceHeigth: 100,
    backgroundColor: '#FF7800',
    stroke: 'white',
    fill: 'white',
    strokeWidth: 2,
    superViewBackgroundColor: "blue",
    type: "circular",//circular/rectangular
  }

  constructor(props) {
    super(props);
    this.copyRadian = 1;
    this.proportion = this.props.proportion;//Arc control
    this.surfaceWidth = this.props.surfaceWidth;
    this.surfaceHeigth = this.props.surfaceHeigth;
    this.moveY = 0;
    this.moveYRex = this.props.surfaceHeigth ;
    this.radius = this.surfaceWidth / 2.0;
    this.total = this.props.minute;
    this.state = {
      radian: this.copyRadian,
      moveY: this.moveY,
      moveYRex: this.moveYRex ,
    };
  }

  componentDidMount() {
    var addBool = false;
    this.intervalTimer = setInterval(() => {//Arc control
      if (addBool === true) {
        this.copyRadian += 0.05;
        this.setState({
          radian: this.copyRadian
        });
      } else {
        this.copyRadian -= 0.05;
        this.setState({
          radian: this.copyRadian
        });
      }
      if (this.copyRadian > 0.7) {
        addBool = false;
      } else if (this.copyRadian < 0.3) {
        addBool = true;
      }
    }, 120);

    this.moveXTimer = setInterval(() => {//move down
        if( this.total === 0 ) this.total = 1;
      this.moveY += 2*this.surfaceHeigth/(this.total * 60);
      this.moveYRex -= 0.3;
      this.setState({
        moveY: this.moveY,
        moveYRex : this.moveYRex,
      })
      if (this.moveY < (this.surfaceHeigth * (1 - this.proportion))) {
        this.moveXTimer && clearInterval(this.moveXTimer);
      }
    }, 1000);

  }

  componentWillUnmount() {
    this.intervalTimer && clearTimeout(this.intervalTimer);
    this.moveXTimer && clearTimeout(this.moveXTimer);
  }

  artDarwRecWaveView() {
    // line1
    var moveX = 0;
    var t1 = 0;
    var moveY = 4 * Math.cos(2 * Math.PI * t1 * this.state.radian) + this.state.moveYRex ;
    const linePath = ART.Path();
    linePath.moveTo(moveX, moveY);
    for (var x = 0; x <= this.surfaceWidth; x++) {
      var t = x / 50.0;
      var y = 4 * Math.cos(2 * Math.PI * t * this.state.radian) + this.state.moveYRex ;
      linePath.lineTo(x, y)
    }

    linePath.lineTo(this.surfaceWidth, 0);
    linePath.lineTo(0, 0);
    linePath.close();
    

    return (
      <>
    <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#55c9f2', '#2365D2'] }
            style={[{ backgroundColor: '#FF7800' }, this.props.style]}>
            <ART.Surface width={this.surfaceWidth} height={this.surfaceHeigth} >
                <ART.Shape d={linePath} stroke="white" strokeWidth={2} fill={"white"} />
            </ART.Surface>
    </LinearGradient>
    </>
    )
  }

  artDarwCircularWaveView() {
    var moveX = 0;
    var t1 = moveX / 50.0;
    // var moveY = 4 * Math.sin(2 * Math.PI * t1 * this.state.radian) + this.state.moveY;
    var moveY = 10 * t1*t1*this.state.radian + this.state.moveY;
    const waveLinePath = ART.Path();
    waveLinePath.moveTo(moveX, moveY);
    console.log(this.state.radian);
    for (var x = 0; x <= this.surfaceWidth; x++) {
      var xx = this.surfaceWidth/2
      var t = (xx-x) / 50.0;
      // var y = 10 * Math.sin( Math.PI * t * this.state.radian*2) + this.state.moveY ;
      var y =-100*(t*t)*this.state.radian+ this.state.moveY ;
    //   console.log(y)
      waveLinePath.lineTo(x, y)
    }


    waveLinePath.lineTo(this.surfaceWidth, 0);
    waveLinePath.lineTo(0, 0);
    waveLinePath.close();

    const linePath = ART.Path();
    linePath.moveTo(0, 0);
    linePath.lineTo(0, this.radius);
    for (var x1 = 0; x1 <= this.radius; x1++) {
      var y1 = this.radius - Math.sqrt(this.radius * this.radius - (x1 - this.radius) * (x1 - this.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.lineTo(this.surfaceWidth, 0)
    linePath.lineTo(this.surfaceWidth, this.radius)
    for (var x1 = this.surfaceWidth; x1 >= this.radius; x1--) {
      var y1 = this.radius - Math.sqrt(this.radius * this.radius - (x1 - this.radius) * (x1 - this.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.moveTo(0, this.radius);
    linePath.lineTo(0, this.surfaceWidth);
    linePath.lineTo(this.surfaceWidth, this.surfaceWidth);
    linePath.lineTo(this.surfaceWidth, this.radius);
    for (var x1 = 0; x1 <= this.surfaceWidth; x1++) {
      var y1 = this.radius + Math.sqrt(this.radius * this.radius - (x1 - this.radius) * (x1 - this.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.close();

    return <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#55c9f2', '#051CFC'] }
        
        style={[{ backgroundColor: '#FF7800', borderRadius: this.surfaceWidth / 2.0, width: this.surfaceWidth,
         height: this.surfaceHeigth }, this.props.style]}>
      <ART.Surface width={this.surfaceWidth} height={this.surfaceHeigth*4}  style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderColor:'#3082ed', borderWidth:1 }}>
        <ART.Shape d={waveLinePath} stroke={this.props.stroke} strokeWidth={this.props.strokeWidth} fill={this.props.fill} />
      </ART.Surface>

      {/* <ART.Surface width={this.surfaceWidth} height={this.surfaceHeigth} style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', left: 0, top: 0, width: this.surfaceWidth, height: this.surfaceWidth }}>
        <ART.Shape d={linePath} stroke="rgba(0,0,0,0.0)" fill={this.props.superViewBackgroundColor} />
      </ART.Surface> */}
    </LinearGradient>
  }


  typeView() {
    if (this.props.type === 'circular') {
      return this.artDarwCircularWaveView()
    } else if (this.props.type === 'rectangular') {
      return this.artDarwRecWaveView()
    }
  }

  render() {
    return (
      <View style={{ width: this.props.surfaceWidth, height: this.props.surfaceHeigth, justifyContent: 'center', 
        alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)', }}>
        {this.typeView()}
      </View>
    );
  }
}
