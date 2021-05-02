import React from 'react';
// import { Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import { Button, Icon } from 'react-native-elements';
import { UserProvider } from './context/UserContext';

const Stack = createStackNavigator()

export default props => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="UserList"
                    screenOptions={
                        screenOptions
                    }>
                    <Stack.Screen name="UserList" component={UserList} 
                        options={({ navigation }) => {
                            return {
                                title: "Lista de usuários",
                                headerRight: () => (
                                    <Button
                                        onPress={() => navigation.navigate('UserForm')}
                                        icon={<Icon name="add" size={25} color="white" />}
                                        type="clear"
                                    />
                                )
                            }
                    }} />
                    <Stack.Screen name="UserForm" component={UserForm} options={{
                        title: 'Formulário de usuários'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
        
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}