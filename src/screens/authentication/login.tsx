import Container from '@/components/container';
import { Box } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
  return (
    <Container
      pattern={0}
      footer={
        <View>
          <Text>Footer</Text>
        </View>
      }
    >
      <Box></Box>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
