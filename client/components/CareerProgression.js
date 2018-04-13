import React from "react";

export default class CareerProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statOne: "ovr",
      data: []
    };
    this.createChart = this.createChart.bind(this);
    this.getStat = this.getStat.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.getOffense = this.getOffense.bind(this);
    this.getDefense = this.getDefense.bind(this);
  }

  componentDidMount() {
    this.getStat(this.props.statCat);
    //this.createChart();
  }

  componentWillReceiveProps(nextProps) {
    this.getStat(nextProps.statCat);
    //this.createChart();
  }

  getStat(stat) {
    var stats = [];
    if (stat === "Overall") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var ovr = this.getOverall(seasons[i]);
        stats.push(parseFloat(ovr.toFixed(1)));
      }
    } else if (stat === "Offense") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var off = this.getOffense(seasons[i]);
        stats.push(parseFloat(off.toFixed(1)));
      }
    } else if (stat === "Defense") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var def = this.getDefense(seasons[i]);
        stats.push(parseFloat(def.toFixed(1)));
      }
    } else {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var point = parseFloat(seasons[i][stat]);
        stats.push(parseFloat(point.toFixed(2)));
      }
    }
    this.setState({ data: stats }, () => {
      this.createChart();
    });
  }

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  getOverall(player) {
    var scaledPer = this.scaleStat(30.5, parseFloat(player.per), 5.0) * 0.4;
    var scaledBpm = this.scaleStat(10.9, parseFloat(player.bpm), -6.0) * 0.3;
    var scaledWs48 =
      this.scaleStat(0.299, parseFloat(player.wsFourtyEight), -0.03) * 0.1;
    var scaledWs = this.scaleStat(11.2, parseFloat(player.ws), -1.0) * 0.1;
    var scaledVorp = this.scaleStat(5.9, parseFloat(player.vorp), -1.2) * 0.1;
    var weightedOvr =
      scaledPer + scaledBpm + scaledWs48 + scaledWs + scaledVorp;

    return weightedOvr;
  }

  getOffense(player) {
    var scaledObpm = this.scaleStat(10.2, parseFloat(player.obpm), -6.0) * 0.5;
    var scaledOws = this.scaleStat(8.7, parseFloat(player.ows), -2.0) * 0.5;
    var offRating = scaledObpm + scaledOws;
    return offRating;
  }

  getDefense(player) {
    var scaledDbpm = this.scaleStat(5.8, parseFloat(player.dbpm), -4.0) * 0.5;
    var scaledDws = this.scaleStat(4.1, parseFloat(player.dws), 0) * 0.5;
    var defRating = scaledDbpm + scaledDws;
    return defRating;
  }

  createChart() {
    var axisStyle = {
      title: {
        text: `${this.props.statCat}`
      }
    };
    if (
      this.props.statCat === "Overall" ||
      this.props.statCat === "Offense" ||
      this.props.statCat === "Defense"
    ) {
      axisStyle = {
        title: {
          text: `${this.props.statCat}`
        },
        min: 0,
        max: 115,
        tickInterval: 10
      };
    }
    var chart = Highcharts.chart("containerProg", {
      chart: {
        backgroundColor: null
      },
      title: {
        text: "Player Career Progression"
      },

      yAxis: axisStyle,
      xAxis: {
        title: {
          text: "Experience"
        },
        tickInterval: 1
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        enabled: false
      },

      exporting: { enabled: false },

      plotOptions: {
        series: {
          lineWidth: 4,
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      series: [
        {
          name: `${this.props.statCat}`,
          data: this.state.data,
          color: `${this.props.colors.Color_Sec}`
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    });
  }

  render() {
    //console.log("props: ", this.props);
    return (
      <div>
        <div
          className="card"
          id="containerProg"
          style={{
            height: "500px",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
      </div>
    );
  }
}
