import { LayoutDashboard, Package, ShoppingBasket } from "lucide-react";

import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const adminSideMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icons: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icons: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icons: <Package />,
    },
  ];
  const MenuItems = ({setOpen}) => {
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSideMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={()=>{
              navigate(menuItem.path)
              setOpen? setOpen(false) : null
            }}
            // onClick={() => navigate(menuItem.path)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-xl cursor-pointer hover:bg-muted hover:text-foreground"
          >
            {menuItem.icons}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems  setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
