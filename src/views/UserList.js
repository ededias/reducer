import React, { useContext } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { ListItem, Icon, Avatar, Button } from 'react-native-elements'
import usersContext from '../context/UserContext'

export default props => {

    const { state, dispatch } = useContext(usersContext)

    function confirmUserDelete (user) {
        Alert.alert('Excluir usuário', 'Deseja excluir o usuario?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem ({ item: user }) {
        return (
            <ListItem bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar title={user.name} source={{uri: user.avatarUrl}}></Avatar>
                <ListItem.Content>
                    <ListItem.Title>{ user.name }</ListItem.Title>
                    <ListItem.Subtitle>{ user.email }</ListItem.Subtitle>
                </ListItem.Content>
                <Button 
                    onPress={() => props.navigation.navigate('UserForm', user)} 
                    type="clear"
                    icon={ <Icon name="edit" size={30} color="orange" /> }/>
                <Button 
                    onPress={() => confirmUserDelete(user)} 
                    type="clear"
                    icon={ <Icon name="delete" size={30} color="red" /> }/>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}