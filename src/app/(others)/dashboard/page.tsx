'use client';

import { actionsData, statsCardData, statusData } from "@/appData";
import { $crud } from "@/factory/crudFactory";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


interface ContentStats {
    total: number;
    inactiveCount: number;
    activeCount: number;
}

const Dashboard = () => {

    const [dashboardStats, setDashboardStats] = useState<{ [key: string]: ContentStats; }>({
        article: {
            total: 0,
            inactiveCount: 0,
            activeCount: 0,
        },
        blog: {
            total: 0,
            inactiveCount: 0,
            activeCount: 0,
        },
        publication: {
            total: 0,
            inactiveCount: 0,
            activeCount: 0,
        },
        document: {
            total: 0,
            inactiveCount: 0,
            activeCount: 0,
        }
    })

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        try {
            const { data } = await $crud.retrieve('dashboard');
            setDashboardStats(data);
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 flex">

            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Articles Card */}
                    {
                        statsCardData.map(({ title, icon: Icon, dataKey }, i) => <div key={i} className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                                <h3 className="text-sm font-medium text-gray-500">
                                    {title}
                                </h3>
                                <Icon className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">{dashboardStats[dataKey].total}</div>
                                {/* <p className="text-xs text-green-600">
                                    +12 from last month
                                </p> */}
                            </div>
                        </div>)
                    }
                </div>
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Status Overview */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Content Status Overview</h3>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="space-y-4">
                                    {statusData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{item.title}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-100">
                                                    {dashboardStats[item.dataKey].activeCount} Active
                                                </span>
                                                {dashboardStats[item.dataKey].inactiveCount > 0 && (
                                                    <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100/80">
                                                        {dashboardStats[item.dataKey].inactiveCount} Inactive
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Quick Navigation</h3>
                            </div>
                            <div className="p-6 pt-0 space-y-3">
                                {actionsData.map((action, i) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link
                                            key={i}
                                            href={action.action}
                                            className="w-full justify-start h-auto p-4 inline-flex items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-gray-900" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium text-sm">{action.title}</p>
                                                    <p className="text-xs text-gray-500">{action.description}</p>
                                                </div>
                                                <Plus className="w-4 h-4 ml-auto text-gray-400" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;