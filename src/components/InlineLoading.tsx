import * as React from 'react';
import { ScaleLoader } from 'react-spinners';

interface InlineLoadingProps {
    loading?: boolean;
}

export class InlineLoading extends React.Component<InlineLoadingProps, {}> {
    constructor(props: InlineLoadingProps) {
        super(props);
    }
    render() {
        return (
            <span className='ui-loading-inline'>
                <ScaleLoader color={'#337ab7'} loading={this.props.loading} height={16} />
            </span>
        );
    }
}
