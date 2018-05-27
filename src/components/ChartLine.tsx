import * as React from 'react';
import * as _ from 'lodash';
import { Line } from 'react-chartjs-2';
import { Panel } from 'react-bootstrap';
import { Loading } from './Loading';
import { Color } from '../lib/Color';

export class LineChart extends React.Component<any, any> {
    render() {
        let chartData = {
            labels: [],
            datasets: []
        };
        let argData: LineChartData = this.props.data;
        _.forEach(argData.labels, (label) => {
            chartData.labels.push(label);
        });
        _.forEach(argData.items, (item: LineChartDataItem) => {
            let newItem = {
                label: item.label,
                data: item.data
            };
            newItem = _.assignIn(newItem, item.option);
            chartData.datasets.push(newItem);
        });
        return (
            <Panel bsStyle={this.props.theme}>
                <Panel.Heading>{this.props.title}</Panel.Heading>
                <Panel.Body>
                    <Loading loading={this.props.loading} />
                    {!this.props.loading && (
                        <Line data={chartData} height={300} options={{ maintainAspectRatio: false }} />
                    )}
                </Panel.Body>
            </Panel>
        );
    }
}

export class LineChartData {
    labels: string[];
    items: LineChartDataItem[];

    constructor(labels?: string[], items?: LineChartDataItem[]) {
        this.labels = labels || [];
        this.items = items || [];
    }

    public addLabel(label: string) {
        this.labels.push(label);
    }

    public addItem(item: LineChartDataItem) {
        this.items.push(item);
    }
}

export class LineChartDataItem {
    label: string;
    data: number[];
    option?: LineChartDataItemOption;

    constructor(label: string, data?: number[], option?: LineChartDataItemOption) {
        this.label = label;
        this.data = data || [];
        this.option = option || new LineChartDataItemOption();
    }

    public addData(d: number) {
        this.data.push(d);
    }
}

export class LineChartDataItemOption {
    fill?: boolean = false;
    lineTension?: number = 0.1;
    backgroundColor?: string = 'rgba(75,192,192,0.4)';
    borderColor?: string = 'rgba(75,192,192,1)';
    borderCapStyle?: string = 'round'; //['butt','round','square'] see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
    borderDash?: number[];
    borderWidth: number = 2;
    borderDashOffset: number = 0.0;
    borderJoinStyle?: string = 'miter';
    pointBorderColor?: string = 'rgba(75,192,192,1)';
    pointBackgroundColor?: string = '#fff';
    pointBorderWidth?: number = 1;
    pointHoverRadius?: number = 5;
    pointHoverBackgroundColor?: string = 'rgba(75,192,192,1)';
    pointHoverBorderColor?: string = 'rgba(220,220,220,1)';
    pointHoverBorderWidth?: number = 1;
    pointRadius?: number = 1;
    pointHitRadius?: number = 10;

    constructor() {
        let color = new Color();
        this.backgroundColor = color.value;
        this.borderColor = color.alphaValue;
        this.pointBackgroundColor = color.value;
        this.pointBorderColor = color.alphaValue;
        this.pointHoverBackgroundColor = color.value;
        this.pointHoverBorderColor = color.lighten;
    }
}
