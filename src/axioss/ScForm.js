import React from 'react';
import $ from 'jquery';
import {Input,Form,Select} from 'antd';


function handleChange(value) {
  console.log(`selected ${value}`);
}


class ScForm extends React.Component{
    constructor(){
        super();
        this.state={
            courses:[],
            students:[]
        }
    }

    // 网络初始化
  componentWillMount(){
    this.loadCourse();
    this.loadStudent();
  }


    loadCourse(){
        let url = "http://203.195.251.185:8282/course/findAllWithTeacher"
        $.get(url,({status,message,data})=>{
          if(status === 200){
            this.setState({
              courses:data,
            })
          } else {
            alert(message);
          }
        });
      }

      loadStudent(){
        let url = "http://203.195.251.185:8282/student/findAll"
        $.get(url,({status,message,data})=>{
          if(status === 200){
            this.setState({
              students:data,
            })
          } else {
            alert(message);
          }
        });
    }

     //校验
     handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    render(){
        let {courses,students}=this.state;
        const { getFieldDecorator } = this.props.form;

        const Option = Select.Option;

        return(
            <div className="ScForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="课程姓名">
                        {getFieldDecorator('courseId')(
                          <Select defaultValue={courses.courseId} style={{ width: 120 }} onChange={handleChange} placeholder="Select">
                            {courses.map(course => (
                                <Option key={course.id}>{course.name}</Option>
                            ))}
                          </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="学生姓名">
                        {getFieldDecorator('studentId')(
                          <Select defaultValue={students.studentId} style={{ width: 120 }} onChange={handleChange} placeholder="Select">
                            {students.map(student => (
                                <Option key={student.id}>{student.username}</Option>
                            ))}
                          </Select>
                        )}
                    </Form.Item>
                    
                </Form>
            </div>
        )
    }
}


// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
    let obj = {};
    for(let key in props.initData){
      let val = props.initData[key];
      obj[key] = Form.createFormField({value:val})
    }
    return obj;
}


export default Form.create({mapPropsToFields})(ScForm);