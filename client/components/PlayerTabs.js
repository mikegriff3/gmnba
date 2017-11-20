import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "./PlayersList";
import TeamStats from "./TeamStats";
import TeamPlayerStats from "./TeamPlayerStats";
import PlayerRatings from "./PlayerRatings";

export default class PlayerTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 4
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
      component = <PlayerRatings leagueStats={this.props.leagueStats} />;

    return (
      <div>
        <div className="card">
          <Nav
            bsStyle="pills"
            justified
            activeKey={this.state.key}
            onSelect={this.handleSelect}
          >
            <NavItem eventKey={1} href="/" className="lakers">
              PROFILE
            </NavItem>
            <NavItem eventKey={2} href="/" className="lakers">
              SEASON
            </NavItem>
            <NavItem eventKey={3} href="/" className="lakers">
              CAREER
            </NavItem>
            <NavItem eventKey={4} href="/" className="lakers">
              RATINGS
            </NavItem>
            <NavItem eventKey={5} href="/" className="lakers">
              PROJECTION
            </NavItem>
            <NavItem eventKey={6} title="Item" className="lakers">
              VIDEOS
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
