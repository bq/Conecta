import { Box } from "rebass";
import styled from "@emotion/styled";

const Container = styled(Box)`
  max-width: 1280px;
  width: 100%;
`;

Container.defaultProps = {
  mx: "auto",
  px: [10, 20, 50]
};

export default Container;
