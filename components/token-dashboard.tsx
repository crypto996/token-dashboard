"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { CandlestickChartIcon as CandlestickIcon, Filter, RefreshCcw, TrendingUp, Twitter } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const onChainData = [
  { date: "2023-07-01", holders: 320, transactions: 154, volume: 1200 },
  { date: "2023-07-02", holders: 340, transactions: 142, volume: 1100 },
  { date: "2023-07-03", holders: 350, transactions: 164, volume: 1300 },
  { date: "2023-07-04", holders: 380, transactions: 194, volume: 1500 },
  { date: "2023-07-05", holders: 430, transactions: 264, volume: 1700 },
  { date: "2023-07-06", holders: 450, transactions: 230, volume: 1600 },
  { date: "2023-07-07", holders: 470, transactions: 314, volume: 1900 },
]

const socialSentiment = [
  { date: "2023-07-01", sentiment: 43, mentions: 120 },
  { date: "2023-07-02", sentiment: 52, mentions: 135 },
  { date: "2023-07-03", sentiment: 64, mentions: 170 },
  { date: "2023-07-04", sentiment: 72, mentions: 210 },
  { date: "2023-07-05", sentiment: 83, mentions: 320 },
  { date: "2023-07-06", sentiment: 78, mentions: 280 },
  { date: "2023-07-07", sentiment: 85, mentions: 350 },
]

const klineData = [
  { date: "2023-07-01", price: 1.2, volume: 12000, high: 1.3, low: 1.1 },
  { date: "2023-07-02", price: 1.25, volume: 14000, high: 1.35, low: 1.2 },
  { date: "2023-07-03", price: 1.4, volume: 18000, high: 1.45, low: 1.22 },
  { date: "2023-07-04", price: 1.45, volume: 20000, high: 1.5, low: 1.4 },
  { date: "2023-07-05", price: 1.6, volume: 25000, high: 1.65, low: 1.48 },
  { date: "2023-07-06", price: 1.55, volume: 22000, high: 1.62, low: 1.52 },
  { date: "2023-07-07", price: 1.7, volume: 30000, high: 1.75, low: 1.58 },
]

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
  },
]

const narratives = [
  { name: "AI", tokens: ["GraphLinq", "Fetch.ai", "SingularityNET"], score: 92 },
  { name: "Layer 2", tokens: ["Arbitrum", "Optimism", "zkSync"], score: 85 },
  { name: "DeFi", tokens: ["Uniswap", "Aave", "Compound"], score: 78 },
  { name: "Meme Coins", tokens: ["Dogecoin", "Shiba Inu", "Pepe"], score: 95 },
  { name: "GameFi", tokens: ["Axie", "Gala", "Immutable X"], score: 82 },
]

