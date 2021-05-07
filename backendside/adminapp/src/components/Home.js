import React, { Component } from "react";
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Grid, Button, ButtonGroup, Typography, TableBody } from "@material-ui/core";
import LegacyQRMode from "./LegacyQRMode"

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
            ,startScanCode: false
            ,resultCallBack: false
            ,scanState: false
            ,openDialog:false
            ,scanResults:[]
            ,register:{
                title:""
                ,registered:0
                ,presented:0
                ,waiting:0
            }
            ,scanResultOut:{
                id:0
                , username:""
                , seat:""
                , message:""
                , status:"error"
            }
            ,totalScaned:0
        };
        this.handleScanCode = this.handleScanCode.bind(this);
        this.handleScanResult = this.handleScanResult.bind(this);
        this.openInformDialog = this.openInformDialog.bind(this);
        this.handleResetButton = this.handleResetButton.bind(this);
    }

    componentDidMount(){
        fetch("/member/massInfo")
        .then((response) => {
            if (!response.ok) {
                return {};
            } else{
                return response.json();
            }
        })
        .then((data) =>{
            var register = data['register'];
            //console.log(register);
            this.setState(state =>({...state.register,register}));
            //console.log(this.state.register);
        });

    }

    componentWillUnmount(){
        this.setState({});
    }

    openInformDialog(){
        this.setState({openDialog:true});
        setTimeout(() => this.setState({ openDialog: false }),
            3000
        );
    }

    handleResetButton(){
        fetch("/member/updateStatus?status=AB")
        .then((response) => {
            if (!response.ok) {
                return {};
            } else{
                return response.json();
            }
        })
        .then((data) =>{
            this.setState({
                scanResultOut:data
            });
            this.openInformDialog();
        });
    }

    handleScanCode() {
        this.setState({
            startScanCode: !this.state.startScanCode,
            resultCallBack: false
        });
    }

    handleCloseDialog(){
        this.setState({openDialog:!this.state.openDialog})
    }


    handleScanResult = (result) => {
        //console.log(result);
        if(result['status'] == 'same'){
            this.openInformDialog();
        }
        else{
            if(result['status'] !== 'error'){
                var register = result['content']['register'];
                this.setState(state =>({...state.register,register}));
            }
            //console.log(result['content']);
            var index = this.state.totalScaned;
            var newResult = result['content']['result'];
            newResult["id"] = index;
            this.setState({
                scanResultOut:newResult
            });
            this.openInformDialog();
            this.setState({
                scanResults: [...this.state.scanResults,newResult]
            });
            this.setState({totalScaned:index+1});

            if (result['status'] === 'ok') {
                this.setState({scanState: true
                    , resultCallBack: true
                    //, startScanCode: false
                });
                console.log(this.state.scanResults.length)

            } else if (result['status'] === 'checked') {
                console.log("warning");
                this.setState({
                    scanResult: result['content']
                    , scanState: false
                    , resultCallBack: true
                    //, startScanCode: false
                });
            } else {
                this.setState({
                    scanResult: result['content']
                    , resultCallBack: true
                    , scanState: false
                    //, startScanCode: false
                });
            }

        }
    }

    render() {
        const scanResults = this.state.scanResults
                            .sort((a,b) => b.id > a.id ? 1 : -1);
        const openDialog = this.state.openDialog
        const scanResultOut = this.state.scanResultOut
        //console.log(scanResults);
        return (
            <div>
                <div className="checkin-info">
                    <h2>
                        {this.state.register.title}
                    </h2>
                    <Button className="btn btn-md-main" onClick={this.handleResetButton}>Reset đăng ký</Button>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-4">
                            <div className="registered-card">
                                <h3>
                                    {this.state.register.registered}
                                </h3>
                                <h5>ĐĂNG KÝ</h5>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4">
                            <div className="presented-card">
                                <h3>
                                {this.state.register.presented}
                                </h3>
                                <h5>CÓ MẶT</h5>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4">
                            <div className="waiting-card">
                                <h3>
                                    {this.state.register.waiting}
                                </h3>
                                <h5>ĐANG CHỜ</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-12 center">
                        <h4 >LỊCH SỬ DUYỆT</h4>
                        <div className="card-scan-result">
                        <Paper style={{maxHeight: 480, overflow: 'auto'}}>

                                <List>
                                { scanResults.map(({id,username, seat, message, status }) => (
                                    <ListItem key={id}>
                                            <div className={status==='ok'? "presented-card row": status==='error' ? "registered-card row" : "waiting-card row"}>
                                                <div className="col-md-2 col-sm-2 col-2"> {status==='ok'?
                                                                                            <div className="scan-mark-ok"><i className="fa fa-2x fa-check-circle"></i></div>
                                                                                            : <div className="scan-mark-ok"><i className="fa fa-2x fa-exclamation-circle"></i></div>
                                                                                }
                                                </div>
                                                {
                                                    status==='ok'? <div className="col-10"><div className="row"><div className="col-md-8 col-sm-8 col-8" style={{color:"#ffffff",size: 24}}>{message}  {username}</div>
                                                                    <div className="col-md-4 col-sm-4 col-4" style={{color:"#ffffff",size: 24}}>{seat}</div></div></div>
                                                                :
                                                                    <div className="col-md-10 col-sm-10 col-10" style={{color:"#ffffff",size: 24}}>{message}</div>
                                                }

                                            </div>
                                    </ListItem>
                                ))}
                                </List>

                        </Paper>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12 col-12">
                        <div className="card-qr">
                            <div className="card-qr-camera">
                                {

                                    this.state.startScanCode ? <LegacyQRMode handleScanResult={this.handleScanResult} />
                                        : <div className="text-center" >
                                            <img id="loc_load_disp" src="/static/ScanStart.gif" alt="loading" />
                                        </div>
                                }
                            </div>
                            <div className="card-qr-footer">
                                {
                                    this.state.startScanCode ? <Button className="btn btn-md-danger" onClick={this.handleScanCode}>
                                        Stop Scanning
                                                            </Button>
                                        : <Button className="btn btn-md-main" onClick={this.handleScanCode}>
                                            Start Scanning
                                                        </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" >
                        <div className="row">
                            <div className="col-md-8 col-sm-8 col-8"><h3>{"Kết quả "}</h3></div>
                            <div className="col-md-4 col-sm-4 col-4"> {scanResultOut.status==='ok'?
                                <div className="confirm-mark-ok"><i className="fa fa-2x fa-check-circle"></i></div>
                                : <div className="confirm-mark-not"><i className="fa fa-2x fa-exclamation-circle"></i></div>
                                        }
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        <div className={scanResultOut.status==='ok'? "presented-card row": scanResultOut.status==='error' ? "registered-card row" : "waiting-card row"}>
                                                {
                                                    scanResultOut.status==='ok'?
                                                                    <div className="col-12" style={{width:280}}>
                                                                        <h5 style={{color:"#ffffff"}}>{scanResultOut.message}</h5>
                                                                        <h4 style={{color:"#ffffff"}}>{scanResultOut.username}</h4>
                                                                        <h2 style={{color:"#ffffff"}}>{scanResultOut.seat}</h2>
                                                                    </div>
                                                                            :
                                                                    <div className="col-md-10 col-sm-10 col-10" style={{color:"#ffffff"}}><h4>{scanResultOut.message}</h4></div>
                                                }

                                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
