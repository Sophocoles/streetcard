import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>SC Item</ModalHeader>
        <ModalBody>
          <Form>


            <FormGroup>
              <Label for="sc-name">Name</Label>
              <Input
                type="text"
                id="sc-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter SC Name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-client_id">client_id</Label>
              <Input
                type="text"
                id="sc-client_id"
                name="client_id"
                value={this.state.activeItem.client_id}
                onChange={this.handleChange}
                placeholder="Enter SC client_id"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-scope">Scope</Label>
              <Input
                type="text"
                id="sc-scope"
                name="scope"
                value={this.state.activeItem.scope}
                onChange={this.handleChange}
                placeholder="Enter SC Scope"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-url">url</Label>
              <Input
                type="url"
                id="sc-url"
                name="url"
                value={this.state.activeItem.url}
                onChange={this.handleChange}
                placeholder="Enter sc url"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-redirect_uri">redirect_uri</Label>
              <Input
                type="text"
                id="sc-redirect_uri"
                name="redirect_uri"
                value={this.state.activeItem.redirect_uri}
                onChange={this.handleChange}
                placeholder="Enter SC redirect_uri"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-patientId">patientId</Label>
              <Input
                type="text"
                id="sc-patientId"
                name="patientId"
                value={this.state.activeItem.patientId}
                onChange={this.handleChange}
                placeholder="Enter SC patientId"
              />
            </FormGroup>

            <FormGroup>
              <Label for="sc-patientName">patientName</Label>
              <Input
                type="text"
                id="sc-patientName"
                name="patientName"
                value={this.state.activeItem.patientName}
                onChange={this.handleChange}
                placeholder="Enter sc patientName"
              />
            </FormGroup>


          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
