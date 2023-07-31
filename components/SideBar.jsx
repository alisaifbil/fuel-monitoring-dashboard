"use client";

import React from 'react'

import { Sidebar } from "flowbite-react";

const SideBar = () => {
  return (
    <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                // icon={HiChartPie}
              >
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiViewBoards}
                label="Pro"
                labelColor="dark"
              >
                <p>Kanban</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiInbox}
                label="3"
              >
                <p>Inbox</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiUser}
              >
                <p>Users</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiShoppingBag}
              >
                <p>Products</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiArrowSmRight}
              >
                <p>Sign In</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                // icon={HiTable}
              >
                <p>Sign Up</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
  )
}

export default SideBar;