"use client"

import React, { useState } from "react"
import {
  ArrowDownUp,
  BookmarkIcon,
  ChevronDown,
  ChevronUp,
  Filter,
  FlameIcon,
  GanttChartSquare,
  LineChart,
  MessageSquareText,
  Plus,
  Share2,
  TrendingUp,
  Coins,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// 在import部分添加以下组件引入，通常在现有导入之后
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// 引入shadcn/ui form组件
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

// 引入 Tabs 组件
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 在文件顶部的import部分后，修改tokenData数组为Solana链上的代币
const tokenData = [
  {
    id: 1,
    symbol: "SOL",
    name: "Solana",
    price: "$147",
    change24h: "+4.5%",
    marketCap: "$63B",
    volume24h: "$3.2B",
    holders: 780000,
    socialscore: 92,
    fomoIndex: 88,
    trending: true,
    type: "Native",
  },
  {
    id: 2,
    symbol: "BONK",
    name: "Bonk",
    price: "$0.000032",
    change24h: "+12.7%",
    marketCap: "$1.9B",
    volume24h: "$420M",
    holders: 325000,
    socialscore: 95,
    fomoIndex: 94,
    trending: true,
    type: "Meme",
  },
  {
    id: 3,
    symbol: "JTO",
    name: "Jito",
    price: "$3.87",
    change24h: "+2.3%",
    marketCap: "$450M",
    volume24h: "$52M",
    holders: 78000,
    socialscore: 82,
    fomoIndex: 76,
    trending: true,
    type: "DeFi",
  },
  {
    id: 4,
    symbol: "PYTH",
    name: "Pyth Network",
    price: "$0.58",
    change24h: "+1.2%",
    marketCap: "$680M",
    volume24h: "$48M",
    holders: 120000,
    socialscore: 86,
    fomoIndex: 72,
    trending: false,
    type: "Oracle",
  },
  {
    id: 5,
    symbol: "RNDR",
    name: "Render",
    price: "$7.23",
    change24h: "-0.8%",
    marketCap: "$2.7B",
    volume24h: "$180M",
    holders: 95000,
    socialscore: 79,
    fomoIndex: 68,
    trending: false,
    type: "AI",
  },
  {
    id: 6,
    symbol: "SAMO",
    name: "Samoyedcoin",
    price: "$0.0075",
    change24h: "+8.3%",
    marketCap: "$320M",
    volume24h: "$42M",
    holders: 210000,
    socialscore: 88,
    fomoIndex: 82,
    trending: true,
    type: "Meme",
  },
  {
    id: 7,
    symbol: "RAY",
    name: "Raydium",
    price: "$1.24",
    change24h: "-1.5%",
    marketCap: "$310M",
    volume24h: "$28M",
    holders: 145000,
    socialscore: 76,
    fomoIndex: 65,
    trending: false,
    type: "DeFi",
  },
]

// 修改预设筛选条件
const savedFilters = [
  {
    id: 1,
    name: "高FOMO指数代币",
    description: "FOMO指数 > 80, 社交评分 > 85",
    filterParams: {
      minHolders: 100000,
      maxHolders: 5000000,
      minDailyTx: 1000,
      maxDailyTx: 10000,
      minVolume: 1000000,
      maxVolume: 10000000,
      tokenType: ["All"],
      minSocialScore: 85,
      maxSocialScore: 100,
      narratives: ["All"],
      minMentions: 500,
      maxMentions: 5000,
      sentimentPositive: true,
      priceChangeMin: -5,
      priceChangeMax: 50,
      volumeChangeMin: 0,
      volumeChangeMax: 500,
      patternType: "all",
      minFomoIndex: 80,
      maxFomoIndex: 100,
      trending: false,
      hotTopics: ["All"],
    },
  },
  {
    id: 2,
    name: "Solana生态DeFi",
    description: "DeFi类型, 持有者增长 > 10%",
    filterParams: {
      minHolders: 50000,
      maxHolders: 5000000,
      minDailyTx: 1000,
      maxDailyTx: 10000,
      minVolume: 1000000,
      maxVolume: 10000000,
      tokenType: ["DeFi"],
      minSocialScore: 70,
      maxSocialScore: 100,
      narratives: ["DeFi"],
      minMentions: 500,
      maxMentions: 5000,
      sentimentPositive: true,
      priceChangeMin: 10,
      priceChangeMax: 50,
      volumeChangeMin: 10,
      volumeChangeMax: 500,
      patternType: "all",
      minFomoIndex: 60,
      maxFomoIndex: 100,
      trending: false,
      hotTopics: ["All"],
    },
  },
  {
    id: 3,
    name: "Solana Meme币",
    description: "Meme类型, 24h变化 > 5%",
    filterParams: {
      minHolders: 100000,
      maxHolders: 5000000,
      minDailyTx: 1000,
      maxDailyTx: 10000,
      minVolume: 1000000,
      maxVolume: 10000000,
      tokenType: ["Meme"],
      minSocialScore: 70,
      maxSocialScore: 100,
      narratives: ["Meme"],
      minMentions: 500,
      maxMentions: 5000,
      sentimentPositive: true,
      priceChangeMin: 5,
      priceChangeMax: 50,
      volumeChangeMin: 0,
      volumeChangeMax: 500,
      patternType: "all",
      minFomoIndex: 60,
      maxFomoIndex: 100,
      trending: false,
      hotTopics: ["All"],
    },
  },
]

// 在TokenFilterDashboard组件内，在savedFilters数组后添加以下函数:
// 找到 const savedFilters = [ ... ] 后添加
const formSchema = z.object({
  name: z.string().min(2, { message: "筛选条件名称至少需要2个字符" }).max(50, { message: "筛选条件名称最多50个字符" }),
  description: z.string().max(200, { message: "描述最多200个字符" }).optional(),
})

export function TokenFilterDashboard() {
  // 在TokenFilterDashboard组件内，修改activeFilters的初始状态
  const [activeFilters, setActiveFilters] = useState({
    // 链上数据维度
    minHolders: 100000,
    maxHolders: 5000000,
    minDailyTx: 1000,
    maxDailyTx: 10000,
    minVolume: 1000000,
    maxVolume: 10000000,
    tokenType: ["All"],

    // 社交媒体维度
    minSocialScore: 70,
    maxSocialScore: 100,
    narratives: ["All"],
    minMentions: 500,
    maxMentions: 5000,
    sentimentPositive: true,

    // K线与交易行为维度
    priceChangeMin: -5,
    priceChangeMax: 50,
    volumeChangeMin: 0,
    volumeChangeMax: 500,
    patternType: "all",

    // FOMO指数维度
    minFomoIndex: 60,
    maxFomoIndex: 100,
    trending: false,
    hotTopics: ["All"],
  })

  // 在现有的TokenFilterDashboard函数内，activeFilters状态后添加:
  // 通常在 const [filteredTokens, setFilteredTokens] = useState(tokenData) 后
  const [savedFiltersList, setSavedFiltersList] = useState(savedFilters)
  const [dialogOpen, setDialogOpen] = useState(false)
  // 在 TokenFilterDashboard 组件内，添加一个新的状态来跟踪当前正在编辑的筛选条件
  // 在 const [dialogOpen, setDialogOpen] = useState(false) 这一行后添加:
  const [editingFilter, setEditingFilter] = useState(null)

  const [filteredTokens, setFilteredTokens] = useState(tokenData)
  const [sortConfig, setSortConfig] = useState({ key: "fomoIndex", direction: "desc" })

  // 控制各个筛选面板的展开/折叠状态
  const [panelStates, setPanelStates] = useState({
    onchain: true,
    social: true,
    kline: true,
    fomo: true,
    savedFilters: true,
  })

  // 切换面板状态
  const togglePanel = (panel) => {
    setPanelStates({
      ...panelStates,
      [panel]: !panelStates[panel],
    })
  }

  // 添加保存筛选条件的函数:
  // 修改 saveFilter 函数，使其支持编辑现有筛选条件
  // 替换现有的 saveFilter 函数:
  const saveFilter = (data) => {
    if (editingFilter) {
      // 编辑现有筛选条件
      const updatedFilters = savedFiltersList.map((filter) =>
        filter.id === editingFilter.id
          ? {
              ...filter,
              name: data.name,
              description:
                data.description ||
                `包含 ${activeFilters.tokenType[0]} 代币类型和 ${activeFilters.minFomoIndex}+ FOMO指数`,
              // 保存完整的筛选条件参数
              filterParams: { ...activeFilters },
            }
          : filter,
      )
      setSavedFiltersList(updatedFilters)
      toast({
        title: "筛选条件已更新",
        description: `${data.name} 已成功更新`,
      })
    } else {
      // 创建新筛选条件
      const newFilter = {
        id: savedFiltersList.length + 1,
        name: data.name,
        description:
          data.description || `包含 ${activeFilters.tokenType[0]} 代币类型和 ${activeFilters.minFomoIndex}+ FOMO指数`,
        // 保存完整的筛选条件参数
        filterParams: { ...activeFilters },
      }
      setSavedFiltersList([...savedFiltersList, newFilter])
      toast({
        title: "筛选条件已保存",
        description: `${data.name} 已添加到您的筛选条件列表`,
      })
    }
    setDialogOpen(false)
    setEditingFilter(null)
  }

  // 添加一个新函数来处理编辑筛选条件
  // 在 saveFilter 函数后添加:
  const handleEditFilter = (filter) => {
    setEditingFilter(filter)
    // 如果有保存的筛选参数，加载到当前筛选条件
    if (filter.filterParams) {
      setActiveFilters(filter.filterParams)
    }
    setDialogOpen(true)
  }

  // 添加应用已保存筛选条件的函数:
  const applyPresetFilter = (preset) => {
    // 如果有保存的筛选参数，直接应用
    if (preset.filterParams) {
      setActiveFilters(preset.filterParams)
    } else {
      // 向后兼容旧的预设筛选条件
      if (preset.name === "高FOMO指数代币") {
        setActiveFilters({
          ...activeFilters,
          minFomoIndex: 80,
          minSocialScore: 85,
        })
      } else if (preset.name === "Solana生态DeFi") {
        setActiveFilters({
          ...activeFilters,
          tokenType: ["DeFi"],
          priceChangeMin: 10,
        })
      } else if (preset.name === "Solana Meme币") {
        setActiveFilters({
          ...activeFilters,
          tokenType: ["Meme"],
          priceChangeMin: 5,
        })
      }
    }

    // 应用筛选条件后刷新结果
    applyFilters()
    toast({
      title: "已应用筛选条件",
      description: `已应用 "${preset.name}" 筛选条件`,
    })
  }

  // 修改applyFilters函数中的筛选逻辑
  const applyFilters = () => {
    // 实际应用中这里会根据activeFilters筛选tokenData
    // 这里简单模拟筛选结果
    const filtered = tokenData.filter(
      (token) =>
        token.holders >= activeFilters.minHolders &&
        token.holders <= activeFilters.maxHolders &&
        token.socialscore >= activeFilters.minSocialScore &&
        token.socialscore <= activeFilters.maxSocialScore &&
        token.fomoIndex >= activeFilters.minFomoIndex &&
        token.fomoIndex <= activeFilters.maxFomoIndex &&
        (activeFilters.tokenType.includes("All") || activeFilters.tokenType.includes(token.type)) &&
        (!activeFilters.trending || token.trending),
    )

    // 排序逻辑保持不变
    const sorted = [...filtered].sort((a, b) => {
      if (sortConfig.key === "price") {
        const aPrice = Number.parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
        const bPrice = Number.parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        return sortConfig.direction === "asc" ? aPrice - bPrice : bPrice - aPrice
      }

      if (sortConfig.key === "change24h") {
        const aChange = Number.parseFloat(a.change24h.replace(/[^0-9.-]+/g, ""))
        const bChange = Number.parseFloat(b.change24h.replace(/[^0-9.-]+/g, ""))
        return sortConfig.direction === "asc" ? aChange - bChange : bChange - aChange
      }

      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key]
    })

    setFilteredTokens(sorted)
  }

  // 重置筛选条件
  const resetFilters = () => {
    setActiveFilters({
      minHolders: 0,
      maxHolders: 10000000,
      minDailyTx: 0,
      maxDailyTx: 10000,
      minVolume: 0,
      maxVolume: 10000000,
      tokenType: ["All"],

      minSocialScore: 0,
      maxSocialScore: 100,
      narratives: ["All"],
      minMentions: 0,
      maxMentions: 5000,
      sentimentPositive: false,

      priceChangeMin: -100,
      priceChangeMax: 100,
      volumeChangeMin: -100,
      volumeChangeMax: 500,
      patternType: "all",

      minFomoIndex: 0,
      maxFomoIndex: 100,
      trending: false,
      hotTopics: ["All"],
    })
  }

  // 处理排序
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "desc" ? "asc" : "desc",
    }))
  }

  // 格式化函数
  const formatVolume = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value}`
  }

  const formatPercent = (value: number) => `${value}%`

  return (
    <div className="container mx-auto py-6 bg-trading">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-panel-bg p-2 rounded-full">
            <Coins className="h-8 w-8 text-highlight" />
          </div>
          <div>
            {/* 修改页面标题部分
            // 找到 <h1 className="dashboard-title">代币筛选器</h1> 这一行，替换为： */}
            <h1 className="dashboard-title">Solana代币筛选器</h1>
            <p className="text-muted-foreground">通过多维度指标筛选Solana链上的优质代币</p>
          </div>
        </div>

        {/* 顶部操作栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-panel-bg p-3 rounded-lg shadow-md">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              重置筛选条件
            </Button>
            <Button size="sm" onClick={applyFilters} className="btn-highlight">
              <Filter className="mr-2 h-4 w-4" />
              应用筛选
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-highlight font-medium">找到 {filteredTokens.length} 个代币</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowDownUp className="h-4 w-4" />
                  排序
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>排序方式</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSort("fomoIndex")}>
                  FOMO指数 {sortConfig.key === "fomoIndex" && (sortConfig.direction === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("socialscore")}>
                  社交评分 {sortConfig.key === "socialscore" && (sortConfig.direction === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("holders")}>
                  持有者数量 {sortConfig.key === "holders" && (sortConfig.direction === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("price")}>
                  价格 {sortConfig.key === "price" && (sortConfig.direction === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("change24h")}>
                  24h变化 {sortConfig.key === "change24h" && (sortConfig.direction === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-1">
              <BookmarkIcon className="h-4 w-4" />
              收藏
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
          </div>
        </div>

        {/* 主布局：筛选结果在左上，筛选面板在右上和下方 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* 左上：筛选结果 */}
          <div className="lg:col-span-2">
            <Card className="h-full card-trading">
              <CardHeader className="pb-3 border-b border-chart-grid">
                <CardTitle className="section-title flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-highlight" />
                  筛选结果
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <Table className="table-trading w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-3">代币</TableHead>
                        <TableHead className="p-3">价格</TableHead>
                        <TableHead className="p-3">24h变化</TableHead>
                        <TableHead className="hidden md:table-cell p-3">市值</TableHead>
                        <TableHead className="hidden md:table-cell p-3">持有者</TableHead>
                        <TableHead className="hidden lg:table-cell p-3">社交评分</TableHead>
                        {/* 在表格中添加代币类型列
                        // 找到表格的TableHeader部分，在FOMO指数列后添加代币类型列： */}
                        <TableHead className="hidden lg:table-cell p-3">FOMO指数</TableHead>
                        <TableHead className="hidden lg:table-cell p-3">代币类型</TableHead>
                        <TableHead className="p-3"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-medium p-3">
                            <div className="flex items-center gap-2">
                              {token.symbol}
                              {token.trending && (
                                <Badge className="bg-highlight-alt text-background hover:bg-highlight-alt/90">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  热门
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{token.name}</div>
                          </TableCell>
                          <TableCell className="p-3">{token.price}</TableCell>
                          <TableCell className={`p-3 ${token.change24h.startsWith("+") ? "price-up" : "price-down"}`}>
                            {token.change24h}
                          </TableCell>
                          <TableCell className="hidden md:table-cell p-3">{token.marketCap}</TableCell>
                          <TableCell className="hidden md:table-cell p-3">{token.holders.toLocaleString()}</TableCell>
                          <TableCell className="hidden lg:table-cell p-3">
                            <div className="flex items-center gap-2">
                              <div className="custom-progress">
                                <div className="progress-indicator" style={{ width: `${token.socialscore}%` }}></div>
                              </div>
                              <span>{token.socialscore}</span>
                            </div>
                          </TableCell>
                          {/* 然后在TableBody的对应位置添加代币类型单元格： */}
                          <TableCell className="hidden lg:table-cell p-3">
                            <div className="flex items-center gap-2">
                              <div className={cn("custom-progress", token.fomoIndex > 80 ? "fomo-progress" : "")}>
                                <div className="progress-indicator" style={{ width: `${token.fomoIndex}%` }}></div>
                              </div>
                              <span>{token.fomoIndex}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell p-3">
                            <Badge variant="outline" className="border-chart-grid">
                              {token.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="p-3">
                            <Button variant="ghost" size="sm">
                              详情
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右上：快速筛选和已保存的筛选条件 */}
          <div className="space-y-4">
            {/* 快速筛选 */}
            <Card className="panel-trading">
              <CardHeader className="pb-2 border-b border-chart-grid">
                <CardTitle className="section-title flex items-center gap-2">
                  <Filter className="h-5 w-5 text-highlight" />
                  快速筛选
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block text-highlight">最小FOMO指数</Label>
                    <Select
                      value={activeFilters.minFomoIndex.toString()}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, minFomoIndex: Number(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择FOMO指数" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">不限</SelectItem>
                        <SelectItem value="50">50+</SelectItem>
                        <SelectItem value="70">70+</SelectItem>
                        <SelectItem value="80">80+</SelectItem>
                        <SelectItem value="90">90+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block text-highlight">代币类型</Label>
                    <Select
                      value={activeFilters.tokenType[0]}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, tokenType: [value] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择代币类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">所有类型</SelectItem>
                        <SelectItem value="Native">原生代币</SelectItem>
                        <SelectItem value="Meme">Meme币</SelectItem>
                        <SelectItem value="DeFi">DeFi代币</SelectItem>
                        <SelectItem value="Oracle">预言机</SelectItem>
                        <SelectItem value="AI">AI相关</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block text-highlight">叙事类别</Label>
                    <Select
                      value={activeFilters.narratives[0]}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, narratives: [value] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择叙事" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">所有叙事</SelectItem>
                        <SelectItem value="AI">人工智能</SelectItem>
                        <SelectItem value="Layer2">Layer 2</SelectItem>
                        <SelectItem value="DeFi">DeFi</SelectItem>
                        <SelectItem value="Meme">Meme币</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block text-highlight">价格变化</Label>
                    <Select
                      value={activeFilters.priceChangeMin.toString()}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, priceChangeMin: Number(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择价格变化" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-100">不限</SelectItem>
                        <SelectItem value="0">正增长</SelectItem>
                        <SelectItem value="5">大于 5%</SelectItem>
                        <SelectItem value="10">大于 10%</SelectItem>
                        <SelectItem value="25">大于 25%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trending"
                    checked={activeFilters.trending}
                    onCheckedChange={(checked) => setActiveFilters({ ...activeFilters, trending: checked })}
                    className="data-[state=checked]:bg-highlight"
                  />
                  <Label htmlFor="trending" className="font-medium">
                    仅显示热门代币
                  </Label>
                </div>
                <Button className="w-full btn-highlight mt-2" onClick={applyFilters}>
                  应用快速筛选
                </Button>
              </CardContent>
            </Card>

            {/* 已保存的筛选条件 */}
            <Card className="panel-trading">
              <CardHeader className="pb-2 border-b border-chart-grid">
                <CardTitle className="section-title flex items-center gap-2">
                  <BookmarkIcon className="h-5 w-5 text-highlight" />
                  已保存的筛选条件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {savedFiltersList.map((filter) => (
                  <div
                    key={filter.id}
                    className="flex items-center justify-between rounded-lg border border-chart-grid p-3 hover:bg-secondary/10"
                  >
                    <div>
                      <h4 className="font-medium text-highlight">{filter.name}</h4>
                      <p className="text-xs text-muted-foreground">{filter.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditFilter(filter)}>
                        编辑
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => applyPresetFilter(filter)}>
                        应用
                      </Button>
                    </div>
                  </div>
                ))}

                <>
                  <Button
                    variant="outline"
                    className="w-full gap-1 mt-2"
                    onClick={() => {
                      setEditingFilter(null)
                      setDialogOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    创建新筛选条件
                  </Button>

                  {dialogOpen && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-panel-bg border-chart-grid">
                        <DialogHeader>
                          <DialogTitle className="text-highlight">
                            {editingFilter ? "编辑筛选条件" : "创建新筛选条件"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingFilter
                              ? "修改筛选条件设置，以便日后快速应用。"
                              : "保存您当前的筛选设置，以便日后快速应用。"}
                          </DialogDescription>
                        </DialogHeader>
                        <CreateFilterForm
                          onSave={saveFilter}
                          onCancel={() => {
                            setDialogOpen(false)
                            setEditingFilter(null)
                          }}
                          activeFilters={activeFilters}
                          setActiveFilters={setActiveFilters}
                          editingFilter={editingFilter}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              </CardContent>
            </Card>
          </div>

          {/* 下方：详细筛选面板 */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 链上数据维度 */}
            <Card className="panel-trading">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-chart-grid">
                <CardTitle className="section-title">
                  <div className="flex items-center gap-2">
                    <GanttChartSquare className="h-5 w-5 text-highlight" />
                    链上数据维度
                  </div>
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => togglePanel("onchain")}>
                  {panelStates.onchain ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <Collapsible open={panelStates.onchain}>
                <CardContent className="space-y-4 pt-4 p-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">持有者数量范围</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.minHolders.toLocaleString()} - {activeFilters.maxHolders.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minHolders}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minHolders: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxHolders}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxHolders: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">日交易量范围</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.minDailyTx.toLocaleString()} - {activeFilters.maxDailyTx.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minDailyTx}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minDailyTx: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxDailyTx}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxDailyTx: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">交易额范围 (USD)</Label>
                      <span className="text-xs text-muted-foreground">
                        ${activeFilters.minVolume.toLocaleString()} - ${activeFilters.maxVolume.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minVolume}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minVolume: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxVolume}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxVolume: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Collapsible>
            </Card>

            {/* 社交媒体维度 */}
            <Card className="panel-trading">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-chart-grid">
                <CardTitle className="section-title">
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="h-5 w-5 text-highlight" />
                    社交媒体维度
                  </div>
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => togglePanel("social")}>
                  {panelStates.social ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <Collapsible open={panelStates.social}>
                <CardContent className="space-y-4 pt-4 p-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">社交评分范围</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.minSocialScore} - {activeFilters.maxSocialScore}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minSocialScore}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minSocialScore: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxSocialScore}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxSocialScore: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">提及次数范围 (24h)</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.minMentions} - {activeFilters.maxMentions}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minMentions}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minMentions: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxMentions}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxMentions: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sentiment"
                      checked={activeFilters.sentimentPositive}
                      onCheckedChange={(checked) => setActiveFilters({ ...activeFilters, sentimentPositive: checked })}
                      className="border-highlight data-[state=checked]:bg-highlight data-[state=checked]:text-primary-foreground"
                    />
                    <label
                      htmlFor="sentiment"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      仅显示正面情绪
                    </label>
                  </div>
                </CardContent>
              </Collapsible>
            </Card>

            {/* K线与交易行为维度 */}
            <Card className="panel-trading">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-chart-grid">
                <CardTitle className="section-title">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-highlight" />
                    K线与交易行为维度
                  </div>
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => togglePanel("kline")}>
                  {panelStates.kline ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <Collapsible open={panelStates.kline}>
                <CardContent className="space-y-4 pt-4 p-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">价格变化范围 (24h)</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.priceChangeMin}% - {activeFilters.priceChangeMax}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.priceChangeMin}
                        onChange={(e) =>
                          setActiveFilters({
                            ...activeFilters,
                            priceChangeMin: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.priceChangeMax}
                        onChange={(e) =>
                          setActiveFilters({
                            ...activeFilters,
                            priceChangeMax: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight">交易量变化范围 (24h)</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.volumeChangeMin}% - {activeFilters.volumeChangeMax}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.volumeChangeMin}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, volumeChangeMin: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.volumeChangeMax}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, volumeChangeMax: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-highlight">K线形态</Label>
                    <RadioGroup
                      value={activeFilters.patternType}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, patternType: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" className="border-highlight text-highlight" />
                        <Label htmlFor="all">所有形态</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bullish" id="bullish" className="border-highlight text-highlight" />
                        <Label htmlFor="bullish">看涨形态</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bearish" id="bearish" className="border-highlight text-highlight" />
                        <Label htmlFor="bearish">看跌形态</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Collapsible>
            </Card>

            {/* FOMO指数维度 */}
            <Card className="panel-trading">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-chart-grid">
                <CardTitle className="section-title">
                  <div className="flex items-center gap-2">
                    <FlameIcon className="h-5 w-5 text-highlight-alt" />
                    FOMO指数维度
                  </div>
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => togglePanel("fomo")}>
                  {panelStates.fomo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <Collapsible open={panelStates.fomo}>
                <CardContent className="space-y-4 pt-4 p-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-highlight-alt">FOMO指数范围</Label>
                      <span className="text-xs text-muted-foreground">
                        {activeFilters.minFomoIndex} - {activeFilters.maxFomoIndex}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="最小值"
                        value={activeFilters.minFomoIndex}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, minFomoIndex: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="最大值"
                        value={activeFilters.maxFomoIndex}
                        onChange={(e) =>
                          setActiveFilters({ ...activeFilters, maxFomoIndex: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-highlight-alt">热点主题</Label>
                    <Select
                      value={activeFilters.hotTopics[0]}
                      onValueChange={(value) => setActiveFilters({ ...activeFilters, hotTopics: [value] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择热点" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">所有热点</SelectItem>
                        <SelectItem value="Airdrops">空投</SelectItem>
                        <SelectItem value="NFT">NFT</SelectItem>
                        <SelectItem value="DeFi2.0">DeFi 2.0</SelectItem>
                        <SelectItem value="Metaverse">元宇宙</SelectItem>
                        <SelectItem value="RealYield">实际收益</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-highlight-alt">FOMO增长率</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择增长率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">任意</SelectItem>
                        <SelectItem value="positive">正增长</SelectItem>
                        <SelectItem value="10percent">大于 10%</SelectItem>
                        <SelectItem value="25percent">大于 25%</SelectItem>
                        <SelectItem value="50percent">大于 50%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Collapsible>
            </Card>
          </div>

          {/* 热门叙事分析 */}
          <div className="lg:col-span-3">
            <Card className="panel-trading">
              <CardHeader className="pb-2 border-b border-chart-grid">
                <CardTitle className="section-title flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-highlight-alt" />
                  热门叙事分析
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-highlight-alt">Meme币</div>
                      <div className="text-sm text-muted-foreground">95</div>
                    </div>
                    <div className="custom-progress fomo-progress">
                      <div className="progress-indicator" style={{ width: "95%" }}></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        PEPE
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        DOGE
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        SHIB
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-highlight">AI</div>
                      <div className="text-sm text-muted-foreground">92</div>
                    </div>
                    <div className="custom-progress">
                      <div className="progress-indicator" style={{ width: "92%" }}></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        FET
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        AGIX
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        GLQ
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-highlight">Layer 2</div>
                      <div className="text-sm text-muted-foreground">85</div>
                    </div>
                    <div className="custom-progress">
                      <div className="progress-indicator" style={{ width: "85%" }}></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        ARB
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        OP
                      </Badge>
                      <Badge variant="outline" className="text-xs border-chart-grid">
                        MATIC
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// 在return语句之前，添加CreateFilterForm组件:
// 修改 CreateFilterForm 组件的定义，将 activeFilters 作为参数传递
// 修改 CreateFilterForm 组件，使其支持编辑模式
// 找到 CreateFilterForm 组件定义，替换为:
function CreateFilterForm({ onSave, onCancel, activeFilters, setActiveFilters, editingFilter }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editingFilter ? editingFilter.name : "",
      description: editingFilter ? editingFilter.description : "",
    },
  })

  // 当前选中的维度选项卡
  const [activeTab, setActiveTab] = useState("basic")

  // 当 editingFilter 改变时重置表单
  React.useEffect(() => {
    if (editingFilter) {
      form.reset({
        name: editingFilter.name,
        description: editingFilter.description,
      })
    } else {
      form.reset({
        name: "",
        description: "",
      })
    }
  }, [editingFilter, form])

  function onSubmit(data) {
    onSave(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-highlight">筛选条件名称</FormLabel>
                <FormControl>
                  <Input placeholder="例如：高潜力DeFi代币" {...field} />
                </FormControl>
                <FormDescription>为您的筛选条件起一个容易识别的名称</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-highlight">描述（可选）</FormLabel>
                <FormControl>
                  <Textarea placeholder="描述这个筛选条件的特点和用途" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 使用选项卡组织四个维度的参数 */}
        <div className="space-y-4">
          <h4 className="font-medium text-highlight">筛选条件参数</h4>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="text-xs">
                基本信息
              </TabsTrigger>
              <TabsTrigger value="onchain" className="text-xs">
                链上数据
              </TabsTrigger>
              <TabsTrigger value="social" className="text-xs">
                社交媒体
              </TabsTrigger>
              <TabsTrigger value="kline" className="text-xs">
                K线与FOMO
              </TabsTrigger>
            </TabsList>

            {/* 基本信息选项卡 */}
            <TabsContent value="basic" className="space-y-4 pt-4">
              {/* 代币类型 */}
              <div>
                <Label className="mb-2 block text-highlight">代币类型</Label>
                <Select
                  value={activeFilters.tokenType[0]}
                  onValueChange={(value) => setActiveFilters({ ...activeFilters, tokenType: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择代币类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">所有类型</SelectItem>
                    <SelectItem value="Native">原生代币</SelectItem>
                    <SelectItem value="Meme">Meme币</SelectItem>
                    <SelectItem value="DeFi">DeFi代币</SelectItem>
                    <SelectItem value="Oracle">预言机</SelectItem>
                    <SelectItem value="AI">AI相关</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 热门代币 */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="trending-edit"
                  checked={activeFilters.trending}
                  onCheckedChange={(checked) => setActiveFilters({ ...activeFilters, trending: checked })}
                  className="data-[state=checked]:bg-highlight"
                />
                <Label htmlFor="trending-edit" className="font-medium">
                  仅显示热门代币
                </Label>
              </div>
            </TabsContent>

            {/* 链上数据选项卡 */}
            <TabsContent value="onchain" className="space-y-4 pt-4">
              {/* 持有者数量 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">持有者数量范围</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.minHolders.toLocaleString()} - {activeFilters.maxHolders.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minHolders}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minHolders: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxHolders}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxHolders: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 日交易量 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">日交易量范围</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.minDailyTx.toLocaleString()} - {activeFilters.maxDailyTx.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minDailyTx}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minDailyTx: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxDailyTx}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxDailyTx: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 交易额 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">交易额范围 (USD)</Label>
                  <span className="text-xs text-muted-foreground">
                    ${activeFilters.minVolume.toLocaleString()} - ${activeFilters.maxVolume.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minVolume}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minVolume: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxVolume}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxVolume: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* 社交媒体选项卡 */}
            <TabsContent value="social" className="space-y-4 pt-4">
              {/* 社交评分 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">社交评分范围</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.minSocialScore} - {activeFilters.maxSocialScore}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minSocialScore}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minSocialScore: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxSocialScore}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxSocialScore: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 提及次数 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">提及次数范围 (24h)</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.minMentions} - {activeFilters.maxMentions}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minMentions}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minMentions: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxMentions}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxMentions: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 叙事类别 */}
              <div>
                <Label className="mb-2 block text-highlight">叙事类别</Label>
                <Select
                  value={activeFilters.narratives[0]}
                  onValueChange={(value) => setActiveFilters({ ...activeFilters, narratives: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择叙事" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">所有叙事</SelectItem>
                    <SelectItem value="AI">人工智能</SelectItem>
                    <SelectItem value="Layer2">Layer 2</SelectItem>
                    <SelectItem value="DeFi">DeFi</SelectItem>
                    <SelectItem value="Meme">Meme币</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 情绪 */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sentiment-edit"
                  checked={activeFilters.sentimentPositive}
                  onCheckedChange={(checked) => setActiveFilters({ ...activeFilters, sentimentPositive: checked })}
                  className="border-highlight data-[state=checked]:bg-highlight data-[state=checked]:text-primary-foreground"
                />
                <label
                  htmlFor="sentiment-edit"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  仅显示正面情绪
                </label>
              </div>
            </TabsContent>

            {/* K线与FOMO选项卡 */}
            <TabsContent value="kline" className="space-y-4 pt-4">
              {/* 价格变化 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">价格变化范围 (24h)</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.priceChangeMin}% - {activeFilters.priceChangeMax}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.priceChangeMin}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, priceChangeMin: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.priceChangeMax}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, priceChangeMax: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 交易量变化 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight">交易量变化范围 (24h)</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.volumeChangeMin}% - {activeFilters.volumeChangeMax}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.volumeChangeMin}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, volumeChangeMin: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.volumeChangeMax}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, volumeChangeMax: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* K线形态 */}
              <div className="space-y-2">
                <Label className="text-highlight">K线形态</Label>
                <RadioGroup
                  value={activeFilters.patternType}
                  onValueChange={(value) => setActiveFilters({ ...activeFilters, patternType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-edit" className="border-highlight text-highlight" />
                    <Label htmlFor="all-edit">所有形态</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bullish" id="bullish-edit" className="border-highlight text-highlight" />
                    <Label htmlFor="bullish-edit">看涨形态</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bearish" id="bearish-edit" className="border-highlight text-highlight" />
                    <Label htmlFor="bearish-edit">看跌形态</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* FOMO指数 */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-highlight-alt">FOMO指数范围</Label>
                  <span className="text-xs text-muted-foreground">
                    {activeFilters.minFomoIndex} - {activeFilters.maxFomoIndex}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="最小值"
                    value={activeFilters.minFomoIndex}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, minFomoIndex: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="最大值"
                    value={activeFilters.maxFomoIndex}
                    onChange={(e) =>
                      setActiveFilters({ ...activeFilters, maxFomoIndex: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* 热点主题 */}
              <div>
                <Label className="mb-2 block text-highlight-alt">热点主题</Label>
                <Select
                  value={activeFilters.hotTopics[0]}
                  onValueChange={(value) => setActiveFilters({ ...activeFilters, hotTopics: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择热点" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">所有热点</SelectItem>
                    <SelectItem value="Airdrops">空投</SelectItem>
                    <SelectItem value="NFT">NFT</SelectItem>
                    <SelectItem value="DeFi2.0">DeFi 2.0</SelectItem>
                    <SelectItem value="Metaverse">元宇宙</SelectItem>
                    <SelectItem value="RealYield">实际收益</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 添加实时预览区域 */}
        <div className="mt-6 p-4 border border-chart-grid rounded-lg bg-secondary/10">
          <h4 className="font-medium text-highlight mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            实时预览
          </h4>
          <PreviewResults activeFilters={activeFilters} />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} className="mt-2">
            取消
          </Button>
          <Button type="submit" className="btn-highlight mt-2">
            {editingFilter ? "更新筛选条件" : "保存筛选条件"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

// 实时预览结果组件
function PreviewResults({ activeFilters }) {
  // 根据当前筛选条件计算符合条件的代币
  const matchingTokens = tokenData.filter(
    (token) =>
      token.holders >= activeFilters.minHolders &&
      token.holders <= activeFilters.maxHolders &&
      token.socialscore >= activeFilters.minSocialScore &&
      token.socialscore <= activeFilters.maxSocialScore &&
      token.fomoIndex >= activeFilters.minFomoIndex &&
      token.fomoIndex <= activeFilters.maxFomoIndex &&
      (activeFilters.tokenType.includes("All") || activeFilters.tokenType.includes(token.type)) &&
      (!activeFilters.trending || token.trending),
  )

  // 获取前3个匹配的代币作为示例
  const exampleTokens = matchingTokens.slice(0, 3)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm">符合条件的代币数量:</span>
        <Badge className="bg-highlight text-background">{matchingTokens.length} 个代币</Badge>
      </div>

      {matchingTokens.length > 0 ? (
        <>
          <div className="text-sm text-muted-foreground mb-2">示例代币:</div>
          <div className="space-y-2">
            {exampleTokens.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-2 rounded-md bg-secondary/5 border border-chart-grid"
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-xs text-muted-foreground">{token.name}</div>
                  {token.trending && <Badge className="bg-highlight-alt text-background text-xs">热门</Badge>}
                </div>
                <div className="flex items-center gap-3">
                  <div className={token.change24h.startsWith("+") ? "text-price-up" : "text-price-down"}>
                    {token.change24h}
                  </div>
                  <div className="text-sm">{token.price}</div>
                </div>
              </div>
            ))}
          </div>

          {matchingTokens.length > 3 && (
            <div className="text-xs text-muted-foreground text-center mt-2">
              还有 {matchingTokens.length - 3} 个代币符合条件
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-4 text-muted-foreground">没有代币符合当前筛选条件，请尝试调整参数</div>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant="outline" className="text-xs border-chart-grid">
          {activeFilters.tokenType[0]} 类型
        </Badge>
        <Badge variant="outline" className="text-xs border-chart-grid">
          FOMO指数 {activeFilters.minFomoIndex}+
        </Badge>
        <Badge variant="outline" className="text-xs border-chart-grid">
          社交评分 {activeFilters.minSocialScore}+
        </Badge>
        {activeFilters.trending && (
          <Badge variant="outline" className="text-xs border-chart-grid">
            仅热门代币
          </Badge>
        )}
      </div>
    </div>
  )
}
