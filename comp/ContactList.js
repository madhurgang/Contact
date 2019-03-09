import React from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import Contactdetail from './Contactdetail';
import { Ionicons } from '@expo/vector-icons';

export default class ContactList extends React.Component {

  state = {
    contact: null,
    image: null,
    modalVisible: false,
    favr: false,
    favrlist: []
  }

  _pickImage = async () => {
    const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted')
      alert('access granted')
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })
    console.log(result)
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        modalVisible: !this.state.modalVisible
      })
    }
  }

  _takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    console.log(result)
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        modalVisible: !this.state.modalVisible
      })
    }
  }

  _toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  // _togglefavr = (toBeFoundid) => {
  //   this.setState({ favr: !this.state.favr })
  //   console.log('favrlist0 ', this.state.favrlist)
  //   console.log('tobefound ', toBeFoundid)
  //   const findInList = (this.state.favrlist.find(item => item === toBeFoundid))
  //   if (findInList) {
  //     //if (this.state.favrlist.includes(toBeFoundid)) {
  //     const Newfvrlst = this.state.favrlist.filter(item => item !== findInList)
  //     this.setState({
  //       favrlist: Newfvrlst
  //     }, () => console.log('favr list', this.state.favrlist))
  //   }
  //   else {
  //     const Newfvrlst = [...this.state.favrlist, toBeFoundid]
  //     this.setState({
  //       favrlist: Newfvrlst
  //     }, () => console.log('favr list2', this.state.favrlist))
  //   }
  // }


  render() {

    let { image } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ListItem
          title={this.props.singleContact.firstName}
          subtitle={this.props.singleContact.phoneNumbers[0].number}
          onPress={() => this.props.navigation.navigate('ContactDetail', {
            CD: this.props.singleContact
          })}
          leftAvatar={{
            source: { uri: this.state.image },
            title: this.props.singleContact.name[0],
            onPress: () => this._toggleModal()
          }}
          rightIcon={<Ionicons name="ios-heart" size={32} color={this.state.favr ? 'red' : 'grey'}
            onPress={() => this.props.togglefavr(this.props.singleContact.id)}
          />}
        />
        {/* <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this._toggleModal()
          }>
          <View style={styles.container}>
            <Text>Choose the option</Text>
            <TouchableOpacity onPress={this._pickImage}>
              <Text>select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._takePicture}>
              <Text>take a photo</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* <Avatar 
         size="medium"
         roundedisVisible
         title={this.props.singleContact.firstName[0]}
         source={{uri: this.state.image}}
         onPress={() => this._pickImage()}   
         activeOpacity={0.7}
       /> 
       <Text>{this.props.singleContact.name}</Text> */}
      </View>
    )
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