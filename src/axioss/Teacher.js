import React from 'react'
import {Table,Button,Form} from 'antd'
import {connect} from 'react-redux'

class Teacher extends React.Component {
  constructor(props){
    super(props);
   
  }
  componentWillMount(){
    
  }
  deleteHandler(id){
    
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
        <div>
          {JSON.stringify(this.props)}
        </div>
      </div>
    )
  }
}


// 将store中的state映射到当前组件的props上
let mapStateToProps = (state)=>{
  return state;
}



export default connect(mapStateToProps)(Form.create()(Teacher));