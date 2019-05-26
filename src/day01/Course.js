import React from 'react';
import $ from 'jquery';
import {Table,Icon,Button,Modal} from 'antd';
import CourseForm from './CourseForm';


class Course extends React.Component {
  constructor(){
    super();
    this.state = {
      courses:[],
      visible:false,
      course:{}
      
    }
  }

    // 网络初始化
    componentWillMount(){
      this.loadCourses();
    }

  
    loadCourses(){
      $.get("http://203.195.251.185:8282/course/findAllWithTeacher",({status,message,data})=>{
        if(status === 200){
          this.setState({
            courses:data
          })
        } else {
          alert(message);
        }
      });
    }
  
    // 通过id删除
    toDelete =(id)=> {
      Modal.confirm({
      title: '确认删除吗？',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:()=> {
          // 编写代码进行删除
          $.get("http://203.195.251.185:8282/course/deleteCourseById?id="+id,({status,message,data})=>{
              if(status===200){
                  this.loadCourses();
              }
              alert(message);
          })

      },
      onCancel() {
          console.log('Cancel');
      },
      });
  }



  handleOk = e => {
    // 1. 获取表单数据
      e.preventDefault();
      this.form.validateFields((err, values) => {
      if (!err) {
          console.log(values)
          let url ="http://203.195.251.185:8282/course/saveCourse";
          $.post(url,values,({status,message})=>{
          if(status === 200){
              message.success(message)
              this.setState({ visible: false, });
              // 页面刷新
              this.loadCourses();
      } else {
              message.error(message);
      }
    })
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
      course:{}
      });
  }


  // ref函数
  studentFormRefs = (form)=>{
    this.form = form;
  }

  render(){
    let {courses} = this.state;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState(selectedRowKeys,selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const columns=[
      {
          title: 'ID',
          dataIndex: 'id',
          render: text => <a href="javascript:;">{text}</a>
      },
      {
          title: '姓名',
          dataIndex: 'name',
      },
      {
          title: '学分',
          dataIndex: 'credit',
      },
      {
          title: '老师姓名',
          dataIndex: 'teacher.username',
      },
      {
          title: '老师性别',
          dataIndex: 'teacher.gender',
      },
      {
          title: '操作',
          width:100,
          align:'center',
          render: (val,record) =>{
              return(
                  <div>
                      <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                      <Icon type="edit"/>&nbsp;
                      <Icon type="eye" />
                  </div>
              )
          }
      }
      
  ]
    return (
      <div className="course">
        {/* 按钮 */}
        <Button type='primary' onClick={this.toAdd.bind(this)}>添加</Button>&nbsp;
        <Button type='danger'>批量删除</Button>
         {/* 表格 */}
         <Table rowSelection={rowSelection} columns={columns} dataSource={courses} bordered="true"/>
         {/* 模态框 */}
         <Modal
                    title="添加课程"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <CourseForm initData={this.state.course} ref={this.studentFormRefs}/>
                </Modal>
      </div>
    ) 
  }
}

export default Course;