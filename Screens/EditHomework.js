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

export default class EditHomework extends React.Component {
  constructor() {
    super();
    this.state = {
      hw: [],
      email: '',
      homework: '',
      grade: '',
      due_date: '',
      subject: '',
      docId:'',
      homeworkId:''
    };
  }
  componentDidMount = async () => {
    var email = firebase.auth().currentUser.email;
    const query = await db
      .collection('allHomework')
      .where('email', '==', email)
      .get();
    query.docs.map((doc) => {
      this.setState({
        hw: [...this.state.hw, doc.data()],
        
      });
    });

     var email2 = firebase.auth().currentUser.email;
    db.collection('allHomework')
      .where('email_id', '==', email2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          {
            var data = doc.data();
            this.setState({
              
              docId:doc.id()
              
              
            });
          }
        });
      });

    console.log(this.state.homework);

    this.getHomeworkDetails();
  };

  
  updateHwDetails() {
    db.collection('allHomework').doc(this.state.docId).update({
      homework: this.state.homework,
      grade: this.state.grade,
      due_date: this.state.due_date,
      subject: this.state.subject,
    });
    return Alert.alert('Homework edited successfully');
  }
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

        <Text style={styles.paragraph}>Edit Homework</Text>
        <FlatList
          data={this.state.hw}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                marginTop: 20,
                borderColor: '#001A4B',
              }}>
              <TextInput
                placeholder={item.homework}
                placeholderTextColor="#001A4B"
                style={styles.box}
                onChangeText={(text) => {
                  this.setState({ homework: text });
                }}
              />
              <TextInput
               
                style={styles.box}
                placeholderTextColor="#001A4B"
                onChangeText={(text) => {
                  this.setState({ grade: text });
                }}
                placeholder={item.grade}
              />
              <TextInput
                
                style={styles.box}
                placeholderTextColor="#001A4B"
                onChangeText={(text) => {
                  this.setState({ due_date: text });
                }}
                placeholder={item.due_date}
              />
              <TextInput
               
                style={styles.box}
                placeholderTextColor="#001A4B"
                onChangeText={(text) => {
                  this.setState({ subject: text });
                }}
                placeholder={item.subject}
              />

              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  this.updateHwDetails();
                }}>
                <Text>Edit</Text>
              </TouchableOpacity>
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
