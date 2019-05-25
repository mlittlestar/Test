import React from 'react';
function MyUl(props){
    //props用于获取父组件在调用当前组件时传递的参数
    // let msg="您好";
    let {data,a}=props;
    return(
        <div className="myul">
            {/* <div>{JSON.stringify(data)}</div> */}
            <ul>
                
                {
                    data.map(function(item){
                        return <li>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                        </li>;
                    })
                    
                }
                <li>{a}</li>
            </ul>
        </div>
    );
}

export default MyUl;