import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import CollegeLeaders from "./CollegeLeaders";
import CPlayerComparison from "./CPlayerComparison";
import CTeamComparison from "./CTeamComparison";
import PlayerFinder from "../NBAscouting/PlayerFinder";

export default class CollegeScoutingTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 3
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    console.log(this.props.teams);
    let component;
    if (this.state.key === 1)
      component = <CollegeLeaders players={this.props.players} />;
    if (this.state.key === 2)
      component = <CPlayerComparison players={this.props.players} />;
    if (this.state.key === 3)
      component = <CTeamComparison teams={this.props.teams} />;
    if (this.state.key === 4)
      component = <PlayerFinder players={this.props.players} />;
    return (
      <div>
        <div className="card">
          <Nav
            bsStyle="pills"
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            justified
          >
            <NavItem eventKey={1} href="/">
              <span className="tab-text">COLLEGE LEADERS</span>
            </NavItem>
            <NavItem eventKey={2} href="/">
              <span className="tab-text">PLAYER COMPARISON</span>
            </NavItem>
            <NavItem eventKey={3} href="/">
              <span className="tab-text">TEAM COMPARISON</span>
            </NavItem>
            <NavItem eventKey={4} href="/">
              <span className="tab-text">PLAYER FINDER</span>
            </NavItem>
            <NavItem eventKey={5} title="Item">
              <span className="tab-text">STATS</span>
            </NavItem>
            <NavItem eventKey={6} title="Item">
              <span className="tab-text">RANKINGS</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}