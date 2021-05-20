import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ImageBackground,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon, Input } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import DropDownPicker from 'react-native-dropdown-picker';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      status: '',
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('User')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          {
            var data = doc.data();
            this.setState({
              emailId: data.email_id,
              first_name: data.first_name,
              last_name: data.last_name,

              docId: doc.id,
            });
          }
        });
      });
  };
  getStatus = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('User')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            status: data.status,
          });
        });
      });
    console.log(this.state.hw);
  };
  componentDidMount() {
    this.getUserDetails();
  }
  updateUserDetails() {
    db.collection('User').doc(this.state.docId).update({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    });
    return Alert.alert('User details updated successfully');
  }

  render() {
    return (
      <ImageBackground
        source={require('../background.jpg')}
        style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.paragraph}>Settings</Text>
          <TextInput
            placeholder="First Name"
            style={styles.box}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                first_name: text,
              });
            }}
            value={this.state.first_name}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.box}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({ last_name: text });
            }}
            value={this.state.last_name}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  this.props.navigation.navigate('Welcome');
                });
            }}
            style={styles.button}>
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />
            
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    alignContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: RFValue(20),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001A4B',
    fontFamily: 'monospace',
  },
  paragraph2: {
    margin: 24,
    fontSize: RFValue(37),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001A4B',
    fontFamily: 'monospace',
  },
  box: {
    borderColor: '#001A4B',
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    color: 'black',
    backgroundColor: '#F9F5F2',
    margin: 10,
    paddingLeft: 10,
    fontFamily: 'monospace',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    borderLeftWidth: 1.5,
    opacity: 1,
  },
  button: {
    backgroundColor: '#D1E2EA',
    width: 220,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 2,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: '#D1E2EA',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 2,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
