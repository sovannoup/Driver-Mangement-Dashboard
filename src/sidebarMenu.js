const MenuList =
  [
    {
      title: "Dashboard",
      routeName: "dashboard-index",
      iconClass: "bx bxs-dashboard",
    },
    {
      title: "User",
      iconClass: "bx bx-user",
      items: [
        {
          title: "Add User",
          routeName: "create-user"
        },
        {
          title: "List Users",
          routeName: "list-user"
        },
      ],
    },
    {
      title: "Driver",
      routeName: "index-driver",
      iconClass: "bx bx-trip",
      items: [
        {
          title: "Add Driver",
          routeName: "create-driver",
        },
        {
          title: "List Drivers",
          routeName: "list-driver",
        }
      ],
    },
    {
      title: "Tracking Driver",
      routeName: "index-tracking-driver",
      iconClass: "bx bx-radar",
      items: [
        {
          title: "Tracking Driver",
          routeName: "list-tracking-driver",
        },
        {
          title: "Available Driver",
          routeName: "list-available-driver",
        },
      ],
    },
    {
      title: "Order",
      routeName: "index-order",
      iconClass: "bx bx-dollar",
      items: [
        {
          title: "Unassigned Order",
          routeName: "unassigned-order",
        },
      ],
    },
    {
      title: "Report",
      routeName: "index-order",
      iconClass: "bx bxs-report",
      items: [
        {
          title: "Assigned Order",
          routeName: "assigned-order-listing",
        },
        {
          title: "Unassigned Order",
          routeName: "unassigned-order-listing",
        },
      ],
    },

  ];

export default MenuList
