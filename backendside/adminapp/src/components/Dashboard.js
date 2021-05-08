import React, { Component } from 'react';
import { forwardRef } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const columns = [
  { field: 'id', title: 'ID', hidden: true },
  { field: 'code', title: 'code', hidden: true },
  { field: 'bid', title: 'bid', hidden: true },
  { field: 'acc_name', title: 'acc_name', hidden: true },
  {
    field: 'seat_no',
    title: 'Số Ghế',
    defaultSort: 'asc',
  },
  { field: 'user_name', title: 'Tên' },
  { field: 'user_email', title: 'Email' },
  {
    field: 'user_confirm',
    title: 'Tình trạng',
    description: 'Tình trạng xác nhận chắc chắn đi Lễ',
    sortable: false,
  },
];

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      registerStatus: 'A',
      tableData: {},
      dataRow: {
        user_name: '',
        acc_name: '',
        code: '',
        bid: '',
      },
      openDialog: false,
      register: {
        title: '',
        registered: 0,
        presented: 0,
        waiting: 0,
      },
    };
    this.handleRowDataClickedEvent = this.handleRowDataClickedEvent.bind(this);
    this.handleRowDetail = this.handleRowDetail.bind(this);
    this.onSelectStatusChange = this.onSelectStatusChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleSendDialogClick = this.handleSendDialogClick.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  updateData(status) {
    this._isMounted = true;
    fetch('/member/getListByMass?status=' + status)
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            tableData: data,
          });
        }
      });
    fetch('/member/massInfo')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        var register = data['register'];
        //console.log(register);
        this.setState((state) => ({ ...state.register, register }));
        //console.log(this.state.register);
      });
  }

  componentDidMount() {
    this.updateData('A');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSelectStatusChange = (event) => {
    console.log('status: ' + event.target.value);
    this.setState({
      registerStatus: event.target.value,
    });
    this.updateData(event.target.value);
  };

  handleRowDataClickedEvent = (event, rowData) => {
    //data = this.state.tableData["listbooking"]
    var dataRow = {
      user_name: rowData.user_name,
      acc_name: rowData.acc_name,
      code: rowData.code,
      bid: rowData.bid,
    };
    console.log(dataRow);
    this.setState({ dataRow: dataRow });
    this.setState({ openDialog: true });
  };

  handleRowDetail = (evet, selectedRow) => {
    var dataRow = {
      user_name: selectedRow.tableData.user_name,
      acc_name: selectedRow.tableData.acc_name,
      code: selectedRow.tableData.code,
      bid: selectedRow.tableData.bid,
    };
    console.log(selectedRow);
    this.setState({ dataRow: selectedRow });
    this.setState({ openDialog: true });
    //alert("You clicked "+selectedRow.tableData.id)
  };

  handleResetButton() {
    fetch('/member/updateStatus?status=AB')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({
          scanResultOut: data,
        });
        this.openInformDialog();
      });
  }

  handleSendDialogClick = (type, bid, code) => {
    this.setState({ openDialog: false });
    fetch('/member/updateRegister?type=' + type + '&bid=' + bid + '&cd=' + code)
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        alert('status: ' + data['message']);
        console.log(data);
      });
  };

  handleCloseDialog() {
    this.setState({ openDialog: !this.state.openDialog });
  }

  render() {
    const tableData = this.state.tableData;
    const openDialog = this.state.openDialog;
    const dialogData = this.state.dataRow;
    //console.log(scanResults);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <br />
        <br />
        <div className="checkin-info">
          <h2>{this.state.register.title}</h2>
          <Button className="btn btn-md-main" onClick={this.handleResetButton}>
            Reset đăng ký
          </Button>
          <div className="row">
            <div className="col-md-4 col-sm-4 col-4">
              <div className="registered-card">
                <h3>{this.state.register.registered}</h3>
                <h5>ĐĂNG KÝ</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-4">
              <div className="presented-card">
                <h3>{this.state.register.presented}</h3>
                <h5>CÓ MẶT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-4">
              <div className="waiting-card">
                <h3>{this.state.register.waiting}</h3>
                <h5>ĐANG CHỜ</h5>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="center">
          <FormControl component="fieldset">
            <FormLabel component="legend">Tình Trạng</FormLabel>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={this.state.registerStatus}
              onChange={this.onSelectStatusChange}
            >
              <FormControlLabel value="A" control={<Radio />} label="Đăng ký" />
              <FormControlLabel
                value="W"
                control={<Radio />}
                label="Đang chờ"
              />
              <FormControlLabel value="C" control={<Radio />} label="Đã huỷ" />
              <FormControlLabel value="CD" control={<Radio />} label="Bị huỷ" />
              <FormControlLabel value="P" control={<Radio />} label="Có mặt" />
              <FormControlLabel
                value="AB"
                control={<Radio />}
                label="Vắng mặt"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <MaterialTable
          icons={tableIcons}
          title={tableData['title']}
          data={tableData['listbooking']}
          columns={columns}
          pageSize={10}
          onRowClick={this.handleRowDetail}
        />
        <br />
        <Dialog
          open={openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            style={{ backgroundColor: 'primary' }}
            id="form-dialog-title"
          >
            Cập nhập đăng ký
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <h4>{dialogData['user_name']}</h4>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.handleSendDialogClick(
                  'email',
                  dialogData['bid'],
                  dialogData['code']
                )
              }
              color="primary"
            >
              Email xác nhận
            </Button>
            <Button
              onClick={() =>
                this.handleSendDialogClick(
                  'approve',
                  dialogData['bid'],
                  dialogData['code']
                )
              }
              color="primary"
            >
              Đã có mặt
            </Button>
            <Button
              onClick={() =>
                this.handleSendDialogClick(
                  'deny',
                  dialogData['bid'],
                  dialogData['code']
                )
              }
              color="primary"
            >
              Từ chối
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
