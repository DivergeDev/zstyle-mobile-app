import { Button, ButtonText } from '@gluestack-ui/themed'
import { View } from 'react-native'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button action="primary" variant="solid">
        <ButtonText>Hello Gluestack</ButtonText>
      </Button>
    </View>
  )
}