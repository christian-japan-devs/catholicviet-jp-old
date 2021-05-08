import React, { Component } from 'react';
import { forwardRef } from 'react';
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

const columns = [
  { field: 'id', title: 'ID', hidden: true },
  { field: 'code', title: 'code', hidden: true },
  { field: 'bid', title: 'bid', hidden: true },
  { field: 'user_name', title: 'Tên' },
  { field: 'user_email', title: 'Email' },
  {
    field: 'seat_no',
    title: 'Số Ghế',
    defaultSort: 'asc',
  },
  {
    field: 'user_confirm',
    title: 'Tình trạng',
    description: 'Tình trạng xác nhận chắc chắn đi Lễ',
    sortable: false,
  },
];

const colAbsent = [
  { field: 'id', title: 'ID', hidden: true },
  { field: 'code', title: 'code', hidden: true },
  { field: 'bid', title: 'bid', hidden: true },
  { field: 'acc_name', title: 'Tài khoản' },
  { field: 'user_name', title: 'Tên' },
  { field: 'user_email', title: 'Email' },
  { field: 'mass_name', title: 'Thánh Lễ' },
  { field: 'mass_date', title: 'Ngày' },
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
      tableData: {},
      tableAbsentData: {},
    };
    this.handleRowDataClickedEvent = this.handleRowDataClickedEvent.bind(this);
    this.handleRowDetail = this.handleRowDetail.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/member/getListRegister?status=AB&max=200')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (this._isMounted) {
          this.setState({
            tableAbsentData: data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleRowDataClickedEvent = (event, rowData) => {
    //data = this.state.tableData["listbooking"]
    alert('You clicked ' + rowData.id + ' name: ' + rowData.user_name);
  };

  handleRowDetail = (evet, selectedRow) => {
    alert('You clicked ' + selectedRow.tableData.id);
  };

  render() {
    const tableData = this.state.tableData;
    const tableAbsentData = this.state.tableAbsentData;
    //console.log(scanResults);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <br />
        <br />
        <MaterialTable
          icons={tableIcons}
          title={tableAbsentData['title']}
          data={tableAbsentData['listbooking']}
          columns={colAbsent}
          pageSize={10}
          actions={[
            {
              icon: Edit,
              tooltip: 'Save User',
              onClick: this.handleRowDataClickedEvent,
            },
          ]}
          onRowClick={this.handleRowDetail}
        />
      </div>
    );
  }
}
