import React from "react";

export default class PlayerPolColAdvOff extends React.Component {
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
    var highAstPct = 43.0;
    var highOrbPct = 14.5;
    var highFg = 0.62;
    var highTovPct = -5.0;
    var highFtr = 0.63;
    var highThreePar = 0.8;
    var highTsPct = 0.65;
    var highUsgPct = 33.0;
    var highObpm = 7.5;
    var highOws = 7.0;

    var astPct = this.getGrade(highAstPct, this.state.player.astPct, 4.0);
    var orbPct = this.getGrade(highOrbPct, this.state.player.orbPct, 0.5);
    var fg = this.getGrade(highFg, this.state.player.efgPct, 0.35);
    var tovPct = this.getGrade(
      highTovPct,
      this.state.player.tovPct * -1,
      -23.0
    );
    var ftr = this.getGrade(highFtr, this.state.player.ftr, 0.08);
    var threePAr = this.getGrade(highThreePar, this.state.player.threePAr, 0);
    var tsPct = this.getGrade(highTsPct, this.state.player.tsPct, 0.42);
    var usgPct = this.getGrade(highUsgPct, this.state.player.usgPct, 10);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -4.5);
    var ows = this.getGrade(highOws, this.state.player.ows, -1.0);
    this.setState(
      {
        astPct: astPct,
        orbPct: orbPct,
        tovPct: tovPct,
        fg: fg,
        ftr: ftr,
        threePAr: threePAr,
        tsPct: tsPct,
        usgPct: usgPct,
        obpm: obpm,
        ows: ows
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
    var chart = Highcharts.chart("container-column-adv-off", {
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`
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
          pointInterval: 36,
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
              y: this.state.astPct.Grade,
              color: this.state.astPct.Color,
              name: "Ast%",
              stat: this.state.player.astPct
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              name: "Tov%",
              stat: this.state.player.tovPct
            },
            {
              y: this.state.orbPct.Grade,
              color: this.state.orbPct.Color,
              name: "Orb%",
              stat: this.state.player.orbPct
            },
            {
              y: this.state.fg.Grade,
              color: this.state.fg.Color,
              name: "eFG%",
              stat: this.state.player.efgPct
            },
            {
              y: this.state.tsPct.Grade,
              color: this.state.tsPct.Color,
              name: "TS%",
              stat: this.state.player.tsPct
            },
            {
              y: this.state.ftr.Grade,
              color: this.state.ftr.Color,
              name: "FTr",
              stat: this.state.player.ftr
            },
            {
              y: this.state.threePAr.Grade,
              color: this.state.threePAr.Color,
              name: "3PAr",
              stat: this.state.player.threePAr
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
            },
            {
              y: this.state.usgPct.Grade,
              color: this.state.usgPct.Color,
              name: "USG%",
              stat: this.state.player.usgPct
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "20px" }}>
        <div
          id="container-column-adv-off"
          style={{ height: "320px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
