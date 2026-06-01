import { getInvite } from '@/lib/store'
import { notFound } from 'next/navigation'
import EditInviteClient from './EditInviteClient'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function EditPage({ params }: Props) {
  const { slug } = await params
  const record = await getInvite(slug)
  if (!record) notFound()
  return <EditInviteClient slug={slug} record={record} />
}
