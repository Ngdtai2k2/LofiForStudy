import React from 'react';
import Marquee from 'react-fast-marquee';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import BoxOverlay from '../BoxOverlay';
import { YOUTUBE_URL } from '../../constants/constant';
export default function ArtistInformation({
  channelId,
  channelTitle,
  thumbnailsHigh,
}) {
  return (
    <BoxOverlay sx={{ height: '100%' }}>
      <Link
        className="flex-column-center"
        href={`${YOUTUBE_URL}channel/${channelId}`}
        underline="none"
        width="100%"
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
