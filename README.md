# CRM Pro — React + TypeScript + Redux Toolkit

> Feature-based CRM starter với React 19, TypeScript 5, Tailwind CSS v4, Redux Toolkit, React Hook Form, Zod, Heroicons.

---

## Tech Stack

| Công nghệ | Version | Mục đích |
|---|---|---|
| React | ^19 | UI framework |
| TypeScript | ^5.7 | Type safety |
| Vite | ^6 | Build tool |
| Tailwind CSS | ^4 | Styling |
| Redux Toolkit | ^2.5 | State management |
| React Redux | ^9 | Redux bindings |
| React Hook Form | ^7.54 | Form handling |
| Zod | ^3.24 | Schema validation |
| @hookform/resolvers | ^3 | Zod + RHF bridge |
| Axios | ^1.8 | HTTP client |
| @heroicons/react | ^2.2 | Icon set |
| React Router DOM | ^7 | Routing |

---

## Khởi chạy

```bash
# 1. Clone / tạo folder
cd crm-app

# 2. Cài dependencies
npm install

# 3. Thêm Tailwind CSS v4 PostCSS plugin
npm install -D @tailwindcss/postcss

# 4. Chạy dev
npm run dev

# 5. Build production
npm run build
```

### Biến môi trường

Tạo file `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Cấu trúc thư mục

```
crm-app/
├── public/                      # Static assets
├── src/
│   ├── app/                     #   Core app config
│   │   ├── store.ts             #   Redux store + typed hooks
│   │   └── router.tsx           #   React Router v7 routes
│   │
│   ├── features/                #   Feature modules (1 feature = 1 folder)
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── components/      # Components dùng riêng cho auth
│   │   │   ├── store/
│   │   │   │   └── authSlice.ts # Slice + thunks
│   │   │   └── types.ts         # Zod schema + TS types
│   │   │
│   │   ├── customers/
│   │   │   ├── pages/
│   │   │   │   └── CustomersPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── CustomerForm.tsx   # Modal form (tạo/sửa)
│   │   │   │   └── StatusBadge.tsx    # Badge trạng thái
│   │   │   ├── store/
│   │   │   │   └── customersSlice.ts  # CRUD thunks + slice
│   │   │   └── types.ts
│   │   │
│   │   ├── leads/
│   │   │   ├── pages/
│   │   │   │   └── LeadsPage.tsx
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   │   └── leadsSlice.ts
│   │   │   └── types.ts
│   │   │
│   │   └── dashboard/
│   │       ├── pages/
│   │       │   └── DashboardPage.tsx
│   │       └── components/
│   │
│   ├── components/              #   Shared components
│   │   ├── ui/                  #   Pure UI (không phụ thuộc feature)
│   │   │   ├── Button.tsx       #   Button với variant/size/loading
│   │   │   ├── Input.tsx        #   Input với label/error/icon
│   │   │   ├── Select.tsx       #   Select dropdown
│   │   │   ├── Toast.tsx        #   Toast notification UI
│   │   │   ├── toastSlice.ts    #   Toast Redux slice
│   │   │   └── ConfirmModal.tsx #   Confirm dialog
│   │   │
│   │   ├── form/                #   RHF-connected components
│   │   │   └── FormField.tsx    #   FormInput + FormSelect (Controller wrappers)
│   │   │
│   │   └── layout/              #   Layout shells
│   │       └── AppLayout.tsx    #   Sidebar + Outlet
│   │
│   ├── hooks/                   #   Custom hooks
│   │   └── useToast.ts          #   dispatch toast helper
│   │
│   ├── lib/                     #   Third-party wrappers
│   │   └── axios.ts             #   Axios instance + interceptors
│   │
│   ├── types/                   #   Global shared types (nếu có)
│   ├── utils/                   #   Utility functions
│   ├── index.css                #   Tailwind v4 @import + @theme tokens
│   └── main.tsx                 #   Entry point
│
├── index.html
├── vite.config.ts               # Vite + @ alias
├── tsconfig.json                # TS strict + paths
├── tsconfig.node.json
├── postcss.config.js            # @tailwindcss/postcss
└── package.json
```

---

## Quy tắc Feature Module

Mỗi feature **tự chứa** đủ 4 phần:

```
features/my-feature/
├── pages/          → Page components (route entry points)
├── components/     → UI components riêng của feature này
├── store/          → Redux slice + async thunks
└── types.ts        → Zod schema + TypeScript interfaces
```

### Thêm feature mới

```bash
mkdir -p src/features/invoices/{pages,components,store}
touch src/features/invoices/types.ts
touch src/features/invoices/store/invoicesSlice.ts
touch src/features/invoices/pages/InvoicesPage.tsx
```

Sau đó import reducer vào `src/app/store.ts`:

```ts
import invoicesReducer from '@/features/invoices/store/invoicesSlice'

export const store = configureStore({
  reducer: {
    // ...existing
    invoices: invoicesReducer,
  },
})
```

Thêm route vào `src/app/router.tsx`:

```tsx
import InvoicesPage from '@/features/invoices/pages/InvoicesPage'

