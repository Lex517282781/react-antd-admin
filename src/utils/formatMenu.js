const formatMenu = menu => {
  const setMenu = item => {
    item.children.forEach(citem => {
      citem.openKeys = [...(item.openKeys || []), item.key];
      if (citem.children && citem.children[0]) {
        setMenu(citem);
      }
      if (citem.group && citem.group[0]) {
        citem.group.forEach(cgitem => {
          cgitem.openKeys = [...(citem.openKeys || []), citem.key];
        });
      }
    });
  };

  menu.forEach(mitem => {
    if (mitem.children && mitem.children[0]) {
      setMenu(mitem);
    }
  });
};

export default formatMenu;
