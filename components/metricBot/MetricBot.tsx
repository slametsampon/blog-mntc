// File: /app/components/MetricBot.tsx
import React from 'react'

const MetricBot: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Metric ChatBot: Teknologi Cerdas untuk Pemeliharaan Mesin
      </h2>
      <p className="text-gray-700 mb-4">
        Selamat datang di <span className="font-semibold">Metric ChatBot</span>, adalah asisten
        virtual pintar yang dirancang untuk membantu Anda dalam berbagai kebutuhan terkait
        pemeliharaan mesin, troubleshooting, dan operasional pabrik petrokimia. Dengan{' '}
        <span className="font-semibold">Metric ChatBot</span>, mampu memberikan jawaban yang akurat
        dan cepat, menjawab pertanyaan teknis, serta membantu dalam pengambilan keputusan di
        lapangan:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <span className="font-semibold">Prosedur pemeliharaan mesin</span> yang terpasang pada
          pabrik petrokimia.
        </li>
        <li>
          <span className="font-semibold">Troubleshooting dan penyelesaian masalah teknis</span>,
          termasuk suhu, getaran, dan runtime, untuk mendapatkan wawasan yang mendalam tentang
          pencarian masalah mesin.
        </li>
        <li>
          <span className="font-semibold">Tips optimasi operasional pabrik</span> dengan rekomendasi
          pemeliharaan yang tepat waktu dan akurat.
        </li>
        <li>
          <span className="font-semibold">Standar keselamatan dan lingkungan (SHE)</span>
        </li>
      </ul>
      <p className="text-gray-700">
        Teknologi cerdas kami memungkinkan Anda untuk mengambil tindakan pemeliharaan, mengurangi
        waktu henti yang tidak terduga, dan mengoptimalkan produktivitas operasional pabrik. Dengan{' '}
        <span className="font-semibold">Metric ChatBot</span>, kami membantu memastikan pabrik Anda
        tetap berjalan lancar dan efisien.
      </p>
    </section>
  )
}

export default MetricBot
