const artistsReleases = [
    { artist: 'Lil Peep', single: 'Star Shopping', imageUrl: '/star_shopping.jpg' },
    { artist: 'Billie Eilish', single: 'Bad Guy', imageUrl: '/bad_guy.jpg' },
    { artist: 'Taylor Swift', single: 'Cardigan', imageUrl: '/cardigan.jpg' },
    { artist: 'Ghostemane', single: 'Mercury', imageUrl: '/mercury.jpg' },
    { artist: 'Wos', single: 'Canguro', imageUrl: '/canguro.jpg' },
    { artist: 'Duki', single: 'Goteo', imageUrl: '/goteo.jpg' },
    { artist: 'Joji', single: 'Slow Dancing in the Dark', imageUrl: '/slow_dancing_in_the_dark.jpg' },
    { artist: 'Bizzarap', single: 'Music Sessions #37', imageUrl: '/music_session.jpg' },
  ];
  
  export const getUpcomingReleases = () => {
    return artistsReleases;
  };
