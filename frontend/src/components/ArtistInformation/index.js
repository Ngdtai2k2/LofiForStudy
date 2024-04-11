import React from 'react';
import Marquee from 'react-fast-marquee';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import BoxOverlay from '../BoxOverlay';

export default function ArtistInformation({
  url,
  channelTitle,
  thumbnailsHigh,
}) {
  return (
    <BoxOverlay sx={{ height: '100%' }}>
      <Link
        className="flex-column-center"
        href={url}
        underline="none"
        width="100%"
        target="_blank"
      >
        <Avatar
          sx={{ width: '45px', height: '45px' }}
          src={thumbnailsHigh}
          alt={`Profile picture of ${channelTitle}`}
        />
        <Marquee direction="left" speed={10} delay={2}>
          <Typography variant="caption" color="#ffffff">
            {channelTitle}&nbsp;
          </Typography>
        </Marquee>
      </Link>
    </BoxOverlay>
  );
}
