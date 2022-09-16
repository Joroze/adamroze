enum ROUTES {
  treatments = '/treatments',
  location = '/location',
  results = '/results',
  // General Routes
  home = '/',
  not_found = '/404',
}

export const NAV_ROUTES = (({ home, treatments, location, results }) => ({
  home,
  treatments,
  results,
  location,
}))(ROUTES);

export const getLastSegmentInPath = (thePath: string) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

export default ROUTES;
