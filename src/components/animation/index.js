import React, { Component } from 'react';
import {
  View,
  ART
} from 'react-native';


export default class ArtShape extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        copyRadian : 0.0,
        proportion : 0.0,
        surfaceHeigth : 0,
        surfaceWidth: 0,
        moveY : 0,
        radius : 0.0,
        radian : 0,
        intervalTimer : 0,
        bCircle : false
        };
        this.state.copyRadian = 0.5
    this.state.proportion = this.props.proportion;//Arc control
    this.state.surfaceWidth = this.props.surfaceWidth;
    this.state.surfaceHeigth = this.props.surfaceHeigth;
    this.state.moveY = this.props.surfaceHeigth;
    this.state.radius = this.props.surfaceWidth / 2.0;
    this.state.radian = this.state.copyRadian;
    this.state.moveY =  this.props.surfaceWidth;
  }

  componentDidMount() {
    console.log("start drawing wave");
    
    console.log(this.state.copyRadian, this.state.proportion)
    var addBool = false;
    this.state.intervalTimer = setInterval(() => {//Arc control
      if (addBool === true) {
        this.state.copyRadian += 0.05;
        console.log(this.state.copyRadian);
        this.setState({
          radian: this.state.copyRadian
        });
      } else {
        this.state.copyRadian -= 0.05;
        this.setState({
          radian: this.state.copyRadian
        });
      }
      if (this.state.copyRadian > 0.7) {
        addBool = false;
      } else if (this.state.copyRadian < 0.3) {
        addBool = true;
      }
    }, 1000);

    this.moveXTimer = setInterval(() => {//move up
      this.state.moveY -= 5;
      this.setState({
        moveY: this.state.moveY
      })
      if (this.state.moveY < (this.state.surfaceHeigth * (1 - this.state.proportion))) {
        this.moveXTimer && clearInterval(this.state.moveXTimer);
      }
    }, 1000);
  }

  componentWillUnmount() {
//     if( this.state.bCircle )
// {    this.state.intervalTimer && clearTimeout(this.state.intervalTimer);
//     this.state.moveXTimer && clearTimeout(this.state.moveXTimer);
// }
  }

  artDarwRecWaveView() {
    // line1
    var moveX = 0;
    var t1 = moveX / 50.0;
    var moveY = 4 * Math.cos(2 * Math.PI * t1 * this.state.radian) + this.state.moveY;
    const linePath = ART.Path();
    linePath.moveTo(moveX, moveY);
    for (var x = 0; x <= this.state.surfaceWidth; x++) {
      var t = x / 50.0;
      var y = 4 * Math.cos(2 * Math.PI * t * this.state.radian) + this.state.moveY;
      linePath.lineTo(x, y)
    }
    linePath.lineTo(this.state.surfaceWidth, 0);
    linePath.lineTo(0, 0);
    linePath.close();

    return <View style={[{ backgroundColor: '#FF7800' }, this.props.style]}>
      <ART.Surface width={this.state.surfaceWidth} height={this.state.surfaceHeigth} >
        <ART.Shape d={linePath} stroke="white" strokeWidth={2} fill={"white"} />
      </ART.Surface>
    </View>
  }

  artDarwCircularWaveView() {
    var moveX = 0;
    var t1 = moveX / 50.0;
    var moveY = 4 * Math.cos(2 * Math.PI * t1 * this.state.radian) + this.state.moveY;
    const waveLinePath = ART.Path();
    waveLinePath.moveTo(moveX, moveY);
    for (var x = 0; x <= this.state.surfaceWidth; x++) {
      var t = x / 50.0;
      var y = 4 * Math.cos(2 * Math.PI * t * this.state.radian) + this.state.moveY;
      waveLinePath.lineTo(x, y)
    }
    waveLinePath.lineTo(this.state.surfaceWidth, 0);
    waveLinePath.lineTo(0, 0);
    waveLinePath.close();

    const linePath = ART.Path();
    linePath.moveTo(0, 0);
    linePath.lineTo(0, this.state.radius);
    for (var x1 = 0; x1 <= this.state.radius; x1++) {
      var y1 = this.state.radius - Math.sqrt(this.state.radius * this.state.radius - (x1 - this.state.radius) * (x1 - this.state.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.lineTo(this.state.surfaceWidth, 0)
    linePath.lineTo(this.state.surfaceWidth, this.state.radius)
    for (var x1 = this.state.surfaceWidth; x1 >= this.state.radius; x1--) {
      var y1 = this.state.radius - Math.sqrt(this.state.radius * this.state.radius - (x1 - this.state.radius) * (x1 - this.state.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.moveTo(0, this.state.radius);
    linePath.lineTo(0, this.state.surfaceWidth);
    linePath.lineTo(this.state.surfaceWidth, this.state.surfaceWidth);
    linePath.lineTo(this.state.surfaceWidth, this.state.radius);
    for (var x1 = this.state.surfaceWidth; x1 >= 0; x1--) {
      var y1 = this.state.radius + Math.sqrt(this.state.radius * this.state.radius - (x1 - this.state.radius) * (x1 - this.state.radius));
      linePath.lineTo(x1, y1)
    }
    linePath.close();
    // this.setState({bCircle : true});
    return <View style={[{ backgroundColor: '#FF7800', borderRadius: this.state.surfaceWidth / 2.0, width: this.state.surfaceWidth, height: this.state.surfaceHeigth }, this.props.style]}>
      <ART.Surface width={this.state.surfaceWidth} height={this.state.surfaceHeigth} style={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
        <ART.Shape d={waveLinePath} stroke={this.props.stroke} strokeWidth={this.props.strokeWidth} fill={this.props.fill} />
      </ART.Surface>

      <ART.Surface width={this.state.surfaceWidth} height={this.state.surfaceHeigth} style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', left: 0, top: 0, width: this.state.surfaceWidth, height: this.state.surfaceWidth }}>
        <ART.Shape d={linePath} stroke="rgba(0,0,0,0.0)" fill={this.props.superViewBackgroundColor} />
      </ART.Surface>
    </View>
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
      <View style={{ width: this.props.surfaceWidth, height: this.props.surfaceHeigth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)', }}>
        {this.typeView()}
      </View>
    );
  }
}