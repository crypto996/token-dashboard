"use client"

import { useState } from "react"
import {
  ArrowDownUp,
  BookmarkIcon,
  ChevronDown,
  Filter,
  FlameIcon,
  GanttChartSquare,
  LineChart,
  MessageSquareText,
  Plus,
  Save,
  Share2,
  Trash2,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// 示例代币数据
const tokenData = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: "$43,120",
    change24h: "+2.3%",
    marketCap: "$836B",
    volume24h: "$24.5B",
    holders: 4200000,
    socialscore: 95,
    fomoIndex: 82,
    trending: true,
    chain: "Bitcoin",
  },
  {
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: "$2,215",
    change24h: "+1.7%",
    marketCap: "$266B",
    volume24h: "$12.7B",
    holders: 2800000,
    socialscore: 89,
    fomoIndex: 75,
    trending: true,
    chain: "Ethereum",
  },
  {
    id: 3,
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
    chain: "Solana",
  },
  {
    id: 4,
    symbol: "ARB",
    name: "Arbitrum",
    price: "$1.23",
    change24h: "+0.8%",
    marketCap: "$1.57B",
    volume24h: "$520M",
    holders: 240000,
    socialscore: 78,
    fomoIndex: 66,
    trending: false,
    chain: "Ethereum",
  },
  {
    id: 5,
    symbol: "DOGE",
    name: "Dogecoin",
    price: "$0.12",
    change24h: "-1.2%",
    marketCap: "$16B",
    volume24h: "$980M",
    holders: 4600000,
    socialscore: 85,
    fomoIndex: 70,
    trending: false,
    chain: "Dogecoin",
  },
  {
    id: 6,
    symbol: "PEPE",
    name: "Pepe",
    price: "$0.000012",
    change24h: "+15.7%",
    marketCap: "$5.1B",
    volume24h: "$1.2B",
    holders: 120000,
    socialscore: 97,
    fomoIndex: 94,
    trending: true,
    chain: "Ethereum",
  },
  {
    id: 7,
    symbol: "MATIC",
    name: "Polygon",
    price: "$0.58",
    change24h: "-0.5%",
    marketCap: "$5.4B",
    volume24h: "$320M",
    holders: 560000,
    socialscore: 76,
    fomoIndex: 62,
    trending: false,
    chain: "Polygon",
  },
]

// 预设筛选条件
const savedFilters = [
  { id: 1, name: "高FOMO指数代币", description: "FOMO指数 > 80, 社交评分 > 85" },
  { id: 2, name: "新兴叙事代币", description: "AI和Layer2相关, 持有者增长 > 10%" },
  { id: 3, name: "大额持有者增长", description: "持有者数量 > 500K, 24h变化 > 5%" },
]

