import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box } from '../../theme';

const Welcome = () => {
  return (
    <Box flex={1}>
      <Box
        flex={1}
        borderBottomRightRadius={'xl'}
        backgroundColor={'amber100'}
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
      <Box flex={1} borderTopLeftRadius={'xl'}></Box>
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
