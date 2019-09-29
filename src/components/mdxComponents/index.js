import React from 'react';
import Heading from './heading';
import Text from './text';
import AnchorTag from './anchor';

/* eslint-disable react/display-name */
export default {
  h1: props => <Heading as="h1" fontSize={5} fontWeight={700} {...props} />,
  h2: props => <Heading as="h2" fontSize={4} {...props} />,
  h3: props => <Heading as="h3" fontSize={3} {...props} />,
  h4: props => <Heading as="h4" fontSize={2} {...props} />,
  h5: props => <Heading as="h5" fontSize={1} {...props} />,
  h6: props => <Heading as="h6" fontSize={0} {...props} />,
  p: props => <Text {...props} />,
  a: props => <AnchorTag {...props} />,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
