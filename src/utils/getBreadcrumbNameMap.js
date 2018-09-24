export default function getBreadcrumbNameMap(menu) {
  const routerMap = {};
  const mergeMenuAndRouter = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        mergeMenuAndRouter(menuItem.children);
      }
      if (menuItem.group) {
        mergeMenuAndRouter(menuItem.group);
      }
      routerMap[menuItem.key] = menuItem;
    });
  };
  mergeMenuAndRouter(menu);
  return routerMap;
}
