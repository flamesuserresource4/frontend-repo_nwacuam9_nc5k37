import { useEffect, useState } from 'react'

function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-20 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl">🦞</span>
          <span className="font-extrabold text-xl tracking-tight">Lobster Tawar</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#produk" className="hover:text-blue-600">Produk</a>
          <a href="#tentang" className="hover:text-blue-600">Tentang</a>
          <a href="#kontak" className="hover:text-blue-600">Kontak</a>
        </nav>
        <a href="#kontak" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 text-sm">Pesan Sekarang</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
            Lobster Air Tawar Segar & Berkualitas
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Suplai untuk restoran, hotel, event, dan distributor. Panen rutin, standar kualitas terjaga, pengiriman cepat.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#produk" className="px-5 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">Lihat Produk</a>
            <a href="#kontak" className="px-5 py-3 bg-white border rounded-md hover:bg-gray-50">Minta Penawaran</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
            <div>Panen mingguan</div>
            <div>Grade A/B/C</div>
            <div>Pengiriman Nasional</div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl bg-white shadow-lg border overflow-hidden">
            <img
              alt="Freshwater lobster"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1560717845-968823efbee1?q=80&w=1600&auto=format&fit=crop"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur rounded-lg shadow p-4 border hidden md:block">
            <p className="font-semibold">Kualitas Terjamin</p>
            <p className="text-sm text-gray-600">Disortir dan dipacking sesuai standar</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ p }) {
  return (
    <div className="group rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {p.image_url && (
        <img src={p.image_url} alt={p.name} className="h-40 w-full object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{p.name}</h3>
          {p.grade && <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Grade {p.grade}</span>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{p.description || 'Lobster segar siap kirim.'}</p>
        <div className="mt-3 text-sm text-gray-500 flex gap-4">
          {p.size_cm ? <span>Size ~{p.size_cm} cm</span> : null}
          {p.weight_g ? <span>~{p.weight_g} g</span> : null}
          <span>Stok {p.stock_kg ?? 0} kg</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-blue-700 font-bold">Rp {Intl.NumberFormat('id-ID').format(p.price_per_kg)} / kg</div>
          <a href="#kontak" className="text-sm px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Pesan</a>
        </div>
      </div>
    </div>
  )
}

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [seeding, setSeeding] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/products`)
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      setError('Gagal memuat produk')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const seed = async () => {
    setSeeding(true)
    try {
      const samples = [
        {
          name: 'Lobster Air Tawar Hidup', grade: 'A', size_cm: 16, weight_g: 200,
          price_per_kg: 280000, stock_kg: 50,
          image_url: 'https://images.unsplash.com/photo-1601506521937-0121a7b6255e?q=80&w=1600&auto=format&fit=crop',
          description: 'Untuk restoran & hotel, kualitas premium.'
        },
        {
          name: 'Lobster Air Tawar Hidup', grade: 'B', size_cm: 14, weight_g: 150,
          price_per_kg: 230000, stock_kg: 80,
          image_url: 'https://images.unsplash.com/photo-1570358934836-6802986bdf67?q=80&w=1600&auto=format&fit=crop',
          description: 'Pilihan ekonomis untuk katering & acara.'
        },
        {
          name: 'Lobster Beku (Frozen)', grade: 'Prosesed', size_cm: 14, weight_g: 160,
          price_per_kg: 210000, stock_kg: 120,
          image_url: 'https://images.unsplash.com/photo-1604908812831-695b14e8dbf2?q=80&w=1600&auto=format&fit=crop',
          description: 'Diblanch & dibekukan cepat.'
        }
      ]
      for (const item of samples) {
        await fetch(`${baseUrl}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      }
      await fetchProducts()
    } catch (e) {
      setError('Gagal menambahkan data contoh')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <section id="produk" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Produk Kami</h2>
            <p className="text-gray-600">Ketersediaan dan harga dapat berubah sesuai musim.</p>
          </div>
          <button onClick={seed} disabled={seeding} className="text-sm px-4 py-2 border rounded hover:bg-gray-50">
            {seeding ? 'Menambahkan...' : 'Tambah Contoh' }
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat produk...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <div className="p-6 border rounded-lg text-center text-gray-600">Belum ada produk. Klik "Tambah Contoh" untuk mengisi.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="tentang" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold">Tentang Kami</h2>
          <p className="mt-4 text-gray-600">
            Kami adalah peternak dan supplier lobster air tawar dengan pengalaman lebih dari 5 tahun. 
            Fokus pada kualitas, konsistensi suplai, dan layanan pengiriman yang aman hingga ke tangan pelanggan.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Kolam bioflok & sistem filtrasi modern</li>
            <li>• Sortir ukuran ketat sebelum pengiriman</li>
            <li>• Kemasan oksigen dan pendingin untuk perjalanan jauh</li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-video rounded-xl bg-white border shadow overflow-hidden">
            <img alt="Farm" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYXJtfGVufDB8MHx8fDE3NjI4MTg5OTJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', phone: '', email: '', product_id: '', quantity_kg: '', message: '' })
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
    try {
      const payload = { ...form, quantity_kg: form.quantity_kg ? Number(form.quantity_kg) : undefined }
      const res = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Gagal mengirim')
      setStatus('✅ Permintaan Anda terkirim. Kami akan menghubungi melalui WhatsApp/Email.')
      setForm({ name: '', phone: '', email: '', product_id: '', quantity_kg: '', message: '' })
    } catch (e) {
      setStatus('❌ Gagal mengirim. Coba lagi nanti.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="kontak" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Hubungi Kami</h2>
        <p className="text-gray-600 text-center mt-2">Minta penawaran, tanya ketersediaan, atau jadwalkan kunjungan.</p>

        <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border">
          <input required value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="px-4 py-3 rounded border bg-white" placeholder="Nama" />
          <input required value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} className="px-4 py-3 rounded border bg-white" placeholder="No. WhatsApp" />
          <input type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} className="px-4 py-3 rounded border bg-white" placeholder="Email (opsional)" />
          <input value={form.product_id} onChange={e=>setForm(f=>({...f, product_id:e.target.value}))} className="px-4 py-3 rounded border bg-white" placeholder="ID Produk (opsional)" />
          <input type="number" value={form.quantity_kg} onChange={e=>setForm(f=>({...f, quantity_kg:e.target.value}))} className="px-4 py-3 rounded border bg-white" placeholder="Perkiraan Qty (kg)" />
          <textarea value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} className="px-4 py-3 rounded border bg-white md:col-span-2" rows={4} placeholder="Pesan"></textarea>
          <button disabled={submitting} className="md:col-span-2 px-5 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
            {submitting ? 'Mengirim...' : 'Kirim Permintaan'}
          </button>
          {status && <p className="md:col-span-2 text-sm">{status}</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Lobster Tawar. All rights reserved.</p>
        <div className="text-sm text-gray-600 flex gap-4">
          <a href="/test" className="hover:text-blue-600">Status</a>
          <a href="#kontak" className="hover:text-blue-600">Hubungi</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
