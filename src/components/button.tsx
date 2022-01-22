import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { theme } from '../theme';

type Variant = 'primary' | 'secondary';

interface Props extends PressableProps {
  variant?: Variant;
  text: string;
}

const Variants: Record<Variant, object> = {
  primary: {
    color: '#fff',
    backgroundColor: theme.colors.blu900,
    borderRadius: 30,
    width: 245,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: theme.colors.slate100,
    borderRadius: 30,
    width: 245,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Button = ({ variant = 'primary', text, ...props }: Props) => {
  return (
    <Pressable style={Variants[variant]} {...props}>
      <Text
        style={{
          fontSize: 20,
          textTransform: 'capitalize',
          color: theme.colors.gray900,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
