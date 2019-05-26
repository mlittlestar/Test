//学生管理页面
import React from 'react';
import $ from 'jquery';
import './Student.css';
import {Table, Button,Icon,Modal,message} from 'antd';
import StudentForm from './StudentForm';

// 当服务端异常的时候都会执行该回调
$.ajaxSetup({
    error:function(){
      message.error("服务器端异常")
    }
  })

class Student extends React.Component{

    constructor(props){
        super(props);
        this.state={
            stus:[],
            visible:false,
            student:{},
            ids:[]
            
        }
    }

    componentWillMount(){
        this.loadStudent();
    }


    //ajax操作，加载学生信息
    loadStudent(){
        //查询所有学生信息，将学生信息保存到state
        let url="http://203.195.251.185:8282/student/findAll";
        $.get(url,({status,data})=>{
            if(status==200){
                this.setState({
                    stus:data
                })
            }else{
                alert('接口异常');
            }
        });
    }


    // 批量删除
    batchDelete(){
        Modal.confirm({
        title: '确认删除吗？',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:()=> {
            // 编写代码进行删除
            let url = "http://203.195.251.185:8282/student/batchDelete";
            $.ajax({
            url,
            method:"POST",
            data:JSON.stringify(this.state.ids),
            contentType:"application/json",
            success:({status,message:msg})=>{
                if(status === 200){
                message.success(msg);
                this.loadStudent();
                } else {
                message.error(msg)
                }
            }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
        });

    }


    //通过id删除
    toDelete=(id)=>{
        Modal.confirm({
            title: '是否要删除',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=> {
                //进行删除
                $.get("http://203.195.251.185:8282/student/deleteStudentById?id="+id,({status,message})=>{
                    if(status===200){
                        this.loadStudent();
                    }else{
                        alert(message);
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }


    // 点击添加按钮的执行函数
    toAdd(){
        this.setState({ 
        visible: true, 
        student:{}
        });
    }

    // 点击修改按钮的执行函数
    toUpdate(record){
        this.setState({ 
        visible: true, 
        student:record
        });
    }

    //模态框的确认
    handleOk = e => {
        // 1. 获取表单数据
           e.preventDefault();
           this.form.validateFields((err, values) => {
           if (!err) {
               console.log(values)
               let url ="http://203.195.251.185:8282/student/saveStudent";
               $.post(url,values,({status,message})=>{
               if(status === 200){
                   message.success(message)
                   this.setState({ visible: false, });
                   // 页面刷新
                   this.loadStudent();
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
    //处理模态框的取消
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };


    // ref函数
    studentFormRefs = (form)=>{
        this.form = form;
    }
  

    render(){
        let {stus}=this.state;

        // ID前面有框
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ids:selectedRowKeys})
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
        };


        const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
              render: text => <a href="javascript:;">{text}</a>,
            },
            {
              title: '姓名',
              dataIndex: 'username',
            },
            {
              title: '性别',
              dataIndex: 'gender',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                            <Icon type="edit" onClick={this.toUpdate.bind(this,record)}/>&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
          ];

        return(
            <div className="student">
                {/* 按钮 */}
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>&nbsp;
                    <Button type='danger' onClick={this.batchDelete.bind(this)}>批量删除</Button>
                </div>
                {/* 表格 ,bordered代表有竖线*/}
                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={this.state.stus} bordered='true'/>

                {/* 弹出框 */}
                <Modal
                    title="添加学生"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <StudentForm initData={this.state.student} ref={this.studentFormRefs}/>   
                </Modal>
            </div>
        )
    }
}


export default Student;