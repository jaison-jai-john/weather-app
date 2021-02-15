import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

//* Portrait Tablets and Ipads
const isTabletOrIpad = useMediaQuery({
  query: '(maxWidth: 1024px) and (minWidth: 768px)',
});
//* Check orientation
const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
//* check if mobile and small tablet
const isMobileOrLowResTablet = useMediaQuery({
  query: '(maxWidth: 767px) and (minWidth: 481px)',
});
//* check if standard mobiles
const checkMobile = () => {
  if (isMobileOrLowResTablet) {
    return useMediaQuery({
      query: '(maxWidth: 480px) and (minWidth: 320px)',
    });
  }
};
const isMobile = checkMobile();