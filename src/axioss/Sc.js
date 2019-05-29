import React from 'react'
import axios from './http/index';
import {Table,Button,message} from 'antd'
import {connect} from 'react-redux';

class Sc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scs:[]
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

  render(){
    let {studentState}=this.props;
    console.log("Sc-props",this.props);
    console.log("Sc-props",this.state);
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
        <Table rowKey="id" size="small" columns={columns} dataSource={this.state.scs} bordered="true"/>
      </div>
    )
  }
}

export default connect(state=>state)(Sc);