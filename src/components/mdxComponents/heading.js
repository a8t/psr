import styled from 'styled-components';

const defaultFontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

const Heading = styled.h1`
  font-size: ${({ fontSize }) => defaultFontSizes[fontSize]}px;
  font-weight: 700;
  line-height: 1.5;
  margin-top: 32px;
  margin-bottom: 24px;
`;

export default Heading;
