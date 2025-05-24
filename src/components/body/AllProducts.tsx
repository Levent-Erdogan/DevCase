'use client';
import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Table, Button, Dropdown, Input, Row, Col, Space, Pagination, message } from 'antd';
import { MoreOutlined, PlusOutlined, ReloadOutlined, FilterOutlined, CalendarOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ProductContext } from '../../context/ProductContext';
import type { Product } from '../../context/ProductContext';

const columns = [
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
     render: (_: string, record: Product) => (
      <div className="flex items-center gap-3">
        <img src={record.imageUrl} alt={record.name} className="w-10 h-10 rounded bg-gray-100 object-contain" />
        <div>
          <div className="font-medium text-gray-900">{record.name}</div>
          <div className="text-xs text-gray-400">{record.category}</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Transaction ID',
    dataIndex: 'productCode',
    key: 'productCode',
    render: (code: string) => <span className="text-gray-700">{code}</span>,
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => {
      const validDate = new Date(date);
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
      const formattedToday = today.toLocaleDateString('en-US', options);
      
      return (
        <span className="text-gray-500">
          {date && !isNaN(validDate.getTime()) ? validDate.toLocaleDateString('en-US', options) : formattedToday}
        </span>
      );
    },
  },
  {
    title: 'Amount',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => <span className="font-semibold text-gray-900">${price?.toLocaleString()}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: boolean) => {
      const isCompleted = status === true;
      const text = isCompleted ? 'Completed' : 'Canceled';
      const bgColorClass = isCompleted ? 'bg-green-50' : 'bg-red-50';
      const textColorClass = isCompleted ? 'text-green-700' : 'text-red-700';
      const icon = isCompleted ? <CheckCircleOutlined /> : <CloseCircleOutlined />;

      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColorClass} ${textColorClass}`}>
          {icon} <span className="ml-1">{text}</span>
        </span>
      );
    },
  },
  {
    title: '',
    key: 'actions',
    render: () => (
      <Dropdown
        menu={{
          items: [
            { key: 'edit', label: 'Edit' },
            { key: 'delete', label: 'Delete' }
          ]
        }}
        trigger={['click']}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Constants
const DEFAULT_PAGE_SIZE = 12;

const AllProducts = () => {
  const { products, loading, totalItems, currentPage, setCurrentPage } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Memoize dataSource to prevent unnecessary recalculations
  const dataSource = useMemo(() => {
    return products.map((p) => ({ ...p, createdAt: p.createdAt || '-' }));
  }, [products]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return dataSource;
    const searchLower = searchTerm.toLowerCase();
    return dataSource.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.productCode.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }, [dataSource, searchTerm]);

  // Handle row selection
  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Handle reload
  const handleReload = useCallback(() => {
    setCurrentPage(1);
    message.success('Products reloaded');
  }, [setCurrentPage]);

  // Handle pagination
  const handlePaginationChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  // Handle product actions
  const handleProductAction = useCallback((action: string, record: Product) => {
    switch (action) {
      case 'edit':
        message.info(`Edit product: ${record.name}`);
        break;
      case 'delete':
        message.warning(`Delete product: ${record.name}`);
        break;
      default:
        break;
    }
  }, []);

  // Handle export
  const handleExport = useCallback(() => {
    message.info('Export functionality will be implemented');
  }, []);

  // Handle add new product
  const handleAddProduct = useCallback(() => {
    message.info('Add new product functionality will be implemented');
  }, []);

  // Update columns with action handlers
  const columnsWithActions = useMemo(() => {
    return columns.map(col => {
      if (col.key === 'actions') {
        return {
          ...col,
         render: (_: undefined, record: Product) => (
            <Dropdown
              menu={{
                items: [
                  { key: 'edit', label: 'Edit', onClick: () => handleProductAction('edit', record) },
                  { key: 'delete', label: 'Delete', onClick: () => handleProductAction('delete', record) }
                ]
              }}
              trigger={['click']}
            >
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          ),
        };
      }
      return col;
    });
  }, [handleProductAction]);

  return (
    <div className="bg-white rounded-lg shadow border border-indigo-200 p-2 sm:p-4 md:p-6 overflow-x-auto">
      {/* Table üstü filtre/arama/butonlar */}
      <Row gutter={[16, 16]} align="middle" className="mb-4">
        <Col flex="none">
          <div className="text-xl font-bold text-gray-800">All Products</div>
        </Col>
        {/* Desktop view */}
        <Col flex="auto" className="hidden lg:block">
          <Space size="small" className="flex justify-end w-full">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search item..."
              style={{ width: 200 }}
              className="rounded-md"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button icon={<ReloadOutlined />} className="rounded-md" onClick={handleReload} />
            <Button icon={<CalendarOutlined />} className="rounded-md" />
            <Button icon={<FilterOutlined />} className="rounded-md" />
            <Dropdown
              menu={{
                items: [
                  { key: 'export', label: 'Export', onClick: handleExport }
                ]
              }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} className="rounded-md" />
            </Dropdown>
          </Space>
        </Col>
        <Col className="hidden lg:block">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-md bg-indigo-600 hover:bg-indigo-700 border-none"
            onClick={handleAddProduct}
          >
            Add New Product
          </Button>
        </Col>

        {/* Mobile/Tablet view */}
        <Col flex="auto" className="lg:hidden">
          <Space size="small" className="flex justify-end w-full">
            <Button icon={<SearchOutlined />} className="rounded-md" />
            <Dropdown
              menu={{
                items: [
                  { key: 'export', label: 'Export', onClick: handleExport }
                ]
              }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} className="rounded-md" />
            </Dropdown>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md bg-indigo-600 hover:bg-indigo-700 border-none"
              onClick={handleAddProduct}
            >
              Add New Product
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        rowSelection={{
          type: 'checkbox',
          columnWidth: 40,
          selectedRowKeys,
          onChange: onSelectChange,
          renderCell: (checked, record, index, originNode) => {
            return (
              <div className="flex items-center">
                <div className="w-1 h-full bg-purple-600 mr-2" style={{ visibility: checked ? 'visible' : 'hidden' }}></div>
                {originNode}
              </div>
            );
          }
        }}
        columns={columnsWithActions}
        dataSource={filteredProducts}
        loading={loading}
        rowKey="id"
        pagination={false}
      />
      <div className="flex items-center justify-between mt-4 text-gray-400 text-xs">
        <span>Showing {((currentPage - 1) * DEFAULT_PAGE_SIZE) + 1}-{Math.min(currentPage * DEFAULT_PAGE_SIZE, totalItems)} from {totalItems} data</span>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={DEFAULT_PAGE_SIZE}
          showSizeChanger={false}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default AllProducts; 