import React, {PureComponent} from 'react';
import {Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import {
    PAGE_HOME_PATH
} from './constants';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Router extends PureComponent<RouteComponentProps> {
    componentDidUpdate(prevProps) {
        const {location} = this.props;

        if (location.key !== prevProps.location.key) {
            window.scrollTo(0,0);
        }
    }

    render() {
        const {location} = this.props;
        return (
            <TransitionGroup>
                <CSSTransition timeout={800} classNames={'fade'} key={location.pathname.split('/')[1] || '*'}>
                    <Switch>
                        <Route exact path={PAGE_HOME_PATH} component={Home} key={PAGE_HOME_PATH}/>
                        <Route component={NotFound} key="*" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default withRouter(Router);
