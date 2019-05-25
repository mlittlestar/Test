import React from 'react';
import $ from 'jquery';

class Course extends React.Component {
  constructor(){
    super();
    this.state = {
      teachers:[],
      courses:[],
      form:{
        id:"",
        name:"",
        credit:"",
        description:"",
        teacherId:""
      }
    }
  }

  // 网络初始化
  componentWillMount(){
    this.loadTeachers();
    this.loadCourses();
  }


  updCourseById(id){
    $.get("http://203.195.251.185:8282/course/findCourseById?id="+id,({status,message,data})=>{
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
  let url = "http://203.195.251.185:8282/course/updateCourse"
  $.get(url,this.state.form,({status,message})=>{
    alert(message);
    this.loadCourses();
  })
      event.preventDefault();
  }


  loadTeachers(){
    let url = "http://203.195.251.185:8282/student/findAllByType"
    $.get(url,({status,message,data})=>{
      if(status === 200){
        this.setState({
          teachers:data,
          form:{
            ...this.state.form,
            ...{teacherId:data[0].id}
          }
        })
      } else {
        alert(message);
      }
    });
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
  


  deleteStudentHandler(id){
        
    this.delStudentById(id,({status,message})=>{
        if(status===200){
            alert(message);
            this.loadCourses();
        }else{
            alert(message);
        }

    })
}


delStudentById(id,handler){
    let url="http://203.195.251.185:8282/course/deleteCourseById?id="+id;
    $.get(url,function(result){
        handler(result);    
    })
}


  // 将input上的状态映射到组件state中
  changeHandler = (event)=>{
    let name = event.target.name;// name/description/credit
    let val = event.target.value;
    this.setState({
      form:{...this.state.form,...{[name]:val}}
    })
  }



  // 提交
  submitForm = (event)=>{
    // 1. 获取表单数据
    alert(JSON.stringify(this.state.form));
    // 2. 调用后台代码完成保存
    let url = "http://203.195.251.185:8282/course/saveCourse"
    $.post(url,this.state.form,({status,message})=>{
      alert(message);
    //   this.loadCourses();
    })

    event.preventDefault();
  }

  render(){
    let {teachers,courses, form} = this.state;

    return (
      <div className="course">
        <h2>课程管理</h2>
        {/* 表单 */}
        {JSON.stringify(form)}
        <form onSubmit={this.submitForm}>
         课程编号
        <input type="text" name="id" value={form.id} onChange={this.changeHandler}/>
         课程名称
        <input type="text" name="name" value={form.name} onChange={this.changeHandler}/>
         课程学分
        <input type="text" name="credit" value={form.credit} onChange={this.changeHandler}/>
         课程简介
        <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea>
         任课老师
        <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}>
            {
              teachers.map((item)=>{
                return <option key={item.id} value={item.id}>{item.username}</option>
              })
            }
          </select>
          <input type="submit" value="提交"/>
        </form>

        {JSON.stringify(form)}
        <form onSubmit={this.updateForm}>
         课程名称
        <input type="text" name="name" value={form.name} onChange={this.changeHandler}/>
         课程学分
        <input type="text" name="credit" value={form.credit} onChange={this.changeHandler}/>
         课程简介
        <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea>
         任课老师
        <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}>
            {
              teachers.map((item)=>{
                return <option key={item.id} value={item.id}>{item.username}</option>
              })
            }
          </select>
          <input type="submit" value="更新"/>
        </form>
        
        {/* 课程列表 */}
        <table className='tbl'>
          <thead>
            <tr>
              <th>编号</th>
              <th>课程名称</th>
              <th>课程学分</th>
              <th>简介</th>
              <th>任课老师</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((item)=>{
                return (
                  <tr key={item.id}>
                    <td><input type='checkbox'/></td>
                    <td>{item.name}</td>
                    <td>{item.credit}</td>
                    <td>{item.description}</td>
                    <td>{item.teacher.username}</td>
                    <td>
                      <span onClick={this.deleteStudentHandler.bind(this,item.id)}>删除</span>
                      <span onClick={this.updCourseById.bind(this,item.id)}>修改</span>
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

export default Course;