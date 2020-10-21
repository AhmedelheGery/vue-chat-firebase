const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [{ path: "", component: () => import("pages/Home.vue") }]
      },
      { path: "/auth", component: () => import("pages/Auth.vue") },
      { path: "/chat/:id", component: () => import("pages/Chat.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
