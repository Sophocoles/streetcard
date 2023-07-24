import React from "react";

export default class SelectClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch("/api/clients/")  // replace with your Django endpoint
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          clients: data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  renderOptions() {
    return this.state.clients.map((client, index) => (
      <option key={client.id} value={client.id}>
        {client.name}
      </option>
    ));
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else {
      return (
        <div>
          <span>Use the Selector to select a provider</span> :{" "}
          <select
            defaultValue="none"
            onChange={(event) => {
              this.props.onChangeProvider(event, this.context);
            }}
          >
            <option key="none" value="none" disabled hidden>
              Select a Provider
            </option>
            {this.renderOptions()}
          </select>
        </div>
      );
    }
  }
}
