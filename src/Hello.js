// 导入React
import React from 'react';
import './Hello.css';
import MyUl from './MyUl';

function Hello(){
	let data=[{
		id:1,
		name:'tom'
	},{
		id:2,
		name:'tony'
	}]
	return(
		<div>
		<h1 className="title">Hello react</h1>
		<p>前端企业级框架</p>
		<MyUl data={data} a="aaa"/>
		<MyUl data={[{id:3,name:'jack'}]} a="aaa"/>
		</div>

	);
}

export default Hello;