import React from 'react';
import $ from 'jquery';
import {Input,Form,Select} from 'antd';

function handleChange(value) {
  console.log(`selected ${value}`);
}


class CourseForm extends React.Component{
    constructor(){
        super();
        this.state={
            teachers:[],
            // id:[]
        }
    }

    // 网络初始化
  componentWillMount(){
    this.loadTeachers();
  }


    loadTeachers(){
        let url = "http://203.195.251.185:8282/student/findAllByType"
        $.get(url,({status,message,data})=>{
          if(status === 200){
            this.setState({
              teachers:data,
            })
          } else {
            alert(message);
          }
        });
      }

      // handleChange=e=>{
      //   e.preventDefault();
      //   this.setState({id})
      // }

     //校验
     handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    // handleChange=value=> {
    //   this.setState({
    //     teachers:value
    //   })
    // }


    render(){
        let {teachers}=this.state;
        const { getFieldDecorator } = this.props.form;

        const Option = Select.Option;

        return(
            <div className="courseform">
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="课程编号">
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'Please input your id!' }],
                        })(
                            <Input placeholder="id"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="课程姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input placeholder="name"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="学分">
                        {getFieldDecorator('credit', {
                            rules: [{ required: true, message: 'Please input your credit!' }],
                        })(
                            <Input placeholder="credit"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="老师">
                        {getFieldDecorator('teacherId')(
                          <Select defaultValue={teachers.teacherId} style={{ width: 120 }} onChange={handleChange} placeholder="Select">
                            {teachers.map(teacher => (
                                <Option key={teacher.id}>{teacher.username}</Option>
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


export default Form.create({mapPropsToFields})(CourseForm);