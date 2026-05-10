import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import React, { useState } from 'react';
import {
	Home, Layers2, Landmark, BarChart3, Settings, CodeXml, Puzzle,
	GalleryHorizontalEnd, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
			'bg-[#f9f9f9] border-r border-gray-300 py-4 h-[600px] flex flex-col',
			'transition-all duration-300 ease-in-out',
			collapsed ? 'w-14 px-2' : 'w-[240px] px-3',
		)}>
			<div className={cn(
				'mb-4 px-2 flex items-center gap-2',
				'transition-all duration-300 ease-in-out',
				collapsed && 'justify-center',
			)}>
				<div className="w-6 h-6 bg-[#092E44] rounded flex items-center justify-center text-white text-xs font-bold shrink-0">F</div>
				<span className={cn(
					'text-sm font-medium text-[#18181B] whitespace-nowrap',
					'transition-all duration-300 ease-in-out',
					collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto',
				)}>Flexprice</span>
			</div>

			<div className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
				{items.map((item) => {
					const isActive = activePath === item.path || item.children?.some((c) => c.path === activePath);
					return (
						<div key={item.path}>
							<div className={cn(
								'flex items-center gap-2 px-2 py-1.5 rounded-[6px] cursor-pointer text-sm',
								'transition-all duration-200 ease-in-out',
								isActive ? 'bg-white text-[#18181B] shadow-sm border border-gray-200' : 'text-[#64748B] hover:bg-white/60',
								collapsed && 'justify-center px-0',
							)}>
								<span className="shrink-0">{item.icon}</span>
								<span className={cn(
									'whitespace-nowrap transition-all duration-300 ease-in-out',
									collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto flex-1',
								)}>{item.label}</span>
								{!collapsed && item.badge !== undefined && item.badge > 0 && (
									<span className="bg-[#DC2626] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
										{item.badge}
									</span>
								)}
							</div>
							<div className={cn(
								'overflow-hidden transition-all duration-300 ease-in-out',
								!collapsed && isActive && item.children
									? 'max-h-[500px] opacity-100 mt-0.5'
									: 'max-h-0 opacity-0',
							)}>
								{item.children && (
									<div className="ml-8 flex flex-col gap-0.5">
										{item.children.map((child) => (
											<div
												key={child.path}
												className={cn(
													'px-2 py-1 text-sm rounded cursor-pointer transition-colors duration-200',
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
			{ label: 'Cost Sheets', path: '/cost-sheets' },
			{ label: 'Price Units', path: '/price-units' },
			{ label: 'Groups', path: '/groups' },
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
			{ label: 'Taxes', path: '/taxes' },
			{ label: 'Invoices', path: '/invoices' },
			{ label: 'Credit Notes', path: '/credit-notes' },
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
			{ label: 'Service Accounts', path: '/service-accounts' },
			{ label: 'Webhooks', path: '/webhooks' },
			{ label: 'Workflows', path: '/workflows' },
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
			options: ['/home', '/features', '/plans', '/customers', '/invoices', '/revenue', '/events', '/service-accounts'],
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const nav = canvasElement.querySelector('nav');
		expect(nav).toBeInTheDocument();
		const labels = canvas.queryAllByText('Home');
		if (labels.length > 0) {
			const homeLabel = labels[0]!.closest('span');
			expect(homeLabel?.className).toContain('opacity-0');
		}
	},
};

export const WithNotificationBadge: Story = {
	args: {
		items: navItems,
		activePath: '/customers',
	},
};

const InteractiveSidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [activePath, setActivePath] = useState('/home');

	return React.createElement('div', { className: 'flex' },
		React.createElement(SidebarNavStory, {
			items: navItems,
			activePath,
			collapsed,
		}),
		React.createElement('div', { className: 'p-6 flex-1 space-y-4' },
			React.createElement('button', {
				onClick: () => setCollapsed((v) => !v),
				className: 'inline-flex items-center gap-2 px-3 py-1.5 text-sm border rounded-[6px] hover:bg-gray-50 transition-colors',
			},
				React.createElement(collapsed ? PanelLeft : PanelLeftClose, { className: 'size-4' }),
				collapsed ? 'Expand Sidebar' : 'Collapse Sidebar',
			),
			React.createElement('div', { className: 'flex flex-wrap gap-2' },
				['/home', '/features', '/invoices', '/events'].map((path) =>
					React.createElement('button', {
						key: path,
						onClick: () => setActivePath(path),
						className: cn(
							'px-3 py-1 text-sm rounded-[6px] border transition-colors',
							activePath === path ? 'bg-[#092E44] text-white' : 'hover:bg-gray-50',
						),
					}, path),
				),
			),
			React.createElement('p', { className: 'text-sm text-muted-foreground' },
				`Active: ${activePath} | Collapsed: ${collapsed}`,
			),
		),
	);
};

export const Interactive: Story = {
	render: () => React.createElement(InteractiveSidebar),
};
