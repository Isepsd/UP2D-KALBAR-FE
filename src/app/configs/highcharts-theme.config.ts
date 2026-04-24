export const HighchartTheme: any = (theme: string) => {
  let is_dark = theme == 'dark'

  let labels_color = is_dark ? '#fff' : '#636363'
  let labels_border_color = is_dark ? '#1a1a20' : '#f9f9f9'
  let legend_color = is_dark ? '#E0E0E3' : '#636363'
  let grid_color = is_dark ? '#222' : '#f3f3f3'
  let crosshair_color = is_dark ? '#1a1a20' : '#f9f9f9'
  let tooltip_background = is_dark ? 'rgba(0, 0, 0, 0.85)' : '#fbfbfb'
  let tooltip_color = is_dark ? 'white' : '#636363'

  let legend_border_color = is_dark ? '#313131' : '#f3f3f3'
  let legend_navigation_active = is_dark ? '#cccccc' : '#f3f3f3'
  let legend_navigation_inactive = is_dark ? '#737373' : '#f3f3f3'

  const _chart_theme = {
    //Używane kolory wykresów
    colors: [
      '#2D99DC',
      '#35BDA8',
      '#86B34D',
      '#7798BF',
      '#E66C40',
      '#CB3E4B',
      '#5C5C5C',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ],
    chart: {
      //    backgroundColor: {
      //       linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
      //       stops: [
      //          [0, '#212121'],
      //       ]
      //    },
      spacingBottom: 0,
      // spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: 'transparent',
      style: {
        fontFamily: "-apple-system, 'Unica One', sans-serif"
      },
      plotBorderColor: 'yellow'
    },

    title: {
      text: '',
      style: {
        color: '#525252',
        textTransform: 'uppercase',
        fontSize: '11px'
      }
    },
    subtitle: {
      style: {
        color: grid_color,
        textTransform: 'none'
      }
    },
    xAxis: {
      gridLineColor: grid_color,
      labels: {
        style: {
          color: labels_color,
          // zIndex: 0
        }
      },
      lineColor: grid_color,
      minorGridLineColor: 'pink',
      tickColor: grid_color,
      title: {
        style: {
          color: labels_color
        }
      },
      crosshair: {
        width: 0,
        color: crosshair_color
      },
    },
    yAxis: {
      gridLineColor: grid_color,
      labels: {
        style: {
          color: labels_color,
          // zIndex: 0
        }
      },
      lineColor: 'blue',
      minorGridLineColor: 'yellow',
      tickColor: grid_color,
      tickWidth: 1,
      title: {
        style: {
          color: labels_color
        }
      },
      // min: 0,
      crosshair: {
        width: 0,
        color: crosshair_color
      },
    },
    tooltip: {
      backgroundColor: tooltip_background,
      style: {
        color: tooltip_color,
        // zIndex: 999
      }
    },
    lang: {
      decimalPoint: ',',
      thousandsSep: '.'
    },
    plotOptions: {
      bar: {
        borderColor: crosshair_color,
        borderWidth: .2
      },
      pie: {
        borderColor: crosshair_color,
        borderWidth: .2
      },
      line: {
        allowPointSelect: false,
        marker: {
          enabled: true,
          symbol: 'square',
        },
      },
      spline: {
        allowPointSelect: false,
        marker: {
          enabled: true,
          symbol: 'square',
        },
      },
      area: {
        allowPointSelect: false,
        marker: {
          enabled: true,
          symbol: 'square',
        },
      },
      series: {
        turboThreshold: 0,
        borderWidth: 0,
        dataLabels: {
          color: labels_color,
        },
        marker: {
          symbol: 'square',
          lineColor: '#333'
        },
        states: {
          hover: {
            lineWidth: 3
          }
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: labels_color
      },
      errorbar: {
        color: labels_color
      }
    },
    legend: {
      itemStyle: {
        color: legend_color
      },
      itemHoverStyle: {
        color: legend_color
      },
      itemHiddenStyle: {
        color: '#606063'
      },
      symbolRadius: 0,
      useHTML: true,
      enabled: true,
      borderColor: legend_border_color,
      navigation: {
        activeColor: legend_navigation_active,
        inactiveColor: legend_navigation_inactive,
        style: {
          color: '#4a4a4a',
          fontSize: '11px'
        }
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false,
      fallbackToExportServer: false,
    },
    labels: {
      style: {
        color: '#707073'
      }
    },

    drilldown: {
      //for axis label
      activeAxisLabelStyle: {
        textDecoration: 'none',
        color: '#E0E0E3',
        outlineColor: labels_border_color
      },
      //for datalabel
      activeDataLabelStyle: {
        textDecoration: 'none',
        color: '#E0E0E3',
        outlineColor: labels_border_color
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#2D2D2D',
        stroke: 'pink',
        style: {
          color: '#5C5C5C'
        },
        states: {
          hover: {
            fill: '#444444',
            stroke: '#000000',
            style: {
              color: labels_color
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: labels_color
            }
          }
        }
      },
      inputBoxBorderColor: '#2D2D2D',
      inputStyle: {
        backgroundColor: '#333',
        color: '#5C5C5C'
      },
      labelStyle: {
        color: labels_color
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#262626',
        borderColor: '#5C5C5C'
      },
      outlineColor: '#383838',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: labels_color,
        lineColor: 'none'
      },
      xAxis: {
        gridLineColor: '#383838'
      }
    },

    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: 'blue',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)',
  }

  return _chart_theme
}