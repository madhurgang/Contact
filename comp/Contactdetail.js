import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class Contactdetail extends React.Component {
    render() {
        console.log('nav detail :', this.props.navigation.state.params.CD.phoneNumbers)
        return (
            <View style={styles.container}>
                <Text>I'm  in the contact detail</Text>
                <Text>Contact Type ={this.props.navigation.state.params.CD.contactType}</Text>
                <Text>First name ={this.props.navigation.state.params.CD.firstName}</Text>
                <Text>Last name ={this.props.navigation.state.params.CD.lastName}</Text>
                <FlatList
                    data={this.props.navigation.state.params.CD.phoneNumbers}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => <Text>{item.label} : {item.number}</Text>
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});