const BASE_URL = 'http://localhost:3042';

export default function DataTable({ columns, data, onUpdate, onDelete, imageBaseUrl }) {
  return (
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
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="border px-3 py-2 text-sm">
                  {col.type === 'image' && item[col.key] ? (
                    <img 
                      src={`${BASE_URL}/${imageBaseUrl}/${item[col.key]}`} 
                      alt="" 
                      className="w-16 h-12 object-cover rounded"
                    />
                  ) : col.type === 'array' ? (
                    <span className="truncate max-w-[150px] block">
                      {Array.isArray(item[col.key]) ? item[col.key].join(', ') : '-'}
                    </span>
                  ) : col.type === 'boolean' ? (
                    <span className={`px-2 py-1 rounded text-xs ${item[col.key] ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item[col.key] ? 'Read' : 'Unread'}
                    </span>
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
                    onClick={() => onUpdate(item)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
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
  );
}
