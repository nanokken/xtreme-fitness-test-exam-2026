import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCRUD } from '../hooks/useCRUD';
import DataTable from '../components/DataTable';

// Blog CRUD Section
function BlogSection() {
  const { items, loading, create, update, remove } = useCRUD('blog', 'blogs');
  const [formData, setFormData] = useState({ title: '', author: '', teaser: '', content: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'author', label: 'Author' },
    { key: 'teaser', label: 'Teaser' },
    { key: 'content', label: 'Content' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await create(data, true);
    if (result.success) {
      setFormData({ title: '', author: '', teaser: '', content: '' });
      setImageFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', editItem._id);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await update(data, true);
    if (result.success) {
      setEditItem(null);
      setFormData({ title: '', author: '', teaser: '', content: '' });
      setImageFile(null);
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title || '',
      author: item.author || '',
      teaser: item.teaser || '',
      content: item.content || '',
    });
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Blogs</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="blogs"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Add Form */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Add blog</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter author"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Teaser</label>
              <input
                type="text"
                value={formData.teaser}
                onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter teaser"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded px-3 py-2 h-32"
                placeholder="Enter content"
                required
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new blog
            </button>
          </form>
        </div>

        {/* Update Form */}
        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update blog</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.image || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Teaser</label>
                <input
                  type="text"
                  value={formData.teaser}
                  onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-32"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update blog
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ title: '', author: '', teaser: '', content: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Employee CRUD Section
function EmployeeSection() {
  const { items, loading, create, update, remove } = useCRUD('employee', 'employees');
  const [formData, setFormData] = useState({ name: '', area: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'name', label: 'Name' },
    { key: 'area', label: 'Area' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await create(data, true);
    if (result.success) {
      setFormData({ name: '', area: '' });
      setImageFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', editItem._id);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await update(data, true);
    if (result.success) {
      setEditItem(null);
      setFormData({ name: '', area: '' });
      setImageFile(null);
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({ name: item.name || '', area: item.area || '' });
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="employees"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add employee</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Area</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter area"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new employee
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update employee</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Area</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.image || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update employee
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ name: '', area: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Service CRUD Section
function ServiceSection() {
  const { items, loading, create, update, remove } = useCRUD('service', 'services');
  const [formData, setFormData] = useState({ title: '', teaser: '', content: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);

  const columns = [
    { key: 'icon', label: 'Icon', type: 'image' },
    { key: 'title', label: 'Title' },
    { key: 'teaser', label: 'Teaser' },
    { key: 'content', label: 'Content' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    if (iconFile) data.append('icon', iconFile);
    
    const result = await create(data, true);
    if (result.success) {
      setFormData({ title: '', teaser: '', content: '' });
      setImageFile(null);
      setIconFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', editItem._id);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    if (iconFile) data.append('icon', iconFile);
    
    const result = await update(data, true);
    if (result.success) {
      setEditItem(null);
      setFormData({ title: '', teaser: '', content: '' });
      setImageFile(null);
      setIconFile(null);
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({ title: item.title || '', teaser: item.teaser || '', content: item.content || '' });
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Services</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="services/service_icons"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add service</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Teaser</label>
              <input
                type="text"
                value={formData.teaser}
                onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter teaser"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Enter content"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Icon</label>
              <input
                type="file"
                onChange={(e) => setIconFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new service
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update service</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Teaser</label>
                <input
                  type="text"
                  value={formData.teaser}
                  onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Icon</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.icon || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setIconFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.image || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update service
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ title: '', teaser: '', content: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Subscription CRUD Section
function SubscriptionSection() {
  const { items, loading, create, update, remove } = useCRUD('subscription', 'subscriptions');
  const [formData, setFormData] = useState({ title: '', price: '', list: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Title' },
    { key: 'price', label: 'Price' },
    { key: 'list', label: 'Features', type: 'array' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    // Convert comma-separated list to array
    const listArray = formData.list.split(',').map(item => item.trim()).filter(Boolean);
    listArray.forEach(item => data.append('list', item));
    if (imageFile) data.append('image', imageFile);
    
    const result = await create(data, true);
    if (result.success) {
      setFormData({ title: '', price: '', list: '' });
      setImageFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', editItem._id);
    data.append('title', formData.title);
    data.append('price', formData.price);
    const listArray = formData.list.split(',').map(item => item.trim()).filter(Boolean);
    listArray.forEach(item => data.append('list', item));
    if (imageFile) data.append('image', imageFile);
    
    const result = await update(data, true);
    if (result.success) {
      setEditItem(null);
      setFormData({ title: '', price: '', list: '' });
      setImageFile(null);
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title || '',
      price: item.price || '',
      list: Array.isArray(item.list) ? item.list.join(', ') : '',
    });
  };

  if (loading) return <p>Loading subscriptions...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="subscriptions"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add subscription</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Features (comma-separated)</label>
              <textarea
                value={formData.list}
                onChange={(e) => setFormData({ ...formData, list: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new subscription
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update subscription</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Features (comma-separated)</label>
                <textarea
                  value={formData.list}
                  onChange={(e) => setFormData({ ...formData, list: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-24"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.image || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update subscription
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ title: '', price: '', list: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Message CRUD Section
function MessageSection() {
  const { items, loading, create, update, remove } = useCRUD('message', 'messages');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [editItem, setEditItem] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject' },
    { key: 'message', label: 'Message' },
    { key: 'status', label: 'Status', type: 'boolean' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await create(formData);
    if (result.success) {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await update({ ...formData, _id: editItem._id });
    if (result.success) {
      setEditItem(null);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      subject: item.subject || '',
      message: item.message || '',
      status: item.status || false,
    });
  };

  const toggleStatus = async (item) => {
    await update({ _id: item._id, status: !item.status });
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="border px-3 py-2 text-left text-sm font-semibold">
                  {col.label}
                </th>
              ))}
              <th className="border px-3 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="border px-3 py-2 text-sm">
                    {col.type === 'boolean' ? (
                      <button 
                        onClick={() => toggleStatus(item)}
                        className={`px-2 py-1 rounded text-xs ${item[col.key] ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {item[col.key] ? 'Read' : 'Unread'}
                      </button>
                    ) : (
                      <span className="truncate max-w-[150px] block">
                        {String(item[col.key] || '-').substring(0, 50)}
                        {String(item[col.key] || '').length > 50 ? '...' : ''}
                      </span>
                    )}
                  </td>
                ))}
                <td className="border px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectForEdit(item)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => remove(item._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <div className="mt-6 max-w-xl">
          <h3 className="text-lg font-semibold mb-3">Message Details</h3>
          <div className="border rounded p-4 space-y-3">
            <p><strong>Name:</strong> {editItem.name}</p>
            <p><strong>Email:</strong> {editItem.email}</p>
            <p><strong>Phone:</strong> {editItem.phone || '-'}</p>
            <p><strong>Subject:</strong> {editItem.subject || '-'}</p>
            <p><strong>Message:</strong></p>
            <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{editItem.message}</p>
            <button 
              onClick={() => setEditItem(null)}
              className="px-4 border rounded py-2 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Exercise CRUD Section
function ExerciseSection() {
  const { items, loading, create, update, remove } = useCRUD('exercise', 'exercises');
  const [formData, setFormData] = useState({ title: '', teaser: '', content: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Title' },
    { key: 'teaser', label: 'Teaser' },
    { key: 'content', label: 'Content' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await create(data, true);
    if (result.success) {
      setFormData({ title: '', teaser: '', content: '' });
      setImageFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', editItem._id);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);
    
    const result = await update(data, true);
    if (result.success) {
      setEditItem(null);
      setFormData({ title: '', teaser: '', content: '' });
      setImageFile(null);
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({ title: item.title || '', teaser: item.teaser || '', content: item.content || '' });
  };

  if (loading) return <p>Loading exercises...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Exercises</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="exercises"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add exercise</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Teaser</label>
              <input
                type="text"
                value={formData.teaser}
                onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter teaser"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Enter content"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new exercise
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update exercise</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Teaser</label>
                <input
                  type="text"
                  value={formData.teaser}
                  onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <p className="text-sm text-gray-500 mb-1">Current: {editItem.image || 'None'}</p>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update exercise
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ title: '', teaser: '', content: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Workout CRUD Section
function WorkoutSection() {
  const { items, loading, create, update, remove } = useCRUD('workout', 'workouts');
  const [formData, setFormData] = useState({ title: '', description: '', weekday: '', time: '' });
  const [editItem, setEditItem] = useState(null);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'weekday', label: 'Weekday' },
    { key: 'time', label: 'Time' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await create(formData);
    if (result.success) {
      setFormData({ title: '', description: '', weekday: '', time: '' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await update({ ...formData, _id: editItem._id });
    if (result.success) {
      setEditItem(null);
      setFormData({ title: '', description: '', weekday: '', time: '' });
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      weekday: item.weekday || '',
      time: item.time || '',
    });
  };

  if (loading) return <p>Loading workouts...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Workouts</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="workouts"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add workout</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Weekday</label>
              <select
                value={formData.weekday}
                onChange={(e) => setFormData({ ...formData, weekday: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select weekday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new workout
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update workout</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-24"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Weekday</label>
                <select
                  value={formData.weekday}
                  onChange={(e) => setFormData({ ...formData, weekday: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select weekday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update workout
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ title: '', description: '', weekday: '', time: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Review CRUD Section
function ReviewSection() {
  const { items, loading, create, update, remove } = useCRUD('review', 'reviews');
  const [formData, setFormData] = useState({ author: '', content: '', position: '' });
  const [editItem, setEditItem] = useState(null);

  const columns = [
    { key: 'author', label: 'Author' },
    { key: 'position', label: 'Position' },
    { key: 'content', label: 'Content' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await create(formData);
    if (result.success) {
      setFormData({ author: '', content: '', position: '' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await update({ ...formData, _id: editItem._id });
    if (result.success) {
      setEditItem(null);
      setFormData({ author: '', content: '', position: '' });
    }
  };

  const selectForEdit = (item) => {
    setEditItem(item);
    setFormData({
      author: item.author || '',
      content: item.content || '',
      position: item.position || '',
    });
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onUpdate={selectForEdit} 
        onDelete={remove}
        imageBaseUrl="reviews"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Add review</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter author"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter position"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Enter review content"
                required
              />
            </div>
            <button type="submit" className="w-full border rounded py-2 hover:bg-gray-100">
              Add new review
            </button>
          </form>
        </div>

        {editItem && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Update review</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 border rounded py-2 hover:bg-gray-100">
                  Update review
                </button>
                <button 
                  type="button" 
                  onClick={() => { setEditItem(null); setFormData({ author: '', content: '', position: '' }); }}
                  className="px-4 border rounded py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Backoffice Component
export default function Backoffice() {
  const [activeTab, setActiveTab] = useState('blogs');
  const { user, isAuthenticated } = useAuth();

  const tabs = [
    { id: 'blogs', label: 'Blogs' },
    { id: 'employees', label: 'Employees' },
    { id: 'services', label: 'Services' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'exercises', label: 'Exercises' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'messages', label: 'Messages' },
  ];

  const renderSection = () => {
    switch (activeTab) {
      case 'blogs': return <BlogSection />;
      case 'employees': return <EmployeeSection />;
      case 'services': return <ServiceSection />;
      case 'subscriptions': return <SubscriptionSection />;
      case 'exercises': return <ExerciseSection />;
      case 'workouts': return <WorkoutSection />;
      case 'reviews': return <ReviewSection />;
      case 'messages': return <MessageSection />;
      default: return <BlogSection />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Backoffice</h1>
        <p>Please <Link to="/login" className="text-blue-600 underline">log in</Link> to access the backoffice.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full pt-20 bg-primary"></div>
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="border-b mb-6">
        <nav className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Section */}
      {renderSection()}
      </div>
    </>
  );
}