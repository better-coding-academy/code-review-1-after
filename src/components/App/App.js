import _ from "lodash";
import React, { Component } from "react";

import stateMachine, { initialState } from "./_stateMachine";
import "./App.css";
import Button from "./Button";
import Input from "./Input";
import ResultsList from "./ResultsList";

const getSuburbSearchURL = searchTerm => "http://localhost:8010/proxy/suburbs.json?q=" + searchTerm;

export default class App extends Component {
  state = {
    apiData: [],
    screen: initialState,
    suburbInputValue: ""
  };

  getAPIData = _.throttle(async () => {
    if (this.state.suburbInputValue.trim() === "") return;

    try {
      const responseJSON = await fetch(getSuburbSearchURL(this.state.suburbInputValue)).then(response =>
        response.json()
      );

      this.transition({
        apiData: responseJSON.filter(item =>
          item.name.toLowerCase().startsWith(this.state.suburbInputValue.toLowerCase())
        ),
        type: "RESULTS_LOADED"
      });
    } catch (error) {
      console.log(error);
    }
  }, 500);

  // alerts the value of the user input/ user selection
  getButtonText = () => {
    if (this.state.suburbInputValue.trim().length > 0) {
      alert("Your input value was " + this.state.suburbInputValue);
    } else {
      this.transition({ type: "FORM_ERRORED" });
    }
  };

  // Runs when the user updates the input field and sets the input value inside `value`
  handleInputChange = val => {
    if (this.state.screen === "formErrored") this.transition({ type: "ERROR_CLEARED" });
    this.setState(
      {
        suburbInputValue: val
      },
      () => {
        // If the searchbar has value then call getAPIData
        if (this.state.suburbInputValue.trim().length > 0) {
          this.getAPIData();
        } else {
          this.transition({ type: "SEARCH_CLEARED" });
        }
      }
    );
  };

  // Gets the name of suburb based on the button the user clicked
  onSelect = val => {
    this.transition({
      suburbInputValue: val.name,
      type: "RESULT_SELECTED"
    });
  };

  onSwitchScreen = (nextScreen, action) => {
    if (nextScreen === "default") {
      if (action.type === "RESULT_SELECTED") {
        return {
          apiData: [],
          suburbInputValue: action.suburbInputValue
        };
      }
      return { apiData: [] };
    } else if (nextScreen === "resultsLoaded") {
      return { apiData: action.apiData };
    }

    return {};
  };

  transition = action => {
    const nextScreen = stateMachine[this.state.screen][action.type];

    if (!nextScreen) return;

    this.setState({
      screen: nextScreen,
      ...this.onSwitchScreen(nextScreen, action)
    });
  };

  render() {
    return (
      <section>
        <div className="searchBarWrapper" role="search">
          <div className="searchCategory">
            <label htmlFor="suburb">Suburb</label>
          </div>
          <div className="searchBar">
            <Input onChange={this.handleInputChange} value={this.state.suburbInputValue} />
            {this.state.screen === "resultsLoaded" ? (
              <ResultsList items={this.state.apiData} onSelect={this.onSelect} />
            ) : null}

            <Button className="searchButton" onClick={this.getButtonText} />
          </div>
        </div>
        {this.state.screen === "formErrored" && (
          <div className="errorWrapper">
            <p role="alert">Please enter a suburb name</p>
          </div>
        )}
      </section>
    );
  }
}
