import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class UpcomingFAListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      team: {}
    };
    this.getPlayer = this.getPlayer.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.calculateStars = this.calculateStars.bind(this);
    this.convertDollars = this.convertDollars.bind(this);
    this.getLogo = this.getLogo.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
  }

  convertDollars(value) {
    if (value === "TBD") return "TBD";
    if (value === "") return "-";
    var dollar;
    var arr = value.split("");
    var symbol = arr[0];
    var nums = arr.slice(1, value.length);
    var str = nums.join("");
    var newStr = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return "$" + newStr;
  }

  getOverallRating() {
    if (this.state.player) {
      var per = parseFloat(this.state.player.per) * 0.4;
      var bpm = parseFloat(this.state.player.bpm) * 0.2;
      var ws48 = parseFloat(this.state.player.wsFourtyEight) * 0.1;
      var ws = parseFloat(this.state.player.ws) * 0.1;
      var vorp = parseFloat(this.state.player.vorp) * 0.25;
      var weightedOvr = per + bpm + ws48 + ws + vorp;
      var stars = this.calculateStars(14.0, 0, weightedOvr);
      if (stars === 5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall">
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  getOffenseRating() {
    if (this.state.player) {
      var obpm = parseFloat(this.state.player.obpm);
      var ows = parseFloat(this.state.player.ows);
      var offRating = obpm + ows;
      var stars = this.calculateStars(13.0, -5.0, offRating);
      if (stars === 5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall" style={{ zIndex: -5 }}>
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  getDefenseRating() {
    if (this.state.player) {
      var dbpm = parseFloat(this.state.player.dbpm);
      var dws = parseFloat(this.state.player.dws);
      var defRating = dbpm + dws;
      var stars = this.calculateStars(6.5, -3.0, defRating);
      if (stars === 5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall" style={{ zIndex: -5 }}>
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  calculateStars(high, low, actual) {
    var gradeScale = (high - low) / 8;
    var fiveStars = high - gradeScale;
    var fourHalfStars = fiveStars - gradeScale;
    var fourStars = fourHalfStars - gradeScale;
    var threeHalfStars = fourStars - gradeScale;
    var threeStars = threeHalfStars - gradeScale;
    var twoHalfStars = threeStars - gradeScale;
    var twoStars = twoHalfStars - gradeScale;
    var oneHalfStars = twoStars - gradeScale;
    var oneStars = oneHalfStars - gradeScale;
    var starRating;
    if (actual >= fiveStars) {
      starRating = 5;
    } else if (actual >= fourHalfStars) {
      starRating = 4.5;
    } else if (actual >= fourStars) {
      starRating = 4;
    } else if (actual >= threeHalfStars) {
      starRating = 3.5;
    } else if (actual >= threeStars) {
      starRating = 3;
    } else if (actual >= twoHalfStars) {
      starRating = 2.5;
    } else if (actual >= twoStars) {
      starRating = 2;
    } else if (actual >= oneHalfStars) {
      starRating = 1.5;
    } else if (actual >= oneStars) {
      starRating = 1;
    } else {
      starRating = 0.5;
    }
    return starRating;
  }

  renderPlayer() {
    // Props = contract / State = Player Info
    if (this.props.player.type === "Unrestricted" && !this.props.unrestricted)
      return null;
    if (this.props.player.type === "Restricted" && !this.props.restricted)
      return null;
    if (this.props.player.type === "Player Option" && !this.props.playerOption)
      return null;
    // if (
    //   !this.props.unrestricted &&
    //   !this.props.restricted &&
    //   !this.props.playerOption
    // ) {
    //   return <div>No Players Selected</div>;
    // }
    if (this.state.player.position === "PG" && !this.props.pg) return null;
    if (this.state.player.position === "SG" && !this.props.sg) return null;
    if (this.state.player.position === "SF" && !this.props.sf) return null;
    if (this.state.player.position === "PF" && !this.props.pf) return null;
    if (this.state.player.position === "C" && !this.props.c) return null;
    if (this.state.player.name) {
      if (this.state.player.team === this.props.player.team) {
        var picture =
          this.state.player.picture ||
          "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
        return (
          <div
            className="card"
            style={{
              backgroundColor: "black",
              height: "140px",
              overflowY: "auto",
              paddingBottom: "5px"
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(105,105,105,0.1)",
                color: "grey"
              }}
            >
              <Row>
                <Col lg={3} md={3}>
                  <div>
                    <img
                      src={picture}
                      style={{
                        maxHeight: "135px",
                        padding: "10px 0px 10px 10px"
                      }}
                    />
                  </div>
                </Col>
                <Col lg={3} md={4}>
                  <div style={{ paddingTop: "15px" }}>
                    <a href={`/player/${this.state.player.id}`}>
                      <div style={{ fontSize: "16px" }}>
                        <span style={{ color: "grey" }}>
                          {this.state.player.name}
                        </span>
                        <span
                          style={{
                            paddingLeft: "3px",
                            fontSize: "10px",
                            color: "grey"
                          }}
                        >
                          {" "}
                          {this.state.player.position}
                        </span>
                      </div>
                    </a>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {this.props.player.type}
                    </div>
                    <div>
                      <span>Height: {this.state.player.height}</span>
                      <span style={{ paddingLeft: "3px" }}>
                        {" "}
                        Weight: {this.state.player.weight}
                      </span>
                    </div>
                    <div>
                      <span>Age: {this.state.player.age}</span>
                      <span style={{ paddingLeft: "3px" }}>
                        {" "}
                        Experience: {this.state.player.experience}
                      </span>
                    </div>
                    <div>
                      Current Salary:{" "}
                      {this.convertDollars(this.props.player.current)}
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={3}>
                  <div style={{ paddingTop: "25px", fontSize: "15.5px" }}>
                    <div style={{ textAlign: "right" }}>
                      Overall: {this.getOverallRating()}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      Offense: {this.getOffenseRating()}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      Defense: {this.getDefenseRating()}
                    </div>
                  </div>
                </Col>
                <Col lg={2} md={2}>
                  {this.renderLogo()}
                </Col>
              </Row>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }

  getPlayer() {
    axios
      .get(`/api/teams/getPlayer/${this.props.player.name}`)
      .then(data => {
        this.setState({ player: data.data }, () => {
          this.getLogo(this.state.player.team);
          //console.log(this.state.positionStats);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLogo(team) {
    if (team != undefined) {
      axios
        .get(`api/teams/getTeamColors/${team}`)
        .then(data => {
          this.setState({ team: data.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  renderLogo() {
    if (JSON.stringify(this.state.team) != "{}") {
      return (
        <div
          style={{ paddingTop: "25px", paddingLeft: "40px", height: "110px" }}
        >
          <a href={`/team/${this.state.team.id}`}>
            <img src={this.state.team.Logo} />
          </a>
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: "25px", paddingLeft: "45px" }}>
          <img
            style={{ height: "60px" }}
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderPlayer()}</div>;
  }
}
