"use client"

import type React from "react"
import {
  Coins,
  Filter,
  FlameIcon,
  GanttChartSquare,
  Globe,
  Home,
  LineChart,
  MessageSquareText,
  Moon,
  Search,
  Settings,
  SunMedium,
  TrendingUp,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SidebarProvider>
        <div className="min-h-screen">
          <AppSidebar />
          <div className="flex flex-col md:pl-[16rem]">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="w-full flex-1">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="搜索代币..."
                      className="w-full rounded-full bg-muted pl-8 md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form>
              </div>
              <ThemeToggle />
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Coins className="h-6 w-6" />
          <span>Token筛选平台</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="首页">
              <Home className="h-4 w-4" />
              <span>首页</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="筛选面板" isActive>
              <Filter className="h-4 w-4" />
              <span>筛选面板</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="链上数据">
              <GanttChartSquare className="h-4 w-4" />
              <span>链上数据</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="社交媒体">
              <MessageSquareText className="h-4 w-4" />
              <span>社交媒体</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="K线分析">
              <LineChart className="h-4 w-4" />
              <span>K线分析</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="FOMO指数">
              <FlameIcon className="h-4 w-4" />
              <span>FOMO指数</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="市场趋势">
              <TrendingUp className="h-4 w-4" />
              <span>市场趋势</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="全球视图">
              <Globe className="h-4 w-4" />
              <span>全球视图</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="设置">
              <Settings className="h-4 w-4" />
              <span>设置</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <SunMedium className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
