import { Button, ButtonText } from '@/components/ui/button'
import { View } from 'react-native'

export default function Home() {

  function alertGluestack() {
    alert('Hello Gluestack')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button variant="solid" size="lg" action="secondary">
        <ButtonText>Hello Gluestack</ButtonText>
      </Button>
    </View>
  )
}