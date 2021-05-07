import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { connect } from "react-redux";

class LegacyQRMode extends Component {

  constructor(props){
    super(props);

    this.state = {
      delay: 500,
      data: 'No result',
      loading: false,
      error: null
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getUserBookingInfor = this.getUserBookingInfor.bind(this);
  }

  getUserBookingInfor(result) {
    var pattern = /(\?|\&)([^=]+)\=([^&]+)/g;
    var results = result.match(pattern);
    fetch("/member/cfmatt/"+results[0]+results[1]+results[2]+results[3])
        .then(res => {
          const data = res.data;
          this.props.handleScanResult(data['content'],true);
        })
        .catch(err => {
            this.props.handleScanResult(err,false);
        });
  }

  handleScan(result){
    if(result){
      this.setState({ loading:true });
      if(this.state.data == result){
        this.props.handleScanResult({"status":"same"});
        console.log("Onajii scanded data");
      }else{
        this.setState({data:result});
        var pattern = /(\?|\&)([^=]+)\=([^&]+)/g;
        var results = result.match(pattern);
        fetch("/member/cfmatt/"+results[0]+results[1]+results[2]+results[3])
        .then((response) => {
            if (!response.ok) {
                return {};
            } else{
                return response.json();
            }
        })
        .then((data) =>{
              this.props.handleScanResult(data);
        });
      }
      //this.props.handleScanResult(results[0],results[1],results[2],results[3]);
    }
  }

  handleError(err){
    console.error(err)
  }

  render(){
    const previewStyle = {
      height: 280,
      width: 360,
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
    return {
        //handleScanResult: (uid,bid, mid, cd) => dispatch(checkInUser(uid,bid, mid, cd))
    };
  };

export default connect(
    null,
    mapDispatchToProps
)(LegacyQRMode);
