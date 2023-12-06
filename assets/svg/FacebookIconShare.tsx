import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const FacebookIconShare = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="#1877F2" />
    <Path
      fill="#fff"
      d="M30.81 19.985H33v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.322 1.987-5.322 5.639V25H21v4.266h3.486V40h4.273V29.267h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077Z"
    />
  </Svg>
);
export default FacebookIconShare;
