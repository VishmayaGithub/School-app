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
  FlatList,
  ImageBackground
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon, Input } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import DropDownPicker from 'react-native-dropdown-picker';

export default class completedHomework extends React.Component {
  constructor() {
    super();
    this.state = {
      hw: [],
      email: '',
      homework: '',
      grade: '',
      due_date: '',
      subject: '',
    };
  }
  componentDidMount = async () => {
    const query = await db.collection('completeHomework').get();
    query.docs.map((doc) => {
      this.setState({
        hw: [...this.state.hw, doc.data()],
      });
    });
  };

  render() {
    return (
      <ImageBackground
        source={require('../background.jpg')}
        style={styles.image}>
      <View style={styles.container}>
      
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('HomeScreen');
          }}>
          <Image
            source={{
              uri:
                'https://www.freeiconspng.com/thumbs/return-button-png/back-undo-return-button-png-5.png',
            }}
            style={{
              width: 60,
              height: 60,
              marginRight: 200,
              tintColor: '#001A4B',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.paragraph2}>Completed Homework List</Text>

        <FlatList
          data={this.state.hw}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                marginTop: 20,
                borderColor: '#001A4B',
              }}>
              <Text style={styles.paragraph}>
                {'Student Email : ' + item.student_email}
              </Text>
              <Text style={styles.paragraph}>
                {'Homework : ' + item.homework}
              </Text>
              <Text style={styles.paragraph}>
                {'Date Completed : ' + item.date_completed}
              </Text>
              <Text style={styles.paragraph}>{'Grade : ' + item.grade}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
