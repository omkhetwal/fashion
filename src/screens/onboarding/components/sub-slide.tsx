import Button from '@/components/button';
import { Box, Text } from '@/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SubSlideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}
const SubSlide = ({ subtitle, description, last, onPress }: SubSlideProps) => {
  return (
    <Box
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'xl'}
    >
      <Text variant={'textXl'}>{subtitle}</Text>
      <Text variant={'textBase'} textAlign={'center'}>
        {description}
      </Text>
      <Box marginTop={'m'} />
      <Button
        onPress={onPress}
        variant={last ? 'primary' : 'secondary'}
        text={last ? "Let's get started" : 'Next'}
      />
    </Box>
  );
};

export default SubSlide;

const styles = StyleSheet.create({});
