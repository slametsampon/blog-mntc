import PageTitle from '@/components/PageTitle'
import MetricSmart from '@/components/metricSmart/MetricSmart'

export default function Page() {
  return (
    <div className="mt-4 text-center">
      <MetricSmart />
      <PageTitle>
        Under Construction{' '}
        <span role="img" aria-label="roadwork sign">
          🚧
        </span>
      </PageTitle>
    </div>
  )
}
