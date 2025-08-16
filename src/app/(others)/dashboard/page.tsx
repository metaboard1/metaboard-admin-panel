import {
    LayoutDashboard,
    FileText,
    BookOpen,
    File,
    Settings,
    TrendingUp,
    Bell,
    Search,
    Moon,
    Plus
} from "lucide-react";

const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#", current: true },
    { name: "Articles", icon: FileText, href: "#", current: false },
    { name: "Publications", icon: BookOpen, href: "#", current: false },
    { name: "Documents", icon: File, href: "#", current: false },
    { name: "Settings", icon: Settings, href: "#", current: false },
];

const recentItems = [
    {
        id: 1,
        title: "New article published",
        author: "John Doe",
        type: "Article",
        status: "Active",
        time: "2 hours ago",
    },
    {
        id: 2,
        title: "Publication updated",
        author: "Jane Smith",
        type: "Publication",
        status: "Active",
        time: "4 hours ago",
    },
    {
        id: 3,
        title: "Document uploaded",
        author: "Mike Johnson",
        type: "Document",
        status: "Active",
        time: "6 hours ago",
    },
    {
        id: 4,
        title: "Article draft saved",
        author: "Sarah Wilson",
        type: "Article",
        status: "Draft",
        time: "8 hours ago",
    },
];

const actions = [
    {
        title: "Add Article",
        description: "Create a new article",
        icon: FileText,
        action: "article",
    },
    {
        title: "Add Publication",
        description: "Create a new publication",
        icon: BookOpen,
        action: "publication",
    },
    {
        title: "Upload Document",
        description: "Upload a new document",
        icon: File,
        action: "document",
    },
];

const statusData = [
    {
        type: "Articles",
        total: 51,
        active: 48,
        draft: 3,
        inactive: 0,
    },
    {
        type: "Publications",
        total: 102,
        active: 95,
        draft: 5,
        inactive: 2,
    },
    {
        type: "Documents",
        total: 53,
        active: 50,
        draft: 2,
        inactive: 1,
    },
];

const Dashboard=()=> {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}

                {/* Header */}

                {/* Main Content */}
                <main className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Articles Card */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Total Articles
                                </h3>
                                <FileText className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">51</div>
                                <p className="text-xs text-green-600">
                                    +12 from last month
                                </p>
                            </div>
                        </div>

                        {/* Total Publications Card */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Total Publications
                                </h3>
                                <BookOpen className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">102</div>
                                <p className="text-xs text-green-600">
                                    +8 from last month
                                </p>
                            </div>
                        </div>

                        {/* Total Documents Card */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Total Documents
                                </h3>
                                <File className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">53</div>
                                <p className="text-xs text-green-600">
                                    +5 from last month
                                </p>
                            </div>
                        </div>

                        {/* Total Views Card */}
                        <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Total Views
                                </h3>
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">12.5K</div>
                                <p className="text-xs text-green-600">
                                    +2.1K from last month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - 2/3 width */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Recent Activity */}
                            {/* <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Activity</h3>
                                </div>
                                <div className="p-6 pt-0 space-y-4">
                                    {recentItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{item.title}</p>
                                                <p className="text-xs text-gray-500">by {item.author}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${item.status === "Active"
                                                        ? "bg-gray-900 text-gray-50 hover:bg-gray-900/80"
                                                        : "bg-gray-100 text-gray-900 hover:bg-gray-100/80"
                                                    }`}>
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-gray-500">{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* Status Overview */}
                            <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Content Status Overview</h3>
                                </div>
                                <div className="p-6 pt-0">
                                    <div className="space-y-4">
                                        {statusData.map((item) => (
                                            <div key={item.type} className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{item.type}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-100">
                                                        {item.active} Active
                                                    </span>
                                                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-900 hover:bg-gray-100/80">
                                                        {item.draft} Draft
                                                    </span>
                                                    {item.inactive > 0 && (
                                                        <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100/80">
                                                            {item.inactive} Inactive
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
                                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Quick Actions</h3>
                                </div>
                                <div className="p-6 pt-0 space-y-3">
                                    {actions.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <button
                                                key={action.action}
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
                                            </button>
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