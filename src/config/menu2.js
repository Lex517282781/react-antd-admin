const menu2 = {
  path: '/app',
  routes: [
    // dashboard
    { path: '/app', redirect: '/app/dashboard' },
    {
      path: '/app/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      component: '@/pages/Dashboard'
    },
    // forms
    {
      path: '/app/form',
      icon: 'form',
      name: 'form',
      routes: [
        {
          path: '/app/form/basic-form',
          name: 'basicform',
          component: '@/Forms/BasicForm'
        },
        {
          path: '/app/form/step-form',
          name: 'stepform',
          component: '@/Forms/StepForm',
          hideChildrenInMenu: false,
          routes: [
            {
              path: '/app/form/step-form',
              name: 'stepform',
              redirect: '/form/step-form/info'
            },
            {
              path: '/app/form/step-form/info',
              name: 'info',
              component: './Forms/StepForm/Step1'
            },
            {
              path: '/app/form/step-form/confirm',
              name: 'confirm',
              component: './Forms/StepForm/Step2'
            },
            {
              path: '/app/form/step-form/result',
              name: 'result',
              component: './Forms/StepForm/Step3'
            }
          ]
        },
        {
          path: '/app/form/advanced-form',
          name: 'advancedform',
          authority: ['admin'],
          component: './Forms/AdvancedForm'
        }
      ]
    },
    // list
    {
      path: '/app/list',
      icon: 'table',
      name: 'list',
      routes: [
        {
          path: '/app/list/table-list',
          name: 'searchtable',
          component: './List/TableList'
        },
        {
          path: '/app/list/basic-list',
          name: 'basiclist',
          component: './List/BasicList'
        },
        {
          path: '/app/list/card-list',
          name: 'cardlist',
          component: './List/CardList'
        },
        {
          path: '/app/list/search',
          name: 'searchlist',
          component: './List/List',
          routes: [
            {
              path: '/app/list/search',
              redirect: '/app/list/search/articles'
            },
            {
              path: '/app/list/search/articles',
              name: 'articles',
              component: './List/Articles'
            },
            {
              path: '/app/list/search/projects',
              name: 'projects',
              component: './List/Projects'
            },
            {
              path: '/app/list/search/applications',
              name: 'applications',
              component: './List/Applications'
            }
          ]
        }
      ]
    },
    {
      path: '/app/profile',
      name: 'profile',
      icon: 'profile',
      routes: [
        // profile
        {
          path: '/app/profile/basic',
          name: 'basic',
          component: './Profile/BasicProfile'
        },
        {
          path: '/app/profile/advanced',
          name: 'advanced',
          authority: ['admin'],
          component: './Profile/AdvancedProfile'
        }
      ]
    },
    {
      path: '/app/result',
      name: 'result',
      icon: 'check-circle-o',
      routes: [
        // result
        {
          path: '/app/result/success',
          name: 'success',
          component: './Result/Success'
        },
        { path: '/app/result/fail', name: 'fail', component: './Result/Error' }
      ]
    },
    {
      path: '/app/exception',
      name: 'exception',
      icon: 'warning',
      routes: [
        // exception
        {
          path: '/app/exception/403',
          name: 'not-permission',
          component: './Exception/403'
        },
        {
          path: '/app/exception/404',
          name: 'not-find',
          component: './Exception/404'
        },
        {
          path: '/app/exception/500',
          name: 'server-error',
          component: './Exception/500'
        },
        {
          path: '/app/exception/trigger',
          name: 'trigger',
          hideInMenu: true,
          component: './Exception/TriggerException'
        }
      ]
    },
    {
      path: '/app/account',
      name: 'account',
      icon: 'user',
      routes: [
        {
          path: '/app/account/center',
          name: 'center',
          component: './Account/Center/Center',
          routes: [
            {
              path: '/app/account/center',
              redirect: '/account/center/articles'
            },
            {
              path: '/app/account/center/articles',
              component: './Account/Center/Articles'
            },
            {
              path: '/app/account/center/applications',
              component: './Account/Center/Applications'
            },
            {
              path: '/app/account/center/projects',
              component: './Account/Center/Projects'
            }
          ]
        },
        {
          path: '/app/account/settings',
          name: 'settings',
          component: './Account/Settings/Info',
          routes: [
            {
              path: '/app/account/settings',
              redirect: '/account/settings/base'
            },
            {
              path: '/app/account/settings/base',
              component: './Account/Settings/BaseView'
            },
            {
              path: '/app/account/settings/security',
              component: './Account/Settings/SecurityView'
            },
            {
              path: '/app/account/settings/binding',
              component: './Account/Settings/BindingView'
            },
            {
              path: '/app/account/settings/notification',
              component: './Account/Settings/NotificationView'
            }
          ]
        }
      ]
    }
  ]
};

export default menu2;
