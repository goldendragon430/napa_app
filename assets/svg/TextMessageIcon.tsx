import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const TextMessageIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="#16E6EF" />
    <Path
      stroke="#000"
      strokeWidth={1.4}
      d="M37.3 28a9.3 9.3 0 0 1-9.3 9.3h-8.31l.32-.32c1.073-1.073.985-2.716.237-3.841A9.253 9.253 0 0 1 18.7 28a9.3 9.3 0 0 1 18.6 0Z"
    />
  </Svg>
);
export default TextMessageIcon;
