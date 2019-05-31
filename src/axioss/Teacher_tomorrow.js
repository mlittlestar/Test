import React from 'react'
import axios from './http/index';
import {Table,Button,message} from 'antd'
import {connect} from 'react-redux'

class Teacher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }
  componentWillMount(){
    axios.get('/student/findAllByType')
    .then((result)=>{
      this.setState({
        list:result.data
      })
    })
  }
  deleteHandler(id){
    axios.get('/student/deleteStudentById',{
      params:{id}
    })
    .then((result)=>{
      if(result){
        message.success(result.statusText)
        
      }
    })
  }

  render(){
    let columns = [{
      title:'老师姓名',
      dataIndex:"username"
    },{
      title:'性别',
      dataIndex:"gender"
    },
    {
        title:'状态',
        dataIndex:"status"
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
      <div className="teacher">
        <h2>教师管理</h2>
        <Table rowKey="id" size="small" columns={columns} dataSource={this.state.list}/>
      </div>
    )
  }
}

export default Teacher;