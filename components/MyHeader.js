import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';

export default class MyHeader extends React.Component {
  render() {
    return (
      <Header
        centerComponent={{
          text: this.props.title,
          style: { color: '#FF7129', fontSize: 20, fontWeight: 'bold', },
        }}
        
      />
    );
  }
}
