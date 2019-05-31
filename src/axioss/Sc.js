import React from 'react'
import axios from './http/index';
import {Table,Button,message,Modal} from 'antd';

import ScForm from './ScForm';

class Sc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scs:[],
      sc:{},
      visible:false
    }
    
  }
  componentWillMount(){
    axios.get('/sc/findAlls')
    .then((result)=>{
      this.setState({
        scs:result.data
      })
    })
  }

  deleteHandler(id){
    alert(id);
    axios.get('/sc/deleteScByxId',{
      params:{id}
    }).then((result)=>{
      console.log(result)
      if(result){
        message.success(result.statusText)

        
      }
    })
  }



  handleOk = e => {
    // 1. 获取表单数据
      e.preventDefault();
      this.form.validateFields((err, values) => {
      if (!err) {
        alert(JSON.stringify(values))
          axios.post('/sc/saveSc ',values)
          .then(({})=>{
          })
          .catch(function (error) {
            console.log(error);
          });
      
  }
  });
      // 2. 与后台交互完成保存或更新
      // 3. 关闭模态框，刷新页面
      // this.setState({ visible: false, });
  };

  // 点击了模态框的取消按钮
  handleCancel = e => {
  this.setState({ visible: false, });
  };



  // 点击添加按钮的执行函数
  toAdd(){
    this.setState({ 
    visible: true, 
    sc:{}
    });
  }

  // ref函数
  scFormRefs = (form)=>{
    this.form = form;
  }


  render(){
    let {}=this.props;
    let columns = [{
      title:'选课ID',
      dataIndex:"id"
    },
      {
      title:'课程姓名',
      dataIndex:"course.name"
    },{
      title:'学生姓名',
      dataIndex:"student.username"
    },{
      title:'性别',
      dataIndex:"student.gender"
    },{
      title:'操作',
      render:(text,record)=>{
        return (
          <div>
            <Button type="link" onClick={this.deleteHandler.bind(this,record.id)}>删除</Button>
          </div>
        )
      } 
    }]

    return (
      <div className="sc">
        <h2>选课管理</h2>
        <div className="btn">
          <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
          <Button type="danger">批量删除</Button>

        </div>

        <Table rowKey="id" size="small" columns={columns} dataSource={this.state.scs} bordered="true"/>

        <Modal
                    title="添加课程"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <ScForm initData={this.state.sc} ref={this.scFormRefs}/>
         </Modal>
      </div>
    )
  }
}

export default Sc;