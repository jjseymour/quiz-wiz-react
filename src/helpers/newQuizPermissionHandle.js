import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function isInstructor(Component) {
  class AuthComponent extends React.Component {
      componentDidUpdate(props){
        // would like to refactor to use componentWillMount
          if (!this.props.currentUser.instructor) {
              // redirect to home
              browserHistory.push(`/`);
          }
      }

      render() {
          // render the component that requires auth (passed to this wrapper)
          return (
              <Component  {...this.props} />
          )
      }
    }

    const mapStateToProps =
        (state) => ({
            currentUser: state.currentUser,
        });

    return connect(mapStateToProps)(AuthComponent);
}
