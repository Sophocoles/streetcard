import React, { Component } from "react";
import Modal from "./Django/Modal";
import axios from "axios";

//Give values manually
const streetcardItems = [
  {
    id:5,
    name: "cerner",
    client_id: "taken from .env.local",
    scope: "openid profile patient/Patient.read patient/AllergyIntolerance.read patient/Condition.read",
    url: "https://fhir-myrecord.cerner.com/dstu2/ec2458f2-1e24-41c8-b71b-0e701af7583d",
    redirect_uri:"http://localhost:9000/redirect",
    patientId: "",
    patientName: "",
  },
  {
    id:6,
    name: "epic",
    client_id: "taken from .env.local",
    scope: "openid profile patient/Patient.read patient/AllergyIntolerance.read patient/Condition.read",
    url: "https://fhir-myrecord.cerner.com/dstu2/ec2458f2-1e24-41c8-b71b-0e701af7583d",
    redirect_uri:"http://localhost:9000/redirect",
    patientId: "",
    patientName: "",
  }
]

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scList: [],
      modal: false,
      activeItem: {
        name: "",
        client_id: "",
        scope: "",
        url: "",
        redirect_uri: "",
        patientId: "",
        patientName: "",
      },
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/streetcard_fhirs/")
      .then((res) => this.setState({ scList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  
  handleSubmit = (item) => {
    this.toggle();
    item.name = this.state.selectedOption;

    if (item.id) {
      axios
        .put(`http://127.0.0.1:8000/api/streetcard_fhirs/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    alert("Tese" + JSON.stringify(item));
    axios
      .post("http://127.0.0.1:8000/api/streetcard_fhirs/", item)
      .then((res) => this.refreshList());
  };

  renderItems = () => {
    const newItems = this.state.scList;
  
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`sc-name mr-2`}
          title={item.name}
        >
          EHR:&nbsp;
          {item.name}
        </span>
        <div>
          <input
            type="radio"
            name="selectedOption"
            value={item.name}
            checked={this.state.selectedItem === item.id}
            onChange={() => {
              this.setState({
                activeItem: item,
                selectedItem: item.id,
                modal: true,
              });
            }}
          />
        </div>
      </li>
    ));
  };
  

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Inside Display</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
               
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}


      </main>
    );
  }
}

export default Display;
