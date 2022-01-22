import { Heading, Page } from '../components';
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Header, Input } from 'react-native-elements';
import styled from 'styled-components';
import { sendPushNotification, Token, getToken } from '../services/api';


const ButtonContainer = styled(View)`
display:flex;
flex-direction: row;
flex-wrap:wrap;
justify-content: space-between;
`

const SummonButton = styled(TouchableOpacity) <{ color?: string }>`
  background-color: ${p => p.color || 'red'} ;
  flex:48% 0 0;
  border-radius: 5px;
  text-align:center;
  margin-bottom: 10px;
  display: flex;
  height:150px;
  align-items:center;
  justify-content: center;
  color: #fff;
`

const SummonText = styled(Text)`
color:#fff;
font-size: 18px;
`

const GirlScreen: React.FC = () => {
  const [tokenInput, setTokenInput] = React.useState('');
  const [showReload, setShowReload] = React.useState(false);
  const [token, setToken] = React.useState<Token | undefined>();

  const confirmToken = async () => {
    const storedToken = await getToken(tokenInput)
    setToken(storedToken)
  }

  return (
    <View>
      <Header centerComponent={{
        text: 'Cho bạn nữ 👧',
        style: { color: '#fff' }
      }} />
      < Page >
        {token &&
          <View>
            <Button title="Triệu hội lại"
              onPress={() => setToken()}
            />
          </View>
        }
        {!token ?
          <View>
            <Input label="Mã số gấu 👧" placeholder="Nhập mã số gấu cái vào đây!"
              value={tokenInput}
              onChangeText={setTokenInput}
            />
            <Button title="Xác nhận mã"
              onPress={confirmToken}
            />
          </View>
          :
          <View >
            <Heading>
              Triệu hồi gấu đực
            </Heading>

            <ButtonContainer>
              <SummonButton color="#e74c3c"
                onPress={() => sendPushNotification(token.token, '😞 Em đói quá', 'Qua chở em đi ăn đi')}
              >
                <SummonText>😞 Em đói quá</SummonText>
              </SummonButton>
              <SummonButton color="#2980b9"
                onPress={() => sendPushNotification(token.token, '🥤 Thèm trà sữa', 'Huhu em thèm Tocotoco')}

              >
                <SummonText>🥤 Thèm trà sữa</SummonText>
              </SummonButton>
              <SummonButton color="#46b929"
                onPress={() => sendPushNotification(token.token, '😟 Nhớ anh quá', 'Nhớ anh ghê ahuhu')}

              >
                <SummonText>😟 Nhớ anh quá</SummonText>
              </SummonButton>
              <SummonButton color="#eebb12"
                onPress={() => sendPushNotification(token.token, '🤙 Gọi em nhé', 'Sao qua giờ không gọi, không nhớ em à :<')}

              >
                <SummonText >🤙 Gọi em nhé</SummonText>
              </SummonButton>
            </ButtonContainer>
          </View>
        }

      </Page>
    </View >
  )
}

export default GirlScreen;
