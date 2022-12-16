import React, { useState, useEffect } from "react";
import { 
  Button, 
  Col, 
  Form, 
  Input, 
  Row, 
 } 
from "antd";
import "./todo.css";

export const TODO = () => {
  const [toDo, setToDo] = useState(() => {
    const savedTodos = localStorage.getItem("toDo");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
      localStorage.setItem(newTask);
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task?.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id) {
        return ({ ...task, status: !task.status })
      }
    })
    setToDo(newTask);
  }

  return (
    <div>
      <Form>
    <h2>TO DO LIST</h2>
   
    {updateData && updateData ? (
      <>
    <Row>
      <Col>
        <Input 
          value={ updateData && updateData.title }
          onChange={ (e) => changeTask(e)}
        />
      </Col>
      <Col>
        <Button
          onClick={updateTask}
          className="btn btn-lg btn-success mr-20">
            Update
        </Button>
        <Button
          onClick={cancelUpdate}
          className="btn btn-lg btn-warning">
            Cancel  
        </Button>
      </Col>
    </Row>
    
    </>
    ) : (
      <>
      <Row>
        <Col>
          <Input
            value={newTask}
            onChange={ (e) => setNewTask(e.target.value)}
            
          />
        </Col>
      <Col>
        <Button
          onClick={addTask}
          className="btn btn-lg btn-success">
            Add Task
          </Button>
      </Col>
      </Row>
   
      </>
    )}

    {toDo && toDo
      .sort((a, b) => a.id > b.id ? 1: -1)
      .map( (task,index) => {
        return(
          <React.Fragment key={task.id}>
            <Col>
              <div className={task.status ? 'done' : ''}> 
                <span className="taskNumber"> {index + 1}
                </span>
                <span className="taskText"> {task.title}
                </span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed" 
                  onClick={ (e) => markDone(task.id)}>
          
                </span>

                {task.status ? null : (  
                <span title="Edit" 
                  onClick={ () => setUpdateData({ 
                    id: task.id, 
                    title: task.title,
                    status:task.status ? true : false
                  })} >
          
                </span>
                )}

                <span title="Delete" onClick={() => deleteTask(task.id)}>
              
                </span>
              </div>
            </Col>

        </React.Fragment>
        )
      })
    }
    </Form>
    </div>
  );
}
