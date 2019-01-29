import React, { Component } from "react";
import { Route } from "react-router-dom";
import TaskList from './task/TaskList'
import TaskManager from "../modules/TaskManager";
import TaskForm from './task/TaskForm'
import TaskEditForm from './task/TaskEditForm'

import NewsManager from '../modules/NewsManager'
import NewsList from './news/NewsList'
import NewsForm from "./news/NewsForm";
import EventForm from "./events/EventForm";
import EventList from "./events/EventList";
import EventManager from "../modules/EventManager";
import EventEdit from "./events/EventEdit"
export default class ApplicationViews extends Component {
  state = {
    events: [],
    tasks:[],
    newsitems: []
  };

  componentDidMount() {
    EventManager.getAll().then(events => {
      this.setState({
        events: events
      })
    })

    TaskManager.getAll().then(allTasks => {
      this.setState({
        tasks:allTasks
      })
    })

    NewsManager.getAll().then(allNews => {
      this.setState({
        newsitems: allNews
      });
    });
  }




  addEvent = (event) => EventManager.post(event)
    .then(() => EventManager.getAll())
    .then(events => this.setState({
          events: events
      })
    )

    addTask = (task) => TaskManager.postNewTask(task)
    .then(() => TaskManager.getAll())
    .then(task => this.setState({
        tasks: task
      })
    )
    deleteTask = (id) => {
      return TaskManager.deleteTask(id)
      .then(task => this.setState({
        tasks: task
      }))
    }

    editTask = (taskId, existingObj) => {
      return TaskManager.editTask(taskId, existingObj)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({
          tasks:tasks
        })
      })
    }



  updateEvent = (eventId, editedEventObj) => {
    return EventManager.put(eventId, editedEventObj)
    .then(() => EventManager.getAll())
    .then(events => {
      this.setState({
        events: events
      })
    })
  }
  deleteNews = id => {
    return fetch(`http://localhost:5002/newsitems/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/newsitems`))
      .then(response => response.json())
      .then(news =>
        this.setState({
          newsitems: news
        })
      );
  };

  addNews = Newnews =>
  NewsManager.post(Newnews)
      .then(() => NewsManager.getAll())
      .then(news =>
        this.setState({
          newsitems: news
        })
      );

  render() {
    return (
      <React.Fragment>
        <Route exact path="/news" render={(props) => {
          return <NewsList {...props}  
            newsitems={this.state.newsitems}              
            deleteNews={this.deleteNews}/>
        }}/>
         <Route path="/news/new" render={(props) => {
          return <NewsForm {...props}   
          addNews={this.addNews}/>
                }} />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route exact path="/tasks" render={(props) => {
          return <TaskList {...props}
          tasks={this.state.tasks} 
          deleteTask={this.deleteTask} />
      }} />
        <Route 
          path="/tasks/new" render={(props) => {
            return <TaskForm {...props}
              addTask={this.addTask} 
              tasks={this.state.tasks}
              />
              }} />

        <Route exact path='/tasks/:taskId(\d+)/edit' render={(props => {
            return <TaskEditForm {...props} 
            editTask = {this.editTask}/>
          })} />
        
        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        {/*BEGIN EVENT ROUTING*/}
        <Route exact path="/events" render={(props) => {
            return <EventList {...props}
              events={this.state.events} />
          }} />
        {/*addEvent route*/}
        <Route path="/events/new" render={(props) => {
          return <EventForm {...props}
            addEvent={this.addEvent} />
        }} />
        {/*updateEvent route*/}
        <Route path="/events/:eventId(\d+)/edit" render={props => {
          return <EventEdit {...props} updateEvent={this.updateEvent}/>
        }} />
      </React.Fragment>
    )
  }
}
