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
  ImageBackground,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon, Input } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { DrawerItems } from 'react-navigation-drawer';
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email_id: firebase.auth().currentUser.email,
      status: '',
      grade: '',
      subject: '',
      homework: '',
      due_date: '',
      hw: '',
      registrationDate: '',
      grade2: '7th grade',
      docId: '',
      time: '',
    };
  }
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
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  addHomework = () => {
    var hwId = this.createUniqueId();

    db.collection('allHomework').add({
      email: firebase.auth().currentUser.email,
      grade: this.state.grade,
      subject: this.state.subject,
      homework: this.state.homework,
      due_date: this.state.due_date,
      homeworkId: hwId,
    });

    this.setState({
      grade: '',
      subject: '',
      homework: '',
      due_date: '',
    });

    return Alert.alert('Homework added');
  };
  componentDidMount = async () => {
    this.getStatus();

    console.log(this.state.email_id);

    const query = await db.collection('allHomework').get();
    query.docs.map((doc) => {
      this.setState({
        hw: [...this.state.hw, doc.data()],
      });
    });
  };

  checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? '0' + num
          : num.toString();
    }
    return str;
  }
  dateTimeInputChangeHandler = (e) => {
    this.type = 'text';
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '');
    });
    if (values[1]) values[1] = this.checkValue(values[1], 12);
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.setState({
      registrationDate: output.join('').substr(0, 14),
    });
  };
  completedHomework(homework, grade) {
    var d = new Date();
    db.collection('completeHomework').add({
      student_email: firebase.auth().currentUser.email,
      date_completed: d.toDateString(),
      homework: homework,
      grade: grade,
    });
  }

  render() {
    return this.state.status === 'teacher' ? (
      <ImageBackground
        source={require('../background.jpg')}
        style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}>
          <Image
            source={{
              uri: 'https://static.thenounproject.com/png/901827-200.png',
            }}
            style={{
              width: 50,
              height: 50,
              marginLeft: 300,
              tintColor: '#001A4B',
            }}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.paragraph2}>Add Homework</Text>

          <DropDownPicker
            items={[
              { label: '7th grade', value: '7th grade' },
              { label: '8th grade', value: '8th grade' },
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
              marginTop: 10,
            }}
            itemStyle={{
              justifyContent: 'center',
            }}
            placeholder="Choose Grade"
            placeholderStyle={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'monospace',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item) =>
              this.setState({
                grade: item.value,
              })
            }
          />
          <DropDownPicker
            items={[
              { label: 'Science', value: 'Science' },
              { label: 'Literature', value: 'Literature' },
              { label: 'Mathematics', value: 'Mathematics' },
            ]}
            containerStyle={{
              height: 40,
              width: 300,
              alignSelf: 'center',
            }}
            style={{
              backgroundColor: '#F9F5F2',
              alignSelf: 'center',
              width: 300,
              marginTop: 10,
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
                subject: item.value,
              })
            }
          />
          <TextInput
            placeholder="Homework and details"
            style={styles.box}
            placeholderTextColor="#001A4B"
            onChangeText={(text) => {
              this.setState({ homework: text });
            }}
          />
          <TextInput
            keyboardType="number-pad"
            style={styles.box}
            maxLength={10}
            placeholder="Due date (DD/MM/YYYY)"
            placeholderTextColor="#001A4B"
            onChangeText={(e) => {
              this.dateTimeInputChangeHandler(e);
              this.setState({ due_date: e });
            }}
            value={this.state.registrationDate}
          />
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this.addHomework();
            }}>
            <Text>Finish</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('HomeworkGiven');
            }}>
            <Text>View all Homework Given</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('completedHomework');
            }}>
            <Text>View completed homework list</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    ) : (
      <ImageBackground
        source={require('../background.jpg')}
        style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}>
          <Image
            source={{
              uri: 'https://static.thenounproject.com/png/901827-200.png',
            }}
            style={{
              width: 50,
              height: 50,
              marginLeft: 300,
              tintColor: '#001A4B',
            }}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.paragraph2}>Pending Homework</Text>

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
                  {'Homework  : ' + item.homework}
                </Text>
                <Text style={styles.paragraph}>
                  {'Due Date  : ' + item.due_date}
                </Text>
                <Text style={styles.paragraph}>
                  {'Subject  : ' + item.subject}
                </Text>
                <Text style={styles.paragraph}>{'Grade  : ' + item.grade}</Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    borderColor: 'black',
                    borderWidth: 2,
                    backgroundColor: '#D1E2EA',
                    width: 200,
                    height: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    this.completedHomework(item.homework, item.grade);
                  }}>
                  <Text style={{ alignSelf: 'center' }}>Mark as Complete</Text>
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
