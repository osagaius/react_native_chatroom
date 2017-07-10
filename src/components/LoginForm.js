import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import { Button, Card, CardSection, Input, Spinner } from './common';
import { userNameChanged, loginUser } from '../actions';

class LoginForm extends React.Component {
  onUserNameChange(text) {
    this.props.userNameChanged(text);
  }

  onButtonPress() {
    const { userName } = this.props;
    this.props.loginUser({ userName });
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Spinner />
      );
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            autoCorrect={false}
            placeholder="janeausten"
            label="Username"
            value={this.props.email}
            onChangeText={this.onUserNameChange.bind(this)}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20
  }
};

const mapStateToProps = ({ userName }) => {
  return { userName };
};

export default connect(mapStateToProps, {
  userNameChanged, loginUser
})(LoginForm);
