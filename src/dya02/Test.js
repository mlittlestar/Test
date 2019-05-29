import React from 'react';
import './Test.css';


import Student from './Student';
import Life from './Life';
import Render from './Render';
import Course from '../day01/Course';
import Sc from '../axioss/Sc';
import Teacher from '../axioss/Teacher';
import Memo from '../day03/Memo';

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';

function Test(){
    

    return(
    <div className="Test">
      <header className='header'>
        <h1>学生选课系统</h1>
      </header>
      <article className="content">
        <BrowserRouter>
            <ul className="nav">
            <li><Link to='/student'>学生管理</Link></li>
            <li><Link to='/course'>课程管理</Link></li>
            <li><Link to='/sc'>选课管理</Link></li>
            <li><Link to='/teacher'>教师管理</Link></li>
            <li><Link to='/memo'>备忘录</Link></li>
            </ul>

            <div className="content-right">
            <Switch>
                <Route path='/student' component={Student}/>
                <Route path='/course' component={Course}/>
                <Route path='/sc' component={Sc}/>
                <Route path='/teacher' component={Teacher}/>
                <Route path='/memo' component={Memo}/>
            </Switch>
            </div>
        </BrowserRouter>
      </article>
    </div>
        
    );
}




export default Test;