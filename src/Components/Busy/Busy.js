import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Busy.css';

const propTypes = {
    minHidingTime : PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    delayMs: PropTypes.number.isRequired,
};

class Busy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // prevIsLoading: props.isLoading,
            show : !props.isLoading,
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.isLoading !== state.prevIsLoading) {
    //         return {
    //             prevIsLoading: props.isLoading,
    //             show : true
    //         }
    //     }
    //     return null;
    // }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoading !== prevProps.isLoading) {
            this.clearTimeout();
            if (this.props.isLoading) {

                // hide the content if the dalay passed
                this.timeout = setTimeout(() => {
                    this.setState({show : false}, () => {
                        this.hidingTime = new Date().getTime();
                    });
                    this.timeout = null;
                }, this.props.delayMs);
            }
            else {
                if (!this.state.show) {
                    const timePassed = new Date().getTime() - this.hidingTime;
                    const { minHidingTime } = this.props;

                    // if network resolve as soon as the busy appear busy stays longer
                    if (timePassed < minHidingTime) {
                        this.timeout = setTimeout(() => this.setState({show: true}) , minHidingTime - timePassed);
                    }
                    else {
                        this.setState({show: true});
                    }
                }
            }
        }
    }

    componentWillUnmount() {
        this.clearTimeout();
    }

    render() {
        const {children} = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <div className={classNames(show ? '' : 'hidden')}>
                    {children}
                </div>
                <div className={classNames('loading',!show ? '' : 'hidden')}>Loading</div>
            </Fragment>
        );
    }
}

Busy.propTypes = propTypes;

export default Busy;
