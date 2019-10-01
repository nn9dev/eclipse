var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.load()
      },
    }
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  // Game Hub
  {
    path: '/gamehub/',
    url: './pages/gamehub.html',
    name: 'gamehub',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.listRepos();
        eclipse.listFeaturedRepos();
      },
    }
  },
  // Repo
  {
    path: '/repo/',
    url: './pages/repo.html',
    name: 'repo',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.showRepoData(repoURL)
      },
    }
  },
  // Settings
  {
    path: '/settings/',
    url: './pages/settings.html',
    name: 'settings',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.log('Initiated Settings Page')
      },
      pageInit: function (e, page) {
        settingsPageInit();
      },
    }
  },
  // Credits
  {
    path: '/credits/',
    url: './pages/credits.html',
    name: 'credits',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.log('Initiated Credits Page')
      },
    }
  },
  // Donate
  {
    path: '/settings/donate/',
    url: './pages/settings/donate.html',
    name: 'donate',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.log('Initiated Donate Page')
      },
    }
  },
  // Controls
  {
    path: '/settings/controls/',
    url: './pages/settings/controls.html',
    name: 'controls',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.log('Initiated Controls Page');
      },
      pageInit: function (e, page) {
        listCurrentControls();
      },
    }
  },
  // Skins
  {
    path: '/settings/skin/',
    url: './pages/settings/skins.html',
    name: 'skin',
    on: {
      pageBeforeIn: function (e, page) {
        eclipse.log('Initiated Skin Page');
        eclipse.listSkins();
        eclipse.listFeaturedSkins();
      },
    }
  },
  {
    name: 'update',
    path: '/update/',
    url: './pages/update.html',
    on: {
      pageInit: function (e, page) {
        updatePageInit();
      },
    },
  },
  {
    name: 'changelog',
    path: '/changelog/',
    url: './pages/changelog.html',
    on: {
      pageInit: function (e, page) {
        changelogPageInit();
      },
    },
  },
  // Debugger
  {
    name: 'debug',
    path: '/debug/',
    url: './pages/debug.html',
    on: {
      pageInit: function (e, page) {
        debugPageInit();
      },
    },
  },
  // Storage
  {
    name: 'storage',
    path: '/settings/storage/',
    url: './pages/settings/storage.html',
    on: {
      pageInit: function (e, page) {
        storagePageInit();
      },
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  }
];

/*
  Document ending randomly so heres some lorem ipsum
  Aute officia esse pariatur proident Lorem id officia. Eiusmod elit cillum in quis voluptate deserunt occaecat consequat et aliqua irure in id magna. Dolor cupidatat proident Lorem incididunt ut pariatur commodo consequat commodo mollit est aliqua.

Laborum velit adipisicing anim irure ut minim tempor deserunt officia mollit commodo. Id consectetur qui ullamco tempor occaecat ad id non ut commodo veniam voluptate deserunt officia laboris dolor dolore. Anim irure minim id ea eu ea cupidatat deserunt nisi ut.

Occaecat incididunt cillum ad et laboris quis cupidatat excepteur qui laborum. Occaecat sunt ex deserunt minim minim duis sunt id consequat est aute ex commodo velit laboris labore. Ullamco dolor excepteur nostrud consequat ipsum culpa nostrud eu ea cupidatat dolore eu id amet sint sint. Aute enim Lorem voluptate id eu et cupidatat dolore eu sunt commodo. Eiusmod minim qui eu adipisicing culpa sint fugiat elit velit velit anim est nisi id consectetur reprehenderit elit.

Occaecat aliqua nostrud id in magna duis voluptate et cupidatat labore. Do cupidatat consectetur quis consequat nisi aliquip officia fugiat adipisicing duis ullamco ut fugiat aliquip irure. Incididunt ipsum do reprehenderit voluptate non cupidatat consequat magna aliqua non minim do cillum reprehenderit. Eiusmod voluptate consequat fugiat et nulla Lorem aliqua ullamco voluptate culpa occaecat consequat laboris non. Dolor ullamco consequat proident enim enim excepteur nisi voluptate.*/
