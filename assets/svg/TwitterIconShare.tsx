import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const TwitterIconShare = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28.001} r={28} fill="#30B4FE" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M37.996 19a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1a10.66 10.66 0 0 1-9-4.53s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.279-.028-.557-.08-.83a7.72 7.72 0 0 0 2.08-3.67Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default TwitterIconShare;
