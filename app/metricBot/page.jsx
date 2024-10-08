import PageTitle from '@/components/PageTitle'
import MetricBot from '@/components/metricBot/MetricBot'

export default function Page() {
  return (
    <div className="mt-4 text-center">
      <MetricBot />
      <PageTitle>
        Under Construction{' '}
        <span role="img" aria-label="roadwork sign">
          🚧
        </span>
      </PageTitle>
    </div>
  )
}
