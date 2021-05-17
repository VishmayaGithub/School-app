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

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      confirmPassword: '',
      status: '',
      id: '',
      check: '',
      grade: '',
    };
  }

  userLogUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert('Password does not match');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('User').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            status: this.state.status,
            email_id: this.state.emailId,
            id: this.state.id,
          });
          return Alert.alert('User added Successfully', '', [
            {
              text: 'ok',
              onPress: () =>
                this.setState({
                  isModalVisible: false,
                }),
            },
          ]);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogIn = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyView}>
              <ImageBackground
                source={require('../background.jpg')}
                style={styles.image}>
                <Text style={styles.paragraph}>Registration</Text>

                <DropDownPicker
                  items={[
                    { label: 'Teacher', value: 'teacher' },
                    { label: 'Student', value: 'student' },
                  ]}
                  defaultValue={this.state.status}
                  containerStyle={{
                    height: 40,
                    width: 300,
                    alignSelf: 'center',
                  }}
                  style={{
                    backgroundColor: '#F9F5F2',
                    alignSelf: 'center',
                    width: 300,
                  }}
                  itemStyle={{
                    justifyContent: 'center',
                  }}
                  placeholder="Choose Position"
                  placeholderStyle={{
                    color: 'black',
                    fontSize: 17,
                    fontFamily: 'monospace',
                  }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) =>
                    this.setState({
                      status: item.value,
                    })
                  }
                />
                <TextInput
                  placeholder={'First Name'}
                  style={styles.box}
                  placeholderTextColor="#001A4B"
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                />
                <TextInput
                  placeholder={'Last Name'}
                  placeholderTextColor="#001A4B"
                  style={styles.box}
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                />

                <TextInput
                  placeholder={'Enter ID'}
                  style={styles.box}
                  placeholderTextColor="#001A4B"
                  onChangeText={(text) => {
                    this.setState({ id: text });
                  }}
                />
                <TextInput
                  placeholder={'Email'}
                  style={styles.box}
                  keyboardType={'email-address'}
                  placeholderTextColor="#001A4B"
                  onChangeText={(text) => {
                    this.setState({ emailId: text });
                  }}
                />
                <TextInput
                  placeholder={'Password'}
                  style={styles.box}
                  placeholderTextColor="#001A4B"
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                />
                <TextInput
                  placeholder={'Confirm Password'}
                  style={styles.box}
                  secureTextEntry={true}
                  placeholderTextColor="#001A4B"
                  onChangeText={(text) => {
                    this.setState({ confirmPassword: text });
                  }}
                />
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.userLogUp(
                        this.state.emailId,
                        this.state.password,
                        this.state.confirmPassword
                      )
                    }>
                    <Text>Register</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({ isModalVisible: false })}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 20,
                        fontSize: 20,
                        alignSelf: 'center',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://thumbs.dreamstime.com/b/stationery-flat-lay-books-elegant-background-studies-job-creative-lifestyle-education-note-freelance-job-seamless-pattern-hand-124889026.jpg',
        }}
        style={styles.image}>
        <View style={styles.container}>
          {this.showModal()}

          <View>
            <Text style={styles.paragraph}>THE SCHOOL APP</Text>
          </View>

          <View>
            <TextInput
              style={styles.box}
              placeholder="School Email ID"
              placeholderTextColor="#001A4B"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}></TextInput>

            <TextInput
              style={styles.box}
              placeholder="School Password"
              placeholderTextColor="#001A4B"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}></TextInput>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginLeft: 18,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({
                    isModalVisible: true,
                  });
                }}>
                <Text style={styles.text}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userLogIn(this.state.emailId, this.state.password);
                }}>
                <Text style={styles.text}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: RFValue(50),
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
  keyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E7DF',
    borderWidth: 2,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: '#001A4B',
  },
});