export function TokenFilterPanel() {
  const [activeFilters, setActiveFilters] = useState({
    // 链上数据维度
    minHolders: 100000,
    maxHolders: 5000000,
    minDailyTx: 1000,
    minVolume: 1000000,
    chains: ["Ethereum"],

    // 社交媒体维度
    minSocialScore: 70,
    narratives: ["All"],
    minMentions: 500,
    sentimentPositive: true,

    // K线与交易行为维度
    priceChangeMin: -5,
    priceChangeMax: 50,
    volumeChangeMin: 0,
    patternType: "all",

    // FOMO指数维度
    minFomoIndex: 60,
    trending: false,
    hotTopics: ["All"],
  })

  const [filteredTokens, setFilteredTokens] = useState(tokenData)
  const [sortConfig, setSortConfig] = useState({ key: "fomoIndex", direction: "desc" })

  // 应用筛选条件
  const applyFilters = () => {
    // 实际应用中这里会根据activeFilters筛选tokenData
    // 这里简单模拟筛选结果
    const filtered = tokenData.filter(
      (token) =>
        token.holders >= activeFilters.minHolders &&
        token.holders <= activeFilters.maxHolders &&
        token.socialscore >= activeFilters.minSocialScore &&
        token.fomoIndex >= activeFilters.minFomoIndex &&
        (activeFilters.chains.includes("All") || activeFilters.chains.includes(token.chain)) &&
        (!activeFilters.trending || token.trending),
    )

    // 排序
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
      minVolume: 0,
      chains: ["All"],

      minSocialScore: 0,
      narratives: ["All"],
      minMentions: 0,
      sentimentPositive: false,

      priceChangeMin: -100,
      priceChangeMax: 100,
      volumeChangeMin: -100,
      patternType: "all",

      minFomoIndex: 0,
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">代币筛选器</h1>
          <p className="text-muted-foreground">通过多维度指标筛选潜在的优质代币</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">
          {/* 筛选面板 */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>筛选条件</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      重置
                    </Button>
                    <Button size="sm" onClick={applyFilters}>
                      <Filter className="mr-2 h-4 w-4" />
                      应用
                    </Button>
                  </div>
                </div>
                <CardDescription>自定义多维度筛选条件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="onchain">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="onchain" className="text-xs">
                      链上数据
                    </TabsTrigger>
                    <TabsTrigger value="social" className="text-xs">
                      社交媒体
                    </TabsTrigger>
                    <TabsTrigger value="kline" className="text-xs">
                      K线行为
                    </TabsTrigger>
                    <TabsTrigger value="fomo" className="text-xs">
                      FOMO指数
                    </TabsTrigger>
                  </TabsList>

                  {/* 链上数据维度 */}
                  <TabsContent value="onchain" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>持有者数量范围</Label>
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
                          <Label>最小日交易量</Label>
                          <span className="text-xs text-muted-foreground">
                            {activeFilters.minDailyTx.toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={[activeFilters.minDailyTx]}
                          min={0}
                          max={10000}
                          step={100}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, minDailyTx: value[0] })}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>最小交易额 (USD)</Label>
                          <span className="text-xs text-muted-foreground">
                            ${activeFilters.minVolume.toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={[activeFilters.minVolume]}
                          min={0}
                          max={10000000}
                          step={100000}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, minVolume: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>区块链</Label>
                        <Select
                          value={activeFilters.chains[0]}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, chains: [value] })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择区块链" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">所有链</SelectItem>
                            <SelectItem value="Ethereum">以太坊</SelectItem>
                            <SelectItem value="Solana">索拉纳</SelectItem>
                            <SelectItem value="BNB Chain">币安智能链</SelectItem>
                            <SelectItem value="Polygon">Polygon</SelectItem>
                            <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                            <SelectItem value="Optimism">Optimism</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>持有者增长率</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择增长率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">任意</SelectItem>
                            <SelectItem value="positive">正增长</SelectItem>
                            <SelectItem value="5percent">大于 5%</SelectItem>
                            <SelectItem value="10percent">大于 10%</SelectItem>
                            <SelectItem value="25percent">大于 25%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 社交媒体维度 */}
                  <TabsContent value="social" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>最小社交评分</Label>
                          <span className="text-xs text-muted-foreground">{activeFilters.minSocialScore}</span>
                        </div>
                        <Slider
                          value={[activeFilters.minSocialScore]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, minSocialScore: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>叙事类别</Label>
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
                            <SelectItem value="GameFi">GameFi</SelectItem>
                            <SelectItem value="RWA">实物资产</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>最小提及次数 (24h)</Label>
                          <span className="text-xs text-muted-foreground">{activeFilters.minMentions}</span>
                        </div>
                        <Slider
                          value={[activeFilters.minMentions]}
                          min={0}
                          max={5000}
                          step={100}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, minMentions: value[0] })}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sentiment"
                          checked={activeFilters.sentimentPositive}
                          onCheckedChange={(checked) =>
                            setActiveFilters({ ...activeFilters, sentimentPositive: checked })
                          }
                        />
                        <label
                          htmlFor="sentiment"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          仅显示正面情绪
                        </label>
                      </div>

                      <div className="space-y-2">
                        <Label>社交平台</Label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer">
                            Twitter
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Telegram
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Discord
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Reddit
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* K线与交易行为维度 */}
                  <TabsContent value="kline" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>价格变化范围 (24h)</Label>
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
                          <Label>最小交易量变化 (24h)</Label>
                          <span className="text-xs text-muted-foreground">{activeFilters.volumeChangeMin}%</span>
                        </div>
                        <Slider
                          value={[activeFilters.volumeChangeMin]}
                          min={-100}
                          max={500}
                          step={5}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, volumeChangeMin: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>K线形态</Label>
                        <RadioGroup
                          value={activeFilters.patternType}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, patternType: value })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all">所有形态</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bullish" id="bullish" />
                            <Label htmlFor="bullish">看涨形态</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bearish" id="bearish" />
                            <Label htmlFor="bearish">看跌形态</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="breakout" id="breakout" />
                            <Label htmlFor="breakout">突破形态</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>时间范围</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择时间范围" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">24小时</SelectItem>
                            <SelectItem value="7d">7天</SelectItem>
                            <SelectItem value="30d">30天</SelectItem>
                            <SelectItem value="90d">90天</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* FOMO指数维度 */}
                  <TabsContent value="fomo" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>最小FOMO指数</Label>
                          <span className="text-xs text-muted-foreground">{activeFilters.minFomoIndex}</span>
                        </div>
                        <Slider
                          value={[activeFilters.minFomoIndex]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => setActiveFilters({ ...activeFilters, minFomoIndex: value[0] })}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="trending"
                          checked={activeFilters.trending}
                          onCheckedChange={(checked) => setActiveFilters({ ...activeFilters, trending: checked })}
                        />
                        <Label htmlFor="trending">仅显示热门代币</Label>
                      </div>

                      <div className="space-y-2">
                        <Label>热点主题</Label>
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
                        <Label>FOMO增长率</Label>
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
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" className="gap-1">
                  <Save className="h-4 w-4" />
                  保存筛选条件
                </Button>
                <Button variant="outline" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  分享
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>已保存的筛选条件</CardTitle>
                <CardDescription>快速应用常用筛选条件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <h4 className="font-medium">{filter.name}</h4>
                        <p className="text-xs text-muted-foreground">{filter.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        应用
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full gap-1 mt-2">
                    <Plus className="h-4 w-4" />
                    创建新筛选条件
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 筛选结果 */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>筛选结果</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">找到 {filteredTokens.length} 个代币</span>
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
                  </div>
                </div>
                <CardDescription>符合筛选条件的代币列表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>代币</TableHead>
                        <TableHead>价格</TableHead>
                        <TableHead>24h变化</TableHead>
                        <TableHead className="hidden md:table-cell">市值</TableHead>
                        <TableHead className="hidden md:table-cell">持有者</TableHead>
                        <TableHead className="hidden lg:table-cell">社交评分</TableHead>
                        <TableHead className="hidden lg:table-cell">FOMO指数</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {token.symbol}
                              {token.trending && (
                                <Badge className="bg-amber-600 hover:bg-amber-700">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  热门
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{token.name}</div>
                          </TableCell>
                          <TableCell>{token.price}</TableCell>
                          <TableCell className={token.change24h.startsWith("+") ? "text-green-500" : "text-red-500"}>
                            {token.change24h}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{token.marketCap}</TableCell>
                          <TableCell className="hidden md:table-cell">{token.holders.toLocaleString()}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-12 rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${token.socialscore}%` }}
                                ></div>
                              </div>
                              <span>{token.socialscore}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-12 rounded-full bg-muted">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    token.fomoIndex > 80 ? "bg-amber-600" : "bg-primary",
                                  )}
                                  style={{ width: `${token.fomoIndex}%` }}
                                ></div>
                              </div>
                              <span>{token.fomoIndex}</span>
                            </div>
                          </TableCell>
                          <TableCell>
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>筛选条件摘要</CardTitle>
                  <CardDescription>当前应用的筛选条件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GanttChartSquare className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">链上数据维度</h4>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1 pl-6">
                          <p className="text-xs">
                            持有者数量: {activeFilters.minHolders.toLocaleString()} -{" "}
                            {activeFilters.maxHolders.toLocaleString()}
                          </p>
                          <p className="text-xs">最小日交易量: {activeFilters.minDailyTx.toLocaleString()}</p>
                          <p className="text-xs">最小交易额: ${activeFilters.minVolume.toLocaleString()}</p>
                          <p className="text-xs">区块链: {activeFilters.chains.join(", ")}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquareText className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">社交媒体维度</h4>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1 pl-6">
                          <p className="text-xs">最小社交评分: {activeFilters.minSocialScore}</p>
                          <p className="text-xs">叙事类别: {activeFilters.narratives.join(", ")}</p>
                          <p className="text-xs">最小提及次数: {activeFilters.minMentions}</p>
                          <p className="text-xs">情绪: {activeFilters.sentimentPositive ? "仅正面" : "所有"}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LineChart className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">K线与交易行为维度</h4>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1 pl-6">
                          <p className="text-xs">
                            价格变化范围: {activeFilters.priceChangeMin}% - {activeFilters.priceChangeMax}%
                          </p>
                          <p className="text-xs">最小交易量变化: {activeFilters.volumeChangeMin}%</p>
                          <p className="text-xs">K线形态: {activeFilters.patternType}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FlameIcon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">FOMO指数维度</h4>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1 pl-6">
                          <p className="text-xs">最小FOMO指数: {activeFilters.minFomoIndex}</p>
                          <p className="text-xs">热门代币: {activeFilters.trending ? "是" : "所有"}</p>
                          <p className="text-xs">热点主题: {activeFilters.hotTopics.join(", ")}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>热门叙事</CardTitle>
                  <CardDescription>当前市场主导叙事</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Meme币</div>
                        <div className="text-sm text-muted-foreground">95</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[95%] rounded-full bg-amber-600"></div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          PEPE
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          DOGE
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          SHIB
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">AI</div>
                        <div className="text-sm text-muted-foreground">92</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[92%] rounded-full bg-primary"></div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          FET
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          AGIX
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          GLQ
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Layer 2</div>
                        <div className="text-sm text-muted-foreground">85</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[85%] rounded-full bg-primary"></div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          ARB
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          OP
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          MATIC
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">GameFi</div>
                        <div className="text-sm text-muted-foreground">82</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[82%] rounded-full bg-primary"></div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          AXS
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          GALA
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          IMX
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
    </div>
  )
}
