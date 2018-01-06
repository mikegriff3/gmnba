import React from "react";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import NbaScoutingTabs from "./NbaScoutingTabs";
import axios from "axios";

export default class NbaScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      teams: []
    };
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
  }

  componentDidMount() {
    this.getAllNbaPlayers();
    this.getTeams();
  }

  getAllNbaPlayers() {
    axios
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getLeagueStats")
      .then(data => {
        this.setState({ teams: data.data }, () => {
          console.log(this.state.teams);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid>
        <Row style={{ paddingBottom: "40px" }}>
          <Col lg={12}>
            <div
              style={{ marginTop: "100px", backgroundColor: "white" }}
              className="card"
            >
              <Row>
                <Col lg={12}>
                  <div
                    style={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      fontSize: "22px",
                      color: "#d00000"
                    }}
                  >
                    NBA SCOUTING
                  </div>
                  <hr
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginBottom: "0px"
                    }}
                  />
                  <NbaScoutingTabs
                    players={this.state.playerStats}
                    teams={this.state.teams}
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}