//学生管理页面
import React from 'react';
import Clock from "./Clock";
import $ from 'jquery';
import './Student.css';

class Student extends React.Component{

    constructor(props){
        super(props);
        this.state={
            stus:[],
            form:{
                username:"",
                gender:""
            }
        }
    }

    componentWillMount(){
        this.loadStudent();
    }

    

    updStudentById(id){
        $.get("http://203.195.251.185:8282/student/findStudentById?id="+id,({status,message,data})=>{
      if(status === 200){
        // 将查询数据设置到state中
        this.setState({ form:data })
      } else {alert (message)}
    })
    }

    updateForm = (event)=>{
        // 1. 获取表单数据
        alert(JSON.stringify(this.state.form));
        // 2. 调用后台代码完成保存
        let url = "http://203.195.251.185:8282/student/updateStudent"
        $.get(url,this.state.form,({status,message})=>{
          alert(message);
          this.loadStudent();
        })
            event.preventDefault();
        }

    //当用户操作表单项改变表单项内容的时候激发，获取表单项内容，改变到state中
    ChangeHandler=(event)=>{
        let tagName=event.target.name;
        let tagVal=event.target.value;
        this.setState({
            form:{...this.state.form,...{[tagName]:tagVal}}

        })
        
    }

    deleteStudentHandler(id){
        
        this.updStudentById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadStudent();
            }else{
                alert(message);
            }

        })
    }

    //ajax操作，删除
    delStudentById(id,handler){
        let url="http://203.195.251.185:8282/student/deleteStudentById?id="+id;
        $.get(url,function(result){
            handler(result);    
        })
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


    // 提交
  submitForm = (event)=>{
    // 1. 获取表单数据
    alert(JSON.stringify(this.state.form));
    // 2. 调用后台代码完成保存
    let url = "http://203.195.251.185:8282/student/saveStudent"
    $.post(url,this.state.form,({status,message})=>{
      alert(message);
      this.loadStudent();
    })
        event.preventDefault();
    }

    render(){
        let name="学生管理页面";
        let {stus,form}=this.state;
        return(
            <div className="student">
                <h2>{name}</h2>
                <h3>学生管理</h3>
                <Clock/>
                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    姓名 
                    <input type='text' name="username" value={form.username}
                    onChange={this.ChangeHandler}/>
                    性别 
                    <input type='text' name="gender" value={form.gender}
                    onChange={this.ChangeHandler}/>

                    <input type="submit" value="提交"/>
                </form>

                <form onSubmit={this.updateForm}>
                    姓名 
                    <input type='text' name="username" value={form.username}
                    onChange={this.ChangeHandler}/>
                    性别 
                    <input type='text' name="gender" value={form.gender}
                    onChange={this.ChangeHandler}/>

                    <input type="submit" value="修改"/>
                </form>
                <table className='tbl'>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            stus.map((item,index)=>{
                                return (
                                <tr key={item.id}>
                                    <td><input type='checkbox'/></td>
                                    <td>{item.username}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                        <span onClick={this.updStudentById.bind(this,item.id)}>更新</span>
                                        <span onClick={this.deleteStudentHandler.bind(this,item.id)}>删除</span>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Student;