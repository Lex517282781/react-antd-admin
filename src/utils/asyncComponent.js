import React, { Component } from "react";
import { Spin, Icon } from 'antd';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      this._isMounted = true;
      const { default: component } = await importComponent();
      if (!this._isMounted) return;
      this.setState({
        component: component
      });
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    render() {
      const Component = this.state.component;

      return (
        Component ? 
          <Component {...this.props} />:
          <Spin
            indicator={
              <Icon
                type="loading"
                style={{ fontSize: 24 }}
                spin
              />
            }
          />
      );
    }
  }

  return AsyncComponent;
}