export function TokenDashboard() {
  const [filter, setFilter] = useState({
    minHolders: 100000,
    minSocialScore: 70,
    minFomoIndex: 60,
    chains: ["All", "Ethereum", "Solana", "BNB Chain"],
    narratives: ["All", "AI", "Layer 2", "DeFi", "Meme Coins", "GameFi"],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">代币筛选平台</h2>
          <p className="text-muted-foreground">筛选和分析代币基于链上数据、社交媒体、K线和FOMO指数</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCcw className="h-4 w-4" />
            刷新数据
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                过滤器
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-4 p-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">最小持有者数量</h4>
                  <p className="text-xs text-muted-foreground">当前值: {filter.minHolders.toLocaleString()}</p>
                  <Slider
                    defaultValue={[filter.minHolders]}
                    max={5000000}
                    step={50000}
                    onValueChange={(value) => setFilter({ ...filter, minHolders: value[0] })}
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">最小社交评分</h4>
                  <p className="text-xs text-muted-foreground">当前值: {filter.minSocialScore}</p>
                  <Slider
                    defaultValue={[filter.minSocialScore]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setFilter({ ...filter, minSocialScore: value[0] })}
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">最小FOMO指数</h4>
                  <p className="text-xs text-muted-foreground">当前值: {filter.minFomoIndex}</p>
                  <Slider
                    defaultValue={[filter.minFomoIndex]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setFilter({ ...filter, minFomoIndex: value[0] })}
                  />
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-4">
                <Button className="w-full">应用筛选条件</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="链上热度指标" value="87" subValue="+5% vs 上周" status="up" color="blue" />
        <MetricCard title="社交媒体热度" value="92" subValue="+12% vs 上周" status="up" color="purple" />
        <MetricCard title="市场FOMO指数" value="78" subValue="-3% vs 上周" status="down" color="amber" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>热门代币</CardTitle>
            <CardDescription>当前市场中热门的代币数据</CardDescription>
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
                  {tokenData.map((token) => (
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
                          <Progress value={token.socialscore} className="h-2 w-12" />
                          <span>{token.socialscore}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={token.fomoIndex}
                            className={cn("h-2 w-12", token.fomoIndex > 80 ? "bg-amber-200 [&>div]:bg-amber-600" : "")}
                          />
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
        <Card>
          <CardHeader>
            <CardTitle>热门叙事</CardTitle>
            <CardDescription>当前市场主导叙事</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {narratives.map((narrative) => (
                <div key={narrative.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{narrative.name}</div>
                    <div className="text-sm text-muted-foreground">{narrative.score}</div>
                  </div>
                  <Progress value={narrative.score} className="h-2" />
                  <div className="flex flex-wrap gap-1">
                    {narrative.tokens.map((token) => (
                      <Badge key={token} variant="outline" className="text-xs">
                        {token}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="onchain">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="onchain">链上数据</TabsTrigger>
            <TabsTrigger value="social">社交媒体</TabsTrigger>
            <TabsTrigger value="kline">K线分析</TabsTrigger>
          </TabsList>
          <TabsContent value="onchain" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>链上活动分析</CardTitle>
                <CardDescription>显示持有者数量、交易量和交易频率</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    holders: {
                      label: "持有者数量",
                      color: "hsl(var(--chart-1))",
                    },
                    transactions: {
                      label: "交易数量",
                      color: "hsl(var(--chart-2))",
                    },
                    volume: {
                      label: "交易量",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="aspect-[4/3] w-full"
                >
                  <LineChart data={onChainData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="holders" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="transactions" strokeWidth={2} activeDot={{ r: 8 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="social" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>社交媒体分析</CardTitle>
                <CardDescription>显示社交媒体情绪和提及次数</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <Select defaultValue="twitter">
                      <SelectTrigger>
                        <SelectValue placeholder="选择平台" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">
                          <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4" />
                            <span>Twitter</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="reddit">Reddit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select defaultValue="7d">
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
                <ChartContainer
                  config={{
                    sentiment: {
                      label: "情绪评分",
                      color: "hsl(var(--chart-1))",
                    },
                    mentions: {
                      label: "提及次数",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="aspect-[4/3] w-full"
                >
                  <LineChart data={socialSentiment}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="sentiment" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="mentions" strokeWidth={2} activeDot={{ r: 8 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="kline" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>K线和交易行为分析</CardTitle>
                <CardDescription>显示价格走势、交易量和区间</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <CandlestickIcon className="h-4 w-4" />
                    蜡烛图
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <TrendingUp className="h-4 w-4" />
                    线图
                  </Button>
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="时间范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24小时</SelectItem>
                      <SelectItem value="7d">7天</SelectItem>
                      <SelectItem value="30d">30天</SelectItem>
                      <SelectItem value="90d">90天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ChartContainer
                  config={{
                    price: {
                      label: "价格",
                      color: "hsl(var(--chart-1))",
                    },
                    volume: {
                      label: "交易量",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="aspect-[4/3] w-full"
                >
                  <LineChart data={klineData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="price" strokeWidth={2} activeDot={{ r: 8 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subValue,
  status,
  color = "blue",
}: {
  title: string
  value: string
  subValue: string
  status: "up" | "down"
  color?: "blue" | "green" | "red" | "purple" | "amber"
}) {
  const bgColor = {
    blue: "bg-blue-500/10",
    green: "bg-green-500/10",
    red: "bg-red-500/10",
    purple: "bg-purple-500/10",
    amber: "bg-amber-500/10",
  }

  const textColor = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    purple: "text-purple-600 dark:text-purple-400",
    amber: "text-amber-600 dark:text-amber-400",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <div className={cn("rounded-full p-2", bgColor[color])}>
            {status === "up" ? (
              <TrendingUp className={cn("h-4 w-4", textColor[color])} />
            ) : (
              <TrendingUp className={cn("h-4 w-4", textColor[color])} />
            )}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold">{value}</div>
          <p className={cn("text-xs", status === "up" ? "text-green-500" : "text-red-500")}>{subValue}</p>
        </div>
      </CardContent>
    </Card>
  )
}