// Trong <Route path="/" element={<AppLayout />}>
<Route path="invoices" element={<InvoicesPage />} />
```

---

## Shared Components

### Button

```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="md" loading={false}>Click me</Button>
<Button variant="danger" leftIcon={<TrashIcon className="w-4 h-4" />}>Xóa</Button>
<Button variant="outline" fullWidth>Submit</Button>

// Variants: primary | secondary | danger | ghost | outline
// Sizes: sm | md | lg
```

### Input

```tsx
import Input from '@/components/ui/Input'

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Email không hợp lệ"
  leftIcon={<EnvelopeIcon className="w-4 h-4" />}
  required
/>
```

### Select

```tsx
import Select from '@/components/ui/Select'

<Select
  label="Trạng thái"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]}
  placeholder="Chọn trạng thái"
/>
```

### Toast

```tsx
// Dùng hook
import { useToast } from '@/hooks/useToast'

function MyComponent() {
  const toast = useToast()

  toast.success('Thành công!', 'Dữ liệu đã được lưu')
  toast.error('Lỗi', 'Không thể kết nối server')
  toast.warning('Cảnh báo', 'Session sắp hết hạn')
  toast.info('Thông tin', 'Có cập nhật mới')
}
```

Đảm bảo `<ToastContainer />` được mount một lần trong `AppLayout.tsx` (đã có sẵn).

### ConfirmModal

```tsx
import ConfirmModal from '@/components/ui/ConfirmModal'

<ConfirmModal
  open={isOpen}
  title="Xóa bản ghi"
  description="Hành động này không thể hoàn tác."
  confirmLabel="Xóa"
  variant="danger"      // danger | primary
  loading={isDeleting}
  onConfirm={handleDelete}
  onClose={() => setIsOpen(false)}
/>
```

---

## Form với React Hook Form + Zod

### 1. Định nghĩa schema trong `types.ts`

```ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Tối thiểu 2 ký tự'),
  price: z.number().positive('Giá phải > 0'),
  category: z.enum(['A', 'B', 'C']),
})

export type ProductFormData = z.infer<typeof productSchema>
```

### 2. Dùng trong component

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormSelect } from '@/components/form/FormField'
import { productSchema, ProductFormData } from '../types'

function ProductForm() {
  const { control, handleSubmit } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', price: 0, category: 'A' },
  })

  const onSubmit = (data: ProductFormData) => {
    console.log(data) // fully typed, validated
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput name="name" control={control} label="Tên sản phẩm" required />
      <FormSelect
        name="category"
        control={control}
        label="Danh mục"
        options={[{ value: 'A', label: 'Loại A' }]}
      />
      <Button type="submit">Lưu</Button>
    </form>
  )
}
```

---

## Redux Pattern

### Slice template

```ts
// features/xxx/store/xxxSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/lib/axios'

// 1. Thunk
export const fetchItems = createAsyncThunk('xxx/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/xxx')
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Lỗi')
  }
})

// 2. Slice
const xxxSlice = createSlice({
  name: 'xxx',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // sync actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (s) => { s.loading = true })
      .addCase(fetchItems.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchItems.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  },
})

export default xxxSlice.reducer
```

### Dùng trong component

```tsx
import { useAppDispatch, useAppSelector } from '@/app/store'
import { fetchItems } from '../store/xxxSlice'

function MyPage() {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((s) => s.xxx)

  useEffect(() => { dispatch(fetchItems()) }, [dispatch])
}
```

---

## Import Alias

Dùng `@/` thay cho đường dẫn tương đối:

```ts
// Không dùng
import Button from '../../../components/ui/Button'

// Dùng alias
import Button from '@/components/ui/Button'
```

Alias được cấu hình trong `vite.config.ts` và `tsconfig.json`.

---

## Axios Instance

File `src/lib/axios.ts` đã cấu hình sẵn:
- `baseURL` từ `VITE_API_URL`
- Tự động đính kèm `Authorization: Bearer <token>` từ `localStorage`
- Tự redirect về `/login` khi nhận 401

```ts
import api from '@/lib/axios'

// GET
const res = await api.get('/customers')

// POST
const res = await api.post('/customers', { name: 'Test' })

// PUT
const res = await api.put(`/customers/${id}`, data)

// DELETE
await api.delete(`/customers/${id}`)
```

---

## Tailwind CSS v4

Tailwind v4 dùng CSS-first config. Mọi token được định nghĩa trong `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary-600: #2563eb;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}
```

Không cần `tailwind.config.js` riêng.

---

## Checklist khi thêm feature mới

- [ ] Tạo folder `features/xxx/{pages,components,store}`
- [ ] Viết `types.ts` với Zod schema + TS interfaces
- [ ] Viết `store/xxxSlice.ts` với thunks
- [ ] Import reducer vào `app/store.ts`
- [ ] Tạo `pages/XxxPage.tsx`
- [ ] Thêm route vào `app/router.tsx`
- [ ] Thêm nav link vào `AppLayout.tsx` (nếu cần)
