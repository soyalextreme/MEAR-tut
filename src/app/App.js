import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      _id: "",
      tasks: [],
      btn: "add",
      btnColor: "btn teal lighten-3"
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    //In case that id already exist in the state
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Updated" });
          this.fetchTask();
          this.setState({
            title: "",
            description: "",
            btn: "ADD",
            btnColor: "btn teal lighten-3"
          });
        });
    }
    //in case that is the first time the id is created
    else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Saved" });
          this.setState({ title: "", description: "" });
          this.fetchTask();
        })
        .catch((err) => console.error(err));
    }

    e.preventDefault();
  }

  fetchTask() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  componentDidMount() {
    this.fetchTask();
  }

  deleteTask(id) {
    if (confirm("Sure you want to delete it?")) {
      this.setState({
        title: "",
        description: "",
        btn: "add",
        btnColor: "btn teal lighten-3"
      });
      console.log("deleting", id);
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Delete" });
          this.fetchTask();
        });
    }
  }

  editTask(id) {
    if (confirm("Sure you wanna edit?")) {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({
            title: data.title,
            description: data.description,
            _id: data._id,
            btn: "Update",
            btnColor: "btn blue lighten-3"
          });
        });
    }
  }

  handleChange(e) {
    //desde el input
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        {/*Navegation*/}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              {" "}
              MEARN STACK
            </a>
          </div>
        </nav>
        {/*Navegation*/}
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          className="materialize-textarea"
                          placeholder="Task Description"
                          value={this.state.description}
                        ></textarea>
                      </div>
                      <button type="submit" className={this.state.btnColor}>
                        {this.state.btn}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn red"
                            style={{ margin: 5 }}
                            onDoubleClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button className="btn light-blue">
                            <i
                              className="material-icons"
                              onClick={() => this.editTask(task._id)}
                            >
                              edit
                            </i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
