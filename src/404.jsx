import React from 'react';
import img from './assets/imgs/404.png';

class NotFound extends React.Component {
  state = {
    animated: ''
  };

  componentDidMount = () => {
    // this.timer = setTimeout(() => {
    //   this.props.history.push('/');
    // }, 1500);
  };

  componentWillUnmount() {
    this.timer = null;
  }

  enter = () => {
    this.setState({ animated: 'hinge' });
  };

  render() {
    return (
      <div
        className="center"
        style={{
          height: '100%',
          background: '#ececec',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src={img}
          alt="404"
          className={`animated swing ${this.state.animated}`}
          onMouseEnter={this.enter}
        />
      </div>
    );
  }
}

export default NotFound;
