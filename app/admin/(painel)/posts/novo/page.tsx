import { PostEditorForm } from "@/components/admin/post-editor-form"

export default function NovoPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Novo post</h1>
      <PostEditorForm mode="criar" />
    </div>
  )
}
