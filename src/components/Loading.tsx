import * as React from 'react';
import { ScaleLoader } from 'react-spinners';

interface LoadingProps {
    loading?: boolean;
}

export class Loading extends React.Component<LoadingProps, {}> {
    constructor(props: LoadingProps) {
        super(props);
    }
    render() {
        if (this.props.loading) {
            return (
                <div className='ui-loading'>
                    <ScaleLoader color={'#337ab7'} loading={this.props.loading} />
                </div>
            );
        } else {
            return '';
        }
    }
}
