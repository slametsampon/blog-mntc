// File: /app/components/MetricSmart.tsx
import React from 'react'

const MetricSmart: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Metric Smart: Teknologi Cerdas untuk Pemeliharaan Mesin
      </h2>
      <p className="text-gray-700 mb-4">
        Selamat datang di <span className="font-semibold">Metric Smart</span>, fitur canggih
        berbasis <span className="font-semibold">Machine Learning</span> yang dirancang khusus untuk
        meningkatkan keandalan dan kinerja mesin di industri petrokimia. Dengan{' '}
        <span className="font-semibold">Metric Smart</span>, Anda dapat memanfaatkan teknologi
        prediktif untuk:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <span className="font-semibold">Mendeteksi potensi kerusakan mesin</span> sebelum terjadi
          kegagalan besar.
        </li>
        <li>
          <span className="font-semibold">Menganalisis data sensor secara real-time</span>, termasuk
          suhu, getaran, dan runtime, untuk mendapatkan wawasan yang mendalam tentang kondisi mesin.
        </li>
        <li>
          <span className="font-semibold">Memperpanjang umur mesin</span> dengan rekomendasi
          pemeliharaan yang tepat waktu dan akurat.
        </li>
      </ul>
      <p className="text-gray-700">
        Teknologi cerdas kami memungkinkan Anda untuk mengambil tindakan preventif, mengurangi waktu
        henti yang tidak terduga, dan mengoptimalkan produktivitas operasional pabrik. Dengan{' '}
        <span className="font-semibold">Metric Smart</span>, kami membantu memastikan pabrik Anda
        tetap berjalan lancar dan efisien.
      </p>
    </section>
  )
}

export default MetricSmart
