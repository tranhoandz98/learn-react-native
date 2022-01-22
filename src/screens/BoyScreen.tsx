import * as React from 'react'
import { Text, View } from 'react-native'
import { Button, Header } from 'react-native-elements';
import { Heading, Page } from '../components';
import * as Notifications from 'expo-notifications';
import { submitToken, Token } from '../services/api';


async function getNotificationToken() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Fail to get notification token')
      return;
    }
  }
  const tokenData = await Notifications.getExpoPushTokenAsync();
  const token = tokenData.data;
  console.log('token: ', token);
  return token
}


const BoyScreen: React.FC = () => {

  const [token, setToken] = React.useState<Token | undefined>();

  const sendToken = async () => {
    const token = await getNotificationToken();
    if (token) {
      const storeToken = await submitToken(token)
      setToken(storeToken)
      console.log('storeToken: ', storeToken);
    }
  }
  return (
    <View>
      <Header centerComponent={{
        text: 'Cho bạn nam 👦',
        style: { color: '#fff' }
      }} />
      <Page>
        <Heading>
          {token ? `token của bạn là ${token.id}`
            : 'Bạn chưa có mã số, bấm vào để lấy mã'}
        </Heading>
        {!token &&
          <Button title="Bấm để lấy mã số"
            onPress={sendToken}
          />
        }
      </Page>

    </View>
  )
}

export default BoyScreen;
