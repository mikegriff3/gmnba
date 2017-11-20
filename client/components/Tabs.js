import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "./PlayersList";
import TeamStats from "./TeamStats";
import TeamPlayerStats from "./TeamPlayerStats";
import TeamLeagueRanks from "./TeamLeagueRanks";

export default class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    let component;
    if (this.state.key === 1)
      component = <PlayersList players={this.props.players} />;
    if (this.state.key === 2)
      component = <TeamStats teamStats={this.props.teamStats} />;
    if (this.state.key === 3) component = <TeamPlayerStats />;
    if (this.state.key === 4)
      component = <TeamLeagueRanks leagueStats={this.props.leagueStats} />;

    return (
      <div>
        <div className="card">
          <Nav
            bsStyle="pills"
            justified
            activeKey={this.state.key}
            onSelect={this.handleSelect}
          >
            <NavItem eventKey={1} href="/">
              PROFILE
            </NavItem>
            <NavItem eventKey={2} href="/">
              SEASON
            </NavItem>
            <NavItem eventKey={3} href="/">
              PLAYERS
            </NavItem>
            <NavItem eventKey={4} href="/">
              RANKINGS
            </NavItem>
            <NavItem eventKey={5} title="Item">
              LINEUP
            </NavItem>
            <NavItem eventKey={6} title="Item">
              SCHEDULE
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
