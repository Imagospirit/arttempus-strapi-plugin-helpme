import React from "react";
import { Box, Typography } from "@strapi/design-system";
import { parseMarkdownLinks } from "./parseLinks";

const Input = ({ initialValue, ...props }) => {
  const { format: helpMessageTitle, message: helpMessage } =
    props?.attribute?.options || {};
  return (
    <Box padding={5}>
      <Typography fontSize={"3"} fontWeight={"bold"}>
        {helpMessageTitle}
      </Typography>
      <Box>
        <Typography fontSize={"2"}>
          {parseMarkdownLinks(helpMessage)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Input;
