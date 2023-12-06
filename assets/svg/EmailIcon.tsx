import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const EmailIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="#16E6EF" />
    <Circle cx={28} cy={28} r={28} fill="#16E6EF" />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.4}
      d="M33 36.5H23c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.4}
      d="m33 25-3.13 2.5c-1.03.82-2.72.82-3.75 0L23 25"
    />
  </Svg>
);
export default EmailIcon;
