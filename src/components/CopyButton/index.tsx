import React, { FC } from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

interface CopyButtonProps {
  value: string;
  sx?: SxProps<Theme>;
}

export const CopyButton: FC<CopyButtonProps> = ({ value, sx }) => {
  const handleOnClick = () => {
    navigator.clipboard
      .writeText(value)
      .catch((e) => console.log('Fail to copy:', e));
  };

  return (
    <IconButton
      color="primary"
      sx={sx}
      size="small"
      onClick={() => handleOnClick()}
    >
      <ContentCopyTwoToneIcon fontSize="small" />
    </IconButton>
  );
};
