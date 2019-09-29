import React from 'react';
import Heading from './heading';
import Text from './text';
import AnchorTag from './anchor';

/* eslint-disable react/display-name */
export default {
  h1: props => <Heading {...props} is="h1" fontSize={[5]} />,
  h2: props => <Heading {...props} is="h2" fontSize={[4]} />,
  h3: props => <Heading {...props} is="h3" fontSize={3} />,
  h4: props => <Heading {...props} is="h4" fontSize={2} />,
  h5: props => <Heading {...props} is="h5" fontSize={1} />,
  h6: props => <Heading {...props} is="h6" fontSize={0} />,
  p: props => <Text {...props} is="p" lineHeight={1.625} mt={3} mb={4} />,
  a: props => <AnchorTag {...props} />,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
