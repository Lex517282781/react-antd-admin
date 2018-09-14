const menu = {
  text: 'root',
  parentId: -1,
  icon: 'root',
  id: 0,
  children: [
    {
      id: 1,
      icon: 'star',
      text: '一级01',
      parentId: 0,
      key: 'a',
      children: [
        {
          id: 4,
          icon: 'star',
          text: '二级0101',
          parentId: 1,
          key: 'aa',
          openKeys: ['a'],
          children: [
            {
              id: 7,
              icon: 'star',
              text: '三级010101',
              parentId: 4,
              key: 'aaa',
              openKeys: ['a', 'aa'],
              children: [
                {
                  id: 12,
                  icon: 'star',
                  openKeys: ['a', 'aa', 'aaa'],
                  text: '四级01010101',
                  key: 'aaaa',
                  parentId: 7
                }
              ]
            },
            {
              id: 8,
              icon: 'star',
              text: '三级010102',
              key: 'aab',
              openKeys: ['a', 'aa'],
              parentId: 4
            },
            {
              id: 9,
              icon: 'star',
              text: '三级010103',
              key: 'aac',
              openKeys: ['a', 'aa'],
              parentId: 4
            }
          ]
        },
        {
          id: 5,
          icon: 'star',
          text: '二级0102',
          key: 'ab',
          openKeys: ['a'],
          parentId: 1
        },
        {
          id: 6,
          icon: 'star',
          text: '二级0103',
          key: 'ac',
          openKeys: ['a'],
          parentId: 1
        }
      ]
    },
    {
      id: 2,
      icon: 'star',
      text: '一级02',
      parentId: 0,
      key: 'b',
      children: [
        {
          id: 10,
          key: 'ba',
          openKeys: ['b'],
          text: '二级0201',
          parentId: 0,
          group: [
            {
              id: 13,
              text: '二级010201',
              openKeys: ['b', 'ba'],
              key: 'baa'
            },
            {
              id: 14,
              text: '二级010202',
              openKeys: ['b', 'ba'],
              key: 'bab'
            }
          ]
        }
      ]
    },
    {
      id: 3,
      icon: 'star',
      text: '一级03',
      key: 'c',
      parentId: 0
    }
  ]
};

export default menu;
