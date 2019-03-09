import React from 'react';
import { Text, View, StyleSheet, FlatList, Button, Image, ProgressBarAndroid } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Permissions, Contacts, ImagePicker } from 'expo';
import Favourite from './comp/favourite';
import ContactList from './comp/ContactList';
import { ListItem } from 'react-native-elements'
import Contactdetail from './comp/Contactdetail';


class App extends React.Component {

  static navigationOptions = {
    title: 'My Contacts',
  };

  state = {
    contactpermission: null,
    status: null,
    image: 'http://placehold.it/50',
    data: [],
    favrlist: [],
    favr: false
  }
  //renderItem = ({ item }) => (
  // <ListItem
  // title={item.firstName}
  // subtitle={item.subtitle}
  //leftAvatar={{
  //  source: item.avatar_url && { uri: item.avatar_url },
  //  title: item.name[0]
  // }}
  // />
  //)
  componentDidMount = async () => {
    const { data } = await Contacts.getContactsAsync({ pageSize: 9 })
    this.setState({ data })
    console.log('contacts :', data)
  }

  editcontact = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    console.log('cam status ', status)
    if (status === 'granted') {
      // alert('access granted')
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      console.log('result ', result)
      if (!result.cancelled) {
        this.setState({ image: result.uri }, () => console.log('image uri', this.state.image))
      }
    }

  }

  _togglefavr = (toBeFoundid) => {
    this.setState({ favr: !this.state.favr })
    console.log('favrlist0 ', this.state.favrlist)
    console.log('tobefound ', toBeFoundid)
    const findInList = (this.state.favrlist.find(item => item === toBeFoundid))
    if (findInList) {
      //if (this.state.favrlist.includes(toBeFoundid)) {
      const Newfvrlst = this.state.favrlist.filter(item => item !== findInList)
      this.setState({
        favrlist: Newfvrlst
      }, () => console.log('favr list', this.state.favrlist))
    }
    else {
      const Newfvrlst = [...this.state.favrlist, toBeFoundid]
      this.setState({
        favrlist: Newfvrlst
      }, () => console.log('favr list2', this.state.favrlist))
    }
  }

  render() {

    if (this.state.status === 'granted' && this.state.data.length > 0) {
      return (
        <View>
          {/* <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100 }} /> */}
          {/* <Button title='View the contacts' onPress={() => this.getcontactlist()}/> */}
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => 
            <ContactList singleContact={item} {...this.props} togglefavr={this._togglefavr} favor={this.state.favr} />}
          />
        </View>
      )
    }
    else if (this.state.status === 'granted' && this.state.data.length === 0) {
      return (
        <View style={styles.container}>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            color="green"
            progress={this.state.data.length / 9}
          />
          <Text>Loading...</Text>
        </View>
      )
    }
    else {
      return (
        <View>
          <Text>'Waiting for the Access'</Text>
        </View>
      )
    }
  }
  componentWillMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)
    this.setState({ status })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Homenavigation = createStackNavigator({
  Home: App,
  ContactDetail: Contactdetail
})
const MainNavigator = createBottomTabNavigator({
  Home: Homenavigation,
  Favourite: Favourite
})

export default createAppContainer(MainNavigator);
