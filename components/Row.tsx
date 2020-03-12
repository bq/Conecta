import { Flex, FlexProps } from "rebass";

const Row: React.FC<FlexProps> = props => (
  <Flex flexWrap="wrap" mx={[-4.5, -10]} alignItems="center" {...props} />
);

export default Row;
