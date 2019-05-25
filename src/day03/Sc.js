import React from 'react';
import $ from 'jquery';

class Sc extends React.Component {

    constructor(){
        super();
        this.state={
          taechers:[],
            scs:[],
            form:{
              name:"",
              credit:"",
              description:"",
              teacherId:""
            }
        }
    }

    //网络初始化
    componentWillMount(){
        this.loadSc();
        // this.loadTeachers();
    }


    //渲染Sc列表
    loadSc(){
        let url = "http://203.195.251.185:8282/sc/findAlls"
        $.get(url,({status,message,data})=>{
        if(status === 200){
            this.setState({
            scs:data
            })
        } else {
            alert(message);
        }
        });
    }

    //老师初始化
    loadTeachers(){
      let url = "http://203.195.251.185:8282/course/findAllWithTeacher"
      $.get(url,({status,message,data})=>{
        if(status === 200){
          this.setState({
            taechers:data,
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

  render(){
    let {scs,form,taechers} = this.state;
    return (
      <div className="sc">
        <h2>选课管理</h2>

        {/* 表单 */}
        JSON.stringify(form)}
        <form>  
        课程名称
        <input type="text" name="name" value={form.name}/>
         课程学分
        <input type="text" name="credit" value={form.grade}/>
         课程简介
        <textarea name="description" value={form.courseId}></textarea>
         任课老师
        <select name="teacherId" value={form.teacherId}>
            {
              taechers.map((item)=>{
                return <option key={item.id} value={item.id}>{item.username}</option>
              })
            }
          </select>
          <input type="submit" value="提交"/>

        </form>


        {/* 选课列表 */}
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
              scs.map((item)=>{
                return (
                  <tr key={item.id}>
                    <td><input type='checkbox'/></td>
                    <td>{item.course.name}</td>
                    <td>{item.course.credit}</td>
                    <td>{item.course.description}</td>
                    <td>{item.course.teacherId}</td>
                    <td>
                      <span>删除</span>
                      <span>修改</span>
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

export default Sc;
