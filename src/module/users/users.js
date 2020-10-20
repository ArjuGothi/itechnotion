import React, { Component } from "react";
import { connect } from "react-redux";
import demoAction from "../../core/demo_redux/demoAction";
import { Modal, Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { UsersWrapper } from "./usersWrapper";

class UserWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      dataSource: [],
      singleData: { address: {} },
      modalType: "new",
      visible: false,
      deleteModal: false,
      deleteToken: ""
    };
  }

  componentDidMount() {
    this.props.getUsersAction();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    switch (nextProps.demoAction.type) {
      case "GET_USERS_SUCCES":
        update.dataSource = nextProps.demoAction.data;
        nextProps.feckAction();
        break;
      default:
    }
    return Object.keys(update).length === 0 ? null : update;
  }
  showDeleteModal = token => {
    this.setState({ deleteToken: token, deleteModal: true });
  };
  handleOk = () => {
    const dataSource = [...this.state.dataSource];
    if (this.state.modalType === "new") {
      dataSource.unshift({
        ...this.state.singleData,
        id: Math.random()
      });
      this.setState({ dataSource });
    } else {
      let a = dataSource.findIndex(e => e.id === this.state.singleData.id);
      if (a !== -1) {
        dataSource[a] = this.state.singleData;
        this.setState({ dataSource });
      }
    }
    this.setState({ visible: false });
    console.log(this.state.dataSource);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleAdd = (type, data) => {
    this.setState({ visible: true });
    this.setState({ modalType: type });
    if (type === "edit") {
      this.setState({ singleData: data });
    }
  };

  setData = (e, type, add) => {
    const singleData = { ...this.state.singleData };
    if (add === "address") {
      singleData["address"][type] = e;
      this.setState({ singleData });
    } else {
      singleData[type] = e;
      this.setState({ singleData });
    }
  };

  showDeleteModal = token => {
    this.setState({ deleteToken: token, deleteModal: true });
  };

  deleteItem = () => {
    const dataSource = [...this.state.dataSource];
    let a = dataSource.findIndex(r => r.id === this.state.deleteToken);
    dataSource.splice(a, 1);
    this.setState({ dataSource, deleteModal: false });
  };

  render() {
    const { dataSource, singleData } = this.state;
    console.log(dataSource);
    return (
      <UsersWrapper>
        <div>
          <Button type="primary" onClick={() => this.handleAdd("new")}>
            Add User
          </Button>
        </div>
        <div
          id="Tbody"
          onScroll={this.onScrollIncList}
          style={{
            height: "100%",
            overflow: "auto",
            marginTop: "10px",
            paddingRight: "15px",
            marginLeft: "20px",
            width: "100%"
          }}
        >
          {dataSource.map((a, i) => (
            <div key={i} className="postClass">
              <div style={{ display: "flex", width: "100%" }}>
                <div className="title">{a.name}</div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ paddingRight: "10px" }}>
                    <span
                      style={{ cursor: "pointer" }}
                      class="fa fa-pencil"
                      onClick={() => this.handleAdd("edit", a)}
                    ></span>
                  </div>
                  <div>
                    <span
                      style={{ cursor: "pointer" }}
                      class="fa fa-trash"
                      onClick={() => this.showDeleteModal(a.id)}
                    ></span>
                  </div>
                </div>
              </div>
              {/* <pre>{JSON.stringify(a,null,2)}</pre> */}
              <div className="body">
                <span>username: </span>
                {a.username}
              </div>
              <div className="body">
                <span>email: </span>
                {a.email}
              </div>
              <div className="body">
                <span>street: </span>
                {a.address.street}
              </div>
              <div className="body">
                <span>suite: </span>
                {a.address.suite}
              </div>
              <div className="body">
                <span>city: </span>
                {a.address.city}
              </div>
            </div>
          ))}
        </div>

        <Modal
          title={this.state.modalType === "new" ? "Add Users" : "Edit Users"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Name</div>
            <input
              style={{ width: "100%" }}
              value={singleData.name ? singleData.name : ""}
              onChange={e => this.setData(e.target.value, "name")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>User Name</div>
            <input
              style={{ width: "100%" }}
              value={singleData.username ? singleData.username : ""}
              onChange={e => this.setData(e.target.value, "username")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Email</div>
            <input
              style={{ width: "100%" }}
              value={singleData.email ? singleData.email : ""}
              onChange={e => this.setData(e.target.value, "email")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Street</div>
            <input
              style={{ width: "100%" }}
              value={
                singleData.address && singleData.address.street
                  ? singleData.address.street
                  : ""
              }
              onChange={e => this.setData(e.target.value, "street", "address")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Suite</div>
            <input
              style={{ width: "100%" }}
              value={
                singleData.address && singleData.address.suite
                  ? singleData.address.suite
                  : ""
              }
              onChange={e => this.setData(e.target.value, "suite", "address")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>City</div>
            <input
              style={{ width: "100%" }}
              value={
                singleData.address && singleData.address.city
                  ? singleData.address.city
                  : ""
              }
              onChange={e => this.setData(e.target.value, "city", "address")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Zipcode</div>
            <input
              style={{ width: "100%" }}
              value={
                singleData.address && singleData.address.zipcode
                  ? singleData.address.zipcode
                  : ""
              }
              onChange={e => this.setData(e.target.value, "zipcode", "address")}
            ></input>
          </div>
        </Modal>

        <Modal
          title=""
          visible={this.state.deleteModal}
          onOk={this.deleteItem}
          onCancel={() => this.setData({ deleteModal: false })}
          okText="Delete"
          cancelText="Cancle"
        >
          <div>Do you really want to remove this?</div>
        </Modal>
      </UsersWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.demoReducer
  }),
  {
    ...demoAction
  }
)(UserWrapper);
