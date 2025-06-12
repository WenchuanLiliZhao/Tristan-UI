// Types for Library Management System
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
  category: string;
  publishYear: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  borrowedBooks: number;
  joinDate: string;
}

// Mock Books Data
export const mockBooks: Book[] = [
  {
    id: 'book-1',
    title: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    isbn: '978-7-115-27587-8',
    status: 'available',
    category: '编程',
    publishYear: 2012
  },
  {
    id: 'book-2',
    title: 'React实战',
    author: 'Stoyan Stefanov',
    isbn: '978-7-115-45123-4',
    status: 'borrowed',
    category: '前端开发',
    publishYear: 2018
  },
  {
    id: 'book-3',
    title: 'Vue.js设计与实现',
    author: '霍春阳',
    isbn: '978-7-115-58456-1',
    status: 'available',
    category: '前端开发',
    publishYear: 2022
  },
  {
    id: 'book-4',
    title: 'TypeScript编程',
    author: 'Boris Cherny',
    isbn: '978-7-115-52789-3',
    status: 'available',
    category: '编程',
    publishYear: 2020
  },
  {
    id: 'book-5',
    title: 'Node.js实战',
    author: 'Mike Cantelon',
    isbn: '978-7-115-47890-2',
    status: 'borrowed',
    category: '后端开发',
    publishYear: 2019
  },
  {
    id: 'book-6',
    title: '深入理解计算机系统',
    author: 'Randal E. Bryant',
    isbn: '978-7-111-54493-7',
    status: 'available',
    category: '计算机科学',
    publishYear: 2016
  },
  {
    id: 'book-7',
    title: '算法导论',
    author: 'Thomas H. Cormen',
    isbn: '978-7-111-40701-0',
    status: 'available',
    category: '算法',
    publishYear: 2013
  },
  {
    id: 'book-8',
    title: '设计模式：可复用面向对象软件的基础',
    author: 'Erich Gamma',
    isbn: '978-7-111-26918-0',
    status: 'borrowed',
    category: '软件工程',
    publishYear: 2000
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '张三',
    email: 'zhangsan@example.com',
    status: 'active',
    borrowedBooks: 2,
    joinDate: '2023-01-15'
  },
  {
    id: 'user-2',
    name: '李四',
    email: 'lisi@example.com',
    status: 'active',
    borrowedBooks: 1,
    joinDate: '2023-02-20'
  },
  {
    id: 'user-3',
    name: '王五',
    email: 'wangwu@example.com',
    status: 'active',
    borrowedBooks: 0,
    joinDate: '2023-03-10'
  },
  {
    id: 'user-4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    status: 'inactive',
    borrowedBooks: 0,
    joinDate: '2022-12-05'
  },
  {
    id: 'user-5',
    name: '钱七',
    email: 'qianqi@example.com',
    status: 'active',
    borrowedBooks: 3,
    joinDate: '2023-04-18'
  },
  {
    id: 'user-6',
    name: '孙八',
    email: 'sunba@example.com',
    status: 'active',
    borrowedBooks: 1,
    joinDate: '2023-05-22'
  }
];

// Additional mock data for other potential demos
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
}

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: '无线蓝牙耳机',
    price: 299,
    category: '电子产品',
    inStock: true
  },
  {
    id: 'prod-2',
    name: '智能手表',
    price: 1299,
    category: '可穿戴设备',
    inStock: false
  },
  {
    id: 'prod-3',
    name: '机械键盘',
    price: 599,
    category: '电脑配件',
    inStock: true
  }
]; 