import * as _ from 'lodash';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Loading } from './Loading';

interface ChartDoughnutProps {
    loading?: boolean;
    theme?: string;
    title: string;
    data: any[];
}

interface ChartDoughnutState {

}

export class ChartDoughnut extends React.Component<ChartDoughnutProps, ChartDoughnutState> {
    render() {
        let data = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }
            ]
        };
        _.forEach(this.props.data, (item) => {
            data.labels.push(item.label);
            data.datasets[0].data.push(item.data);
            if (item.backgroundColor) data.datasets[0].backgroundColor.push(item.backgroundColor);
            if (item.hoverBackgroundColor) data.datasets[0].hoverBackgroundColor.push(item.hoverBackgroundColor);
        });
        return (
            <Panel bsStyle={this.props.theme}>
                <Panel.Heading>{this.props.title}</Panel.Heading>
                <Panel.Body>
                    <Loading loading={this.props.loading}></Loading>
                    <Doughnut data={data} />
                </Panel.Body>
            </Panel>
        );
    }
}
