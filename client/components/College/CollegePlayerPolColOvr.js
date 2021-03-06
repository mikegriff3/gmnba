import React from "react";

export default class CollegePlayerPolColOvr extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState({ player: this.props.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.player.name) {
    //   this.setState({ player: nextProps.player }, () => {
    //     this.calculateGrades();
    //     //this.createChart();
    //   });
    // }
  }

  calculateGrades() {
    var highPer = 29.0;
    var highWs = 5.5;
    var highWsFourtyEight = 0.27;
    var highDbpm = 9.5;
    var highDws = 2.5;
    var highBpm = 13.0;
    var highOws = 4.0;
    var highObpm = 9.0;

    var per = this.getGrade(highPer, this.state.player.per, 5.0);
    var ws = this.getGrade(highWs, this.state.player.ws, 0);
    var wsFourtyEight = this.getGrade(
      highWsFourtyEight,
      this.state.player.wsFourtyEight,
      0.04
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -1.0);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var bpm = this.getGrade(highBpm, this.state.player.bpm, -2.0);
    var ows = this.getGrade(highOws, this.state.player.ows, 0);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -3.0);
    this.setState(
      {
        per: per,
        ws: ws,
        wsFourtyEight: wsFourtyEight,
        bpm: bpm,
        ows: ows,
        dws: dws,
        obpm: obpm,
        dbpm: dbpm
      },
      () => {
        this.createChart();
      }
    );
  }

  getGrade(high, actual, min) {
    var playerGrade = {};
    var gradeSlots = 13;
    var adjusted = high - min;
    var gradeScale = adjusted / gradeSlots;

    var eighty = high - gradeScale;
    var sevenFive = eighty - gradeScale;
    var seventy = sevenFive - gradeScale;
    var sixFive = seventy - gradeScale;
    var sixty = sixFive - gradeScale;
    var fiveFive = sixty - gradeScale;
    var fifty = fiveFive - gradeScale;
    var fourFive = fifty - gradeScale;
    var fourty = fourFive - gradeScale;
    var threeFive = fourty - gradeScale;
    var thirty = threeFive - gradeScale;
    var twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade["Grade"] = 80;
      playerGrade["Color"] = "#1abded";
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
      playerGrade["Color"] = "#00a3c4";
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
      playerGrade["Color"] = "#00c7a2";
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
      playerGrade["Color"] = "#56ce00";
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
      playerGrade["Color"] = "#b4d800";
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
      playerGrade["Color"] = "#b3d800";
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
      playerGrade["Color"] = "#ffdc00";
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
      playerGrade["Color"] = "#fac600";
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
      playerGrade["Color"] = "#f0780d";
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
      playerGrade["Color"] = "#f53300";
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
      playerGrade["Color"] = "#da000b";
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
      playerGrade["Color"] = "#da000c";
    } else {
      playerGrade["Grade"] = 20;
      playerGrade["Color"] = "#b8000b";
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-column-ovr", {
      chart: {
        polar: true,
        type: "column",
        backgroundColor: null
      },

      title: {
        text: null
      },

      exporting: {
        enabled: false
      },

      pane: {
        startAngle: 0,
        endAngle: 360
      },

      xAxis: {
        min: 0,
        max: 360,
        tickInterval: 45,
        labels: {
          enabled: false
        },
        gridLineColor: "grey"
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 32: {point.per32}</span>`
      },

      yAxis: {
        min: 0,
        max: 60,
        labels: {
          enabled: false
        },
        gridLineColor: "grey"
      },

      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 40,
          dataLabels: {
            useHTML: true,
            enabled: true,
            format:
              '<span class="wheel-label" style="color: grey">{point.name}</span>',
            style: {
              fontSize: "12px"
            }
          }
        },
        column: {
          pointPadding: 0,
          groupPadding: 0,
          events: {
            legendItemClick: function() {
              return false;
            }
          },
          borderWidth: 2
        }
      },

      legend: {
        enabled: false
      },

      series: [
        {
          name: "Rating",
          data: [
            {
              y: this.state.per.Grade,
              color: this.state.per.Color,
              name: "PER",
              stat: this.state.player.per
            },
            {
              y: this.state.ws.Grade,
              color: this.state.ws.Color,
              name: "WS",
              stat: this.state.player.ws
            },
            {
              y: this.state.wsFourtyEight.Grade,
              color: this.state.wsFourtyEight.Color,
              name: "WS/48",
              stat: this.state.player.wsFourtyEight
            },
            {
              y: this.state.bpm.Grade,
              color: this.state.bpm.Color,
              name: "BPM",
              stat: this.state.player.bpm
            },
            {
              y: this.state.dws.Grade,
              color: this.state.dws.Color,
              name: "DWS",
              stat: this.state.player.dws
            },
            {
              y: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              name: "DBPM",
              stat: this.state.player.dbpm
            },
            {
              y: this.state.obpm.Grade,
              color: this.state.obpm.Color,
              name: "OBPM",
              stat: this.state.player.obpm
            },
            {
              y: this.state.ows.Grade,
              color: this.state.ows.Color,
              name: "OWS",
              stat: this.state.player.ows
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div className="card" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div
          id="container-column-ovr"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
