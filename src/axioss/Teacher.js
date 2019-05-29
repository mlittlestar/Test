import React from 'react';
import {} from 'antd';
import {connect} from 'react-redux';

class Teacher extends React.Component{


    render(){
        let {studentState}=this.props;
        console.log("teacher-props",this.props);
        return(
            <div className="teacher">
                <h2>老师管理</h2>
            </div>
        )
    }
}



export default connect(state=>state)(Teacher);