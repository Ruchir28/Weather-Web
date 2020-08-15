import React, { Component } from 'react'

import { Line } from 'react-chartjs-2';

const state = {
    labels: ['Day 1', 'Day 2', 'Day 2',
        'Day 4', 'Day 5'],
    datasets: [
        {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

export default class LineChart extends Component {

    render() {
        return (
            <div>
                <Line
                    data={{
                        labels: ['Day 1', 'Day 2', 'Day 2',
                            'Day 4', 'Day 5'],
                        datasets: [
                            {
                                label: this.props.label,
                                fill: false,
                                lineTension: 0.5,
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                showLines:false,
                                data: [...this.props.temperature]
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Anayltics for last 5 days',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            // position: 'right'
                        }
                    }}
                />
            </div>
        )
    }
}
