import React from 'react';
import {List,Input,Form,Button} from 'antd';
import _ from 'lodash';

class Memo extends React.Component{

    constructor(props){
        super(props);
        this.state={
            list:["hello","tom"]
        }
    }

    delHandler(text){
        // 通过dispath分发一个动作，引发对应reducer的执行，进而改变state
       _.remove(this.state.list,function(item){
           return item==text;
       })
       this.setState({
           list:this.state.list
       })
    }

    handleSubmit(event){
        event.preventDefault();
        // 校验表单并且获取数据
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.dispatch(saveMemo(values.content))
                // alert("aaaaaa",values);
                this.setState({
                    list:[...this.state.list,values.content]
                })
            }
        });
    }

    render(){
        let {getFieldDecorator} = this.props.form;
        return (
            <div className="memo">
                <h2>备忘录</h2>

                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item>
                        {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your content!' }],
                        })(
                        <Input placeholder="content" />,
                        )}
                    </Form.Item>
                        
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        保存
                        </Button>
                    </Form.Item>
                </Form>


                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item =>(
                    <List.Item actions={[<a>edit</a>, <a onClick={this.delHandler.bind(this,item)}>del</a>]}>
                        {item}
                        </List.Item>) 
                        }
                    />
            </div>
        )
    }
}


export default Form.create() (Memo);