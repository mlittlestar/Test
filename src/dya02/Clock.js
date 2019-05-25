import React from 'react';

class Clock extends React.Component{
    // 重写构造函数时显示调用super
    constructor(props){
        super(props);
        // 初始化state对象
        this.state ={
            now:new Date().toLocaleString()
        }
        // 每隔一秒改变state.now
        setInterval(()=>{
            this.setState({
                now:new Date().toLocaleString()
            })

        },1000);
    }
   render(){
       let {now} = this.state;
    return(
        <div>当前时间:{now}</div>
     ) }
}
export default Clock;
