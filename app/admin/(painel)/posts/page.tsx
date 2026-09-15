import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostsTable } from "@/components/admin/posts-table"
import { getAllPostsForAdmin } from "@/lib/blog/queries"

export default async function AdminPostsPage() {
  const results = await getAllPostsForAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts do blog</h1>
        <Button asChild>
          <Link href="/admin/posts/novo">
            <Plus className="size-4" />
            Novo post
          </Link>
        </Button>
      </div>

      <PostsTable results={results} />
    </div>
  )
}
