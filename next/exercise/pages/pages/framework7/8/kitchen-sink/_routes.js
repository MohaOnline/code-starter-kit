export const routes = [
  {
    path: '/pages/framework7/8/kitchen-sink',
    asyncComponent: () => import('./f7/home'), // js file path.
  },

  // {
  //   path: '/blog/:postID',
  //   asyncComponent: () => import('./f7/blog/[postID]'),
  // },
];