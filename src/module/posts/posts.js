import React, { Component } from "react";
import { connect } from "react-redux";
import demoAction from "../../core/demo_redux/demoAction";
import { Modal, Button} from "antd";
import { PostWrapper } from "./postsWrapper";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class PostsWapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      dataSource: [],
      singleData:{},
      modalType:'new',
      visible:false,
      deleteModal:false,
      deleteToken:""
    };
  }

  componentDidMount() {
    this.props.getPostAction();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    switch (nextProps.demoAction.type) {
      case "GET_POST_SUCCESS":
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
        id: dataSource[dataSource.length - 1].id + 1
      });
      this.setState({ dataSource });
    } else {
      let a = dataSource.findIndex(e => e.id === this.state.singleData.id);      
      if (a !== -1) {
        dataSource.splice(a, 1, this.state.singleData);
        this.setState({ dataSource });
      }
    }
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false, singleData:{} });
  };

  handleAdd = (type, data) => {
    this.setState({ visible: true });
    this.setState({ modalType: type });
    if (type === "edit") {
      this.setState({ singleData: data });
    }
  };

  setData = (e, type) => {
    const singleData = { ...this.state.singleData };
    singleData[type] = e;
    this.setState({ singleData });
    // }
  };

  showDeleteModal = token => {
    this.setState({ deleteToken: token, deleteModal: true });
  };

  deleteItem = () => {
    const dataSource = [...this.state.dataSource];
    let a = dataSource.findIndex(r => r.id === this.state.deleteToken);
    dataSource.splice(a, 1);
    this.setState({ dataSource, deleteModal: false,deleteToken:"" });
  };

  render() {
    const { dataSource,singleData } = this.state;
    return (
      <PostWrapper>
          <div><Button type="primary" onClick={()=>this.handleAdd("new")}>Add Post</Button></div>
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
            <div
              key={i}
              className="postClass"
            >
              <div style={{ display: "flex"}}>
                <div className="title">{a.title}</div>
                <div style={{ display: "flex", justifyContent:"flex-end"  }}>    
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

              <div className="body">{a.body}</div>
            </div>
          ))}
        </div>

        <Modal
          title={
            this.state.modalType === "new" ? "Add posts" : "Edit Posts"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>User Title</div>    
            <input
              style={{ width: "100%" }}
              value={singleData.title ? singleData.title : ""}
              onChange={e => this.setData(e.target.value, "title")}
            ></input>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#000" }}>Details</div>       
            <textarea
              style={{ width: "100%" }}
              value={singleData.body ? singleData.body : ""}
              onChange={e => this.setData(e.target.value, "body")}
            ></textarea>
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
      </PostWrapper>
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
)(PostsWapper);