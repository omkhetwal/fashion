import Button from '@/components/button';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box } from '../../theme';

const Welcome = ({ navigation }: { navigation: any }) => {
  return (
    <Box flex={1}>
      <Box
        flex={1}
        borderBottomRightRadius={'xl'}
        backgroundColor={'amber300'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'xl'}
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://res.cloudinary.com/dooxt2sgs/image/upload/v1642841196/images/Revelry-Kids-Product-featherandtwine-55_websize__84032.1637257184_n8orse.jpg',
          }}
        />
      </Box>
      <Box flex={1} borderTopLeftRadius={'xl'}>
        <Button
          variant="secondary"
          text="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </Box>
    </Box>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
  },
});
