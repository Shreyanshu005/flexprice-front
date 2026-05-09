import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Home, Layers2, Landmark, BarChart3, Settings, CodeXml, Puzzle, GalleryHorizontalEnd } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Standalone SidebarNav component for Storybook demonstration.
 *
 * This is a simplified version of the actual AppSidebar that works
 * without the full routing context. It mirrors the exact nav structure
 * from the live Flexprice app: Home, Product Catalog, Billing, Revenue,
 * Tools, Developers, Integrations, Pricing Widget.
 *
 * Sidebar background: `#f9f9f9`, border: `border-gray-300`
 */
interface NavItem {
	label: string;
	icon: React.ReactNode;
	path: string;
	badge?: number;
	children?: { label: string; path: string }[];
}

interface SidebarNavProps {
	items: NavItem[];
	activePath: string;
	collapsed?: boolean;
}

const SidebarNavStory: React.FC<SidebarNavProps> = ({ items, activePath, collapsed = false }) => {
	return (
		<nav className={cn(
			'bg-[#f9f9f9] border-r border-gray-300 py-4 h-[600px] flex flex-col transition-all duration-200',
			collapsed ? 'w-14 px-2' : 'w-[240px] px-3',
		)}>
			<div className={cn(
				'mb-4 px-2 flex items-center gap-2',
				collapsed && 'justify-center',
			)}>
				<div className="w-6 h-6 bg-[#092E44] rounded flex items-center justify-center text-white text-xs font-bold">F</div>
				{!collapsed && <span className="text-sm font-medium text-[#18181B]">Flexprice</span>}
			</div>

			<div className="flex flex-col gap-0.5 flex-1">
				{items.map((item) => {
					const isActive = activePath === item.path || item.children?.some((c) => c.path === activePath);
					return (
						<div key={item.path}>
							<div className={cn(
								'flex items-center gap-2 px-2 py-1.5 rounded-[6px] cursor-pointer text-sm transition-colors',
								isActive ? 'bg-white text-[#18181B] shadow-sm border border-gray-200' : 'text-[#64748B] hover:bg-white/60',
								collapsed && 'justify-center px-0',
							)}>
								<span className="shrink-0">{item.icon}</span>
								{!collapsed && (
									<span className="flex-1">{item.label}</span>
								)}
								{!collapsed && item.badge !== undefined && item.badge > 0 && (
									<span className="bg-[#DC2626] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
										{item.badge}
									</span>
								)}
							</div>
							{!collapsed && isActive && item.children && (
								<div className="ml-8 mt-0.5 flex flex-col gap-0.5">
									{item.children.map((child) => (
										<div
											key={child.path}
											className={cn(
												'px-2 py-1 text-sm rounded cursor-pointer transition-colors',
												activePath === child.path
													? 'text-[#18181B] font-medium'
													: 'text-[#64748B] hover:text-[#18181B]',
											)}
										>
											{child.label}
										</div>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</nav>
	);
};

const navItems: NavItem[] = [
	{ label: 'Home', icon: React.createElement(Home, { className: 'size-4' }), path: '/home' },
	{
		label: 'Product Catalog',
		icon: React.createElement(Layers2, { className: 'size-4' }),
		path: '/features',
		children: [
			{ label: 'Features', path: '/features' },
			{ label: 'Plans', path: '/plans' },
			{ label: 'Coupons', path: '/coupons' },
			{ label: 'Addons', path: '/addons' },
		],
	},
	{
		label: 'Billing',
		icon: React.createElement(Landmark, { className: 'size-4' }),
		path: '/customers',
		badge: 3,
		children: [
			{ label: 'Customers', path: '/customers' },
			{ label: 'Subscriptions', path: '/subscriptions' },
			{ label: 'Invoices', path: '/invoices' },
			{ label: 'Payments', path: '/payments' },
		],
	},
	{ label: 'Revenue', icon: React.createElement(BarChart3, { className: 'size-4' }), path: '/revenue' },
	{
		label: 'Tools',
		icon: React.createElement(Settings, { className: 'size-4' }),
		path: '/tools',
		children: [
			{ label: 'Imports', path: '/imports' },
			{ label: 'Exports', path: '/exports' },
		],
	},
	{
		label: 'Developers',
		icon: React.createElement(CodeXml, { className: 'size-4' }),
		path: '/developers',
		children: [
			{ label: 'Events Debugger', path: '/events' },
			{ label: 'API Keys', path: '/api-keys' },
			{ label: 'Webhooks', path: '/webhooks' },
		],
	},
	{ label: 'Integrations', icon: React.createElement(Puzzle, { className: 'size-4' }), path: '/integrations' },
	{ label: 'Pricing Widget', icon: React.createElement(GalleryHorizontalEnd, { className: 'size-4' }), path: '/pricing' },
];

const meta: Meta<typeof SidebarNavStory> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNavStory,
	tags: ['autodocs'],
	argTypes: {
		collapsed: { control: 'boolean' },
		activePath: {
			control: 'select',
			options: ['/home', '/features', '/plans', '/customers', '/invoices', '/revenue', '/events'],
		},
	},
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof SidebarNavStory>;

export const Default: Story = {
	args: {
		items: navItems,
		activePath: '/home',
	},
};

export const WithActiveSubRoute: Story = {
	args: {
		items: navItems,
		activePath: '/invoices',
	},
};

export const Collapsed: Story = {
	args: {
		items: navItems,
		activePath: '/home',
		collapsed: true,
	},
};

export const WithNotificationBadge: Story = {
	args: {
		items: navItems,
		activePath: '/customers',
	},
};
