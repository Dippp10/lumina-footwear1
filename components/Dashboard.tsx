
import React from 'react';
import { SHOE_CATALOG } from '../constants';

const Dashboard: React.FC = () => {
  // Mock data for the dashboard
  const stats = [
    { label: 'Total Revenue', value: '$12,480.00', change: '+12.5%', icon: '💰' },
    { label: 'Orders Today', value: '18', change: '+3', icon: '📦' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: '📈' },
    { label: 'Active Concierge Chats', value: '4', change: 'Live', icon: '✨' },
  ];

  const recentOrders = [
    { id: '#1092', customer: 'S. Johansson', amount: '$180.00', status: 'Shipped', date: '2 mins ago' },
    { id: '#1091', customer: 'M. Sterling', amount: '$320.00', status: 'Processing', date: '15 mins ago' },
    { id: '#1090', customer: 'A. Vance', amount: '$290.00', status: 'Delivered', date: '1 hour ago' },
    { id: '#1089', customer: 'E. Thorne', amount: '$160.00', status: 'Shipped', date: '3 hours ago' },
  ];

  return (
    <div className="pt-24 pb-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900">Store Management</h1>
            <p className="text-stone-500 text-sm mt-1">Overview of your brand's performance and inventory.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-stone-200 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors">Export Data</button>
            <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">Add Product</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-600' : 'bg-stone-100 text-stone-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">{stat.label}</p>
              <p className="text-2xl font-serif font-bold text-stone-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-bold text-stone-900 uppercase tracking-widest text-xs">Recent Orders</h3>
              <button className="text-xs text-stone-400 hover:text-stone-900 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Order</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Customer</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm font-bold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-400 text-right">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Health */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 uppercase tracking-widest text-xs">Inventory Health</h3>
            </div>
            <div className="p-6 space-y-6">
              {SHOE_CATALOG.slice(0, 5).map((shoe) => (
                <div key={shoe.id} className="flex items-center space-x-4">
                  <img src={shoe.image} alt="" className="w-12 h-12 object-cover rounded-lg bg-stone-50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{shoe.name}</p>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2">
                      <div className="bg-stone-900 h-1.5 rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-stone-400 uppercase">Stock</p>
                    <p className="text-sm font-bold text-stone-900">{Math.floor(Math.random() * 40 + 5)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
