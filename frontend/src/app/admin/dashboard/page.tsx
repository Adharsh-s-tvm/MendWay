'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import {
  DollarSign,
  UserCheck,
  Briefcase,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  MoreHorizontal
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// ---------- Mock Data ----------
const revenueData = [
  { date: 'Jan', revenue: 45000, payouts: 32000 },
  { date: 'Feb', revenue: 52000, payouts: 37000 },
  { date: 'Mar', revenue: 48000, payouts: 34000 },
  { date: 'Apr', revenue: 61000, payouts: 43000 },
  { date: 'May', revenue: 55000, payouts: 39000 },
  { date: 'Jun', revenue: 67000, payouts: 47000 },
];

const servicesData = [
  { service: 'Cleaning', count: 1240, revenue: 24800 },
  { service: 'Plumbing', count: 890, revenue: 35600 },
  { service: 'Electrical', count: 760, revenue: 30400 },
  { service: 'Gardening', count: 650, revenue: 13000 },
  { service: 'Painting', count: 420, revenue: 21000 },
];

const topWorkers = [
  { name: 'John Smith', rating: 4.9, services: 156, earnings: 8940, status: 'active' },
  { name: 'Sarah Johnson', rating: 4.8, services: 142, earnings: 8320, status: 'active' },
  { name: 'Mike Wilson', rating: 4.7, services: 128, earnings: 7680, status: 'active' },
  { name: 'Emily Davis', rating: 4.9, services: 119, earnings: 7140, status: 'active' },
  { name: 'David Brown', rating: 4.6, services: 98, earnings: 5880, status: 'active' },
];

const COLORS = ['#1e40af', '#f97316', '#059669', '#dc2626', '#7c3aed'];

// ---------- Component ----------
export default function Page() {
  return (
    <ResponsiveContainer className="space-y-4 sm:space-y-6" padding="none">
      {/* Stats Cards */}
      <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="md" className="mb-6 sm:mb-8">
        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-foreground-muted">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground">$328,000</div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-foreground-muted">
              Total Payouts
            </CardTitle>
            <UserCheck className="h-4 w-4 text-accent-orange" />
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground">$232,000</div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-foreground-muted">
              Services Completed
            </CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground">3,962</div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+15.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-foreground-muted">
              Active Services
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground">127</div>
            <div className="flex items-center space-x-1 text-xs text-destructive">
              <TrendingDown className="h-3 w-3" />
              <span>-2.1% from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </ResponsiveGrid>

      {/* Charts */}
      <ResponsiveGrid cols={{ sm: 1, lg: 2 }} gap="md" className="mb-6 sm:mb-8">
        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-foreground text-lg sm:text-xl">Revenue Trends</CardTitle>
            <CardDescription className="text-foreground-muted text-sm">
              Monthly revenue vs payouts comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="w-full h-[250px] sm:h-[300px]">
              <RechartsResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#1e40af" strokeWidth={2}
                        dot={{ fill: '#1e40af', strokeWidth: 2, r: 3 }} />
                  <Line type="monotone" dataKey="payouts" stroke="#f97316" strokeWidth={2}
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }} />
                </LineChart>
              </RechartsResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle shadow-md bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-foreground text-lg sm:text-xl">Service Categories</CardTitle>
            <CardDescription className="text-foreground-muted text-sm">
              Distribution of services by category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="w-full h-[250px] sm:h-[300px]">
              <RechartsResponsiveContainer width="100%" height="100%">
                <BarChart data={servicesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="service" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#1e40af" radius={4} />
                </BarChart>
              </RechartsResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </ResponsiveGrid>

      {/* Best Workers Table */}
      <Card className="border-border-subtle shadow-md bg-white">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-foreground text-lg sm:text-xl">Top Performing Workers</CardTitle>
              <CardDescription className="text-foreground-muted text-sm">
                Based on rating, services completed, and earnings
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-border-subtle self-start sm:self-auto">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile */}
          <div className="sm:hidden space-y-3 p-4">
            {topWorkers.map(worker => (
              <div key={worker.name} className="bg-surface rounded-lg p-4 border border-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{worker.name}</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-foreground">{worker.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-foreground-muted">Services</p>
                    <p className="font-medium text-foreground">{worker.services}</p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Earnings</p>
                    <p className="font-medium text-foreground">${worker.earnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Status</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-success-light text-success">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 px-4 font-medium text-foreground-muted text-sm">Worker</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-muted text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-muted text-sm">Services</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-muted text-sm">Earnings</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-muted text-sm">Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {topWorkers.map(worker => (
                  <tr key={worker.name} className="border-b border-border-subtle hover:bg-surface transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{worker.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-foreground font-medium">{worker.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{worker.services}</td>
                    <td className="py-3 px-4 text-foreground font-medium">${worker.earnings.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-light text-success">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </ResponsiveContainer>
  );
}
